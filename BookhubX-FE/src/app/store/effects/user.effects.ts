// user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';
import { UserService } from '../../services/user.service'; // Create UserService to handle API requests
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {

//     registerUser$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(UserActions.registerUser),
//       mergeMap(({ userDetails }) =>
//         this.userService.registerUser(userDetails).pipe(
//           map(() => UserActions.registerUserSuccess()),
//           catchError((error) => of(UserActions.registerUserFailure({ error })))
//         )
//       )
//     )
//   );

constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router // Create UserService to handle API requests
  ) {}

  registerUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.registerUser),
    mergeMap(({ userDetails }) =>
      this.userService.registerUser(userDetails).pipe(
        map((response) => {
          if (response.status === 200) {
            // Successful registration
            this.router.navigate(['/login']);
            return UserActions.registerUserSuccess();
          } else {
            // Registration failed, dispatch failure action with error message
            return UserActions.registerUserFailure({ error: { msg: response.body.msg } });
          }
        }),
        catchError((error) => of(UserActions.registerUserFailure({ error })))
      )
    )
  )
);



loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      mergeMap(({ userDetails }) =>
        this.userService.loginUser(userDetails).pipe(
          map((response) => {
            if (response.status === 200) {
              const { token, username,userrole } = response.body;
              localStorage.setItem('token', response.body.token);
              this.handleLoginSuccess()
              this.router.navigate(['/']);

              return UserActions.loginUserSuccess({ username, token,userrole });
            } else {
              return UserActions.loginUserFailure({ error: { msg: response.body.msg } });
            }
          }),
          catchError((error) => of(UserActions.loginUserFailure({ error })))
        )
      )
    )
  );


  

  private handleLoginSuccess(): void {
    alert('Login successful!'); // Display success alert
    this.router.navigate(['/']); // Redirect to home
  }


  
}
