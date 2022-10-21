import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpHeaders, HttpResponse, HttpErrorResponse
} from "@angular/common/http";
import {TokenService} from "../@core/services/token.service";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string;
  constructor( private router: Router,
               private  tokeSevice: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if ( this.tokeSevice.getToken() != null) {
      const tokenInfo = this.tokeSevice.getToken();
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization','Bearer ' + tokenInfo) });
      return next.handle(tokenizedReq).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error['status'] === 403) {
            this.tokeSevice.removeToken();
            this.router.navigate(['/auth/']);
          }
          return throwError(error);
        }),
      );
    }
    return next.handle(req);
  }

}
