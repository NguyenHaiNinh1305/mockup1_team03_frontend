import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from "./pages-menu";


@Component({
  selector: 'ngx-admin',
    template: `
  <ngx-one-column-layout>
    <nb-menu [items]="menu"></nb-menu>
    <router-outlet></router-outlet>
  </ngx-one-column-layout>`,
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menu = MENU_ITEMS;

  ngOnInit(): void {
  }

}
