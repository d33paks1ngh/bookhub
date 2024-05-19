import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  userCart: any[] = [];
  totalCartPrice: number = 0;

  billingAddress: string = '';
  billingState: string = '';
  billingZip: string = '';

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


  //place order

  isAddressDetailsFilled(): boolean {
    return this.billingAddress !== '' && this.billingState !== '' && this.billingZip !== '';
  }



  placeOrder(form: NgForm): void {
    if (form.valid && this.isAddressDetailsFilled()) {
      // Call the service to place the order
      const address = {
        street: this.billingAddress,
        state: this.billingState,
        zip: this.billingZip
      };

      const token = localStorage.getItem('token');

      if (token !== null) {
        this.cartService.placeOrder({ address }, token).subscribe(
          (response) => {
            console.log(response);
            alert("Order Placed")
            // Optionally, you can navigate the user to an order confirmation page
          },
          (error) => {
            console.error('Error placing order:', error);
            alert(error)
          }
        );
      } else {
        console.error('Token is null. User is not authenticated.');
      }
    } else {
      console.log('Please fill in all address details before placing the order.');
    }
  }




}
