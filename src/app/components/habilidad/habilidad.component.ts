import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Habilidad } from 'src/app/models/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.css']
})
export class HabilidadComponent implements OnInit {

  @Input() habilidad: Habilidad = new Habilidad();

  @Output() onDelete = new EventEmitter<Habilidad>();

  constructor(
    public userService: UsersService,
    private toastr: ToastrService,
    private habilidadService: HabilidadService
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.onDelete.emit(this.habilidad);
  }

}
