import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../components/models/book.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'https://bookhubx-api.onrender.com'

  constructor(private http:HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    const url = `${this.baseUrl}/books`;
    return this.http.get<Book[]>(url);
  }

  searchBooksByTitle(title: string): Observable<Book[]> {
    const url = `${this.baseUrl}/books?title=${title}`;
    return this.http.get<Book[]>(url);
  }


  filterBooksByGenre(title: string, genre: string): Observable<Book[]> {
    let url = `${this.baseUrl}/books?`;
    if (title) {
      url += `title=${title}&`;
    }
    if (genre) {
      url += `genre=${genre}`;
    }
    return this.http.get<Book[]>(url);
  }


  getBookDetails(bookId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/books/book/${bookId}`);
  }




}
  

