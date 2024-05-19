// user.selectors.ts

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserRegistering = createSelector(
  selectUserState,
  (state) => state.registering
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectUserLoggingIn = createSelector(
    selectUserState,
    (state) => state.loggingIn
  );
  
  export const selectIsLoggedIn = createSelector(
    selectUserState,
    (state) => state.isLoggedIn
  );
  
  export const selectUsername = createSelector(
    selectUserState,
    (state) => state.username
  );

  export const selectUserRole = createSelector(
    selectUserState,
    (state) => state.userrole
  );

