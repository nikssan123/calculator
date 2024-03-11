import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
    selector: "app-auth",
    standalone: true,
    imports: [ ReactiveFormsModule ],
    templateUrl: "./auth.component.html",
    styleUrl: "./auth.component.css",
})
export class AuthComponent {
    error = {
        invalid: false,
        api: false,
    };
    register = false;
    form: FormGroup;

    constructor(
        private service: AuthService,
        fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {
        service.login({ email: "test@gmail.com", password: "123" });

        if (this.route.snapshot.url[0].path === "register") {
            this.register = true;
        }

        this.form = fb.group({
            email: [ "", Validators.required ],
            password: [ "", Validators.required ],
            username: [ "", Validators.required ],
        });
    }

    onSubmit(e: Event) {
        e.preventDefault();

        const { email, password } = this.form.value;
        if (this.register) {
            if (
                this.form.controls["email"].invalid ||
                this.form.controls["password"].invalid ||
                this.form.controls["username"].invalid
            ) {
                this.error.invalid = true;
                return;
            }

            this.service
                .register({
                    email,
                    password,
                    username: this.form.value.username,
                })
                .subscribe({
                    next: res => {
                        this.service.setUser(res);
                        this.router.navigateByUrl("");
                    },
                    error: () => {
                        this.error.api = true;
                    },
                });
        } else {
            if (this.form.controls["email"].invalid || this.form.controls["password"].invalid) {
                this.error.invalid = true;
                return;
            }

            this.service
                .login({
                    email,
                    password,
                })
                .subscribe({
                    next: res => {
                        this.service.setUser(res);
                        this.location.back();
                    },
                    error: () => {
                        this.error.api = true;
                    },
                });
        }
    }

    goToLogin() {
        this.router.navigateByUrl("/login");
    }

    goToRegister() {
        this.router.navigateByUrl("/register");
    }
}
