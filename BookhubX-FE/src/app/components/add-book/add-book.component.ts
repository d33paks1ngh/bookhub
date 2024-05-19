import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DiscussionService } from 'src/app/services/discussion.service';
import * as UserSelectors from '../../store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommunityService } from 'src/app/services/community.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent  implements OnInit{
 //login 
 isLoggedIn$: Observable<boolean>;
 username$: Observable<string>;
 userrole$:Observable<string>
userrole:string=""
 bookForm: FormGroup;
 showForm: boolean = false;

 //particular user's book
userbooks:any[]=[]


//edit form
editBookForm: FormGroup;
 showEditForm: boolean = false;
selectedBookId: string | null = null;

   // delete confirmation
   showDeleteConfirmation: boolean = false;
   selectedDeleteBookId: string | null = null;


 constructor(private fb: FormBuilder,private discussionService:DiscussionService,
  private store: Store,
  private communityService:CommunityService){

  this.isLoggedIn$ = this.store.select(UserSelectors.selectIsLoggedIn);
  
    this.userrole$= this.store.select(UserSelectors.selectUserRole).pipe(
      map(userrole => userrole ?? '')  
    );

  this.username$ = this.store.select(UserSelectors.selectUsername).pipe(
    map(username => username ?? '')  
  );


  this.bookForm = this.fb.group({
    title: ['', Validators.required],
    genre: [[]],
    description: [''],
    price: [''],
    image: [''],
    publisher: [''],
    stock: ['']
  });
  

  // Initialize the edit form
  this.editBookForm = this.fb.group({
    title: ['', Validators.required],
    genre: [[]],
    description: [''],
    price: [''],
    image: [''],
    publisher: [''],
    stock: ['']
  });
}


onSubmit() {
  // You can perform additional validation if needed

  const formData = this.bookForm.value;
  // Assuming you have user role and username from the store
  const userRole = this.userrole; // replace with your store value
 
  const bookData = {
    ...formData,
    author: userRole ,
   
  };

  this.communityService.addBook(bookData).subscribe(
    response => {
      alert("One new Book is added")
       this.getUsersBook()
      console.log('Book added successfully:', response);
      // You can add a success message or navigate to another page on success
    },
    error => {
      console.error('Error adding book:', error);
      // Handle error, show error message, etc.
    }
  );
 

}

onCancel() {
  // Handle cancel action, e.g., navigate away or reset the form
  this.bookForm.reset();
}
toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      // Reset the form if it's being hidden
      this.bookForm.reset();
    }
  }

getUsersBook(){
  
  this.communityService.getUserProfileBooks().subscribe(
    response => {
      
      this.userbooks=response
      console.log( response);
     
    },
    error => {
      console.error('Error adding book:', error);
      
    }
  );

}

ngOnInit(): void {
  console.log(this.userrole$);this.userrole$.subscribe(
    userrole => {
      this.userrole=userrole
      console.log('User Role:', userrole);
      // Do whatever you want with the user role here
    },
    error => {
      console.error('Error getting user role:', error);
      // Handle error if necessary
    }
  );

  this.getUsersBook()
}


// Initialize the edit form with the selected book's data
editBook(bookId: string) {
  this.communityService.getBook(bookId).subscribe(
    response => {
      this.selectedBookId = bookId;
      this.editBookForm.setValue({
        title: response.title || '',
        genre: response.genre || [],
        description: response.description || '',
        price: response.price || '',
        image: response.image || '',
        publisher: response.publisher || '',
        stock: response.stock || ''
      });
      this.showEditForm = true;
    },
    error => {
      console.error('Error getting book details:', error);
    }
  );
}

onSubmitEdit() {
  if (!this.selectedBookId) {
    console.error('No book selected for editing.');
    return;
  }

  const editedBookData = this.editBookForm.value;

  this.communityService.updateBook(this.selectedBookId, editedBookData).subscribe(
    response => {
      console.log('Book updated successfully:', response);
      this.editBookForm.reset();
      this.showEditForm = false;
      // this.getUsersBook();
    },
    error => {
      console.error('Error updating book:', error);
    }
  );
}

onCancelEdit() {
  this.editBookForm.reset();
  this.showEditForm = false;
}


//add delete functionality


deleteBook(bookId: string) {
  this.showDeleteConfirmation = true;
  this.selectedDeleteBookId = bookId;
}

confirmDelete() {
  if (!this.selectedDeleteBookId) {
    console.error('No book selected for deletion.');
    return;
  }

  const userrole = this.userrole; 
  // Call your deleteBook method from the service
  this.communityService.deleteBook(this.selectedDeleteBookId,userrole).subscribe(
    response => {
      console.log('Book deleted successfully:', response);
      this.showDeleteConfirmation = false;
      this.selectedDeleteBookId = null;
      this.getUsersBook();
    },
    error => {
      console.error('Error deleting book:', error);
    }
  );
}

cancelDelete() {
  this.showDeleteConfirmation = false;
  this.selectedDeleteBookId = null;
}

}
