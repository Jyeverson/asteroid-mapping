import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})

export class AsteroidService {
  private apiUrl = "https://api.nasa.gov/neo/rest/v1/feed";

  constructor(private http: HttpClient) { }

  getNearEarthObjects(initial_date: String, final_date: String): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?start_date=${initial_date}&end_date=${final_date}&api_key=${environment.API_KEY}`);
  }

}
