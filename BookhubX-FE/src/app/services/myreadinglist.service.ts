import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyreadinglistService {

  private apiUrl = 'https://bookhubx-api.onrender.com'; 

  constructor(private http: HttpClient) { }

  addToReadingList(data: { userId: string, bookId: string }): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/readinglist`, data,{headers});
  }

  getUserReadingList(): Observable<any[]> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/readinglist/user`,{headers});
  }


  removeBookFromReadingList(bookId: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/readinglist/remove/${bookId}`,{headers});
  }

}







