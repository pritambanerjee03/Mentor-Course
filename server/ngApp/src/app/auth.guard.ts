import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _eventService: EventService,
    private _router: Router) { }

  canActivate(): boolean {
    if (this._authService.loggedIn() && this._eventService.enrolledEvents()) {
      console.log('true')
      return true
    } else {
      console.log('false')            
      this._router.navigate(['/login'])
      return false
    }
  }
}
