import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SessionService } from '../../../@core/services/session.service';
import { Router } from '@angular/router';
import {ProfileService} from "../../../modules/home/profile/profile.service";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  picture;

  name=this.sessionService.getItem('auth-user')

  themes = [
    {
      value: 'default',
      name: 'Mặc định',
    },
    {
      value: 'dark',
      name: 'Bóng đêm',
    },
    {
      value: 'cosmic',
      name: 'Huyền ảo',
    },
    {
      value: 'corporate',
      name: 'Tối giản',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Thông tin cá nhân' },{ title: 'Thay đổi mật khẩu'   }, { title: 'Đăng xuất'   } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private sessionService: SessionService,
              private router: Router,
              private profileService: ProfileService,
              ) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.user = this.sessionService.getItem('auth-user');
    this.getByUserName(this.user);
    this.menuService.onItemClick().subscribe((event)=>{
      if(event.item.title==='Đăng xuất'){
        this.sessionService.removeItem('auth-token'),
        this.sessionService.removeItem('auth-user'),
        this.router.navigate(['/auth/'])
      }
      if(event.item.title==='Thông tin cá nhân'){
        this.router.navigate(['/home/profile'])
      }
      if(event.item.title==='Thay đổi mật khẩu'){
        this.router.navigate(['/home/change-password'])
      }
    });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }


  getByUserName(username){
    this.profileService.getProfile(username).subscribe(
      (res)=>{
        if(res.object.avatarName){
          this.picture = 'http://localhost:9090/api/public/user-profile/avata/' + res.object.avatarName;
        }else {
          this.picture  = 'https://www.w3schools.com/howto/img_avatar.png';
        }
      },error => {
        this.picture  = 'https://www.w3schools.com/howto/img_avatar.png';
      }
    )
  }
}

