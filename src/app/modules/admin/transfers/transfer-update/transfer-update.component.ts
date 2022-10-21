import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Unit, User} from "../../../home/profile/profile.model";
import {Transfer} from "../transfer/transfer.model";
import {SessionService} from "../../../../@core/services/session.service";
import {ProfileService} from "../../../home/profile/profile.service";
import {PrimeNGConfig} from "primeng/api";
import {ToastrService} from "ngx-toastr";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../@core/services/user.service";
import {TransferService} from "../transfer/transfer.service";

@Component({
  selector: 'ngx-transfer-update',
  templateUrl: './transfer-update.component.html',
  styleUrls: ['./transfer-update.component.scss']
})
export class TransferUpdateComponent implements OnInit {

  formTransfer: FormGroup;
  submited = false;
  units: Unit[];
  id: any;
  transfer: Transfer;


  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private  toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router,
    private  activatedRoute: ActivatedRoute,
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
    this.activatedRoute.paramMap.subscribe(params => {
      const  idTransfer = params.get('id');
      if (idTransfer) {
        this.transferService.getTransfersById(idTransfer).subscribe(res => {
          this.transfer = res.object;
          this.updateForm();
        })
      }
      this.transferService.getUnits().subscribe(res => {
        this.units = res.object;
      })
    })
  }

  initForm() {
    this.formTransfer = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      unitNew: ['', Validators.required],
      reason: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  updateForm(){
    this.formTransfer.patchValue({
     name:this.transfer.name,
      unitNew:this.transfer.unitNew.id,
      reason:this.transfer.reason,

    });
}
  submit() {
    this.addTransfer()
    console.log(this.transfer);
    const idUser = localStorage.getItem('id-user')
    this.transferService.updateTransfer(idUser,this.transfer).subscribe(res => {
      this.toastr.success('Cập nhật thành công')
      const url = '/admin/transfer-information/' + this.transfer.id;
      this.router.navigate([url])
    }, error => {
      this.toastr.error("Cập nhật không thành công vui lòng kiểm tra lại thông tin")
    })
  }

  addTransfer() {
    let formValue = this.formTransfer.value;
    this.transfer.name = formValue.name;

    let unitNewId = this.formTransfer.value.unitNew;
    this.transfer.unitNew = this.units.find(unit => {
      return unit.id == unitNewId;
    })
    this.transfer.reason = formValue.reason;

  }

}
