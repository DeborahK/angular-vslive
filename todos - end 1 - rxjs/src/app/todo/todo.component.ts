import { Component } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { Todo } from './todo';
import { User } from '../user/user';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ AsyncPipe, NgClass ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  pageTitle = 'Todo List';

  // State
  members: User[] = [];
  isLoading = false;
  incompleteOnly = false;
  selectedMember: User | undefined = undefined;
  todosForMember: Todo[] = [];
  errorMessage = '';

  // Actions
  onFilter(ele:EventTarget | null) {
  }

  onSelected(ele:EventTarget | null) {
  }

  onChangeStatus(task: Todo, ele: EventTarget | null) {
  }
  
}
