import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  @Input() proyecto: Proyecto = new Proyecto();

  @Output() onProyecto = new EventEmitter<Proyecto>();

  constructor(
  ) { }

  ngOnInit(): void { }
}
