import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    if (localStorage['theme'] === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  turnDarkMode(): void{
    if (localStorage['theme'] === 'dark') {
      localStorage.removeItem('theme')
      document.documentElement.classList.remove('dark')
    } else {
      localStorage['theme'] = 'dark'
      document.documentElement.classList.add('dark')
    }
  }
}
