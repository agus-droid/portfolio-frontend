import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: Proyecto[] = [];
  loading: boolean = false;
  error: boolean = false;
  constructor(
    private proyectoService: ProyectoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.loading = true;
    this.error = false;
    this.proyectoService.getAll().subscribe({
      next: (data: Proyecto[]) => {
        this.proyectos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        this.toastr.error('Error al obtener los proyectos', 'Error');
      }
    });
  }

  delete(proyecto: Proyecto){
    this.proyectoService.delete(proyecto).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Proyecto eliminado', 'Éxito');
      },
      error: () => {
        this.toastr.error('Error al eliminar el proyecto', 'Error');
      }
    });
  }

}
