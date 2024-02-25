import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { SessionService } from 'src/app/shared/services/session.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private baseUrl: string = `${environment.serverUrl}/user`;

    constructor(private http: HttpClient,
                private sessionService: SessionService) {}

    login(username: string, password: string): Observable<User> {
        return this.http.post<any>(`${this.baseUrl}/login`, { username, password })
            .pipe(
                map(response => {
                    response.status === 'success' && this.sessionService.setUser(response.data);
                    return response;
                })
            );
    }
} 
