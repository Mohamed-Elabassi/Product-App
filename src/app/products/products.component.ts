import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProductService } from "../services/product.service";
import { Product } from "../models/Product.model";
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  constructor(private productService: ProductService,
    private router: Router,
    public appState: AppStateService) {
  }

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts() {
    this.appState.setProductState({
      status : "LOADING"
    })
    this.productService.searchProducts(this.appState.productsState.keyword,
      this.appState.productsState.currentPage,
      this.appState.productsState.pageSize)
      .subscribe({
        next: (resp) => {
          let products = resp.body as Product[];

          let totalProducts: number = parseInt(resp.headers.get("x-total-count")!);
          //this.appState.productsState.totalProducts = totalProducts;
          let totalPages = Math.floor(totalProducts / this.appState.productsState.pageSize);
          if (totalProducts % this.appState.productsState.pageSize != 0) {
            ++totalPages;
          }

          this.appState.setProductState({
            products: products,
            totalProducts: totalProducts,
            totalPages: totalPages,
            status : "LOADED"
          })
        },
        error: err => {
          this.appState.setProductState({
            status : "ERROR",
            errorMessage : err
          })
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
            //this.appState.productsState.products = this.appState.productsState.products.filter((p : any) => p.id != product.id)
            this.searchProducts()
        })
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`);
  }

  handleGoToPage(page: number) {
    this.appState.productsState.currentPage = page;
    this.searchProducts();
  }
}
