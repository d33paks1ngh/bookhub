import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from 'src/app/services/community.service';
import { DiscussionService } from 'src/app/services/discussion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  userBooks: any[] = [];
  userDiscussion:any[]=[]
  userDetails:{username:string,email:string} ={username:"",email:""}
  userReadingList:any[]=[]

  constructor(private communitySerivce: CommunityService, private route: ActivatedRoute,
    private discussionService:DiscussionService,private userService:UserService
    ) {}

ngOnInit(): void {
  const userId = this.route.snapshot.paramMap.get('userId');
  this.loadUserBooks(userId!);
  this.loadUserDuscussion(userId!)
  this.loadUserDetails(userId!)
 this.loadUserReadingList(userId!)
  
}


  loadUserBooks(userId: string): void {
    this.communitySerivce.getUserBooks(userId).subscribe(
      (userBooks) => {
        this.userBooks = userBooks;
      },
      (error) => {
        console.error('Error fetching user books:', error);
      }
    );
  }

  loadUserDuscussion(userId:string):void{
    this.discussionService.getUserdiscussionsCommunity(userId).subscribe(
      (userdiscussion) => {
        this.userDiscussion = userdiscussion;
        console.log(userdiscussion);
        
      },
      (error) => {
        console.error('Error fetching user books:', error);
      }
    );
  }

  loadUserDetails(userId:string):void{
    this.userService.getSingleUserDetails(userId).subscribe(
      (userDetails) => {
        this.userDetails = userDetails;
       
        
      },
      (error) => {
        console.error('Error fetching user books:', error);
      }
    );
  }

  loadUserReadingList(userId:string):void{
    this.communitySerivce.getreadonglistOfuser(userId).subscribe(
      (readinglist) => {
        this.userReadingList = readinglist;
       
        
      },
      (error) => {
        console.error('Error fetching user books:', error);
      }
    );
  }

}
