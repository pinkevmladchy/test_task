import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private http: HttpClient, public router: Router) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/Product`);
  }

  getProductById(id: number): Observable<Product>{
    return this.http.get<Product>(`http://localhost:3000/Product/${id}`);
  }

  addProduct(product: Product){
    return this.http.post<any>(`http://localhost:3000/Product`, product, httpOptions);
  }

  deleteProduct(id: number){
    return this.http.delete<any>(`http://localhost:3000/Product/${id}`, httpOptions);
  }

  editProduct(product: Product){
    return this.http.put<any>(`http://localhost:3000/Product`, product, httpOptions);
  }
}