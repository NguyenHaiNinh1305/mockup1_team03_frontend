import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ThemeModule} from "../../@theme/theme.module";
import {NbMenuModule} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";
import {PrimengModule} from "../../shared/primeng.module";
import {SharedModule} from "primeng/api";
import {AdminComponent} from "./admin.component";

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [

  ],
}];


@NgModule({
  declarations: [
     AdminComponent
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
