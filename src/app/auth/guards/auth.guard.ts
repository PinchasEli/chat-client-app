import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { SessionService } from 'src/app/shared/services/session.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService,
              private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.sessionService.getDirectUser().pipe(
        map(({ data }) => {
          return !!data
        }),
        catchError(_ => {
          this.router.navigate(['/auth/login']);
          return of(false);
        }),
        first()
      );
  }
}
