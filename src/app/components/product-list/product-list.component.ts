import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Coment } from 'src/app/models/Comment';
import { Product } from 'src/app/models/Product';
import { Size } from 'src/app/models/Size';
import { ProductService } from 'src/app/services/productService';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  constructor(public fb: FormBuilder, public productService: ProductService, public toastr: ToastrService) { }

  public listComments: Coment[] = [];

  public selectedProduct: Product = {
    count: <number>{},
    id: <number>{},
    imageUrl: <string>{},
    name: <string>{},
    size: <Size>{},
    weight: <string>{},    
    comments: <Array<Coment>>{},
  }

  public productForm = this.fb.group({
    id: [''],
    imageUrl: [''],
    name: [''],
    count: [''],
    weight: [''],
    height: [''],
    width: [''],
  })

  public listProducts: Product[] = [];

  ngOnInit(): void {
    this.productService.getAllProducts()
      .subscribe((data: Product[]) => {
        this.listProducts = data;
      });
  }

  addProduct($event: Product){
    this.productService.addProduct($event)
    .subscribe((data: any) => {
      this.listProducts.push($event);
      this.toastr.success("Product was added", "Success");
    },
    (err)=>{
      this.toastr.warning("Product was not added", "Warning");
    }
    );
  }

  editProduct($event: Product){
    console.log($event);
    this.productService.editProduct(this.selectedProduct.id, $event)
    .subscribe((data: any) => {
      this.listProducts.push($event);
      this.toastr.success("Product was edited", "Success");
      this.productService.getAllProducts()
      .subscribe((data: Product[]) => {
        this.listProducts = data;
      });
    },
    (err)=>{
      this.toastr.warning("Product was not edited", "Warning");
    }
    );
  }

  deleteProduct($event: number){
    this.productService.deleteProduct($event)
    .subscribe((data: any) => {
      this.toastr.error("Product was edited", "Deleted");
      this.productService.getAllProducts()
      .subscribe((data: Product[]) => {
        this.listProducts = data;
      });
    },
    (err)=>{
      this.toastr.warning("Product was not edited", "Warning");
    }
    );
  }

  setSelectedProduct(selected: Product) {
    this.selectedProduct = selected;
    selected.comments = [];
  }
}
