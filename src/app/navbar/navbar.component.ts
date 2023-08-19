import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  actions : Array<any> = [
    { title : "Home " , "route" : "/home" , icon : "house-gear"},
    { title : "Product " , "route" : "/admin/products" , icon : "cart-fill"},
    { title : "new Product " , "route" : "/admin/newProduct" , icon : "bag-plus"},

  ]
     currentAaction: any;

     constructor(public appState : AppStateService){}
     
  setCurrentAction(action : any) {
     this.currentAaction = action;
  }

}
