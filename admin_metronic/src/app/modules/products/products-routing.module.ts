import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { EditNewProductComponent } from './edit-new-product/edit-new-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: 'add-product',
        component: AddNewProductComponent
      },
      {
        path: 'list-product',
        component: ListProductComponent
      },
      {
        path: 'edit-product/:id',
        component: EditNewProductComponent
      },
      {
        path:'', redirectTo: 'add-product', pathMatch: 'full', 
      },
      {
        path:'**', redirectTo: 'add-product', pathMatch: 'full', 
      }
    ]	
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
