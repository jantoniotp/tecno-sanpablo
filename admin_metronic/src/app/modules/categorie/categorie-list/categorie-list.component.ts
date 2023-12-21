import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../_services/categorie.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategorieComponent } from '../components/add-categorie/add-categorie.component';
import { URL_BACKEND } from 'src/app/config/config';
import { EditCategorieComponent } from '../components/edit-categorie/edit-categorie.component';
import { DeleteCategorieComponent } from '../components/delete-categorie/delete-categorie.component';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.scss']
})
export class CategorieListComponent implements OnInit {

  isLoading$;
  isLoading = false;
  search:any = '';
  state:any = '';

  categories:any = [];
  URL_BACKEND:any = URL_BACKEND;
  constructor(
    public _categorieService: CategorieService,
    public modelService: NgbModal
  ) 
  { }

  ngOnInit(): void {
    this.isLoading$ = this._categorieService.isLoading$;
    this.allCategories();
  }

  allCategories(page=1){
    this._categorieService.allCategories(page,this.search,this.state).subscribe((resp:any) => {
      console.log(resp);
      this.categories = resp.categorias;
    })
  }

  reset(){
    this.search = '';
    this.state = '';
    this.allCategories();
  }

  addCategorie() {
    const modalRef = this.modelService.open(AddCategorieComponent, {centered: true, size: 'sm'});
    modalRef.result.then(
      () => {
      },
      () => {
      }
    )
    modalRef.componentInstance.clientE.subscribe((resp:any) => {
      console.log(resp);
      resp.state = 1;
      this.categories.unshift(resp);
    })
  }

  edit(categorie) {
    const modalRef = this.modelService.open(EditCategorieComponent, {centered: true, size: 'sm'});
    modalRef.componentInstance.categorie_selected = categorie;
    modalRef.result.then(
      () => {
      },
      () => {
      }
    )
    modalRef.componentInstance.clientE.subscribe((resp:any) => {
      console.log(resp);
      let INDEX = this.categories.findIndex(categorie => categorie.id == resp.id);
      this.categories[INDEX] = resp;
    })
  }

  delete(categorie) {
    const modalRef = this.modelService.open(DeleteCategorieComponent, {centered: true, size: 'sm'});
    modalRef.componentInstance.categorie_selected = categorie;
    modalRef.result.then(
      () => {
      },
      () => {
      }
    )
    modalRef.componentInstance.clientE.subscribe((resp:any) => {
      console.log(resp);
      let INDEX = this.categories.findIndex(user => user.id == resp.id);
      this.categories.splice(INDEX,1);
    })
  }
}
