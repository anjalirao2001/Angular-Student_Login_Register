import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';
 

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  email: string ='';

  tossedMessagestr = '';
  showTossed = false;
  tossedMessageType: 'success' | 'error' = 'success';

  constructor(private userService: UserService) {}

  onSubmit(loginForm: NgForm) 
  {
    if (loginForm.valid) 
    {
      const matchedUser = this.userService.login(this.loginData.email, this.loginData.password);

      if (matchedUser) 
      {
        this.tossedMessage('Login successful!', 'success');
        
        setTimeout(() => {
          this.userService.navigateToDashboard(matchedUser);
        }, 1000);
      } 
      else 
      {
        this.tossedMessage('Invalid login details!', 'error');
      }
    } 
    else 
    {
      this.tossedMessage('Please fill all fields correctly', 'error');
    }
  }

  tossedMessage(message: string, type: 'success' | 'error' = 'success') 
  {
    this.tossedMessagestr = message;
    this.tossedMessageType = type;
    this.showTossed = true;

    setTimeout(() => {
      this.showTossed = false;
    }, 3000);
  }
}
