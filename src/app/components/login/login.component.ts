import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showModal = false;
  user: User = new User();

  constructor(
    public userService: UsersService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void { }

  toggleModal(){
    this.showModal = !this.showModal;
  }
  login(event: Event) {
    event.preventDefault;
    this.userService.login(this.user).subscribe({
      next: (data: any) => {
        this.toggleModal();
      },
      error: () => {
        this.toastr.error('Usuario o contraseña incorrectos', 'Error');
      }
    });
  }
  logout(){
    this.userService.logout();
  }
}
