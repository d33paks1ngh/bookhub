import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'https://bookhubx-api.onrender.com'

  constructor(private http: HttpClient) { }

  getUserOrders(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Assuming you have a token in local storage

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get<any[]>(`${this.apiUrl}/order/user`, { headers });
    } else {
      // Handle the case where there is no token (user not authenticated)
      return new Observable<any[]>(observer => {
        observer.error('User not authenticated');
      });
    }
  }


  getOrderDetails(orderId: string): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming you have a token in local storage

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get<any>(`${this.apiUrl}/order/${orderId}`, { headers });
    } else {
      // Handle the case where there is no token (user not authenticated)
      return new Observable<any>(observer => {
        observer.error('User not authenticated');
      });
    }
  }



  getBookDetails(bookId: string): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get<any>(`${this.apiUrl}/books/book/${bookId}`, { headers });
    } else {
      return new Observable<any>(observer => {
        observer.error('User not authenticated');
      });
    }
  }

//all order for admin
  getAlLUserOrdersAdmin(): Observable<any[]> {
   return this.http.get<any[]>(`${this.apiUrl}/order/all`);
  }



}
