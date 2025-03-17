import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private apiUrl = 'http://localhost:3000/groceries';  // API endpoint


  constructor(private http: HttpClient) { }

  getGroceries(): Observable<any> {
   
        return this.http.get<any>(this.apiUrl);
        
  }
}
