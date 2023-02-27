import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestoService,AuthResponseData} from '../resto.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private authService: RestoService,private router:Router) { }

  isLogginMode = true;
  isLoading=false;
  error:string=this.authService.error;
  isValid=false;

  onSwithMode() {
    this.isLogginMode = !this.isLogginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs:Observable<AuthResponseData>

    this.isLoading=true;

    if (this.isLogginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        // this.router.navigated(['/add'])
        this.router.navigate(['add']);
        this.isValid=true;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );


    form.reset();
  }
}
