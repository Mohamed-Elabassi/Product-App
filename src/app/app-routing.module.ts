import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { NewProductComponent } from "./new-product/new-product.component";
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { authenticationGuard } from './guards/authentication.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { authorizationGuard } from './guards/authorization.guard';

const routes = []

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: "login", component: LoginComponent },
      {
        path: "admin", component: AdminComponent, canActivate: [authenticationGuard],
        children: [
          { path: "products", component: ProductsComponent },
          {
            path: "newProduct", component: NewProductComponent, canActivate: [authorizationGuard],
            data: { requiredRoles: 'ADMIN' }
          },
          {
            path: "editProduct/:id", component: EditProductComponent,
            data: { requiredRoles: 'ADMIN' }
          },
          { path: "home", component: HomeComponent },
          { path: "notAuthorized", component: NotAuthorizedComponent }

        ]
      },

      { path: "", redirectTo: "Login", pathMatch: 'full' }


    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
