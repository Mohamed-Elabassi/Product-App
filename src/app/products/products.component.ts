import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../models/Product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = []
  public keyword: string = "";
  totalPages: number = 0;
  pageSize: number = 2;
  currentPage: number = 1;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.currentPage, this.pageSize)
      .subscribe({
        next: (resp) => {
          this.products = resp.body as Product [];
          let totalProducts: number = parseInt(resp.headers.get("x-total-count")!);
          this.totalPages = Math.floor(totalProducts / this.pageSize);
          if (totalProducts % this.pageSize != 0) {
            this.totalPages = this.totalPages + 1;
          }
        },
        error: err => {
          console.log(err);
        }
      })
  }

  HandleCheck(prod: Product) {
    this.productService.checkedProduct(prod)
      .subscribe({
        next: updatedProduct => {
          prod.checked = !prod.checked;
        }
      })
  }


  handleDeleteProduct(product: Product) {
    if (confirm("Etes vous sur de supprimer "))
      this.productService.deleteProduct(product)
        .subscribe({
          next: value =>
            this.products = this.products.filter(p => p.id != product.id)
        })
  }

  searchProducts() {
    this.productService.searchProducts(this.keyword)
      .subscribe({
        next: value => {
          if (value != null) {
            this.products = value;
          }
        }
      })
  }

  handleGoToPage(page: number) {
    this.currentPage = page;
    this.getProducts();
  }
}
