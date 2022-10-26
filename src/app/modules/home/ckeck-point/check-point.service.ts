import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CheckPoint} from "./check-point.model";

@Injectable({
  providedIn: 'root'
})
export class CheckPointService {

  private readonly profileAPI = `${environment.apiUrl}public/list-Checkpoint/`;

  constructor(private http: HttpClient) { }

  getCheckPoints(idUser:number|string):Observable<any>{
    return this.http.get<any>(this.profileAPI+idUser);
  }

  saveCheckPoints(checkpoint:CheckPoint,id:any):Observable<any>{
    return this.http.post<any>(this.profileAPI+'new-Checkpoint/'+id,checkpoint);
  }
}
