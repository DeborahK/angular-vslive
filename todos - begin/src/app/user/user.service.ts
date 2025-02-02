import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = "https://jsonplaceholder.typicode.com/users";
  private http = inject(HttpClient);

}
