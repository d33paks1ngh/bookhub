import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  private apiUrl = 'https://bookhubx-api.onrender.com'; 

  constructor(private http: HttpClient) { }

  createDiscussion(discussionData: any): Observable<any> {
   
    const token = localStorage.getItem('token');

   
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    
    return this.http.post(`${this.apiUrl}/discussion/create`, discussionData, { headers });
  }



  getAllDiscussions(): Observable<any[]> {
    
    return this.http.get<any[]>(`${this.apiUrl}/discussion/alldiscussions`);
  }


  getDiscussionDetails(discussionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/discussion/${discussionId}`);
  }

  postComment(commentText:any,discussionid:string):Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

     return this.http.post(`${this.apiUrl}/discussion/comment/${discussionid}`, commentText, { headers });
  }

  getComment(discussionid:string):Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

     return this.http.get(`${this.apiUrl}/discussion/comment/${discussionid}`,  { headers });
  }


  getMydiscussions():Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

     return this.http.get(`${this.apiUrl}/discussion/mydiscussion`,  { headers });
  }
 

//get discussion of user for community
  getUserdiscussionsCommunity(userId:string):Observable<any>{
   return this.http.get(`${this.apiUrl}/discussion/userdiscussion/${userId}`);
  }


  updateDiscussion(discussionId: string, updatedData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch(`${this.apiUrl}/discussion/update/${discussionId}`, updatedData, { headers });
  }

  deleteDiscussion(discussionId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.delete(`${this.apiUrl}/discussion/delete/${discussionId}`, { headers });
  }

}
