import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ThemeModule} from "../../@theme/theme.module";
import {NbMenuModule} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";
import {PrimengModule} from "../../shared/primeng.module";
import {SharedModule} from "primeng/api";
import {AdminComponent} from "./admin.component";
import { TransferComponent } from './transfers/transfer/transfer.component';
import {ProfileComponent} from "../home/profile/profile.component";
import { TransferListComponent } from './transfers/transfer-list/transfer-list.component';
import { TransferInformationComponent } from './transfers/transfer-information/transfer-information.component';
import { TransferUpdateComponent } from './transfers/transfer-update/transfer-update.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
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
  ],
}];


@NgModule({
  declarations: [
     AdminComponent,
     TransferComponent,
     TransferListComponent,
     TransferInformationComponent,
     TransferUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule
  ]
})
export class AdminModule { }
