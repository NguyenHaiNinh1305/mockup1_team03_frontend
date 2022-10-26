import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProfileService} from "../../modules/home/profile/profile.service";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class AvataServiceService {

  public avatarUrl = new BehaviorSubject<string>("https://www.w3schools.com/howto/img_avatar.png");

  constructor(private userService: ProfileService,
              private sessionService: SessionService,

  ) {this.getAvatarByUserName()}

  setAvatarUrl(avatarUrl){
    this.avatarUrl.next(avatarUrl);
  }

  getAvatarByUserName(){
     let username= this.sessionService.getItem('auth-user')
    this.userService.getProfile(username).subscribe(
      (res)=>{
        if(res.object.avatarName){
          this.avatarUrl.next('http://localhost:9090/api/public/user-profile/avata/' + res.object.avatarName);
        }
      },error => {
      }
    )
  }
}
