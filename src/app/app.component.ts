import {
  Component,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { RestoService } from './resto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription | any;
  title = 'resto';
  constructor(
    private vcr: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private router: Router,
    private restoserv: RestoService

  ) {}


  ngOnInit() {
    this.userSub = this.restoserv.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  ismenurequired = false;
  ngDoCheck(): void {
    let currenturl = this.router.url;
    if (currenturl === '/register') {
      this.ismenurequired = false;
    } else {
      this.ismenurequired = true;
    }

    // async loadADDResto(){
    //   this.vcr.clear();
    //   const { AddRestoComponent} = await import('./add-resto/add-resto.component')
    //   this.vcr.createComponent(
    //     this.cfr.resolveComponentFactory(AddRestoComponent)
    //   )
    // }
    // async loadUpResto(){
    //   this.vcr.clear();
    //   const {UpdateRestoComponent} = await import('./update-resto/update-resto.component')
    //   this.vcr.createComponent(
    //     this.cfr.resolveComponentFactory(UpdateRestoComponent)
    //     )

    // }
    // async loadListResto(){
    //   this.vcr.clear();
    //   const {ListRestoComponent}=await import('./list-resto/list-resto.component')
    //   this.vcr.createComponent(this.cfr.resolveComponentFactory(ListRestoComponent))
    // }
    // async loadLogUser(){
    //   this.vcr.clear();
    //   const {LoginComponent}=await import('./login/login.component')
    //   this.vcr.createComponent(this.cfr.resolveComponentFactory(LoginComponent))
    // }
    // async loadRegiUser(){
    //   this.vcr.clear();
    //   const {RegisterComponent}=await import('./register/register.component')
    //   this.vcr.createComponent(this.cfr.resolveComponentFactory(RegisterComponent))
    // }
  }
}
