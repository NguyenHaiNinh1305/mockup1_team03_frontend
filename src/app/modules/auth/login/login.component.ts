import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../@core/models/user";
import {AuthService} from "../../../@core/services/auth.service";
import {TokenService} from "../../../@core/services/token.service";
import {Router} from "@angular/router";
import {UserService} from "../../../@core/services/user.service";
import {SessionService} from "../../../@core/services/session.service";
import {ProfileService} from "../../home/profile/profile.service";
import {ToastrService} from "ngx-toastr";


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
              private  toastr: ToastrService,
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
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
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
          let role = jwtDecode.auth.split(',')
          if (localStorage.getItem('auth-token')
            && (role.includes('ROLE_ADMIN') || role.includes('ROLE_DM')
              || role.includes('ROLE_HR') || role.includes('ROLE_DM_HR'))) {
            this.toastr.success("Đăng nhập thành công")
            this.router.navigate(['/admin/dashboard']);
            return;
          }
          this.toastr.success("Đăng nhập thành công")
          this.router.navigate(['/home/dashboard']);
        },error => {
          this.toastr.error("Đăng nhập thất bại")
        }
      );
    }
  }

  forgotPassword() {
    this.router.navigate(['/auth/fogot-pass']).then(r => console.log(r));
  }

  saveUserId() {
    let username = this.sessionService.getItem('auth-user')
    this.profileService.getProfile(username).subscribe(
      (res) => {
        localStorage.setItem("id-user", res.object.id);
      })
  }

}
