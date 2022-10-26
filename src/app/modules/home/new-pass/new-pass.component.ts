import { Component, OnInit } from '@angular/core';

import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {SessionService} from "../../../@core/services/session.service";
import {ProfileService} from "../profile/profile.service";
import {PrimeNGConfig} from "primeng/api";
import {User} from "./new-pass.model";
import {UserService} from "../../../@core/services/user.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {BehaviorSubject} from "rxjs";

export function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.RePassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'ngx-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class NewPassComponent implements OnInit {
  [x: string]: any;
  formPassword: FormGroup;
  user: User = {};
  username: string;
  showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private  userService: UserService,
     private modalService: NgbModal,
    config: NgbModalConfig)
  {config.backdrop = 'static';
  config.keyboard = false;}

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initForm();
  }
  initForm(){
    this.formPassword = this.fb.group({
      password:['', [Validators.required,Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,16}$"),]],
      RePassword:['', Validators.required]
    },{
        validator: comparePassword
      }
      );
  }

  onSubmit(){
    if (this.formPassword.valid){
      this.user.userName = this.username;
      this.user.password = this.formPassword.value.password;
      this.showSpinner.next(true)
      this.profileService.putChangePass(this.user).subscribe(
        (res)=>{
          this.showSpinner.next(false)
          this.toastr.success('Cập nhật thành công');
        },error => {
          this.showSpinner.next(false)
          this.toastr.error('Cập nhật thành công');
        });

    }
  }

}
