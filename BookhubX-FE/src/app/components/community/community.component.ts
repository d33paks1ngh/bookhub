import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/services/community.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent  implements OnInit{
  users: any[] = [];
  constructor(private communityService: CommunityService) { }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.communityService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
        console.log(users);
        
      },
      (error) => {
        console.error('Error fetching all users:', error);
      }
    );
  }
}
