import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MessageService } from '../common/services/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private message: MessageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Continue the chain
        return next.handle(request).pipe(
            //retry(0), // Do the regular call
            catchError((error: HttpErrorResponse) => {
                this.message.GenericErrorHandler("API Error", error);
                // If this should have been successful, null out body and return success
                if (error.status >= 200 && error.status < 300) {
                    const response = new HttpResponse({
                        body: null,
                        headers: error.headers,
                        status: error.status,
                        statusText: error.statusText,
                        url: error.url ?? undefined
                    });
                    return of(response);
                }

                // Other: rethrow
                return throwError(error);
            }));
    }
}