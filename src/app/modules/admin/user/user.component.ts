import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {userService} from "./user.service";
import { Unit, User, UsserDTO} from "./user.mode";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../../@core/services/user.service";


@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']

})
export class UserComponent implements OnInit {
  formAdd: FormGroup;
  formSearch: FormGroup;
  datas: User[] = [];
  datas1: Unit[] = [];
  public messages = '';
  user: User = {};
  sortBy: string = 'name';
  descAsc: string = 'desc';
  idUser: any;
  indexPage = 0;
  Page: object = {};
  userSearch: UsserDTO={};

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private userService: userService,
    private  toastr: ToastrService,
    private modalService: NgbModal,
    private userActive: UserService
  ) {
  }

  //
  ngOnInit(): void {
    this.idUser = localStorage.getItem("id-user");
    this.pagination(this.indexPage);
    this.getAllUnit();
    this.initFormSearch();

    this.formAdd = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
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




  }


  openLg(content) {
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
    console.log(this.userActive.getDecodedAccessToken());
    this.check();
    this.checkHr();
  }

  openLg1(content1) {
    this.modalService.open(content1, {size: 'lg', centered: true, scrollable: true});
    console.log(this.userActive.getDecodedAccessToken());
  }

  getAll() {
    this.userService.getListUser().subscribe((res: any) => {
      this.datas = res;
      console.log(res);
    });
  }


  create() {
    this.addValueUser();
    console.log(this.user);
    if ((this.checkDmHr() == true) && (this.user.unit.id == 3) && (this.user.leader == true)) {
      this.toastr.error("Không được chọn trạng thái trưởng đơn vị cho hr")
      return;
    }
    this.userService.create(this.user).subscribe(
      res => {
        this.toastr.success(res.message);
        this.ngOnInit();
        this.modalService.dismissAll();
        // this.router.navigate(['/user']).then(r => console.log(r));
      }, error => {
        if (error.error.message === "Username đã tồn tại") {
          this.toastr.error(error.error.message);
        } else if (error.error.message === "Email đã tồn tại") {
          this.toastr.error(error.error.message);
        } else if (error.error.message === "Phone đã tồn tại") {
          this.toastr.error(error.error.message);
        }
      });


  }

  getAllUnit() {
    this.userService.getAllUnit().subscribe(
      (res: any) => {
        this.datas1 = res;

      }
    )
  }


  addValueUser() {
    this.user.name = this.formAdd.value.name;
    this.user.email = this.formAdd.value.email;
    this.user.userName = this.formAdd.value.userName;
    this.user.password = this.formAdd.value.password;
    this.user.cccd = this.formAdd.value.cccd;
    this.user.literacy = this.formAdd.value.literacy;
    console.log(this.formAdd.value.literacy);
    this.user.phoneNumber = this.formAdd.value.phoneNumber;
    this.user.homeTown = this.formAdd.value.homeTown;
    this.user.salary = this.formAdd.value.salary;
    this.user.gender = this.formAdd.value.gender;
    this.user.position = this.formAdd.value.position;
    if (this.formAdd.value.isLeader == "Lead") {
      this.user.leader = true;
    } else {
      this.user.leader = false;
    }
    this.user.birthDay = this.formAdd.value.birthDay;
    this.user.delete = this.formAdd.value.isDelete;
    if (this.formAdd.value.isActive == "Active") {
      this.user.active = true;
    } else {
      this.user.active = false;
    }
    let unitId = this.formAdd.value.unit;
    this.user.unit = this.datas1.find(unit => {
      return unit.id == unitId;
    })


  }


  onSubmit() {
    console.log('da vao')
    this.create();
  }

  infoUser(id: any) {

    const url = "admin/user-edit/" + id;
    this.router.navigate([url]);
  }

  check() {
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


  pagination(page: any) {
    if (page < 0) {
      page = 0;
    }
    this.indexPage = page
    this.userService.getPageTransfer(this.indexPage, this.idUser,
      this.sortBy, this.descAsc, this.userSearch)
      .subscribe(res => {
        this.datas = res.object.content;
        this.Page = res.object;
        console.log(this.Page)
      });
  }

  preNextPage(selector: string) {
    if (selector == 'pre') --this.indexPage;
    if (selector == 'next') ++this.indexPage;
    this.pagination(this.indexPage);
  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      name: '',
      email: '',
      literacy: '',
      salary: '',
      birthDay: '',
      unit: '',

    });
  }


  FillValueSearch() {
    const formSearchValue = this.formSearch.value;
    this.userSearch.name = formSearchValue.name;
    this.userSearch.email = formSearchValue.email;
    this.userSearch.literacy = formSearchValue.literacy;
    this.userSearch.salary = formSearchValue.salary;
    this.userSearch.birthDay = formSearchValue.birthDay;
    let unitId = this.formAdd.value.unit;
    this.userSearch.unit = this.datas1.find(unit => {
      return unit.id == unitId;
    });
    console.log(this.formSearch.value)
  }

  onSubmit1() {
    console.log("......")
    this.FillValueSearch();
    this.pagination(0);
    this.initFormSearch();
  }



}
