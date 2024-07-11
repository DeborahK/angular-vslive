import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './user';
import { combineLatest, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = "https://jsonplaceholder.typicode.com/users";
  private http = inject(HttpClient);

  // Retrieve team members
  members$ = this.http.get<User[]>(this.userUrl);

  // Get notified when a member is selected
  private idSelectedSubject = new Subject<number>();
  selectedMemberId$ = this.idSelectedSubject.asObservable();

  // Find the selected member in the retrieved array of members
  // Caches last value from each observable
  selectedMember$ = combineLatest([
    this.members$,
    this.selectedMemberId$
  ]).pipe(
    map(([members, memberId]) =>
      members.find(m => m.id === memberId)
    )
  );

  setSelectedId(id: number) {
    this.idSelectedSubject.next(id);
  }
}
