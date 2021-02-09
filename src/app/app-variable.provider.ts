import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()

export class AppVariableProvider {
    public getApiBaseUrl(): string {
        return environment.DemoServer;
    }
}
