import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/Product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  getProducts(page : number=1 , size : number=4) {
    return this.http.get(`http://localhost:8083/products?_page=${page}&_limit=${size}` , {observe : 'response'});
  }

  checkedProduct(prod : Product) : Observable<Product> {
   return  this.http.patch<Product>(`http://localhost:8083/products/${prod.id}`, {checked: !prod.checked});
  }

  deleteProduct(prod : Product) : Observable<Product> {
    return  this.http.delete<any>(`http://localhost:8083/products/${prod.id}`);
  }

  saveProduct(product : Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8083/products/` , product );
  }

  searchProducts(keyword : string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:8083/products?name_like=${keyword}` );
  }
}
