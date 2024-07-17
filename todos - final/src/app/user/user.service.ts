import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from './user';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = "https://jsonplaceholder.typicode.com/users";
  private http = inject(HttpClient);

  // Retrieve team members
  members = toSignal(this.http.get<User[]>(this.userUrl), { initialValue: [] });

  // Get notified when a member is selected
  selectedMemberId = signal<number | undefined>(undefined);

  selectedMember = computed(() => {
    const id = this.selectedMemberId();
    if (id) {
      return this.members().find(m => m.id === id);
    } else {
      return undefined;
    }
  });

  setSelectedId(id: number) {
    this.selectedMemberId.set(id);
  }
}
