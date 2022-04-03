import { Component, OnInit } from '@angular/core';
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
    private habilidadService: HabilidadService
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
        console.log(data);
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        console.log(err);
      }
    });
  }
}
