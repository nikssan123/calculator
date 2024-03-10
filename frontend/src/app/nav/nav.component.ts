import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit, OnDestroy{
  isLoggedIn: boolean;
  user: any;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.user.subscribe(value => {
      this.user = value;
      // this.authService.setUser(this.user)
      this.isLoggedIn = Object.keys(this.user).length > 0;
    });
  }

  ngOnDestroy() {
    this.authService.user.unsubscribe()
  }

  logout() {
    this.authService.logOut();
  }

}
