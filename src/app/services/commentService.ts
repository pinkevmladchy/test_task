import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Coment } from '../models/Comment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  constructor(private http: HttpClient, public router: Router) { }

  getCommentsByIdProduct(id: number): Observable<Coment[]> {
    return this.http.get<Coment[]>(`http://localhost:3000/Comment?productId=${id}`);
  }

  addComment(comment: any){
    return this.http.post<any>(`http://localhost:3000/Comment`, comment, httpOptions);
  }
}