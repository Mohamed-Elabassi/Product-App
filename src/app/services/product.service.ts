import { Injectable } from '@angular/core';
import {Observable, ObservedValueOf} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/Product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  private  host: string = "http://localhost:8083"
  constructor(private http:HttpClient) { }


  searchProducts(keyword: string="" , page : number=1 , size : number=4) {
    return this.http.get(`${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}` , {observe : 'response'});
  }

  checkedProduct(prod : Product) : Observable<Product> {
   return  this.http.patch<Product>(`${this.host}/products/${prod.id}`, {checked: !prod.checked});
  }

  deleteProduct(prod : Product) : Observable<Product> {
    return  this.http.delete<any>(`${this.host}/products/${prod.id}`);
  }

  saveProduct(product : Product): Observable<Product> {
    return this.http.post<Product>(`${this.host}/products/` , product );
  }

  getProductById(idProduct : number) : Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${idProduct}`);
  }

  updateProduct(product: any) : Observable<Product> {
    return  this.http.put<Product>(`${this.host}/products/${product.id}`, product);
  }
}
