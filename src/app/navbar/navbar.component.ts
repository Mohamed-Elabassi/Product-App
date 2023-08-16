import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  actions : Array<any> = [
    { title : "Home " , "route" : "/home" , icon : "house"},
    { title : "Product " , "route" : "/products" , icon : "safe"},
    { title : "new Product " , "route" : "/newProduct" , icon : "search"},

  ]
     currentAaction: any;

     constructor(public appState : AppStateService){}
     
  setCurrentAction(action : any) {
     this.currentAaction = action;
  }

}
