import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppVariableProvider } from 'src/app/app-variable.provider';
import { Post } from './models/Post';

@Injectable()
export class PostsApi {
    private path: string;
    constructor(
        private http: HttpClient,
        private variable: AppVariableProvider
    ) {
        this.path = this.variable.getApiBaseUrl() + 'posts';
    }

    public GetPostsForUser(id: number): Observable<Post[]> {
        return this.http.get<Post[]>(this.path + '?userId=' + id);
    }
}