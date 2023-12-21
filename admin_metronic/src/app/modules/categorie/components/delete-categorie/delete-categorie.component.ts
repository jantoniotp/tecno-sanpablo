import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategorieService } from '../../_services/categorie.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-categorie',
  templateUrl: './delete-categorie.component.html',
  styleUrls: ['./delete-categorie.component.scss']
})
export class DeleteCategorieComponent implements OnInit {

  @Input() categorie_selected:any = null;
  @Output() clientE: EventEmitter<any> = new EventEmitter();
  isLoading$;
  isLoading = false;
  
  constructor(
    public _categorieService: CategorieService,
    public modal: NgbActiveModal, 
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this._categorieService.deleteCategorie(this.categorie_selected.id).subscribe((resp:any) => {
      console.log(resp);
      this.clientE.emit(resp.categorie);
      this.modal.close();
    })
  }
}
