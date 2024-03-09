import { Component, OnChanges, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  providers: [ AuthService ]
})
export class NavComponent implements OnChanges, OnInit{
  isLoggedIn: boolean;
  user: any;

  constructor(private authService: AuthService){
    this.isLoggedIn = authService.isLoggedIn();
    // this.user = authService.user.
    // console.log(this.isLoggedIn)
  }

  ngOnInit(): void {
    this.authService.globalUser.subscribe(value => {
      console.log(value)
      this.user = value;
    });

    console.log(this.user)
  }

  ngOnChanges(changes: any): void{
    console.log("changes")
  }

  logout() {
    this.authService.logOut();
  }

}
