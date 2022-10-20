import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { User} from "./user.mode";


@Injectable({
  providedIn: 'root'
})

export class userService {
  private readonly userAPI = `${environment.apiUrl}public/user`;

  constructor(private http: HttpClient) { }

  getListUser():Observable<any>{
    return this.http.get<any>(this.userAPI)
  }

  public create(user: User): Observable<any> {

    return this.http.post(`${this.userAPI}`, user);
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

  public getPageTransfer(indexPage: any, idUser:any,sortBy:any,
                         descAsc:any, dto:any): Observable<any>{
    return this.http.put<any>(this.userAPI +"/sortByKey?page="+indexPage
                               +"&id="+idUser+"&sortByValue="+sortBy+
                                "&descAsc="+descAsc,dto) ;
  }

   public deactivated(id: any):Observable<any>{
    return this.http.put<any>(`${this.userAPI}/deactivated/`+id,null);
   }

  public activated(id: any):Observable<any>{
    return this.http.put<any>(`${this.userAPI}/activated/`+id,null);
  }



}
