import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router) {}

  login(email: string, password: string) 
  {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const matchedUser = users.find((user: any) => user.email === email && user.password === password);

    if (matchedUser)
    {
      localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
      return matchedUser;
    }
    return null;
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
