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

## Expose signals from service

### 1 - member signal: user.service.ts [4] + [14]
  `import { toSignal } from '@angular/core/rxjs-interop';`

  `members = toSignal(this.http.get<User[]>(this.userUrl), {initialValue: []});`

### 2 - selectedMemberId signal: user.service.ts [2] + [18]
  `import { inject, Injectable, signal } from '@angular/core';`

  `selectedMemberId = signal<number | undefined>(undefined);`

### 3 - React when member is selected: user.service.ts [19]
  ```
  selectedMember = computed(() => 
    this.members().find(m => m.id === this.selectedMemberId()));
  ```

### 4 - No longer need combineLatest: user.service.ts [DELETE 21-30]

### 5 - Set the id into the signal: user.service.ts [22]
  ```
  setSelectedId(id: number) {
    this.selectedMemberId.set(id);
  }
  ```

## Reference signals from service

### 1 - member: todo.component.ts [22]
`members = this.userService.members;`

### 2 - selectedMember: todo.component.ts [25]
`selectedMember = this.userService.selectedMember;`

## Read signals in template

### 1 - selectedMember: todo.component.html [4]
`@let member = selectedMember();`

### 2 - members: todo.component.html [16]
`@for(member of members(); track member.id) {`

### 3 - Demo: Selected member's name is displayed (again)!

### 4 - Review: user.service.ts
