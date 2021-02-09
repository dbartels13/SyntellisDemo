import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppVariableProvider } from 'src/app/app-variable.provider';
import { Todo } from './models/Todo';

@Injectable()
export class TodosApi {
    private path: string;
    constructor(
        private http: HttpClient,
        private variable: AppVariableProvider
    ) {
        this.path = this.variable.getApiBaseUrl() + 'todos';
    }

    public GetTodosForUser(id: number): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.path + '?userId=' + id);
    }
}