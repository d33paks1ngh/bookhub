import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CommunityService } from 'src/app/services/community.service';
import { DiscussionService } from 'src/app/services/discussion.service';
import * as UserSelectors from '../../store/selectors/user.selectors';
import { OrdersService } from 'src/app/services/orders.service';


@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.css']
})
export class AllOrderComponent implements OnInit {
 //login 
 isLoggedIn$: Observable<boolean>;
 username$: Observable<string>;
 userrole$:Observable<string>
userrole:string=""

 showForm: boolean = false;

 //all order
 allorders: any[] = [];

 constructor(private fb: FormBuilder,private discussionService:DiscussionService,
  private store: Store,
  private communityService:CommunityService ,private orderService:OrdersService ){

  this.isLoggedIn$ = this.store.select(UserSelectors.selectIsLoggedIn);
  
    this.userrole$= this.store.select(UserSelectors.selectUserRole).pipe(
      map(userrole => userrole ?? '')  
    );

  this.username$ = this.store.select(UserSelectors.selectUsername).pipe(
    map(username => username ?? '')  
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
this.loadAllOrder()

}





loadAllOrder(): void {
  this.orderService.getAlLUserOrdersAdmin().subscribe(
    (data) => {
      this.allorders = data;
      console.log(data);
      
    },
    (error) => {
      console.error('Error fetching discussions:', error);
    }
  );
}











}
