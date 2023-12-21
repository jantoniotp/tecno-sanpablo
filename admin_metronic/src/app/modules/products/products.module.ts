import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { EditNewProductComponent } from './edit-new-product/edit-new-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';
import { ProductsRoutingModule } from './products-routing.module';



@NgModule({
  declarations: [ProductsComponent, AddNewProductComponent, ListProductComponent, EditNewProductComponent, DeleteProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
  ]
})
export class ProductsModule { }
