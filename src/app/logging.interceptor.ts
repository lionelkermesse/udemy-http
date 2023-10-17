import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";

export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Outgoing request', req);
    console.log(req.url);
    const modReq = req.clone({headers: req.headers.append('Auth', 'wxy')});

    return next.handle(modReq).pipe(
      tap(event => {
        if(event.type === HttpEventType.Response){
          console.log('Incoming Response', event.body)
        }
      })
    )
  }

}
