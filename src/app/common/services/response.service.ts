import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()

export class ResponseService {
    constructor() { }

    getError(response: HttpErrorResponse): string {
        if (typeof (response.error) == 'string')
            return response.error;
        if (typeof (response.message) == 'string')
            return response.message;
        return response.status + ' ' + response.statusText;
    }
}
