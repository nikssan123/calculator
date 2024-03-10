import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NavComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

	constructor(private authService: AuthService){}

	ngOnInit(): void {
		this.authService.tryLocalSignin();
	}
}
