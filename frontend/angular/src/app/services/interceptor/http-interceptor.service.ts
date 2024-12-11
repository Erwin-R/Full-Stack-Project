import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationResponse} from "../../models/authentication-response";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})

//This class is how we will intercept outgoing requests so we can get jwt token for auth
export class HttpInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const storedUser = localStorage.getItem('user')
    if (storedUser){
      const authResponse: AuthenticationResponse = JSON.parse(storedUser)
      const token = authResponse.token
      if (token){
        //create a copy of the http request
        const authRequest = req.clone({
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        });
        return next.handle(authRequest)
      }
    }
    //if no token then unmodified request is sent
    return next.handle(req);
  }
}
