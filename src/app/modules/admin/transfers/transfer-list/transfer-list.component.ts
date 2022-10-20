import {Component, OnInit} from '@angular/core';
import {Transfer, TransferSearchDTO} from "../transfer/transfer.model";
import {TransferService} from "../transfer/transfer.service";
import {UserService} from "../../../../@core/services/user.service";
import {Unit, User} from "../../../home/profile/profile.model";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  formSort: FormGroup;
  sortBy: string ;
  descAsc: string = 'desc'

  constructor(
    private  transferService: TransferService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id-user')
    this.pagination(this.indexPage);
    this.initFormSearch();
    this.initFormSort()
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

  initFormSort() {
    this.formSort = this.fb.group({
      typeSort: '',
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
      , this.transferSearch, this.sortBy, this.descAsc)
      .subscribe(res => {
        this.transferList = res.object.content;
        this.Page = res.object;
        console.log(this.Page)
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

  sort() {
    this.sortBy = this.formSort.value.typeSort;
    this.descAsc == 'asc' ? this.descAsc = 'desc' : this.descAsc = 'asc';
    this.pagination(this.indexPage);
  }
}
