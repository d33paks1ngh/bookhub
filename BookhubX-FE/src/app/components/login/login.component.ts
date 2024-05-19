import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from '../../store/actions/user.actions';
import * as UserSelectors from '../../store/selectors/user.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userDetails: any = {
    email: '',
    password: '',
  };

  loggingIn$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store,private router: Router) {
    this.loggingIn$ = this.store.select(UserSelectors.selectUserLoggingIn);
    this.error$ = this.store.select(UserSelectors.selectUserError);
  }

  login(): void {
    const userDetailsCopy = { ...this.userDetails };
    this.store.dispatch(UserActions.loginUser({ userDetails: userDetailsCopy }));
   }

  

  isFormValid(): boolean {
    // Check if all required fields are filled
    return this.userDetails.email && this.userDetails.password;
  }

  handleLoginError(): void {
    this.error$.subscribe((error) => {
      if (error) {
        // Display the warning or handle it as needed
        alert(error.msg); // Replace this with your preferred way of displaying warnings
        this.store.dispatch(UserActions.loginUserFailure({ error: null }));
      }
    });
  }

  handleLoginSuccess(): void {
    alert('Login successful!'); // Display success alert
    this.router.navigate(['/']); // Redirect to home
  }

}
