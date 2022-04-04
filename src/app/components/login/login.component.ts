import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  userIsLoggedIn: boolean = false;

  constructor(
    private userService: UsersService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn();
  }
  toggleModal(){
    this.showModal = !this.showModal;
  }
  login() {
    this.userService.login(this.user).subscribe({
      next: (data: any) => {
        this.userService.setToken(data.token);
        this.router.navigateByUrl('/').then(() => {
          window.location.reload()
        });
      },
      error: () => {
        this.toastr.error('Usuario o contraseña incorrectos', 'Error');
      }
    });
  }
  isLoggedIn(){
    if(this.userService.isLoggedIn()) {
      this.userIsLoggedIn = true;
    } else {
      this.userIsLoggedIn = false;
    }
  }
  logout(){
    this.userService.logout();
    this.router.navigateByUrl('/').then(() => {
      window.location.reload()
    });
  }
}
