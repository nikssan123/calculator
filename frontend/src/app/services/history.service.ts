import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private BASE_URL = "http://localhost:8000/api/history/"
  constructor(private http: HttpClient) { }

  saveEquation(userId: string, equation: string) {
    return this.http.post(this.BASE_URL + userId, {equation});
  }

  getEquations(userId: string) {
    return this.http.get(this.BASE_URL + userId);
  }
}
