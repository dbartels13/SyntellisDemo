import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../users/Models/User';
import { UsersService } from '../users/users.service';
import { Todo } from './models/Todo';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public loading: boolean = false;
  public user!: User | null;
  private id: number | undefined;
  constructor(
    private route: ActivatedRoute,
    public usersService: UsersService,
    private router: Router
  ) {
    var id = this.route.snapshot.paramMap.get('id');
    if (!id)
      return;
    this.id = Number(id);
    if (isNaN(this.id)) {
      this.id = undefined;
      return;
    }
  }

  public ngOnInit(): void {
    if (!this.id) {
      this.router.navigate(['users']);
      return;
    }

    if (!this.usersService.users) {
      this.usersService.GetUsers()
        .subscribe(() => this.LoadTodos(),
          () => this.router.navigate(['users']));
      return;
    }

    this.LoadTodos();
  }
  private LoadTodos(): void {
    this.user = this.usersService.GetUser(this.id!!);
    if (!this.user) {
      this.router.navigate(['users']);
      return;
    }

    if (this.user.todos)
      return;

    this.loading = true;
    var todosSubscription = this.usersService.GetUserTodos(this.user.id);
    if (!todosSubscription) {
      this.router.navigate(['users']);
      return;
    }
    todosSubscription.subscribe(
      () => this.loading = false,
      () => this.loading = false
    );
  }

  public home(): void {
    this.router.navigate(['users']);
  }

  public post(): void {
    this.router.navigate(['posts/' + this.user?.id])
  }

  public completed(): Todo[] {
    return this.user!!.todos.filter(x => x.completed);
  }
  public incomplete(): Todo[] {
    return this.user!!.todos.filter(x => !x.completed);
  }
}
