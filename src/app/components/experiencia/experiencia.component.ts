import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  @Input() experiencia: Experiencia = new Experiencia();

  @Output() onDelete = new EventEmitter<Experiencia>();

  imagePath: SafeResourceUrl = "";
  loading: boolean = true;

  constructor(
    private experienciaService: ExperienciaService,
    private _sanitizer: DomSanitizer,
    public userService: UsersService
  ) { }

  ngOnInit(): void {
    if (this.experiencia !== null) {
      this.experienciaService.fetchImage(this.experiencia.imagen).subscribe({
        next: (image) => {
          this.createImage(image);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  private createImage(image: Blob): any {
    if (image && image.size > 0) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(String(reader.result));
        this.loading = false;
      }, false);

      reader.readAsDataURL(image);
    } else {
      this.loading = false;
    }
  }

  delete() {
    this.onDelete.emit(this.experiencia);
  }

}
