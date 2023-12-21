import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategorieService } from '../../_services/categorie.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.scss']
})
export class EditCategorieComponent implements OnInit {

  @Input() categorie_selected:any = null;
  @Output() clientE: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;
  name:any = null;
  icon:any = null;
  status:any = null;
  imageFile:any = null;
  imagePreview:any = null;

  constructor(
    public _categorieService: CategorieService,
    public modal: NgbActiveModal,
    public toaster: Toaster
  ) 
  { }

  ngOnInit(): void {
    this.isLoading$ = this._categorieService.isLoading$;
    this.name = this.categorie_selected.name;
    this.imagePreview = URL_BACKEND+'storage/'+this.categorie_selected.imagen;
    this.icon = this.categorie_selected.icono;
    this.status = this.categorie_selected.state;
  }

  processFile($event) {
    if($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.open(NoticyAlertComponent,{text:`danger-'El archivo cargado no es una imagen'`});
      return;
    }
    this.imageFile = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imageFile);
    reader.onloadend = () => this.imagePreview = reader.result;
    setTimeout(() => {
      console.log(this.imagePreview);
    }, 25);
  }

  update() {
    let formData = new FormData();
    console.log('imageFile');
    console.log(this.imageFile);
    formData.append('imagen_file', this.imageFile);
    formData.append('name', this.name);
    formData.append('icono', this.icon);
    formData.append('state', this.status);
    console.log('formData');
    console.log(formData);
    this._categorieService.updateCategorie(this.categorie_selected.id, formData).subscribe((resp:any)=>{
      console.log(resp);
      this.clientE.emit(resp.categorie);
      this.toaster.open(NoticyAlertComponent,{text:`primary-'La categoria se ha actualizado de manera correcta'`});
      this.modal.close();
    })
  }
}