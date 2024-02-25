import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseUrl: string = `${environment.serverUrl}/user`;
  private user$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.refreshUser();
  }

  getUser(): Observable<User> {
    return this.user$.asObservable();
  }

  refreshUser(): void {
    this.getDirectUser().subscribe(({ data }) => this.user$.next(data));
  }

  setUser(userData: any): void {
    localStorage.setItem('access_token', userData.access_token);
    this.user$.next(userData.user);
  }

  deleteUser(): void {
    localStorage.removeItem('access_token');
    this.user$.next(null);
  }

  getDirectUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`)
  }
}
