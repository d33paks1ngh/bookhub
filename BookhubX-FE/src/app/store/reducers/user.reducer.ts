// user.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export interface UserState {
  registering: boolean;
  error: string | null;

  loggingIn: boolean;
  isLoggedIn: boolean;
  username: string | null;
  userrole:string|null
}

export const initialState: UserState = {
  registering: false,
  error: null,

  loggingIn: false,
  isLoggedIn: false,
  username: null,
  userrole:null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.registerUser, (state) => ({ ...state, registering: true, error: null })),
  on(UserActions.registerUserSuccess, (state) => ({ ...state, registering: false, error: null })),
  on(UserActions.registerUserFailure, (state, { error }) => ({ ...state, registering: false, error })),


  on(UserActions.loginUser, (state) => ({ ...state, loggingIn: true, error: null })),
  on(UserActions.loginUserSuccess, (state, { username,userrole }) => ({ ...state, loggingIn: false, isLoggedIn: true, username ,userrole })),
  on(UserActions.loginUserFailure, (state, { error }) => ({ ...state, loggingIn: false, error })),

  on(UserActions.logoutUser, (state) => ({ ...state, isLoggedIn: false, username: null })),




  );