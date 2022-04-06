import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/services/educacion.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  @Input() educacion: Educacion = new Educacion()

  @Output() onDelete = new EventEmitter<Educacion>();

  @Output() onUpdate = new EventEmitter<Educacion>();

  imagePath: SafeResourceUrl = "";
  loading: boolean = true;
  showModal: boolean = false;
  educacionForm: FormGroup = this.formBuilder.group({
    imagen: [''],
    titulo: [''],
    descripcion: [''],
    fecha: ['']
  });

  constructor(
    private educacionService: EducacionService,
    private _sanitizer: DomSanitizer,
    public userService: UsersService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.educacion !== null) {
      this.educacionService.fetchImage(this.educacion.imagen).subscribe({
        next: (image) => {
          this.createImage(image);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  private createImage(image: Blob): any {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(String(reader.result));
        this.loading = false;
      }, false);

      reader.readAsDataURL(image);
    } else {
      this.loading = false;
    }
  }

  delete() {
    this.onDelete.emit(this.educacion);
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.educacionForm.get('imagen')!.setValue(file);
    }
  }

  update() {
    const formData = new FormData();
    const formulario = this.educacionForm.value;
    Object.keys(formulario).forEach(key => {
      formData.append(key, formulario[key]);
    });

    this.educacionService.update(formData, this.educacion).subscribe({
      next: (data: any) => {
        this.toastr.success('Educación editada', 'Éxito');
        this.showModal = false;
        this.educacionForm = this.formBuilder.group({
          imagen: [''],
          titulo: [''],
          descripcion: [''],
          fecha: ['']
        });
        this.onUpdate.emit(this.educacion);
      },
      error: (err: any) => {
        this.toastr.error('Error al editar la educación', 'Error');
      }
    });
  }

}
