import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-posts',
  imports: [FormsModule],
  templateUrl: './user-posts.html',
  styleUrl: './user-posts.css'
})
export class UserPosts {
  pageTitle = "User Posts";
  private userService = inject(UserService);

  // Signals
  user = this.userService.selectedUser;

  // Reference the resource properties
  users = this.userService.usersResourceRx.value;
  isLoading = this.userService.usersResource.isLoading;
  error = this.userService.usersResource.error;

  posts = this.userService.postsResourceRx.value;
}
