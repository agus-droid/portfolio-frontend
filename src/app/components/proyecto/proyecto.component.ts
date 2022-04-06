import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  @Input() proyecto: Proyecto = new Proyecto();

  @Output() onDelete = new EventEmitter<Proyecto>();

  @Output() onUpdate = new EventEmitter<Proyecto>();

  showModal: boolean = false;

  constructor(
    public userService: UsersService,
  ) { }

  ngOnInit(): void { }

  delete() {
    this.onDelete.emit(this.proyecto);
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  update() {
    this.onUpdate.emit(this.proyecto);
  }
}
