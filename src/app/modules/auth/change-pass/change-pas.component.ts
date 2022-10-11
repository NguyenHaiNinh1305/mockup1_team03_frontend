import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../@core/services/auth.service";
import {Router} from "@angular/router";
import {changePassService} from "./change-pass";
import {equal} from "assert";

@Component({
  selector: 'ngx-change-pas',
  templateUrl: './change-pas.component.html',
  styleUrls: ['./change-pas.component.scss']
})
export class ChangePasComponent implements OnInit {
  cpf: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private changePassService :changePassService,
  ) {
  }

  ngOnInit() {
    this.cpf = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      otp: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(16), Validators.pattern('^[0-9]*$')]],
    });
  }

  get f() {
    return this.cpf.controls;
  }

  public checkOtp(){
    this.changePassService.check(localStorage.getItem("id"),this.cpf.value.otp).subscribe(
      (res) =>{
        this.changePassword();
        localStorage.clear();
      },
      error => {
        if (error.error.message === "Mã OTP không đúng") {
          alert(error.error.message);
        } else if (error.error.message === "Otp này đã hết hạn!") {
          alert(error.error.message);
        }
      }
    );
  }


  public changePassword(){
this.changePassService.putConfirm(localStorage.getItem("id"),this.cpf.value.password).subscribe(

  (res)=> {
    alert(res.message)
    this.router.navigate(['/auth']).then(r => console.log(r));
  },
  (error) => {
    console.log(error)
    alert(error.error?.message);
  }
);
  }

  onSubmit() {
this.checkOtp();
  }
}
