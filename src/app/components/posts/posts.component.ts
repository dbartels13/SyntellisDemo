import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../users/Models/User';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
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
        .subscribe(() => this.LoadPosts(),
          () => this.router.navigate(['users']));
      return;
    }

    this.LoadPosts();
  }
  private LoadPosts(): void {
    this.user = this.usersService.GetUser(this.id!!);
    if (!this.user) {
      this.router.navigate(['users']);
      return;
    }

    if (this.user.posts)
      return;

    this.loading = true;
    var postsSubscription = this.usersService.GetUserPosts(this.user.id);
    if (!postsSubscription) {
      this.router.navigate(['users']);
      return;
    }
    postsSubscription.subscribe(
      () => this.loading = false,
      () => this.loading = false
    );
  }

  public home(): void {
    this.router.navigate(['users']);
  }

  public todo(): void {
    this.router.navigate(['todos/' + this.user?.id])
  }
}
