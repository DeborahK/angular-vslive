import { Component, inject } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { Todo } from './todo';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ AsyncPipe, NgClass ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  pageTitle = 'Todo List';

  // Services
  userService = inject(UserService);
  todoService = inject(TodoService);

  // State
  members$ = this.userService.members$;
  incompleteOnly = false;
  selectedMember$ = this.userService.selectedMember$;
  todosForMember: Todo[] = [];
  errorMessage = '';

  // Actions
  onFilter(ele:EventTarget | null) {
  }

  onSelected(ele:EventTarget | null) {
    this.userService.setSelectedId(Number((ele as HTMLSelectElement).value));
  }

  onChangeStatus(task: Todo, ele: EventTarget | null) {
  }
  
}
