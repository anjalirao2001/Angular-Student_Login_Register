import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router) {}

  // Save a new user to localStorage
  setUserData(newUser: any): void {
    const users = this.getUserData();
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Get all users from localStorage
  getUserData(): any[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  // Set currently logged in user
  setLoggedInUser(user: any): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  // Get currently logged in user
  getLoggedInUser(): any {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }
  
  navigateToDashboard(user: any) {
    this.router.navigate(['/dashboard'], {
      queryParams: {
        email: user.email,
        // password: user.password
      }
    });
  }
}
