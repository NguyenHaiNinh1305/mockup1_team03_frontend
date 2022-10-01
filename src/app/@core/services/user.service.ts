import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})

export class UserService{


  // private apiServerUrl = environment.apiUrl;

  // constructor(private http: HttpClient) {
  // }

  getDecodedAccessToken(): any {
    const token = sessionStorage.getItem('auth-token');
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  public getUserByUserName(userName: string): Observable<User> {
    return this.http.get<any>(`${this.apiServerUrl}`+'public/user/username='+userName).pipe(
      tap(user => console.log(localStorage.setItem('user',JSON.stringify(user)))),
    );
  }


  public getJe(): Observable<any[]> {
    return this.http.get<any>(`${this.apiServerUrl}`+'public/user/role=2').pipe(
      tap(jobPositions => console.log(`academicLevels=${JSON.stringify(jobPositions)}`)),
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private apiServerUrl = environment.apiUrl;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private http: HttpClient){
  }

  public getUser(): Observable<User[]>{
    return this.http.get<any>(`${this.apiServerUrl}public/user`);
    // .pipe(
    //   tap(user => console.log(`receiveduser=${JSON.stringify(user)}`)),
    // );
  }

  public getTotalRecords(){
    let totals: number;
    this.getUser().subscribe((data: any[]) => {
      totals = data.length;
    });
    return totals;
  }

  public search(s: any): Observable<User[]>{
    return this.http.post<any>(`${this.apiServerUrl}public/user/search`,s);
  }
  public getUserById(id: number): Observable<User>{
    const url = `${this.apiServerUrl}` + 'public/user/' + `${id}`;
    return this.http.get<User>(url);
  }

  public active(item: string): Observable<any>{
    const url = `${this.apiServerUrl}` + 'public/user/active';
    return this.http.put<any>(url,item);
  }

  public addUser(user: any): Observable<any>{
    const url = `${this.apiServerUrl}` + 'public/user/add';
    return this.http.post(url,user);
  }

  public register(user: any): Observable<any>{
    console.log(user);
    const url = `${this.apiServerUrl}` + 'public/register';
    return this.http.post(url,user);
  }

  public activeAccount(userName): Observable<any>{
    const url = `${this.apiServerUrl}` + 'public/register/'+ `${userName}`;
    return this.http.get<any>(url);
  }

}
