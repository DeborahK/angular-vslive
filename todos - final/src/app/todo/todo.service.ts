import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { UserService } from '../user/user.service';
import { Todo, TodoState } from './todo';
import { catchError, delay, filter, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { setErrorMessage } from '../utility/errorHandling';

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

  // eff = effect(() =>
  //   this.selectedIdSubject.next(this.userService.selectedMember()?.id),
  //   { allowSignalWrites: true }
  // );

  constructor() {

    this.selectedIdSubject.pipe(
      filter(Boolean),
      // Set the loading indicator
      tap(() => this.setLoadingIndicator(true)),
      // Set the current member
      tap(id => this.setCurrentMember(id)),
      // Get the related todos
      switchMap(id => this.getTodos(id)),
      // To better see the loading message
      delay(1000),
      // Set the returned todos
      tap(todos => this.setMemberTodos(todos)),
      // Turn off the loading indicator
      tap(() => this.setLoadingIndicator(false)),
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
      catchError(err => this.setError(err))
    )
  }

  changeStatus(task: Todo, status: boolean) {
    // Mark the task as completed
    const updatedTasks = this.todos().map(t =>
      t.id === task.id ? { ...t, completed: status } : t);
    this.state.update(state => ({
      ...state,
      memberTodos: updatedTasks,
    }));
  }

  changeFilter(filter: boolean) {
    this.state.update(state => ({
      ...state,
      incompleteOnly: filter
    }))
  }

  getTodosForMember(memberId: number) {
    this.selectedIdSubject.next(memberId);
  }

  private setLoadingIndicator(isLoading: boolean) {
    this.state.update(state => ({
      ...state,
      isLoading: isLoading
    }));
  }

  private setCurrentMember(id: number) {
    this.state.update(state => ({
      ...state,
      currentMember: this.userService.getCurrentMember(id),
      memberTodos: []
    }));
  }

  private setMemberTodos(todos: Todo[]): void {
    this.state.update(state => ({
      ...state,
      memberTodos: todos
    }));
  }

  private setError(err: HttpErrorResponse): Observable<Todo[]> {
    const errorMessage = setErrorMessage(err);
    this.state.update(state => ({
      ...state,
      error: errorMessage
    }))
    return of([]);
  }
}
