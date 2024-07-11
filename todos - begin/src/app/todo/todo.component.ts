import { Component } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { Todo } from './todo';

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
  isLoading = false;
  incompleteOnly = false;
  selectedMember = undefined;
  todosForMember: Todo[] = [];

  // Actions
  onFilter(ele:EventTarget | null) {
  }

  onSelected(ele:EventTarget | null) {
  }

  onChangeStatus(task: Todo, ele: EventTarget | null) {
  }
  
}
