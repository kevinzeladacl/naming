import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NamingApiService {
  private baseUrl = 'http://localhost:8000'; // Cambia si tu backend corre en otro puerto/url

  constructor(private http: HttpClient) {}

  getNamingSuggestions(idea: string, creatividad: number = 0.5): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/naming`, { ideas: idea, creatividad });
  }
}
