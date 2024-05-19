import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscussionService } from 'src/app/services/discussion.service';

@Component({
  selector: 'app-discussion-details',
  templateUrl: './discussion-details.component.html',
  styleUrls: ['./discussion-details.component.css']
})
export class DiscussionDetailsComponent implements OnInit {

  discussionId!: string;
  discussionDetails: any;

  comment: { commentText: string } = { commentText: "" };

  allcomments: any[] = []
  constructor(private route: ActivatedRoute, private router: Router, private discussionService: DiscussionService) {}

  ngOnInit(): void {
    // Get the discussionId from the route parameters
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.discussionId = id;

        // Fetch discussion details
        this.discussionService.getDiscussionDetails(this.discussionId).subscribe(
          (data) => {
            this.discussionDetails = data;
          },
          (error) => {
            console.error('Error fetching discussion details:', error);
          }
        );
      }
    });

    this.getAllcomments()
  }

  // goBack(): void {
  //   this.router.navigate(['/discussions']);
  // }

addComment(){
this.route.paramMap.subscribe((params) => {
    const id = params.get('id');
    if (id) {
      this.discussionId = id;

      // Fetch discussion details
      this.discussionService.postComment(this.comment,this.discussionId).subscribe(
        (data) => {
          console.log(data);
          
          this.comment = data;
          alert("Comment added")
          this.getAllcomments()
        },
        (error) => {
          console.error('Error fetching discussion details:', error);
        }
      );
    }
  });

}

getAllcomments(){
  this.route.paramMap.subscribe((params) => {
    const id = params.get('id');
    if (id) {
      this.discussionId = id;

      // Fetch discussion details
      this.discussionService.getComment(this.discussionId).subscribe(
        (data) => {
          this.allcomments = data;
          console.log(data);
          
        },
        (error) => {
          console.error('Error fetching discussion details:', error);
        }
      );
    }
  });

}


}
