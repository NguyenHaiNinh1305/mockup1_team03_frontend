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
import { TransferComponent } from './transfers/transfer/transfer.component';
import {ProfileComponent} from "../home/profile/profile.component";
import { TransferListComponent } from './transfers/transfer-list/transfer-list.component';
import { TransferInformationComponent } from './transfers/transfer-information/transfer-information.component';
import { TransferUpdateComponent } from './transfers/transfer-update/transfer-update.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

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
    },
      {
      path: 'transfer/:id',
      component: TransferComponent,
    },
    {
      path: 'transfer-list',
      component: TransferListComponent,
    },
    {
      path: 'transfer-information/:id',
      component: TransferInformationComponent,
    },
    {
      path: 'transfer-update/:id',
      component: TransferUpdateComponent,
    },
    {
      path: 'dashboard',
      component: AdminDashboardComponent,
    },
  ],
}];


@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    UserEditComponent,
     AdminComponent,
     TransferComponent,
     TransferListComponent,
     TransferInformationComponent,
     TransferUpdateComponent,
     AdminDashboardComponent
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
    SharedModule
  ]
})
export class AdminModule { }
