import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  @Input() experiencia: Experiencia = new Experiencia();

  @Output() onDelete = new EventEmitter<Experiencia>();

  @Output() onUpdate = new EventEmitter<Experiencia>();

  imagePath: SafeResourceUrl = "";
  loading: boolean = true;
  showModal: boolean = false;
  experienciaForm: FormGroup = this.formBuilder.group({
    imagen: [''],
    titulo: [''],
    descripcion: [''],
    fecha: ['']
  });

  constructor(
    private experienciaService: ExperienciaService,
    private _sanitizer: DomSanitizer,
    public userService: UsersService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.experiencia !== null) {
      this.experienciaService.fetchImage(this.experiencia.imagen).subscribe({
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
    this.onDelete.emit(this.experiencia);
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.experienciaForm.get('imagen')!.setValue(file);
    }
  }

  update() {
    const formData = new FormData();
    const formulario = this.experienciaForm.value;
    Object.keys(formulario).forEach(key => {
      formData.append(key, formulario[key]);
    });

    this.experienciaService.update(formData, this.experiencia).subscribe({
      next: (data: any) => {
        this.toastr.success('Experiencia editada', 'Éxito');
        this.showModal = false;
        this.experienciaForm = this.formBuilder.group({
          imagen: [''],
          titulo: [''],
          descripcion: [''],
          fecha: ['']
        });
        this.onUpdate.emit(this.experiencia);
      },
      error: (err: any) => {
        this.toastr.error('Error al editar la experiencia', 'Error');
      }
    });
  }

}
