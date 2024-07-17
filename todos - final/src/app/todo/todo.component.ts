import { Component, inject } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { Todo } from './todo';
import { UserService } from '../user/user.service';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [AsyncPipe, NgClass],
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
  selectedMember = this.userService.selectedMember;
  todosForMember = this.todoService.filteredTodos;
  errorMessage = this.todoService.errorMessage;
  incompleteOnly = this.todoService.incompleteOnly;

  // Actions
  onFilter(ele: EventTarget | null) {
    const filter = (ele as HTMLInputElement).checked;
    this.todoService.setIncompleteOnly(filter);
  }

  onSelected(ele: EventTarget | null) {
    const id = Number((ele as HTMLSelectElement).value);
    this.userService.setSelectedId(id);
    this.todoService.setSelectedId(id);
  }

  onChangeStatus(task: Todo, ele: EventTarget | null) {
    const checked = (ele as HTMLInputElement).checked;
    this.todoService.changeStatus(task, checked);
  }

}
