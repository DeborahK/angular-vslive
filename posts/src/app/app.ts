import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserPosts } from './users/user-posts/user-posts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserPosts],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('posts');
}
