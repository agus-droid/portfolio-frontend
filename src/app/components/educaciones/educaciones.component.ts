import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EducacionService } from 'src/app/services/educacion.service';
import { Educacion } from 'src/app/models/educacion';
import { UsersService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-educaciones',
  templateUrl: './educaciones.component.html',
  styleUrls: ['./educaciones.component.css']
})
export class EducacionesComponent implements OnInit {

  educaciones: Educacion[] = [];
  loading: boolean = false;
  error: boolean = false;
  educacionForm: FormGroup = this.formBuilder.group({
    imagen: [''],
    titulo: [''],
    descripcion: [''],
    fecha: ['']
  });
  showModal: boolean = false;

  constructor(
    private educacionService: EducacionService,
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
    this.educacionService.getAll().subscribe({
      next: (data: any[]) => {
        this.educaciones = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        this.toastr.error('Error al obtener los proyectos', 'Error');
      }
    });
  }

  delete(educacion: Educacion){
    this.educacionService.delete(educacion).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Educacion eliminada', 'Éxito');
      },
      error: () => {
        this.toastr.error('Error al eliminar la educacion', 'Error');
      }
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.educacionForm.get('imagen')!.setValue(file);
    }
  }

  add() {
    const formData = new FormData();
    const formulario = this.educacionForm.value;
    Object.keys(formulario).forEach(key => {
      formData.append(key, formulario[key]);
    });

    this.educacionService.add(formData).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Educación agregada', 'Éxito');
        this.showModal = false;
        this.educacionForm = this.formBuilder.group({
          imagen: [''],
          titulo: [''],
          descripcion: [''],
          fecha: ['']
        });
      },
      error: (err: any) => {
        this.toastr.error('Error al agregar la educación', 'Error');
      }
    });
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

}
