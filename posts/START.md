*** SETUP ***
- Replace code with code from below
- Open all three user.* files
- Leave START.md open to code at the bottom
- Run the application
- Set the browser to 125%

*** user.service.ts ***
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'https://jsonplaceholder.typicode.com/users';
  postUrl = 'https://jsonplaceholder.typicode.com/posts';

  // *** Using httpResource *** //


  
  // *** Using rxResource *** //

}

*** user-posts.ts ***
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Post, User } from '../user';

@Component({
  selector: 'app-user-posts',
  imports: [FormsModule],
  templateUrl: './user-posts.html',
  styleUrl: './user-posts.css'
})
export class UserPosts {
  pageTitle = "User Posts";

  // Signals
  user = signal<User | undefined>(undefined);

  // Reference the resource properties
  users = signal<User[]>([]);
  isLoading = signal(false);
  error = signal(undefined);

  posts = signal<Post[]>([]);
}


*** Changes ***
        map(items => items.sort((a, b) => a.name < b.name ? -1 : 0))