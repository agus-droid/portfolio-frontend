import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { UsersService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit {

  experiencias: Experiencia[] = [];
  loading: boolean = false;
  error: boolean = false;
  experienciaForm: FormGroup = this.formBuilder.group({
    imagen: [''],
    titulo: [''],
    descripcion: [''],
    fecha: ['']
  });
  showModal: boolean = false;

  constructor(
    private experienciaService: ExperienciaService,
    private toastr: ToastrService,
    public userService: UsersService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.loading = true;
    this.error = false;
    this.experienciaService.getAll().subscribe({
      next: (data: any[]) => {
        this.experiencias = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        this.toastr.error('Error al obtener los proyectos', 'Error');
      }
    });
  }

  delete(experiencia: Experiencia){
    this.experienciaService.delete(experiencia).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Experiencia eliminada', 'Éxito');
      },
      error: () => {
        this.toastr.error('Error al eliminar la experiencia', 'Error');
      }
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.experienciaForm.get('imagen')!.setValue(file);
    }
  }

  add() {
    const formData = new FormData();
    const formulario = this.experienciaForm.value;
    Object.keys(formulario).forEach(key => {
      formData.append(key, formulario[key]);
    });

    this.experienciaService.add(formData).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Experiencia agregada', 'Éxito');
        this.showModal = false;
        this.experienciaForm = this.formBuilder.group({
          imagen: [''],
          titulo: [''],
          descripcion: [''],
          fecha: ['']
        });
      },
      error: (err: any) => {
        this.toastr.error('Error al agregar la experiencia', 'Error');
      }
    });
  }

  update(experiencia: Experiencia){
    this.getAll();
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }
}
