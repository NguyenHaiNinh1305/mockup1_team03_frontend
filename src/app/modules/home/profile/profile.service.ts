import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {User} from "./profile.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  private readonly profileAPI = `${environment.apiUrl}public/user-profile/`;

  constructor(private http: HttpClient) { }

  getProfile(username: any):Observable<any>{
    return this.http.get<any>(this.profileAPI  + username)
  }
  putProfile(user: User):Observable<any>{
    return this.http.put<any>(this.profileAPI,user);
  }

  putChangePass(user: User):Observable<any>{
    return this.http.put<any>(this.profileAPI +'new-pass',user);
  }

  putAvata(file,id:number):Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(this.profileAPI + "new-avata/" +id, formData)
  }

}
