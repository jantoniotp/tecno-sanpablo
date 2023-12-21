import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategorieService } from '../../_services/categorie.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {

  @Output() clientE: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;
  name:any = null;
  icon:any = null;
  imageFile:any = null;
  imagePreview:any = null;

  constructor(
    public _categorieService: CategorieService,
    public modal: NgbActiveModal,
    public toaster: Toaster
  ) 
  { }

  ngOnInit(): void {
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

  save() {
    let formData = new FormData();
    console.log('imageFile');
    console.log(this.imageFile);
    formData.append('imagen_file', this.imageFile);
    formData.append('name', this.name);
    formData.append('icono', this.icon);
    console.log('formData');
    console.log(formData);
    this._categorieService.createCategorie(formData).subscribe((resp:any)=>{
      console.log(resp);
      this.clientE.emit(resp.categorie);
      this.toaster.open(NoticyAlertComponent,{text:`primary-'La categoria se ha registrado de manera correcta'`});
      this.modal.close();
    })
  }
}
