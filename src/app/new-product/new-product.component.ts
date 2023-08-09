import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  public productForm!: FormGroup;

  constructor(private formBuiler: FormBuilder, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuiler.group({
      name: this.formBuiler.control("" , Validators.required),
      price: this.formBuiler.control(0 ),
      checked: this.formBuiler.control(false , Validators.required)
    })
  }

  saveProduct() {
    let product = this.productForm.value;
    this.productService.saveProduct(product)
      .subscribe({
       next : data =>{
         alert(JSON.stringify(data))
       },
        error : err => {
         console.log(err);
        }
  });
  }
}
