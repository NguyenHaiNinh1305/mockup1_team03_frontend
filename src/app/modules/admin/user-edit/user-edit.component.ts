import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Unit, User} from "../user/user.mode";
import {userService} from "../user/user.service";
import {UserService} from "../../../@core/services/user.service";


@Component({
  selector: 'ngx-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  formEdit: FormGroup;
  id: any;
  user: User;
  datas1: Unit[] = [];
  check: boolean;
  checkAcitve: boolean;


  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private  toastr: ToastrService,
    private activedRoute: ActivatedRoute,
    private userSevice: userService,
    private userActive: UserService
  ) {
  }

  ngOnInit(): void {
    this.formEdit = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      // password: ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      name: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]],
      cccd: ['', [Validators.required, Validators.pattern('[0-9]{9,12}')]],
      homeTown: ['', Validators.required],
      salary: ['', Validators.required],
      literacy: ['', Validators.required],
      gender: ['', Validators.required],
      birthDay: ['', Validators.required],
      isActive: ['', Validators.required],
      unit: ['', Validators.required],
      position: ['', Validators.required],
      isLeader: ['', Validators.required],
    });

    this.activedRoute.paramMap.subscribe(
      params => {
        const idUser = params.get('id');
        this.id = idUser;
        if (idUser) {
          this.userSevice.getUserById(idUser).subscribe(
            res => {
              this.user = res;
              this.checkAcitve = this.user.active
              this.fillValueForm();
              console.log(!this.formEdit.value.isActive);
            }
          )
        }

      }
    )

    console.log(this.userActive.getDecodedAccessToken())
    this.check1();
    this.checkHr();
    this.checkDmHr();

  }

  update() {
    this.addValueUser();
    console.log(this.addValueUser())
    console.log(this.user);
    this.userSevice.updateUser(this.id, this.user).subscribe(
      res => {
        // this.toastr.success(res.message());
        this.toastr.success("Cập nhật thành công")
        this.router.navigate(['/admin/user']).then(r => console.log(r));
      }, error => {
        if (error.error.message === "Username đã tồn tại") {
          this.toastr.error(error.error.message);
        } else if (error.error.message === "Email đã tồn tại") {
          this.toastr.error(error.error.message);
        } else if (error.error.message === "Phone đã tồn tại") {
          this.toastr.error(error.error.message);
        }
      }
    );
  }

  fillValueForm() {

    this.formEdit.patchValue({
      name: this.user.name,
      email: this.user.email,
      userName: this.user.userName,
      cccd: this.user.cccd,
      literacy: this.user.literacy,
      phoneNumber: this.user.phoneNumber,
      homeTown: this.user.homeTown,
      salary: this.user.salary,
      gender: this.user.gender,
      position: this.user.position,
      isLeader: this.user.leader == true ? "Lead" : "Notlead",
      birthDay: this.user.birthDay,
      isActive: this.user.active == true ? "Active" : "NotActive",
      unit: this.user.unit,
    });
  }


  addValueUser() {
    this.user.name = this.formEdit.value.name;
    this.user.email = this.formEdit.value.email;
    this.user.userName = this.formEdit.value.userName;
    this.user.password = this.formEdit.value.password;
    this.user.cccd = this.formEdit.value.cccd;
    this.user.literacy = this.formEdit.value.literacy;
    this.user.phoneNumber = this.formEdit.value.phoneNumber;
    this.user.homeTown = this.formEdit.value.homeTown;
    this.user.salary = this.formEdit.value.salary;
    this.user.gender = this.formEdit.value.gender;
    this.user.position = this.formEdit.value.position;
    if (this.formEdit.value.isLeader == "Lead") {
      this.user.leader = true;
    } else {
      this.user.leader = false;
    }
    this.user.birthDay = this.formEdit.value.birthDay;
    this.user.delete = this.formEdit.value.isDelete;
    if (this.formEdit.value.isActive == "Active") {
      this.user.active = true;
    } else {
      this.user.active = false;
    }

  }

  check1() {
    if (this.userActive.getDecodedAccessToken().auth == "ROLE_DM") {
      return true;
    } else {
      return false;
    }
  }

  checkDmHr() {
    if (this.userActive.getDecodedAccessToken().auth == "ROLE_DM_HR") {
      return true;
    } else {
      return false;
    }
  }

  checkHr() {
    if (this.userActive.getDecodedAccessToken().auth == "ROLE_HR") {
      return true;
    } else {
      return false;
    }
  }


  deactivated() {
    this.userSevice.deactivated(this.id).subscribe(
      res => {
        this.toastr.success(res.message);
        // this.toastr.success("Cập nhật thành công")
        this.router.navigate(['/admin/user']).then(r => console.log(r));
      }, error => {
        console.log(error)
      })
  }

  activated() {
    this.userSevice.activated(this.id).subscribe(
      res => {
        this.toastr.success(res.message);
        // this.toastr.success("Cập nhật thành công")
        this.router.navigate(['/admin/user']).then(r => console.log(r));
      }, error => {
        console.log(error)
      })
  }


}
