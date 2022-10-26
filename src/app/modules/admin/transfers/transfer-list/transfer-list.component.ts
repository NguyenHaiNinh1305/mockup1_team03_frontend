import {Component, OnInit} from '@angular/core';
import {SortByValuesDTO, Transfer, TransferSearchDTO} from "../transfer/transfer.model";
import {TransferService} from "../transfer/transfer.service";
import {UserService} from "../../../../@core/services/user.service";
import {Unit, User} from "../../../home/profile/profile.model";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'ngx-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss']
})
export class TransferListComponent implements OnInit {

  transferList: Transfer[];
  user: User;
  indexPage = 0;
  Page: object = {};
  userId: any;
  formSearch: FormGroup;
  transferSearch: TransferSearchDTO = {};
  transferUser: User;
  units: Unit[];
  showHiden = false;
  nameArrow = true;
  transferUserArrow= true;
  unitOldArrow= true;
  unitNewArrow= true;
  succeeDayArrow= true;
  statusTransferArrow= true;
  reasonArrow= true;
  size = 5;

  constructor(
    private  transferService: TransferService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {

    this.transferSearch.sortByValuesDTOList =[];
    this.userId = localStorage.getItem('id-user')
    this.pagination(this.indexPage);
    this.initFormSearch();
    this.transferService.getUnits().subscribe(res => {
      this.units = res.object;
    })

  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      name: '',
      transferUserName: '',
      unitOld: '',
      unitNew: '',
      succeeDay: '',
      reason: '',
    });
  }

  infotransfer(id) {
    const url = '/admin/transfer-information/' + id;
    this.router.navigate([url])
  }

  pagination(page: any) {
    if (page < 0) {
      page = 0;
    }
    this.indexPage = page
    this.transferService.getPageTransfer(this.indexPage, this.userId
      , this.transferSearch,this.size)
      .subscribe(res => {
        this.transferList = res.object.content;
        this.Page = res.object;
      },error => {
      })
  }

  preNextPage(selector: string) {
    if (selector == 'pre') --this.indexPage;
    if (selector == 'next') ++this.indexPage;
    this.pagination(this.indexPage);
  }

  onSubmit() {
    this.updateTransferSearch();
    this.pagination(0);
    this.initFormSearch();
    this.togger();
  }

  updateTransferSearch() {
    const formSearchValue = this.formSearch.value;
    this.transferSearch.name = formSearchValue.name;
    this.transferSearch.reason = formSearchValue.reason;
    this.transferSearch.unitOld = this.findUnit(formSearchValue.unitOld);
    this.transferSearch.unitNew = this.findUnit(formSearchValue.unitNew);
    this.transferSearch.transferUser = formSearchValue.transferUserName;
    this.transferSearch.succeeDay = formSearchValue.succeeDay;

  }

  findUnit(id: any) {
    return this.units.find(unit => {
      return unit.id == id;
    })
  }

  togger() {
    this.showHiden = !this.showHiden;
  }


  sortByValue(sortValues:string, value?:string){
     const length = this.transferSearch.sortByValuesDTOList.length;
    const sortValue:SortByValuesDTO = {name:sortValues, type:"desc"}
    this[value] = !this[value];
     if(!length){
       const sortValue:SortByValuesDTO = {name:sortValues, type:"desc"}
       this.transferSearch.sortByValuesDTOList.push(sortValue)
     }else {
       let notContacts = true;
       this.transferSearch.sortByValuesDTOList.forEach(value => {
         if(value.name == sortValues){
           value.type = value.type == 'desc'?'asc':'desc';
            notContacts = false;
         }
       })
       if(notContacts){
         this.transferSearch.sortByValuesDTOList.push(sortValue)
       }
     }
     this.pagination(this.indexPage);
  }

  pageItem(pageItems){
    this.size = pageItems;
    this.indexPage = 0;
    this.pagination(this.indexPage);
}

}
