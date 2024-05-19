import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  userCart: any[] = [];
  totalCartPrice: number = 0;

 
  constructor(private cartService: CartService) { }

  

  ngOnInit(): void {
    this.loadUserCart();
  }


  updateQuantity(cartItem: any, newQuantity: number): void {
    const token = localStorage.getItem('token');

    if (token !== null) {
      // Call the cart service to update the item quantity
      this.cartService.updateCartItemQuantity(cartItem._id, newQuantity, token).subscribe(
        (response) => {
          // Update the local quantity on success
          cartItem.quantity = response.cartItem.quantity;
          this.loadUserCart()
        },
        (error) => {
          console.error('Error updating cart item quantity:', error);
        }
      );
    } else {
      console.error('Token is null. User is not authenticated.');
    }
  }

  loadUserCart(): void {
    const token = localStorage.getItem('token');

    if (token !== null) {
      this.cartService.getUserCart(token).subscribe(
        (response) => {
          this.userCart = response;

          // Calculate total cart price
          this.calculateTotalPrice();
        },
        (error) => {
          console.log('Error fetching user cart:', error);
        }
      );
    } else {
      console.log('Token is null. User is not authenticated.');
    }
  }

  calculateTotalPrice(): void {
    this.totalCartPrice = this.userCart.reduce((total, item) => total + (item.bookprice * item.quantity), 0);
  }




  deleteCartItem(cartItemId: string): void {
    const token = localStorage.getItem('token');

    if (token !== null) {
      this.cartService.deleteCartItem(cartItemId, token).subscribe(
        (response) => {
          console.log(response);
          this.loadUserCart()
          // Refresh the cart after deletion (you may want to update the userCart array)
        },
        (error) => {
          console.error('Error deleting cart item:', error);
        }
      );
    } else {
      console.error('Token is null. User is not authenticated.');
    }
  }


  

  }



