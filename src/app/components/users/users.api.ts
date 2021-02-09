import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './Models/User';
import { AppVariableProvider } from 'src/app/app-variable.provider';

@Injectable()
export class UsersApi {
    private path: string;
    constructor(
        private http: HttpClient,
        private variable: AppVariableProvider
    ) {
        this.path = this.variable.getApiBaseUrl() + 'users';
    }

    public GetUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.path);
    }
}