import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Coment } from 'src/app/models/Comment';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-modal-add-product',
  templateUrl: './modal-add-product.component.html',
  styleUrls: ['./modal-add-product.component.css']
})
export class ModalAddProductComponent implements OnInit {
  constructor(public fb: FormBuilder, public toastr: ToastrService) { }
  
  @Output() productAddedEvent = new EventEmitter<Product>();

  public comments: Coment[] = [];

  public productForm = this.fb.group({
    id: [''],
    imageUrl: [''],
    name: [''],
    count: [''],
    weight: [''],
    height: [''],
    width: [''],
  });

  ngOnInit(): void {
  }

  onSubmit(){
    let uniqueId = Math.floor(Math.random() * 100);

    let newProduct: Product = {
      id: uniqueId,
      count: this.productForm.value.count,
      name: this.productForm.value.name,
      size: {
        height: this.productForm.value.height,
        width: this.productForm.value.width
      },
      imageUrl: this.productForm.value.imageUrl,
      weight: this.productForm.value.weight,
      comments: this.comments,
    }

    let btn = document.getElementById('btnClose'); 
    btn?.click();
    this.productForm.reset();

    this.productAddedEvent.emit(newProduct);
  }
}
