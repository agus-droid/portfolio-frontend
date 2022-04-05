import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  @Input() educacion: Educacion = new Educacion();

  @Output() onEducacion = new EventEmitter<Educacion>();

  imagePath: SafeResourceUrl = "";
  loading: boolean = false;

  constructor(
    private educacionService: EducacionService,
    public _sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    if (this.educacion !== null) {
      this.educacionService.fetchImage(this.educacion.imagen).subscribe({
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


}
