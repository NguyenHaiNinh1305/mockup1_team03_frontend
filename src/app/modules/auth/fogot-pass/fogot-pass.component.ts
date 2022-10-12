import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../@core/services/auth.service";
import {Router} from "@angular/router";
import {EventEmitter} from "events";
import {error} from "@angular/compiler/src/util";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ForgotService} from "./forgot-service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'ngx-fogot-pass',
  templateUrl: './fogot-pass.component.html',
  styleUrls: ['./fogot-pass.component.scss']
})
export class FogotPassComponent implements OnInit {
  email=new FormControl('');
  cpi:FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private readonly router: Router,
    private forgotService: ForgotService,
    private  toastr: ToastrService,
  ) { }

  //@Output() dataevent = new EventEmitter<string>();

  ngOnInit(){
    this.cpi = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
    });
  }


  public sendOtp(){
    this.forgotService.sendOTP(this.cpi.value.email).subscribe(
      (res)=> {
        this.toastr.success(res.message)
        this.router.navigate(['/auth/change-password']).then(r => console.log(r));
        localStorage.setItem('id',res.object.id);
      },
      (error) => {
        console.log(error)
        this.toastr.error(error.error?.message);
      }
    );
  }

}
