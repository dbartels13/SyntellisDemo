import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { Message } from '../../models/message';

@Component({
    selector: 'message.component',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})

export class MessageComponent {
    public item: Message;

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Message, public snackBar: MatSnackBar) {
        this.item = data;
        if (!this.item.css)
            this.item.css = 'notification-success';
    }

    close(): void {
        this.snackBar.dismiss();
    }
}
