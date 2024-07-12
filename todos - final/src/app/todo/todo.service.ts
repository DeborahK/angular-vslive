import { HttpClient } from "@angular/common/http";
import { computed, DestroyRef, inject, Injectable, signal } from "@angular/core";
import { UserService } from "../user/user.service";
import { Todo } from "./todo";
import { catchError, map, of, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { setErrorMessage } from "../utility/errorHandling";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoUrl = 'https://jsonplaceholder.typicode.com/todos';

  // Services
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);

  // Signals
  private todos = signal<Todo[]>([]);
  errorMessage = signal('');

  currentMemberId = signal<number | undefined>(undefined);
  currentMember = computed(() => {
    const id = this.currentMemberId();
    if (id) {
      return this.userService.getCurrentMember(id);
    } else {
      return undefined;
    }
  });

  incompleteOnly = signal(false);
  filteredTodos = computed(() => {
    if (this.incompleteOnly()) {
      return this.todos().filter(t => t.completed === false);
    }
    else {
      return this.todos();
    }
  });

  // Based on user action
  changeStatus(task: Todo, status: boolean) {
    // Why doesn't this work?
    task.completed = status;
    // Mark the task as completed
    const updatedTasks = this.todos().map(t =>
      t.id === task.id ? { ...t, completed: status } : t);
    // Set the signal
    this.todos.set(updatedTasks);
  }

  // Based on user action
  setIncompleteOnly(filter: boolean) {
    this.incompleteOnly.set(filter);
  }

  // Based on user action
  setSelectedId(id: number) {
    this.currentMemberId.set(id);

    // Why not use toSignal?
    this.http.get<Todo[]>(`${this.todoUrl}?userId=${id}`).pipe(
      // Cut the length of the long strings
      map(data => data.map(t =>
        t.title.length > 20 ? ({ ...t, title: t.title.substring(0, 20) }) : t
      )),
      takeUntilDestroyed(this.destroyRef),
      catchError(err => {
        this.errorMessage.set(setErrorMessage(err));
        return of([]);
      })
    ).subscribe(todos => this.todos.set(todos));
  }
}
