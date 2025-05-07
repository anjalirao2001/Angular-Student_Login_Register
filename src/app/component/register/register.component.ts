import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  showConfirm = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) 
  {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required,Validators.pattern('^[A-Za-z ]+$')]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120),Validators.pattern(/^[1-9][0-9]*$/)]],
      gender: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.matchPasswords });
  }

  matchPasswords(group: FormGroup) 
  {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  get username() { return this.registerForm.get('username')!; }
  get age() { return this.registerForm.get('age')!; }
  get gender() { return this.registerForm.get('gender')!; }
  get mobile() { return this.registerForm.get('mobile')!; }
  get email() { return this.registerForm.get('email')!; }
  get password() { return this.registerForm.get('password')!; }
  get confirmPassword() { return this.registerForm.get('confirmPassword')!; }

  toggleConfirm() 
  {
    this.showConfirm = !this.showConfirm;
  }

  onSubmit() 
  {
    if (this.registerForm.valid) 
    {
      const formData = this.registerForm.value;
      delete formData.confirmPassword;

      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const userExists = users.some((user: any) => user.email === formData.email);

      if (userExists) {
        // alert('User already exists. Please login.');
        this.tossedMessage('Account already exsist, Please login', 'error');
      } 
      else 
      {
        users.push(formData);   
        localStorage.setItem('users', JSON.stringify(users));
        // alert('Registration successful!');
        this.tossedMessage('Registration successful!', 'success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    }
    else
    {
      if(this.password!=this.confirmPassword)
      {
        this.tossedMessage("Password doesnot match",'error')
      }
      else
      {
        this.tossedMessage("Enter all Details correctly",'error')
      }
      
    }
  }

  tossedMessagestr = '';
  showTossed = false;
  tossedMessageType: 'success' | 'error' = 'success';

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
