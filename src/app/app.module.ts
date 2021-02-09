//
// Angular Modules
//
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';

//
// Misc
//
import { AppVariableProvider } from './app-variable.provider';

//
// Http
//
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';

//
// Layout
//
import { AppComponent } from './layout/app-root/app.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { MessageComponent } from './common/components/message/message.component';

//
// Common Services
//
import { MessageService } from './common/services/message.service';
import { ResponseService } from './common/services/response.service';

//
// Application
//
import { UsersComponent } from './components/users/users.component';
import { UsersService } from './components/users/users.service';
import { UsersApi } from './components/users/users.api';

import { PostsComponent } from './components/posts/posts.component';
import { PostsApi } from './components/posts/posts.api';

import { TodosComponent } from './components/todos/todos.component';
import { TodosApi } from './components/todos/todos.api';

@NgModule({
  declarations: [
    // Layout
    AppComponent,
    TopNavComponent,
    MessageComponent,

    // Application
    UsersComponent,
    PostsComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [
    // Misc
    AppVariableProvider,

    // Common Services
    MessageService,
    ResponseService,

    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },

    // Application
    UsersService,
    UsersApi,
    PostsApi,
    TodosApi
  ],
  entryComponents: [
    // Misc
    MessageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
