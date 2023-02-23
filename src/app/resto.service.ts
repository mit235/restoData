import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RestoService {
  isRegister = new BehaviorSubject<boolean>(false);
  // isInvalid = new BehaviorSubject<boolean>(false);
  isInvalid:boolean=false;
  isError=new EventEmitter<boolean>(false);
  isControl=new EventEmitter<boolean>(false);

  url = 'http://localhost:3000/restaurant';
  rooturl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private route: Router) {}
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
        {observe: 'response'}
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
        else{
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
