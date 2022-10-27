import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actor, ActorsResponse } from '../interfaces/actors.interface';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http:HttpClient) { }

  public getActors(page: number): Observable<ActorsResponse>{
    return this.http.get<ActorsResponse>(`${environment.base_url}/person/popular?api_key=${environment.api_key}&page=${page}`);
  }
  
}
