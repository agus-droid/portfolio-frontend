import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EducacionService } from 'src/app/services/educacion.service';
import { Educacion } from 'src/app/models/educacion';

@Component({
  selector: 'app-educaciones',
  templateUrl: './educaciones.component.html',
  styleUrls: ['./educaciones.component.css']
})
export class EducacionesComponent implements OnInit {

  educaciones: Educacion[] = [];
  loading: boolean = false;
  error: boolean = false;

  constructor(
    private educacionService: EducacionService,
    private toastr: ToastrService,
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

}
