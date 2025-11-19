// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component'; // 1. Import your TodoComponent
import { TriptypeComponent } from './triptype/triptype.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  
  
  { path: 'home', component: TriptypeComponent },

  // Any other routes would go here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }