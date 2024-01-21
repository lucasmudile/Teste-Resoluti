import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { AddMemberComponent } from './components/crud-member/add-member/add-member.component';
import { ListUserComponent } from './components/crud-user/list-user/list-user.component';
import { ListMemberComponent } from './components/crud-member/list-member/list-member.component';

const routes: Routes = [
  {    
    path:"",
    component:FullComponent,
    children: [
      {path:"", redirectTo:"/home", pathMatch:"full"},
      {path:"login", component:LoginComponent},
      {path:"home", component:DashboardComponent,canActivate:[AuthGuard]},
      {path:"add-member", component:AddMemberComponent,canActivate:[AuthGuard]},
      {path:"list-user", component:ListUserComponent,canActivate:[AuthGuard]},
      {path:"list-member", component:ListMemberComponent,canActivate:[AuthGuard]},

      
    ]
  },

  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"**", redirectTo:"/home", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
