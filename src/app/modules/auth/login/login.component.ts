import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../@core/models/user";
import {AuthService} from "../../../@core/services/auth.service";
import {TokenService} from "../../../@core/services/token.service";
import {Router} from "@angular/router";
import {UserService} from "../../../@core/services/user.service";
import {SessionService} from "../../../@core/services/session.service";
import {ProfileService} from "../../home/profile/profile.service";

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  isSubmitted = false;
  roles: string[] = [];
  isLoggedIn = false;


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private tokenService: TokenService,
              private router: Router,
              private  userService: UserService,
              private sessionService: SessionService,
              private profileService: ProfileService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenService.getUser().roles;
    }
  }

  initForm() {
    this.formLogin = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.formLogin.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        data => {
          this.isLoggedIn = true;
          this.tokenService.saveToken(data.token);
          const jwtDecode = this.userService.getDecodedAccessToken();
          this.tokenService.saveUser(jwtDecode.sub);
          this.saveUserId();
          // this.roles = this.tokenService.getUser().roles;
          this.router.navigate(['/home/']);
        },
      );
    }
  }

  forgotPassword() {
    this.router.navigate(['/auth/fogot-pass']).then(r => console.log(r));
  }

  saveUserId(){
    let username = this.sessionService.getItem('auth-user')
    this.profileService.getProfile(username).subscribe(
      (res)=>{
        localStorage.setItem("id-user",res.object.id);
      })
}

}
