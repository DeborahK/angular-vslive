### Notes
Use Ctrl+K V to preview the markdown

# RxJS

## Retrieve members

### 1 - Call http.get: user.service.ts [13]
  ```
  // Retrieve team members
  members$ = this.http.get<User[]>(this.userUrl);
  ```

### 2 - Reference in the component: todo.component.ts [23]
  `members$ = this.userService.members$;`

### 3 - Use async pipe in template: todo.component.html [16]
  `@for(member of members$ | async; track member.id) {`

### 4 - Demo: Select box is populated!

## React when member is selected
(1) Get notified when the user selects a team member.

(2) Find the team member in the list of users.

### 1 - Get notified when a member is selected: user.service.ts [4] + [15]
  `import { Subject } from 'rxjs';`

  ```  
  // Get notified when a member is selected
  private idSelectedSubject = new Subject<number>();
  selectedMemberId$ = this.idSelectedSubject.asObservable();
  ```

### 2 - Method that emits the notification: user.service.ts [18] 
  ```
  setSelectedId(id: number) {
    this.idSelectedSubject.next(id);
  }
  ```

### 3 - Component method that calls the service: todo.component.ts [33]
  ```
  onSelected(ele:EventTarget | null) {
    const id = Number((ele as HTMLSelectElement).value);
    this.userService.setSelectedId(id);
  }
  ```

### 4 - React to the emission: user.service.ts [19]
  ```
  // Find the selected member in the retrieved array of members
  // Caches last value from each observable
  selectedMember$ = combineLatest([
    this.members$,
    this.selectedMemberId$
  ]).pipe(
    map(([members, memberId]) =>
      members.find(m => m.id === memberId)
    )
  );
  ```

### 5 - Reference in the component: todo.component.ts [25]
  `selectedMember$ = this.userService.selectedMember$;`

### 6 - Use async pipe in template [4]
  `@let member = selectedMember$ | async;`

### 7 - Event binding in template: todo.component.html[14]
  DONE!

### 8 - Demo: Selected member's name is displayed!

### 9 - Review: user.service.ts

# signals

## Expose signals from service

### 1 - member signal: user.service.ts [5] + [14]
  `import { toSignal } from '@angular/core/rxjs-interop';`

  `members = toSignal(this.http.get<User[]>(this.userUrl), {initialValue: []});`

### 2 - selectedMemberId signal: user.service.ts [2] + [16]
  Delete the subject

  `import { inject, Injectable, signal } from '@angular/core';`

  `selectedMemberId = signal<number | undefined>(undefined);`

### 3 - React when member is selected: user.service.ts [18]
  ```
  selectedMember = computed(() => {
    const id = this.selectedMemberId();
    if (id) {
      return this.members().find(m => m.id === id)
    } else {
      return undefined;
    }
  });
  ```

### 4 - No longer need combineLatest: user.service.ts [DELETE 27-33]

### 5 - Set the id into the signal: user.service.ts [27]
  ```
  setSelectedId(id: number) {
    this.currentMemberId.set(id);
  }
  ```

## Reference signals from service

### 1 - member: todo.component.ts [23]
`members = this.userService.members;`

### 2 - selectedMember: todo.component.ts [25]
`selectedMember = this.userService.currentMember;`

## Read signals in template

### 1 - selectedMember: todo.component.html [4]
`@let member = selectedMember();`

### 2 - members: todo.component.html [16]
`@for(member of members(); track member.id) {`

### 3 - Demo: Selected member's name is displayed (again)!

### 4 - Review: user.service.ts

# RxJS + Signals

## Display ToDos

### 1 - Create a signal for todos: todo.service.ts [15]
  `  todos = signal<Todo[]>([]);`

### 2 - Call http get: todo.service.ts [17]
NOTE: Parameterized query!

Why not use toSignal?

  ```
  setSelectedId(id: number) {
    this.http.get<Todo[]>(`${this.todoUrl}?userId=${id}`).pipe(
      // Cut the length of the long strings
      map(data => data.map(t =>
        t.title.length > 20 ? ({ ...t, title: t.title.substring(0, 20) }) : t
      ))
    )
  }
  ```

### 3 - Subscribe: todo.service.ts [72]
  `.subscribe(todos => this.todos.set(todos));`

### 4 - Unsubscribe: todo.service.ts [12] + [25]
  ` private destroyRef = inject(DestroyRef);`

  `takeUntilDestroyed(this.destroyRef),`

### 5 - Error handling: todo.service.ts [18] + [27]
  Create a signal for the error message
  ```
  errorMessage = signal('');
  ```

  Add catchError
  ```
  catchError(err => {
    this.errorMessage.set(setErrorMessage(err));
    return of([]);
  })
  ```

### 6 - Reference signals from service: todo.component.ts [26]
```
  todosForMember = this.todoService.todos;
  errorMessage = this.todoService.errorMessage;
```

### 7 - Call the service method: todo.component.ts [36]
  ```
  onSelected(ele: EventTarget | null) {
    const id = Number((ele as HTMLSelectElement).value);
    this.userService.setSelectedId(id);
    this.todoService.setSelectedId(id);
  }
  ```

### 8 - Read signals in template: todo.component.html [35] + [55]
  `@let todos = todosForMember();`

  `@let message = errorMessage();`

### 9 - Demo: Selected member's todos appear!

### 10 - Review: todo.service.ts

## Filter to only incomplete tasks
Look at the template and component first

### 1 - Define signals: todo.service.ts [20]
  ```
  incompleteOnly = signal(false);
  filteredTodos = computed(() => {
    if (this.incompleteOnly()) {
      return this.todos().filter(t => t.completed === false);
    }
    else {
      return this.todos();
    }
  });
  ```
Set todos to private!

### 2 - Define a method to set the filter: todo.service.ts [43]
  ```
  // Based on user action
  setIncompleteOnly(filter: boolean) {
    this.incompleteOnly.set(filter);
  }
  ```

### 3 - Reference signals from service: todo.component.ts [26]
  ```
  todosForMember = this.todoService.filteredTodos;
  errorMessage = this.todoService.errorMessage;
  incompleteOnly = this.todoService.incompleteOnly;
  ```

### 4 - Call the service method: todo.component.ts [30]
  ```
  onFilter(ele: EventTarget | null) {
    this.todoService.setIncompleteOnly((ele as HTMLInputElement).checked)
  }
  ```

### 5 - Read signals in template: todo.component.html [45]
  `@if(incompleteOnly()) {`

### 6 - Demo: Todos are filtered!

### 7 - Review: todo.service.ts

## Update todo status
Look at the template and component first

### 1 - Define a method to update the signal: todo.service.ts [47]
  ```
  // Based on user action
  changeStatus(task: Todo, status: boolean) {
    // Why doesn't this work?
    task.completed = status;
  }
  ```
  Need to update the signal in an immutable way!

  Spread the object.
  ```
    // Mark the task as completed
    const updatedTasks = this.todos().map(t =>
      t.id === task.id ? { ...t, completed: status } : t);
    // Set the signal
    this.todos.set(updatedTasks);
  ```

### 2 - Call the method from the component: todo.component.ts [37]
  `this.todoService.changeStatus(task, (ele as HTMLInputElement).checked);`

### 3 - Demo: Status is changed (but only temporarily)!

### 4 - Review: todo.service.ts

