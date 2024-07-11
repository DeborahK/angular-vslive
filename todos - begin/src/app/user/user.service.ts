import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = "https://jsonplaceholder.typicode.com/users";

}
