import { Component ,ViewContainerRef,ComponentFactoryResolver} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'resto';
  constructor(
    private vcr:ViewContainerRef,
    private cfr:ComponentFactoryResolver
  ){}


  async loadADDResto(){
    this.vcr.clear();
    const { AddRestoComponent} = await import('./add-resto/add-resto.component')
    this.vcr.createComponent(
      this.cfr.resolveComponentFactory(AddRestoComponent)
    )
  }
  async loadUpResto(){
    this.vcr.clear();
    const {UpdateRestoComponent} = await import('./update-resto/update-resto.component')
    this.vcr.createComponent(
      this.cfr.resolveComponentFactory(UpdateRestoComponent)
      )
    
  }
  async loadListResto(){
    this.vcr.clear();
    const {ListRestoComponent}=await import('./list-resto/list-resto.component')
    this.vcr.createComponent(this.cfr.resolveComponentFactory(ListRestoComponent))
  }
  async loadLogUser(){
    this.vcr.clear();
    const {LoginComponent}=await import('./login/login.component')
    this.vcr.createComponent(this.cfr.resolveComponentFactory(LoginComponent))
  }
  async loadRegiUser(){
    this.vcr.clear();
    const {RegisterComponent}=await import('./register/register.component')
    this.vcr.createComponent(this.cfr.resolveComponentFactory(RegisterComponent))
  }
}
