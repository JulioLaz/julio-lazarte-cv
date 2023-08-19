import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatajsonService {
  private dataUrl = './assets/cv.json'; // Ruta al archivo data.json

  constructor(
    private http: HttpClient,
  ) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }
  }
