import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { bookReducer } from './store/reducers/book.reducer';
import { BookEffects } from './store/effects/book.effects';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { userReducer } from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effects';
import { LoginComponent } from './components/login/login.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersDetailsComponent } from './components/orders-details/orders-details.component';
import { DiscussionsComponent } from './components/discussions/discussions.component';
import { DiscussionDetailsComponent } from './components/discussion-details/discussion-details.component';
import { CommonModule } from '@angular/common';
import { ProfiletabComponent } from './components/profiletab/profiletab.component';
import { MydiscussionComponent } from './components/mydiscussion/mydiscussion.component';
import { ReadinglistComponent } from './components/readinglist/readinglist.component';
import { CommunityComponent } from './components/community/community.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatButtonComponent } from './components/chat-button/chat-button.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { UserReadinglistComponent } from './components/user-readinglist/user-readinglist.component';
import { FooterComponent } from './components/footer/footer.component';
import { AllOrderComponent } from './components/all-order/all-order.component';
@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    BookDetailsComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    OrdersDetailsComponent,
    DiscussionsComponent,
    DiscussionDetailsComponent,
    ProfiletabComponent,
    MydiscussionComponent,
    ReadinglistComponent,
    CommunityComponent,
    UserDetailsComponent,
    AddBookComponent,
    ChatComponent,
    ChatButtonComponent,
    CarouselComponent,
    UserReadinglistComponent,
    FooterComponent,
    AllOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({books: bookReducer,user: userReducer ,book: bookReducer}),
    EffectsModule.forRoot([BookEffects,UserEffects]),
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
