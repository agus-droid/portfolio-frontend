import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }
  toggleModal(){
    this.showModal = !this.showModal;
  }
  login() {
    console.log(this.user);
    this.userService.login(this.user).subscribe({
      next: (data: any) => {
        this.userService.setToken(data.token);
        this.router.navigateByUrl('/').then(() => {
          window.location.reload()
        });
      },
      error: () => {
      console.log(Error);
      }
    });
  }
}
