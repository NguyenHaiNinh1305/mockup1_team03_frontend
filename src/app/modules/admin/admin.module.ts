import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ThemeModule} from "../../@theme/theme.module";
import {NbMenuModule} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";
import {PrimengModule} from "../../shared/primeng.module";
import {SharedModule} from "primeng/api";
import {AdminComponent} from "./admin.component";
import { UserComponent } from './user/user.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioGroup, MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'user',
      component: UserComponent,
    },
    {
      path: 'user-edit/:id',
      component: UserEditComponent,
    }
  ],
}];


@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    UserEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule,
    MatTabsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
  ]
})
export class AdminModule { }
