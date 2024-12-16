import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = route.data['role'];

    if (this._authService.isAuthenticated()) {
      const currentUser = this._authService.getCurrentUser();
      if (currentUser && currentUser.role === expectedRole) {
        return true;
      } else {
        // Redirect to unauthorized page if role doesn't match
        this._router.navigate(['/unauthorized']);
        return false;
      }
    } else {
      // Redirect to login if not authenticated
      this._router.navigate(['/login']);
      return false;
    }
  }
}
