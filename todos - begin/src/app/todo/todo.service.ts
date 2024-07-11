import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoUrl = 'https://jsonplaceholder.typicode.com/todos';

  // Services
  private http = inject(HttpClient);
  private userService = inject(UserService);

  constructor() {

  }

}
