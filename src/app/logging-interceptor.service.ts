import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class LoggingInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // console.log('Loging interceptor, req.headers: ', req.headers);
        return next.handle(req);
    }
}