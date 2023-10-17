import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request is on is way');
    const modReq = req.clone({headers: req.headers.append('AuthX', 'XXX')});

    return next.handle(modReq).pipe(
      tap(event => {
        console.log(event);
        if(event.type === HttpEventType.Response){
          console.log('Response arrived, body data: ', event.body);
        }
      })
    );
  }

}
