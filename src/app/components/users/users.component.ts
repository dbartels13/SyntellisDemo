import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public loading: boolean = false;
  constructor(
    public usersService: UsersService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.loading = true;
    this.usersService.GetUsers().subscribe(
      () => this.loading = false,
      () => this.loading = false
      );
  }

  public ShowPosts(id: number): void {
    var user = this.usersService.GetUser(id);
    if (user)
      this.router.navigate(['posts/' + id]);
  }
  public ShowTodos(id: number): void {
    var user = this.usersService.GetUser(id);
    if (user)
      this.router.navigate(['todos/' + id]);
  }
  public ShowUserDetails(id: number): void {
    var user = this.usersService.GetUser(id);
    if (user)
      user.showDetails = !user.showDetails;
  }
}
