import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './user';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = "https://jsonplaceholder.typicode.com/users";
  private http = inject(HttpClient);

  // Retrieve team members
  members = toSignal(this.http.get<User[]>(this.userUrl), {initialValue: []});

  getCurrentMember(id: number): User | undefined {
    return this.members().find(m => m.id === id);
  }
}
