import {Component, OnInit} from '@angular/core';
import {TransferService} from "../transfer/transfer.service";
import {UserService} from "../../../../@core/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Status, Transfer} from "../transfer/transfer.model";
import {User} from "../../../home/profile/profile.model";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject} from "rxjs";
import {TokenService} from "../../../../@core/services/token.service";

@Component({
  selector: 'ngx-transfer-information',
  templateUrl: './transfer-information.component.html',
  styleUrls: ['./transfer-information.component.scss']
})
export class TransferInformationComponent implements OnInit {

  transfer: Transfer;
  user: User;
  canReview: boolean = false;
  idTransfer:any;
  showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  canShowTransfer = false

  constructor(
    private  transferService: TransferService,
    private userService: UserService,
    private router: Router,
    private  activatedRoute: ActivatedRoute,
    private  toastr: ToastrService,
    private tokenService: TokenService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idTransfer = params.get('id');
      if (this.idTransfer) {
        this.transferService.getTransfersById(this.idTransfer).subscribe(res => {
          this.transfer = res.object;
          const userId = localStorage.getItem('id-user')
          this.userService.getUserById(parseInt(userId)).subscribe(res => {
            this.user = res;
            if(this.authorizationManager()){
              this.isCanReview();
            }
          })
        })
      }
    });
  }

  authorizationManager(){
    const jwtDecode = this.userService.getDecodedAccessToken();
    this.tokenService.saveUser(jwtDecode.sub);
    let role = jwtDecode.auth.split(',')
    if (role.includes('ROLE_ADMIN') || role.includes('ROLE_DM_HR')
      || role.includes('ROLE_HR') ) {
      this.canShowTransfer = true;
      return true;
    }else if(role.includes('ROLE_DM')) {
      const  idUnit = this.user.unit.id
      if( idUnit == this.transfer.unitNew.id || idUnit == this.transfer.unitOld.id)
        this.canShowTransfer = true;
        return true;
    }
    this.canShowTransfer = false;
     return  false;
  }


  isCanReview() {
    // neu transfer da duyet, tu choi, da huy, khong cho thay doi thong tin
    if (this.transfer.statusTransfer.id >= 4) {
      this.canReview = false;
      return;
    }
    const jwtDecode = this.userService.getDecodedAccessToken();
    let role = jwtDecode.auth.split(',');
    // admin co quyen review
    if (role.includes('ROLE_ADMIN')) {
      this.canReview = true;
      return;
    }
    // kiem tra xem dm old da review hay chua
    // neu chua hien thi button de chon
    if (!this.transfer.creadDayDivisionManagerUnitOld) {
      this.canReview = this.transfer.divisionManagerUnitOld.id == this.user.id;
      return;
    }
    // new dm old da review
    // hien thi button cho dm new chon
    if (!this.transfer.creadDayDivisionManagerUnitNew) {
      this.canReview = this.transfer.divisionManagerUnitNew.id == this.user.id;
      return;
    }
  }

  reviewTransfer(type:string){
    let status: Status ;
    status = type == 'refuse' ?  {id: 4, name: 'refuse'}:{id: 3, name: 'agree'};
    this.review(status);
    this.showSpinner.next(true);
    this.transferService.reviewTransfer(this.transfer,this.user.id).subscribe(res => {
      this.showSpinner.next(false);
      this.transfer = res.object;
      this.toastr.success("Th??nh c??ng")
      this.canReview = false;
    }, error => {
      this.showSpinner.next(false);
      this.toastr.error('Th???t b???i')
    })
  }

  cancel() {
    this.showSpinner.next(true);
    this.transferService.cancelTransfer(this.user, this.idTransfer).subscribe(res => {
      this.showSpinner.next(false);
      this.transfer = res.object;
      this.canReview = false;
      this.toastr.success("H???y h??nh c??ng")
    }, error => {
      this.showSpinner.next(false);
      this.toastr.error('Th???t b???i')
    })
  }

  update(){
    const url = '/admin/transfer-update/' + this.idTransfer;
    this.router.navigate([url])
  }

  review(status: Status) {
    const jwtDecode = this.userService.getDecodedAccessToken();
    let role = jwtDecode.auth.split(',');
    // khi admin refuse
    if (role.includes('ROLE_ADMIN')) {
      this.transfer.adminReview = this.user;
      this.transfer.adminReviewDay = new Date();
      if (status.name == 'refuse') {
        this.transfer.statusTransfer = status;
      } else {
        this.transfer.statusTransfer = {id: 6, name: 'success'};
        this.transfer.succeeDay = new Date();
      }
      return;
    }
    if (!this.transfer.creadDayDivisionManagerUnitOld) {
      this.transfer.creadDayDivisionManagerUnitOld = new Date();
      this.transfer.statusReviewDivisionManagerUnitOld = status;
      if (status.name == 'refuse') {
        this.transfer.statusTransfer = status;
      } else {
        this.transfer.statusTransfer = {id: 2, name: 'checked'};
      }
      return;
    }

    if (!this.transfer.creadDayDivisionManagerUnitNew) {
      this.transfer.creadDayDivisionManagerUnitNew = new Date();
      this.transfer.statusReviewDivisionManagerUnitNew = status;
      if (status.name == 'refuse') {
        this.transfer.statusTransfer = status;
      } else {
        this.transfer.statusTransfer = {id: 6, name: 'success'};
        this.transfer.succeeDay = new Date();
      }
    }


  }

}
