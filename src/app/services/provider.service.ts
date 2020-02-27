import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Provider, PROVIDER_URLS} from './provider.config';

@Injectable({
    providedIn: 'root'
})
export class ProviderService {
    constructor(private http: HttpClient) {
    }

    getItems(provider: Provider): Observable<any> {
        const apiUrl = PROVIDER_URLS[provider];
        return this.http.get<any>(apiUrl);
    }
}
