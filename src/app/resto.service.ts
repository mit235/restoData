import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './auth/user.model';


export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?:boolean;
}

@Injectable({
  providedIn: 'root',
})


export class RestoService {
  user = new BehaviorSubject<User | null>(null);
  error: string = ""
  constructor(private http: HttpClient, private route: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9SikZ_uxDRPsgy2fH4ZAT7l3yfDdPoBQ', {
      email: email,
      password: password,
      returnSecureToken: true

    }
    ).pipe(catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        }))
  }

  login(email: string, password: string){
  return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9SikZ_uxDRPsgy2fH4ZAT7l3yfDdPoBQ',{
      email: email,
      password: password,
      returnSecureToken: true
   }).pipe(catchError(this.handleError))
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

















  isRegister = new BehaviorSubject<boolean>(false);
  // isInvalid = new BehaviorSubject<boolean>(false);
  isInvalid: boolean = false;
  isError = new EventEmitter<boolean>(false);
  isControl = new EventEmitter<boolean>(false);

  url = 'http://localhost:3000/restaurant';
  rooturl = 'http://localhost:3000/users';


  getList() {
    return this.http.get(this.url);
  }
  saveResto(data: any) {
    return this.http.post(this.url, data);
    // console.warn(data)
  }
  deleteResto(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getCurrentResto(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  updateResto(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  registerUser(data: any) {
    this.http
      .post(this.rooturl, data, { observe: 'response' })
      .subscribe((result) => {

        localStorage.setItem('seller', JSON.stringify(result.body));
        // this.route.navigate(['add']);
        console.log('result', result);
      });
  }

  userLogin(data: any) {
    // console.warn(data)
    this.http
      .get(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        // console.warn(result);
        if (result && result.body && result.body.length) {
          console.warn('user Logged In');
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.route.navigate(['add']);
          this.isRegister.next(true);
          this.isControl.emit(true)
        }
        else {
          console.warn('user not found');
          // this.isInvalid.next(true);

          this.isError.emit(true)

          // this.isInvalid=true;

        }
      });
  }
  // userLogin(data: any) {
  //   // console.warn(data)
  //  return this.http
  //     .get(
  //       `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
  //       {observe: 'response'}
  //     )

  // }
}
