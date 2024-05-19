import { Component, OnInit } from '@angular/core';
import { DiscussionService } from 'src/app/services/discussion.service';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit{
  discussions: any[] = [];
  isFormVisible = false;
  discussionData = {
    title: '',
    content: '',
    genre: [],
    author: ''
  };

  //discussion filter
  selectedFilterGenre = ''; // Variable to store the selected genre for filtering
  filteredDiscussions: any[] = [];

  constructor(private discussionService: DiscussionService) { }


  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  createDiscussion(): void {
    this.discussionService.createDiscussion(this.discussionData).subscribe(
      (response) => {
        console.log('Discussion created successfully!', response);
        alert("Your Discussion is created")
        this.loadDiscussions();
        // You can perform additional actions after successful discussion creation
      },
      (error) => {
        console.error('Error creating discussion:', error);
      }
    );

   
    this.toggleFormVisibility();
  }

  ngOnInit(): void {
    this.loadDiscussions()
    this.filteredDiscussions = this.discussions;//dis2
  }


  loadDiscussions(): void {
    this.discussionService.getAllDiscussions().subscribe(
      (data) => {
        this.discussions = data;
        this.applyGenreFilter();
      },
      (error) => {
        console.error('Error fetching discussions:', error);
      }
    );
  }



  applyGenreFilter(): void {
    // If no genre is selected, display all discussions
    if (!this.selectedFilterGenre) {
      this.filteredDiscussions = this.discussions;
    } else {
      // Filter discussions based on the selected genre
      this.filteredDiscussions = this.discussions.filter(
        (discussion) => discussion.genre.includes(this.selectedFilterGenre)
      );
    }
  }


}
