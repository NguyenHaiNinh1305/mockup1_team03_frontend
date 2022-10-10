import { Component, OnInit } from '@angular/core';

import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {SessionService} from "../../../@core/services/session.service";
import {ProfileService} from "../profile/profile.service";
import {PrimeNGConfig} from "primeng/api";
import {User} from "./new-pass.model";

export function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.RePassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'ngx-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.scss']
})
export class NewPassComponent implements OnInit {
  [x: string]: any;
  formPassword: FormGroup;
  user: User = {};
  username: string;
  togger :boolean = false;
  submited = false;

  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig) { }

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

    this.togger =true;
    this.submited = true;
    this.username=this.sessionService.getItem('auth-user')
    let ckeck = true;
    Object.keys(this.formPassword.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.formPassword.get(key).errors;
      if (controlErrors != null) {
        ckeck = false;
        return;
      }
    });
    if (ckeck && !this.formPassword.errors){

      this.user.userName = this.username;
      this.user.password = this.formPassword.value.password;
      this.profileService.putChangePass(this.user).subscribe(
        (res)=>{
          this.toastr.success('Cập nhật thành công');
        },error => {
          this.toastr.error('Cập nhật thành công');

        });

    }
  }

 blur(){
    this.togger = true;
 }
    forcus(){
    this.togger = false;
    this.submited = false;
  }

}
