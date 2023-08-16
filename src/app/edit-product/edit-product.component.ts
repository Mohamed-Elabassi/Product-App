import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
productFormGroup! : FormGroup;
productId!  : number;
  constructor ( private activatedRoute :ActivatedRoute , 
    private productService:ProductService, 
    private formBuilder: FormBuilder)  {}

  ngOnInit(): void {
       this.productId = this.activatedRoute.snapshot.params['id'];
       this.productService.getProductById(this.productId).subscribe({
            next : (product) => {
                this.productFormGroup =  this.formBuilder.group ({
                  id : this.formBuilder.control(product.id ) , 
                  name : this.formBuilder.control(product.name ) , 
                  price : this.formBuilder.control(product.price ) , 
                  checked : this.formBuilder.control(product.checked) , 

                 })
            },
            error : error =>{
              console.log(error);
            }
       });

    
  }

  updateProduct(){
    let product = this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe ( {
next : data =>{
  alert(JSON.stringify(data));
} , 
error : error=> {
  console.log(error);
}
    }
    ); 

  }  

}
