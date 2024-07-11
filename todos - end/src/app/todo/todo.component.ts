import { Component, inject } from '@angular/core';
import { UserService } from '../user/user.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { TodoService } from './todo.service';
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

  // Services
  userService = inject(UserService);
  todoService = inject(TodoService);

  // State
  members = this.userService.members;
  isLoading = this.todoService.isLoading;
  selectedMember = this.todoService.currentMember;
  incompleteOnly = this.todoService.incompleteOnly;
  todosForMember = this.todoService.filteredTodos;
  errorMessage = this.todoService.errorMessage;

  // Actions
  onFilter(ele:EventTarget | null) {
    this.todoService.changeFilter((ele as HTMLInputElement).checked)
  }

  onSelected(ele:EventTarget | null) {
    //this.userService.setCurrentMember(Number((ele as HTMLSelectElement).value));
    this.todoService.getTodosForMember(Number((ele as HTMLSelectElement).value));
  }

  onChangeStatus(task: Todo, ele: EventTarget | null) {
    this.todoService.changeStatus(task, (ele as HTMLInputElement).checked);
  }
  
}
