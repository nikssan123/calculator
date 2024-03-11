import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-nav",
    standalone: true,
    imports: [ RouterLink ],
    templateUrl: "./nav.component.html",
    styleUrl: "./nav.component.css",
})
export class NavComponent implements OnInit, OnDestroy {
    isLoggedIn: boolean;
    user: any;
    userSub: Subscription;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(value => {
            this.user = value;
            this.isLoggedIn = Object.keys(this.user).length > 0;
        });
    }

    ngOnDestroy() {
        if (this.userSub) this.userSub.unsubscribe();
    }

    logout() {
        this.authService.logOut();
    }
}
