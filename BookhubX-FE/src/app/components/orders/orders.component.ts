import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{


  userOrders: any[] = []; // replace any[] with the actual type of your orders

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    // Assuming you have a method in your service to fetch user orders
    this.orderService.getUserOrders().subscribe(
      (orders) => {
        this.userOrders = orders;
      },
      (error) => {
        console.error('Error fetching user orders:', error);
      }
    );
  }

}
