import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService {
  private onlineSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(navigator.onLine);

  constructor() {
    const online$ = fromEvent(window, 'online').pipe(mapTo(true));
    const offline$ = fromEvent(window, 'offline').pipe(mapTo(false));

    merge(online$, offline$).subscribe(this.onlineSubject);
  }

  get onlineStatus$(): Observable<boolean> {
    return this.onlineSubject.asObservable();
  }

  get isOnline(): boolean {
    return this.onlineSubject.value;
  }
}
