import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})

export class AsteroidService {
  private apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?&api_key=${environment.API_KEY}`;

  constructor(private http: HttpClient) { }

 getNearEarthObjects(): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(this.apiUrl);
}

}
