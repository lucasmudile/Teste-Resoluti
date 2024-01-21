import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { DemoFlexyModule } from '../demo-flexy-module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AddMemberComponent } from './crud-member/add-member/add-member.component';
import { ListMemberComponent } from './crud-member/list-member/list-member.component';
import { AddUserComponent } from './crud-user/add-user/add-user.component';
import { ListUserComponent } from './crud-user/list-user/list-user.component';

import { DeleteMemberComponent } from './crud-member/delete-member/delete-member.component';
import { UpdateUserComponent } from './crud-user/update-user/update-user.component';
import { DeleteUserComponent } from './crud-user/delete-user/delete-user.component';
import { MemberDetailsComponent } from './crud-member/member-details/member-details.component';


@NgModule({
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    FormsModule
  ],
  exports: [
  ],
  declarations: [
    LoginComponent,
    AddMemberComponent,
    ListMemberComponent,
    AddUserComponent,
    UpdateUserComponent,
    ListUserComponent,
    DeleteMemberComponent,
    DeleteUserComponent,
    MemberDetailsComponent
  ]
})
export class ComponentsModule { }
