import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { SessionService } from '../../../@core/services/session.service';
import { User } from './profile.model';
import { ProfileService } from './profile.service';
import {ToastrService} from "ngx-toastr";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";


export function validateDate(c: AbstractControl) {
  let birthday = new Date(c.value);
  let currentYear = new Date().getFullYear();
  let age = currentYear - birthday.getFullYear();
  if (age < 1 || age > 90) {

    return {valadateDateNotOk: true};
  }
  return null;
}

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})

export class ProfileComponent implements OnInit {
  [x: string]: any;
  formProfile: FormGroup;
  user: User;
  username: string;
  urlAvaTa = "http://localhost:9090/api/public/user/user-profile/avata/";
  avataName:string;
  file: File = null;
  submited = false;

  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private  toastr: ToastrService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {config.backdrop = 'static';
    config.keyboard = false;}

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getByUserName();
    this.initForm();
  }

  initForm(){
    this.formProfile = this.fb.group({
      fullName: ["", [Validators.required,Validators.pattern('[a-z A-Z]{6,30}')]],
      email: ['', [Validators.required,Validators.email]],
      phoneNumber: ['', [Validators.required,Validators.pattern("^(84|0[3|5|7|8|9])+([0-9]{8})\\b")]],
      birthDay: ['', [Validators.required,validateDate]],
      homeTown: ['', [Validators.required,Validators.maxLength(250)]],
      gender: ['', Validators.required],
      cccd: ['', [Validators.required,Validators.pattern('[0-9]{9,12}')]],
      unit: ['', Validators.required],
      salary: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  getByUserName(){
    this.username=this.sessionService.getItem('auth-user')
    this.profileService.getProfile(this.username).subscribe(
      (res)=>{
        this.updateForm(res.object)
        this.user = res.object;
        this.avataName = res.object.avatarName;
      }
    )
  }

  updateForm(user: User): void {
    this.formProfile.patchValue({
      fullName:user.name,
      email:user.email,
      phoneNumber:user.phoneNumber,
      birthDay:user.birthDay,
      homeTown:user.homeTown,
      gender: user.gender,
      cccd:user.cccd,
      unit:user.unit.name,
      salary:user.salary,
      position:user.position

    });
  }

  submit(){
    this.submited = true;
    let ckeck = true;
    Object.keys(this.formProfile.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.formProfile.get(key).errors;
      if (controlErrors != null) {
        ckeck = false;
        this.checkUpdate = false;
        this.toastr.warning('Kiểm tra lại thông tin, cập nhật không thành công');
        return;
      }
    });
    if (ckeck){
      this.updateUser();
      this.profileService.putProfile(this.user).subscribe(
        (res)=>{
          this.checkUpdate = false;
          this.toastr.success('Cập nhật thành công');
        },error => {
          this.checkUpdate = false;
          this.toastr.error("Cập nhật không thành công");
        });
    }
  }

  updateUser(){
    let newUser = this.formProfile.value;
    this.user.name = newUser.fullName.trim();
    this.user.email = newUser.email.trim();
    this.user.phoneNumber = newUser.phoneNumber.trim();
    this.user.birthDay = newUser.birthDay;
    this.user.homeTown = newUser.homeTown.trim();
    this.user.gender = newUser.gender.trim();
    this.user.cccd = newUser.cccd.trim()
  }
  onChange(event) {
    this.file = event.target.files[0];
    this.onUpload();
  }

  onUpload(){
    if(this.file){
      this.profileService.putAvata(this.file,this.user.id).subscribe(
        (res)=>{
          this.avataName = res.object;
          this.file = null;
          this.toastr.success("Cập nhật thành công");
        },error => {
          this.toastr.error(error.error.message);
        }
      )
    }
  }
}
