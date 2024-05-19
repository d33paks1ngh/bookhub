import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent  implements OnInit{
  orderId!: string;
  orderDetails: any;
  constructor(private route: ActivatedRoute, private orderService: OrdersService) { }

  ngOnInit(): void {
    // Get the orderId from the route parameters
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('orderId')!; // Use the non-null assertion operator
      
      // Fetch order details
      this.orderService.getOrderDetails(this.orderId).subscribe(
        (data) => {
          this.orderDetails = data;
        },
        (error) => {
          console.error('Error fetching order details:', error);
        }
      );
    });
  }


  
  
}
