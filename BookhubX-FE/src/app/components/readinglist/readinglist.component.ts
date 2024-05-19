import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { MyreadinglistService } from 'src/app/services/myreadinglist.service';
import { OrdersService } from 'src/app/services/orders.service';
import * as UserSelectors from '../../store/selectors/user.selectors';


@Component({
  selector: 'app-readinglist',
  templateUrl: './readinglist.component.html',
  styleUrls: ['./readinglist.component.css']
})
export class ReadinglistComponent implements OnInit{

  orderListBooks: any[] = [];
  selectedBookId: string = '';
  userReadingList: any[] = [];

  userrole$:Observable<string>
  userrole:string=""

  constructor(private ordersService: OrdersService,private readingService: MyreadinglistService,private store:Store) {
    this.userrole$= this.store.select(UserSelectors.selectUserRole).pipe(
      map(userrole => userrole ?? '')  
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


    this.loadOrderedBookList();
    this.loadUserReadingList()
  }

  loadOrderedBookList(): void {
    this.ordersService.getUserOrders().subscribe(
      (orders) => {
        const allBooks = orders.flatMap(order => order.books);

        const uniqueBooks = Array.from(new Set(allBooks.map(book => book.bookId)))
          .map(bookId => {
            this.ordersService.getBookDetails(bookId).subscribe(
              (bookDetails) => {
                const quantity = allBooks.find(book => book.bookId === bookId).quantity;

                const bookInfo = {
                  bookId: bookId,
                  title: bookDetails.title, // Assuming title is a property of your book model
                  quantity: quantity
                };

                this.orderListBooks.push(bookInfo);
                // console.log(this.orderListBooks);
                
              },
              (error) => {
                console.error('Error fetching book details:', error);
              }
            );
          });
      },
      (error) => {
        console.error('Error fetching user orders:', error);
      }
    );
  }



  addToReadingList(): void {
    if (!this.selectedBookId) {
      console.error('Please select a book');
      return;
    }

    // Call the ReadingService to add the book to the reading list
    this.readingService.addToReadingList({ userId: 'your_user_id', bookId: this.selectedBookId }).subscribe(
      (response) => {
        // console.log(response);
        alert("Book added to reading list")
        this.loadUserReadingList()
        
        
        // Optionally, you can update the UI or show a success message
      },
      (error) => {
        console.error('Error adding book to reading list:', error);
        // Optionally, you can show an error message
      }
    );
  }


  loadUserReadingList(): void {
    this.readingService.getUserReadingList().subscribe(
      (readingList) => {
        console.log(readingList,"readinglst");
        
        this.userReadingList = readingList;
        console.log(this.userReadingList);
        
      },
      (error) => {
        console.error('Error fetching reading list:', error);
      }
    );
  }

  confirmRemoveBook(bookId: string): void {
    const isConfirmed = window.confirm('Are you sure you want to remove this book from the reading list?');

    if (isConfirmed) {
      this.removeBookFromReadingList(bookId);
    }
  }
  removeBookFromReadingList(bookId: string): void {
    this.readingService.removeBookFromReadingList(bookId).subscribe(
      () => {
        // Reload the reading list after successful removal
        alert("Book is removed from list")
        this.loadUserReadingList();
        // console.log('Book removed from reading list successfully');
      },
      (error) => {
        console.error('Error removing book from reading list:', error);
      }
    );
  }

}
