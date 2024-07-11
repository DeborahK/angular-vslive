import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from './user';
import { combineLatest, map, Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = "https://jsonplaceholder.typicode.com/users";
  private http = inject(HttpClient);

  // Retrieve the list of team members (users)
  // members$ = this.http.get<User[]>(this.userUrl);

  // Signals
  members = toSignal(this.http.get<User[]>(this.userUrl), {initialValue: []});
  selectedMemberId = signal<number | undefined>(undefined);
  selectedMember = computed(() => this.members().find(m => m.id === this.selectedMemberId()));

  // private memberSelectedSubject = new Subject<number>();
  // selectedMemberId$ = this.memberSelectedSubject.asObservable();

  // Find the selected member in the retrieved array of members
  // selectedMember$ = combineLatest([
  //   this.members$,
  //   this.selectedMemberId$
  // ]).pipe(
  //   map(([members, memberId]) =>
  //     members.find(m => m.id === memberId)
  //   )
  // );

  getCurrentMember(id: number): User | undefined {
    return this.members().find(m => m.id === id);
  }

  setCurrentMember(id: number) {
    //this.memberSelectedSubject.next(id);
    this.selectedMemberId.set(id);
  }

}
