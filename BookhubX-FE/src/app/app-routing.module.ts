import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersDetailsComponent } from './components/orders-details/orders-details.component';
import { DiscussionsComponent } from './components/discussions/discussions.component';
import { DiscussionDetailsComponent } from './components/discussion-details/discussion-details.component';
import { ProfiletabComponent } from './components/profiletab/profiletab.component';
import { MydiscussionComponent } from './components/mydiscussion/mydiscussion.component';
import { ReadinglistComponent } from './components/readinglist/readinglist.component';
import { CommunityComponent } from './components/community/community.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { authGuard } from './auth.guard';
import { AllOrderComponent } from './components/all-order/all-order.component';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path : "signup", component:SignupComponent},
  { path : "login", component:LoginComponent},
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'cart', component: CartComponent , canActivate: [authGuard]},
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'order', component: OrdersComponent,canActivate: [authGuard] },
  { path: 'order/:orderId', component: OrdersDetailsComponent,canActivate: [authGuard] },
  { path: 'discussion', component: DiscussionsComponent,canActivate: [authGuard] },
  { path: 'discussion/:id', component: DiscussionDetailsComponent,canActivate: [authGuard] },
  { path: 'account', component: ProfiletabComponent },
  { path: 'mydiscussion', component: MydiscussionComponent,canActivate: [authGuard] },
  { path: 'myreadinglist', component: ReadinglistComponent,canActivate: [authGuard] },
  { path: 'community', component: CommunityComponent,canActivate: [authGuard] },
  { path: 'userprofile/:userId', component: UserDetailsComponent },
  { path: 'addbook', component: AddBookComponent,canActivate: [authGuard] },
  { path: 'allorder', component: AllOrderComponent,canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
