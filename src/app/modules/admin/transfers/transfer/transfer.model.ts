import {Unit, User} from "../../../home/profile/profile.model";

export interface Transfer{
  id?:number
  name?:string;
  createUser?:User;
  transferUser?:User;
  reason?:string
  unitOld?:Unit;
  unitNew?:Unit;
  succeeDay?:Date;
  statusTransfer?:Status;
  adminReview?:User;
  adminReviewDay?:Date;
  cancleDay?:Date;
  creadDay?:Date;
  divisionManagerUnitOld?:User;
  divisionManagerUnitNew?:User;
  creadDayDivisionManagerUnitOld?:Date;
  creadDayDivisionManagerUnitNew?:Date;
  statusReviewDivisionManagerUnitOld?:Status;
  statusReviewDivisionManagerUnitNew?:Status;


}
export interface Status{
  id?:number;
  name?:string;
}

export interface TransferSearchDTO{
  name?:string;
  transferUser?:string;
  reason?:string
  unitOld?:Unit;
  unitNew?:Unit;
  succeeDay?:Date;
  sortByValuesDTOList?:SortByValuesDTO[];
}

export interface SortByValuesDTO{
  name?:string;
  type?:string;
}
