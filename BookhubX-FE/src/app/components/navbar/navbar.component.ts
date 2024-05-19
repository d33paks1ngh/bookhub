import { Component } from '@angular/core';
import * as UserActions from '../../store/actions/user.actions';
import * as UserSelectors from '../../store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  isLoggedIn$: Observable<boolean>;
  username$: Observable<string>;
  userrole$:Observable<string>

  constructor(private store: Store,private router: Router) {
    this.isLoggedIn$ = this.store.select(UserSelectors.selectIsLoggedIn);
    
      this.userrole$= this.store.select(UserSelectors.selectUserRole).pipe(
        map(userrole => userrole ?? '')  
      );

    this.username$ = this.store.select(UserSelectors.selectUsername).pipe(
      map(username => username ?? '')  // Use nullish coalescing to provide a default value
    );
  }
  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/'])
    window.location.reload();
  }

  

}
