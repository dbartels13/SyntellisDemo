import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../components/message/message.component';
import { Message } from '../models/message';
import { ResponseService } from './response.service';

@Injectable()

export class MessageService {
    constructor(
        private snackBar: MatSnackBar,
        private responseService: ResponseService
    ) { }

    Success(title: string, message: string): void {
        let item = new Message();
        item.title = title;
        item.message = message;
        item.css = 'message-success';
        this.DisplayMessage(item, 5000);
    }
    Warning(title: string, message: string): void {
        let item = new Message();
        item.title = title;
        item.message = message;
        item.css = 'message-warning';
        this.DisplayMessage(item, 10000);
    }
    Failure(title: string, message: string): void {
        let item = new Message();
        item.title = title;
        item.message = message;
        item.css = 'message-failure';
        this.DisplayMessage(item, 15000);
    }
    Information(title: string, message: string): void {
        let item = new Message();
        item.title = title;
        item.message = message;
        item.css = 'message-information';
        this.DisplayMessage(item, 10000);
    }

    Generic(message: Message, duration: number): void {
        this.DisplayMessage(message, duration);
    }

    GenericErrorHandler(title: string, error: HttpErrorResponse): string {
        var errorText = this.responseService.getError(error);
        this.Failure(title, errorText);
        return errorText;
    }

    private DisplayMessage(message: Message, duration: number): void {
        this.snackBar.openFromComponent(MessageComponent, {
            data: message,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: duration,
            panelClass: 'snack-bar-container'
        });
    }
}
