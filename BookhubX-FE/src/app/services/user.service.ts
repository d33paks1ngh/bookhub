import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://bookhubx-api.onrender.com';

  constructor(private http: HttpClient) {}

  registerUser(userDetails: any): Observable<any> {
    const url = `${this.baseUrl}/user/register`;
    // return this.http.post(url, userDetails);
    return this.http.post(url, userDetails, { observe: 'response' });
  }

  loginUser(userDetails: any): Observable<any> {
    const url = `${this.baseUrl}/user/login`;
    return this.http.post(url, userDetails, { observe: 'response' });
  }
 
  getSingleUserDetails(userId:string):Observable<any>{
    const url = `${this.baseUrl}/user/userdetails/${userId}`;
    return this.http.get(url);
  }


}
