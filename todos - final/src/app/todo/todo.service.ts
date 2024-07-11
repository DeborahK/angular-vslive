import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { UserService } from "../user/user.service";
import { Todo } from "./todo";
import { catchError, filter, map, Observable, of, Subject, switchMap, tap } from "rxjs";
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

  // Signals
  // Why not use toSignal?
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

  // Use a subject to react to changes that need an async operation
  private idSelectedSubject = new Subject<number>();

  constructor() {
    this.idSelectedSubject.pipe(
      filter(Boolean),
      // Get the related todos
      switchMap(id => this.getTodos(id)),
      // Ensure the observables are finalized when this service is destroyed
      takeUntilDestroyed()
    ).subscribe(todos => this.todos.set(todos));
  }

  private getTodos(id: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todoUrl}?userId=${id}`).pipe(
      // Cut the length of the long strings
      map(data => data.map(t =>
        t.title.length > 20 ? ({ ...t, title: t.title.substring(0, 20) }) : t
      )),
      catchError(err => {
        this.errorMessage.set(setErrorMessage(err));
        return of([]);
      })
    )
  }

  // Based on user action
  setIncompleteOnly(filter: boolean) {
    this.incompleteOnly.set(filter);
  }

  setSelectedId(id: number) {
    this.currentMemberId.set(id);
    this.idSelectedSubject.next(id);
  }
}
