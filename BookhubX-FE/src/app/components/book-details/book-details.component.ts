import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import * as UserSelectors from "../../store/selectors/user.selectors"

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: any;
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute, 
    private bookService: BookService,
    private cartService: CartService,
    private store:Store
    ) 
    {
      this.store.select(UserSelectors.selectIsLoggedIn).subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
     
  }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
   
    if (bookId !== null) {
      // Call the service to get book details
      this.bookService.getBookDetails(bookId).subscribe(
        (response) => {
          this.book = response;
          // console.log(response);
          
        },
        (error) => {
          console.error('Error fetching book details:', error);
        }
      );
    } else {
      console.error('Book ID is null.');
    }

  }



  // addToCart(): void {
  //   // Check if the user is logged in (you might have your own logic for this)
  //   const isLoggedIn = true; // Replace with your actual check

  //   if (isLoggedIn) {
  //     // Use the logged-in user's token for authentication
  //     const token = localStorage.getItem("token"); // Replace with your actual user token


  //     // Call the cart service to add the item to the cart
  //     this.cartService.addToCart({
  //       bookId: this.book._id,
  //       quantity: 1, // You can adjust the quantity as needed
        
        
  //     },token).subscribe(
  //       (response) => {
  //         console.log(response);
  //         alert('Book added to cart successfully!');
  //       },
  //       (error) => {
  //         console.error('Error adding book to cart:', error);
  //         alert('Error adding book to cart. Please try again.');
  //       }
  //     );
  //   } else {
  //     // Redirect to the login page
  //     // You might use Angular Router to navigate to the login page
  //   }
  // }




 


  addToCart(): void {
    // Check if the user is logged in (you might have your own logic for this)
    // Replace with your actual check
 
  
    if (this.isLoggedIn) {
      // Use the logged-in user's token for authentication
      const token = localStorage.getItem("token"); // Replace with your actual user token
  
      if (token !== null) {
        // Call the cart service to add the item to the cart
        this.cartService.addToCart({
          bookId: this.book._id,
          quantity: 1, // You can adjust the quantity as needed
        }, token).subscribe(
          (response) => {
            console.log(response);
            alert('Book added to cart successfully!');
          },
          (error) => {
            console.error('Error adding book to cart:', error);
            alert('Error adding book to cart. Please try again.');
          }
        );
      } else {
        console.error('Token is null. User is not authenticated.');
      }
    } else {
      alert("Please Login")
    }
  }





}
