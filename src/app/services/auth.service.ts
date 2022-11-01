import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestTokenResponse } from '../interfaces/request-token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  createRequestToken():Observable<RequestTokenResponse>{
    return this.http.get<RequestTokenResponse>(`${environment.base_url}/authentication/token/new?api_key=${environment.api_key}`);
  }
}
