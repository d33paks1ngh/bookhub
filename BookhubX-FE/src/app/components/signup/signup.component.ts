import { Component } from '@angular/core'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from '../../store/actions/user.actions';
import * as UserSelectors from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  roles: string[] = ['author', 'reader']; 
  userDetails: any = {
    username: '',
    email: '',
    password: '',
    role: '',
  };

  registering$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.registering$ = this.store.select(UserSelectors.selectUserRegistering);
    this.error$ = this.store.select(UserSelectors.selectUserError);
  }

  registerUser(userDetails: any): void {
   this.store.dispatch(UserActions.registerUser({ userDetails: this.userDetails }));
  this.handleRegistrationError();
  }

  isFormValid(): boolean {
    // Check if all required fields are filled
    return (
      this.userDetails.username &&
      this.userDetails.email &&
      this.userDetails.password
    );
  }

  handleRegistrationError(): void {
    this.error$.subscribe((error) => {
      if (error) {
        // Display the warning or handle it as needed
        alert(error.msg); // Replace this with your preferred way of displaying warnings
        this.store.dispatch(UserActions.registerUserFailure({ error: null }));
      }
    });

}

}
