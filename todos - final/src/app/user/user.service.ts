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

  // Signals
  members = toSignal(this.http.get<User[]>(this.userUrl), {initialValue: []});
  selectedMemberId = signal<number | undefined>(undefined);
  selectedMember = computed(() => this.members().find(m => m.id === this.selectedMemberId()));

  getCurrentMember(id: number): User | undefined {
    return this.members().find(m => m.id === id);
  }

  setCurrentMember(id: number) {
    this.selectedMemberId.set(id);
  }

}
