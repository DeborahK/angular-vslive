import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';
import { Post, User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'https://jsonplaceholder.typicode.com/users';
  postUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Selected user
  selectedUser = signal<User | undefined>(undefined);

  // *** Using httpResource *** //

  // Retrieve array of users.
  // Set a default so it's not undefined.
  usersResource = httpResource<User[]>(() => this.userUrl, { defaultValue: [] });

  // Retrive posts for the user
  // Reacts to changes in the selected user!
  // This will issue a request even if no user name is selected
  // postsResource = httpResource<Post[]>(() =>
  //   `${this.postUrl}?userId=${this.selectedUser()?.id}`);
  // eff = effect(() => console.log('Retrieving posts', this.postsResource.isLoading()));

  // Check for selected user first
  postsResource = httpResource<Post[]>(() =>
    this.selectedUser() ? `${this.postUrl}?userId=${this.selectedUser()?.id}` : undefined);
  eff = effect(() => console.log('Retrieving posts', this.postsResource.isLoading()));



  
  // *** Using rxResource *** //
  private http = inject(HttpClient);

  // Retrieve the users information
  // Since it is an observable, we can pipe it through a set of operators
  usersResourceRx = rxResource({
    stream: p =>
      this.http.get<User[]>(this.userUrl).pipe(
        map(items => items.sort((a, b) => a.name < b.name ? -1 : 0))
      )
  });

  // Retrieve the posts for the selected user
  // Since it is an observable, we can pipe it through a set of operators
  postsResourceRx = rxResource({
    params: this.selectedUser,
    stream: p =>
      this.http.get<Post[]>(`${this.postUrl}?userId=${p.params?.id}`).pipe(
        map(items => items.sort((a, b) => a.title < b.title ? -1 : 0))        
      )
  });

}
