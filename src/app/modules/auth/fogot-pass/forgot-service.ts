import {environment} from "../../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../@core/models/user";

@Injectable({
  providedIn: 'root',

})

export class ForgotService {
  private readonly forgotAPI = `${environment.apiUrl}rest/forgotPassword/`;

  constructor(private http: HttpClient) { }

  sendOTP(email: any): Observable<any>{
    return this.http.get<any>(this.forgotAPI + email);
  }
}

