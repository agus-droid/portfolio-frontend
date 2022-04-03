import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  darkMode: boolean = false;
  constructor() { }

  ngOnInit(): void {
    if (localStorage['theme'] === 'dark') {
      document.documentElement.classList.add('dark')
      this.darkMode = true;
    } else {
      document.documentElement.classList.remove('dark')
      this.darkMode = false;
    }
  }

  turnDarkMode(): void{
    if (localStorage['theme'] === 'dark') {
      localStorage.removeItem('theme')
      document.documentElement.classList.remove('dark')
      this.darkMode = false;
    } else {
      localStorage['theme'] = 'dark'
      document.documentElement.classList.add('dark')
      this.darkMode = true;
    }
  }
}
