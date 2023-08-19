import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { NewProductComponent } from "./new-product/new-product.component";
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

const routes = []

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: "login", component: LoginComponent },
      {
        path: "admin", component: AdminComponent,
        children: [
          { path: "products", component: ProductsComponent },
          { path: "newProduct", component: NewProductComponent },
          { path: "editProduct/:id", component: EditProductComponent }
        ]
      },
      { path: "home", component: HomeComponent },
      { path: "" , redirectTo: "Login", pathMatch: 'full'}


    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
