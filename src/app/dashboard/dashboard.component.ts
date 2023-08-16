import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor( public appState:AppStateService  ) {}

  ngOnInit(): void {
    
  }

  checkedProducts(){
    let checkedProd = 
    this.appState.productsState.products.filter( (p : any) => p.checked==true);
    return checkedProd.length;
  }

}
