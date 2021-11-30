import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Coment } from 'src/app/models/Comment';
import { Product } from 'src/app/models/Product';
import { CommentService } from 'src/app/services/commentService';

@Component({
  selector: 'app-modal-view-edit-delete',
  templateUrl: './modal-view-edit-delete.component.html',
  styleUrls: ['./modal-view-edit-delete.component.css']
})
export class ModalViewEditDeleteComponent implements OnInit {
  constructor(public fb: FormBuilder, public toastr: ToastrService, public commentService: CommentService) { }

  @Output() deletedProductEvent = new EventEmitter<number>();
  @Output() productEditedEvent = new EventEmitter<Product>();

  public comments: Coment[] = [];
  public product: Product | undefined;

  public productForm = this.fb.group({
    id: [''],
    imageUrl: [''],
    name: [''],
    count: [''],
    weight: [''],
    height: [''],
    width: [''],
  })

  public commentForm = this.fb.group({
    id: [''],
    productId: [''],
    description: [''],
    date: new Date,
  })

  @Input() set setData(product: Product){
    this.product = product;
    this.comments = this.product.comments;
    this.populateForm(product);
  }

  getAllComments(id: number){
    this.commentService.getCommentsByIdProduct(id)
    .subscribe((data)=>{
      console.log(data);
      this.comments = data;
    })
  }
  
  ngOnInit(): void {
  }

  populateForm(selected: Product){
    this.productForm.setValue({
      id: selected.id,
      imageUrl: selected.imageUrl,
      name: selected.name,
      count: selected.count,
      weight: selected.weight,
      height: selected.size.height,
      width: selected.size.width
    })
    this.getAllComments(selected.id);
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

    this.productEditedEvent.emit(newProduct);
  }

  addComment(comment: any){
    console.log(comment);

    let addComment = {
      id: Math.floor(Math.random() * 100),
      productId: this.product?.id,
      description: comment.value.description,
      date: new Date(),
    };

    
    this.commentService.addComment(addComment)
    .subscribe((data)=>{
      this.toastr.success("Comment was adding","Success")
      this.getAllComments(this.productForm.value.id);
    },
    (err)=>{
      this.toastr.warning("Comment was not adding","Warning")
    });
  };

  onDelete(){
    this.deletedProductEvent.emit(this.productForm.value.id);
  }
}
