# RxJS
### Notes
Use Ctrl+K V to preview the markdown

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
    this.userService.setSelectedId(Number((ele as HTMLSelectElement).value));
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

