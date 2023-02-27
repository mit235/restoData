import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRestoComponent } from './add-resto/add-resto.component';
import { ListRestoComponent } from './list-resto/list-resto.component';
import { UpdateRestoComponent } from './update-resto/update-resto.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    component: AddRestoComponent,
    path: 'add',
    // canActivate:[AuthGuard]
  },
  {
    component: ListRestoComponent,
    path: '',
  },
  {
    component: UpdateRestoComponent,
    path: 'update/:id',
   
  },
  // {
  //   component: LoginComponent,
  //   path: 'login',
  // },
  {
    component: RegisterComponent,
    path: 'register',
  },
  {
    component:AuthComponent,
    path:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
