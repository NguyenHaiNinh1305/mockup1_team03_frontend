import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { SessionService } from '../../../@core/services/session.service';
import { User } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  formProfile: FormGroup;
  user: User;
  username: string;
  
  constructor(              
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getByUserName();
    this.initForm();
  }
  initForm(){
    this.formProfile = this.fb.group({
      fullName: ["", Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthDay: ['', Validators.required],
      homeTown: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  getByUserName(){
    this.username=this.sessionService.getItem('auth-user')
    this.profileService.getProfile(this.username).subscribe(
      (res)=>{
        this.updateForm(res)
      }
    )
  }

  updateForm(user: User): void {
    this.formProfile.patchValue({
      fullName:user.fullName,
      email:user.email,
      phoneNumber:user.phoneNumber,
      birthDay:user.birthDay,
      homeTown:user.homeTown,
      gender: user.gender
    });
  }

}
