import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, MatTableModule],
  providers: [UserService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  displayedColumns: string[] = ['username', 'age', 'gender', 'mobile', 'email'];
  queryEmail ="";
  selectedUser : any ={};
  users: any[] = []
  tossedMessagestr = ''; 
  showTossed = false; 
  tossedMessageType: 'success' | 'error' = 'success'; 
  constructor(private router: Router , private activeroute: ActivatedRoute,private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUserData();
  
    this.activeroute.queryParams.subscribe((params) => {
      this.queryEmail = params['email'];
      this.selectedUser = this.users.find((user: any) => user.email === this.queryEmail);
    });
  }
  

  logout() 
  {
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);

    this.tossedMessage('You have been logged out!', 'success');
   
    // alert('You have been logged out!');
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
