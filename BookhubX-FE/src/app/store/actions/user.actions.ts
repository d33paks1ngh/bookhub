// user.actions.ts

import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/components/models/user.model';

export const registerUser = createAction(
  '[User] Register User',
  props<{ userDetails: User }>()
);

export const registerUserSuccess = createAction(
    '[User] Register User Success'
  );
  
  export const registerUserFailure = createAction(
    '[User] Register User Failure',
    props<{ error: any }>()
  );

  // Login actions
export const loginUser = createAction(
    '[User] Login User',
    props<{ userDetails: any }>()
  );
  
  export const loginUserSuccess = createAction(
    '[User] Login User Success',
    props<{ username: string, token: string,userrole:string }>()
  );
  
  export const loginUserFailure = createAction(
    '[User] Login User Failure',
    props<{ error: any }>()
  );
  
  // Logout action
  export const logoutUser = createAction('[User] Logout User');