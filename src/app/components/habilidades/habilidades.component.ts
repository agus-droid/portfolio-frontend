import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Habilidad } from 'src/app/models/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  habilidades: Habilidad[] = [];
  loading: boolean = false;
  error: boolean = false;
  constructor(
    private habilidadService: HabilidadService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.loading = true;
    this.error = false;
    this.habilidadService.getAll().subscribe({
      next: (data: Habilidad[]) => {
        this.habilidades = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        this.toastr.error('Error al obtener las habilidades', 'Error');
      }
    });
  }
}
