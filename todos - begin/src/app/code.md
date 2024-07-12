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

### 1 - Get notified when a member is selected: user.service.ts [4] + [16]
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

### 3 - React to the emission: user.service.ts []
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

### 4 - Component method that calls the service: todo.component.ts [35]
  ```
  onSelected(ele:EventTarget | null) {
    const id = Number((ele as HTMLSelectElement).value);
    this.userService.setSelectedId(id);
  }
  ```

### 5 - Reference in the component: todo.component.ts [26]
  `selectedMember$ = this.userService.selectedMember$;`

### 6 - Use async pipe in template [4]
  `@let member = selectedMember$ | async;`

### 7 - Event binding in template: todo.component.html[14]
  DONE!

### 8 - Demo: Selected member's name is displayed!

### 9 - Review: user.service.ts

# signals

## Expose signals from service

### 1 - member signal: user.service.ts [4] + [14]
  `import { toSignal } from '@angular/core/rxjs-interop';`

  `members = toSignal(this.http.get<User[]>(this.userUrl), {initialValue: []});`

### 2 - selectedMemberId signal: user.service.ts [2] + [18]
  `import { inject, Injectable, signal } from '@angular/core';`

  `currentMemberId = signal<number | undefined>(undefined);`

### 3 - React when member is selected: user.service.ts [19]
  ```
  currentMember = computed(() => {
    const id = this.currentMemberId();
    if (id) {
      return this.members().find(m => m.id === id)
    } else {
      return undefined;
    }
  });
  ```

### 4 - No longer need combineLatest: user.service.ts [DELETE 21-30]

### 5 - Set the id into the signal: user.service.ts [22]
  ```
  setSelectedId(id: number) {
    this.currentMemberId.set(id);
  }
  ```

## Reference signals from service

### 1 - member: todo.component.ts [22]
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

### 1 - Call http get: todo.service.ts [61]
  ```
  // Why not use toSignal?
  this.http.get<Todo[]>(`${this.todoUrl}?userId=${id}`).pipe(
    // Cut the length of the long strings
    map(data => data.map(t =>
      t.title.length > 20 ? ({ ...t, title: t.title.substring(0, 20) }) : t
    ))
  )
  ```

### 2 - Subscribe: todo.service.ts [72]
  `.subscribe(todos => this.todos.set(todos));`

### 3 - Unsubscribe: todo.service.ts [18] + [67]
  ` private destroyRef = inject(DestroyRef);`

  `takeUntilDestroyed(this.destroyRef),`

### 4 - Error handling: todo.service.ts [22] + [68]
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

### 5 - Reference signals from service: todo.component.ts [24]
```
  todosForMember = this.todoService.filteredTodos;
  errorMessage = this.todoService.errorMessage;
```

### 6 - Read signals in template: todo.component.html [29] + [55]
  `@let todos = todosForMember();`

  `@let message = errorMessage();`

### 7 - Demo: Selected member's todos appear!

### 8 - Review: todo.service.ts

## Filter to only incomplete tasks

### 1 - Define signals: todo.service.ts [34]
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

### 2 - Define a method to set the filter: todo.service.ts [53]
  ```
  // Based on user action
  setIncompleteOnly(filter: boolean) {
    this.incompleteOnly.set(filter);
  }
  ```

### 3 - Reference signals from service: todo.component.ts [24]
  ```
  todosForMember = this.todoService.filteredTodos;
  incompleteOnly = this.todoService.incompleteOnly;
  ```

### 4 - Call the service method: todo.component.ts [30]
  `this.todoService.setSelectedId(Number((ele as HTMLSelectElement).value));`

### 5 - Read signals in template: todo.component.html [45]
  `@if(incompleteOnly()) {`

### 6 - Demo: Todos are filtered!

### 7 - Review: todo.service.ts

## Update todo status

### 1 - Define a method to update the signal: todo.service.ts [44]
  ```
  // Based on user action
  changeStatus(task: Todo, status: boolean) {
    // Why doesn't this work?
    task.completed = status;
  }
  ```
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

