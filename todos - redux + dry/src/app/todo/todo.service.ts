import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { UserService } from '../user/user.service';
import { Todo, TodoState } from './todo';
import { catchError, delay, filter, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { setErrorMessage } from '../utility/errorHandling';
import { updateState } from '../utility/signalFunctions';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoUrl = 'https://jsonplaceholder.typicode.com/todos';

  // Services
  private http = inject(HttpClient);
  private userService = inject(UserService);

  // Signal that holds the state (initial state)
  private state = signal<TodoState>({
    isLoading: false,
    currentMember: undefined,
    memberTodos: [],
    incompleteOnly: false,
    error: null
  })

  // Selectors (slices of state)
  isLoading = computed(() => this.state().isLoading);
  currentMember = computed(() => this.state().currentMember);
  private todos = computed(() => this.state().memberTodos);
  incompleteOnly = computed(() => this.state().incompleteOnly);
  errorMessage = computed(() => this.state().error);
  filteredTodos = computed(() => {
    if (this.incompleteOnly()) {
      return this.todos().filter(t => t.completed === false);
    }
    else {
      return this.todos();
    }
  });

  // Use a subject to react to changes that need an async operation
  private selectedIdSubject = new Subject<number | undefined>();

  constructor() {

    this.selectedIdSubject.pipe(
      filter(Boolean),
      // Set the loading indicator
      tap(() => updateState(this.state, 'isLoading', true)),
      // Set the current member
      tap(id => updateState(this.state, 'currentMember', this.userService.getCurrentMember(id))),
      // Get the related todos
      switchMap(id => this.getTodos(id)),
      // To better see the loading message
      delay(1000),
      // Set the returned todos
      tap(todos => updateState(this.state, 'memberTodos', todos)),
      // Turn off the loading indicator
      tap(() => updateState(this.state, 'isLoading', false)),
      // Ensure the observables are finalized when this service is destroyed
      takeUntilDestroyed()
    ).subscribe();
  }

  private getTodos(id: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todoUrl}?userId=${id}`).pipe(
      // Cut the length of the long strings
      map(data => data.map(t =>
        t.title.length > 20 ? ({ ...t, title: t.title.substring(0, 20) }) : t
      )),
      catchError(err => {
        updateState(this.state, 'error', setErrorMessage(err));
        return of([]);
      })
    )
  }

  // Based on user action
  changeStatus(task: Todo, status: boolean) {
    // Mark the task as completed
    const updatedTasks = this.todos().map(t =>
      t.id === task.id ? { ...t, completed: status } : t);
    updateState(this.state, 'memberTodos', updatedTasks);
  }

  // Based on user action
  changeFilter(filter: boolean) {
    updateState(this.state, 'incompleteOnly', filter);
  }

  // Based on user action
  getTodosForMember(memberId: number) {
    this.selectedIdSubject.next(memberId);
  }
  
}
