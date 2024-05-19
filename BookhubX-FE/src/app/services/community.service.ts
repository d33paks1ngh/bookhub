import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  private apiUrl = 'https://bookhubx-api.onrender.com'; // Adjust the API URL

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/allusers`);
  }

 getUserBooks(userId:string): Observable<any> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/books/userbook/${userId}`,{headers});
  }

  getUserProfileBooks(): Observable<any> {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>(`${this.apiUrl}/books/userbook`,{headers});
    }

  addBook(bookData: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/books/add`, bookData,{headers});
  }


  updateBook(bookId: string, bookData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.apiUrl}/books/update/${bookId}`, bookData, { headers });
  }

  //singlebook
  getBook(bookId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/books/book/${bookId}`,{headers});
  }



  
  deleteBook(bookId: string, userrole: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = { userrole }; // Include userrole in the request params

    return this.http.delete<any>(`${this.apiUrl}/books/delete/${bookId}`, { headers, params });
  }

  //readinglist
  getreadonglistOfuser(userId:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/readinglist/all/${userId}`);
  }
  
}
