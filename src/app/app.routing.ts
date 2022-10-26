import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './@core/guards/auth.guard';
import {LoginComponent} from "./modules/auth/login/login.component";
import {FogotPassComponent} from "./modules/auth/fogot-pass/fogot-pass.component";
import {ChangePasComponent} from "./modules/auth/change-pass/change-pas.component";
import {AdminGuard} from "./@core/guards/admin.guard";
import {CkeckPointComponent} from "./modules/home/ckeck-point/ckeck-point.component";

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => {
      return import('./modules/admin/admin.module').then(m => m.AdminModule);
    },
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  { path: '',
    component: CkeckPointComponent,
    pathMatch: 'full',
  },
  { path: '**',
    component: CkeckPointComponent,
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
