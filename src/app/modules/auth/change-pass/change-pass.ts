import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../@core/models/user";

@Injectable({
  providedIn: 'root',

})
export class changePassService {
  private readonly API = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  putConfirm(userId: any,pass: any): Observable<any>{
    return this.http.put<any>(this.API +'changePassword/'+userId,pass);
  }

  check(idUser,otp:any): Observable<any>{
    return this.http.get<any>(this.API+"otp?users_id="+idUser+"&code="+otp);
  }
}
