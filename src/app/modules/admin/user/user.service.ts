import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { User} from "./user.mode";
import {USortDTOs} from "./UserSortDTO";


@Injectable({
  providedIn: 'root'
})

export class userService {
  private readonly userAPI = `${environment.apiUrl}public/user`;

  constructor(private http: HttpClient) { }

  getListUser():Observable<any>{
    return this.http.get<any>(this.userAPI)
  }

  public create(idUser:any,user: User): Observable<any> {

    return this.http.post(`${this.userAPI}?idUser=` +idUser, user);
  }

  public getAllUnit():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/getAllUnit`);
  }

  getUserById(id: any):Observable<any>{
    return this.http.get<any>(`${this.userAPI}/`+id);
  }

  public updateUser(id: any,user:User):Observable<any>{
    return this.http.put<any>(`${this.userAPI}/`+id,user);
  }

  public getPageUser(indexPage: any, idUser:any,
                     size:any,dto:USortDTOs): Observable<any>{
    return this.http.put<any>(this.userAPI +"/sortByKey?page="+indexPage
      +"&id="+idUser+"&size="+size,dto) ;
  }

  public deactivated(id: any):Observable<any>{
    return this.http.put<any>(`${this.userAPI}/deactivated/`+id,null);
  }

  public activated(id: any):Observable<any>{
    return this.http.put<any>(`${this.userAPI}/activated/`+id,null);
  }

  public findIsActivce(indexPage:any, size:any,dto:USortDTOs):Observable<any>{
    return this.http.put<any>(this.userAPI+"/isActive?page=" +indexPage+"&size="+size,dto);
  }




}
