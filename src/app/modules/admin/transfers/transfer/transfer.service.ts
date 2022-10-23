import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../home/profile/profile.model";
import {Observable} from "rxjs";
import {Transfer} from "./transfer.model";

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private readonly transferAPI = `${environment.apiUrl}public/transfer`;

  private readonly unitsAPI = `${environment.apiUrl}public/units`;

  constructor(private http: HttpClient) { }

  saveTransfer(transfer: Transfer):Observable<any>{
    return this.http.post<any>(this.transferAPI,transfer);
  }

  getUnits():Observable<any>{
    return this.http.get<any>(this.unitsAPI);
  }

  getAllTransfers():Observable<any>{
    return this.http.get<any>(this.transferAPI);
  }

  getTransfersById(id:any):Observable<any>{
    return this.http.get<any>(this.transferAPI + '/' +id);
  }

  reviewTransfer(transfer:Transfer,idUser):Observable<any>{
    return this.http.put<any>(this.transferAPI + '/review-transfer/' + idUser,transfer);
  }

  cancelTransfer(user:User, transferId:any):Observable<any>{
    return this.http.put<any>(this.transferAPI + '/cancel-Transfer/' + transferId,user);
  }
  updateTransfer(userId:any, transfer:Transfer):Observable<any>{
    return this.http.put<any>(this.transferAPI + '/update/' + userId,transfer);
  }

  getPageTransfer(page:any,userID,transferSearch,size):Observable<any>{
    return this.http
               .put<any>
               (  `${this.transferAPI}/page/?page=${page}&userID=${userID}&size=${size}`
                         ,transferSearch);
  }

}
