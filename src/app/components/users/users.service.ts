import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Post } from "../posts/models/Post";
import { PostsApi } from "../posts/posts.api";
import { Todo } from "../todos/models/Todo";
import { TodosApi } from "../todos/todos.api";
import { User } from "./Models/User";
import { UsersApi } from "./users.api";

@Injectable()
export class UsersService {
    public users: User[] | undefined;
    constructor(
        private usersApi: UsersApi,
        private postsApi: PostsApi,
        private todosApi: TodosApi
    ) { }

    public GetUsers(): Observable<User[]> {
        if (this.users)
            return of(this.users);

        var result = this.usersApi.GetUsers();
        result.subscribe(data => this.SaveUsers(data));
        return result;
    }
    private SaveUsers(users: User[]): void {
        this.users = users.sort((a, b) => a.name.localeCompare(b.name));
    }

    public GetUserPosts(id: number): Observable<Post[]> | null {
        var user = this.GetUser(id);
        if (!user)
            return null;
        
        if (user.posts)
            return of (user.posts)

        var result = this.postsApi.GetPostsForUser(id);
        result.subscribe(data => this.SavePosts(user!!, data));
        return result;
    }
    private SavePosts(user: User, posts: Post[]): void {
        user.posts = posts.sort((a, b) => a.id - b.id);
    }

    public GetUserTodos(id: number): Observable<Todo[]> | null {
        var user = this.GetUser(id);
        if (!user)
            return null;
        
        if (user.todos)
            return of (user.todos)

        var result = this.todosApi.GetTodosForUser(id);
        result.subscribe(data => this.SaveTodos(user!!, data));
        return result;
    }
    private SaveTodos(user: User, todos: Todo[]): void {
        user.todos = todos.sort((a, b) => a.id - b.id);
    }

    public GetUser(id: number): User | null {
        if (!this.users)
            return null;

        var foundUsers = this.users.filter(user => user.id == id);
        if (foundUsers.length == 1)
            return foundUsers[0];
        return null;
    }
}