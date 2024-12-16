import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(user: User) {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser();
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
