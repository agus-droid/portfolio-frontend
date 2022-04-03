import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Habilidad } from 'src/app/models/habilidad';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.css']
})
export class HabilidadComponent implements OnInit {

  @Input() habilidad: Habilidad = new Habilidad();

  @Output() onHabilidad = new EventEmitter<Habilidad>();

  constructor() { }

  ngOnInit(): void {
  }

}
