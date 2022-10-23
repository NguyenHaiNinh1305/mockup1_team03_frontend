import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Unit, User} from "../../../home/profile/profile.model";
import {SessionService} from "../../../../@core/services/session.service";
import {ProfileService} from "../../../home/profile/profile.service";
import {PrimeNGConfig} from "primeng/api";
import {ToastrService} from "ngx-toastr";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../@core/services/user.service";
import {Transfer} from "./transfer.model";
import {TransferService} from "./transfer.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'ngx-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class TransferComponent implements OnInit {

  formTransfer: FormGroup;
  transferUser: User;
  createUser: User;
  unitOld: Unit;
  submited = false;
  units: Unit[];
  id: any;
  transfer: Transfer = {};
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private  toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router,
    private  activetedRoute: ActivatedRoute,
    private userSerivice: UserService,
    private  transferService: TransferService,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content) {
    this.submited = true;
    if (this.formTransfer.valid) {
      this.modalService.open(content);
    }
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initForm();
    this.activetedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        // get transferUser
        this.userSerivice.getUserById(this.id).subscribe(res => {
          this.transferUser = res;
          this.unitOld = this.transferUser.unit
        })
      }
      this.transferService.getUnits().subscribe(res => {
        this.units = res.object;
      })
    })
    const userId = localStorage.getItem('id-user')
    this.userSerivice.getUserById(parseInt(userId)).subscribe(res => {
      this.createUser = res;
    })
  }

  initForm() {
    this.formTransfer = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(200)]],
      unitNew: ['', Validators.required],
      reason: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  submit() {
    this.addTransfer()
    this.showSpinner.next(true)
    this.transferService.saveTransfer(this.transfer).subscribe(res => {
      this.showSpinner.next(false)
      this.toastr.success('Tạo đợt điều chuyển thành công')
      this.initForm();
    }, error => {
      this.showSpinner.next(false)
      this.toastr.error(error.error.message)
    })
  }

  addTransfer() {
    let formValue = this.formTransfer.value
    this.transfer.name = formValue.name;
    let unitNewId = this.formTransfer.value.unitNew;
    this.transfer.unitNew = this.units.find(unit => {
      return unit.id == unitNewId;
    })
    this.transfer.reason = formValue.reason;
    this.transfer.transferUser = this.transferUser;
    this.transfer.createUser = this.createUser;
    this.transfer.unitOld = this.unitOld;
  }
delete(){
  this.initForm();
}

}
