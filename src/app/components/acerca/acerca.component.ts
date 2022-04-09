import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Acerca } from 'src/app/models/acerca';
import { AcercaService } from 'src/app/services/acerca.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {

  acercas: Acerca[] = [new Acerca()];
  loading: boolean = false;
  error: boolean = false;
  fotoForm: FormGroup = this.formBuilder.group({
    foto: [''],
  });
  bannerForm: FormGroup = this.formBuilder.group({
    banner: [''],
  });

  editResumen: boolean = false;

  fotoPath: SafeResourceUrl = "";
  bannerPath: SafeResourceUrl = "";
  constructor(
    private acercaService: AcercaService,
    private toastr: ToastrService,
    public userService: UsersService,
    private formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  createFoto(image: Blob): any {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        this.fotoPath = this._sanitizer.bypassSecurityTrustResourceUrl(String(reader.result));
        this.loading = false;
      }, false);

      reader.readAsDataURL(image);
    } else {
      this.loading = false;
    }
  }

  createBanner(image: Blob): any {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        this.bannerPath = this._sanitizer.bypassSecurityTrustResourceUrl(String(reader.result));
        this.loading = false;
      }, false);

      reader.readAsDataURL(image);
    } else {
      this.loading = false;
    }
  }

  getAll(): any {
    this.loading = true;
    this.error = false;
    this.acercaService.getAll().subscribe({
      next: (data: any[]) => {
        this.acercas = data;
        this.loading = false;
        this.getFoto();
        this.getBanner();
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        this.toastr.error('Error al obtener los proyectos', 'Error');
      }
    });
  }

  getFoto(){
    this.acercaService.fetchImage(this.acercas[0].foto).subscribe({
      next: (image) => {
        this.createFoto(image);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getBanner(){
    this.acercaService.fetchImage(this.acercas[0].banner).subscribe({
      next: (image) => {
        this.createBanner(image);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fotoForm.get('imagen')!.setValue(file);
    }
  }

  toggleEditResumen(){
    this.editResumen = !this.editResumen;
  }

  updateResumen(){
    this.acercaService.updateResumen(this.acercas[0].id, this.acercas[0].resumen).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Resumen actualizado', 'Éxito');
        this.toggleEditResumen();
      },
      error: () => {
        this.toastr.error('Error al actualizar el resumen', 'Error');
      }
    });
  }

}
