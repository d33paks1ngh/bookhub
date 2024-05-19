import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://bookhubx-api.onrender.com'

  constructor(private http: HttpClient) { }

  addToCart(data: any, token: string): Observable<any> {
   
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Include headers in the request
    return this.http.post(`${this.apiUrl}/cart/add`, data, { headers });
  }



  getUserCart(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/cart/user`, { headers });
  }


  updateCartItemQuantity(cartItemId: string, newQuantity: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const data = { quantity: newQuantity };
  
    return this.http.patch(`${this.apiUrl}/cart/update/${cartItemId}`, data, { headers });
  }


  deleteCartItem(cartItemId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/cart/remove/${cartItemId}`, { headers });
  }
  
  placeOrder(orderData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/order`, orderData, { headers });
  }

}
