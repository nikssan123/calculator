import { Component } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  providers: [AuthService]
})
export class AuthComponent {
  error = {
    invalid: false,
    api: false
  };
  register = false;
  form: FormGroup;

  constructor(private service: AuthService, fb: FormBuilder, private router: Router, private route: ActivatedRoute){
    service.login({email: "test@gmail.com", password: "123"});

    if(this.route.snapshot.url[0].path === "register"){
      this.register = true;
    }
    // console.log(this.route.snapshot.url[0])

    this.form = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      username: ["", Validators.required]
    });
  }

  onSubmit(e:Event){
    e.preventDefault();

    // TODO: handle validation
    // if(this.form.){
    //   console.log("invalid")
    //   this.error.invalid = true;
    //   return;
    // }

    const { email, password } = this.form.value;
    if(this.register){
      this.service.register({
        email,
        password,
        username: this.form.value.username
      }).subscribe({
        next: () => {
          this.router.navigateByUrl("");
        },
        error: e => {
          console.log(e)
        }
      });
    }else{
      this.service.login({
        email,
        password
      }).subscribe({
        next: () => {
          console.log("success")
          this.router.navigateByUrl("");
        },
        error: e => {
          console.log("uha")
          console.log(e)
        }
      });
    }
    
  }
}
