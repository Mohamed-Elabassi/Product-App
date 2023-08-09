import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  actions : Array<any> = [
    { title : "Home " , "route" : "/home" , icon : "house"},
    { title : "Product " , "route" : "/products" , icon : "safe"},
    { title : "new Product " , "route" : "/newProduct" , icon : "search"},

  ]
     currentAaction: any;

  setCurrentAction(action : any) {
     this.currentAaction = action;
  }
}
