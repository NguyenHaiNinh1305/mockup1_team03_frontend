import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { FogotPassComponent } from './fogot-pass/fogot-pass.component';
import { ChangePasComponent } from './change-pass/change-pas.component';
import {AvatarModule} from "primeng/avatar";
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [{
    path: '',
    component: LoginComponent,
  },
    {
      path: 'fogot-pass',
      component: FogotPassComponent,
    },
    {
      path: 'change-password',
      component: ChangePasComponent,
    }

  ],
}];

@NgModule({
  declarations: [
    AuthComponent,
    FogotPassComponent,
    ChangePasComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    AvatarModule,
    FormsModule,
  ],
})
export class AuthModule { }
