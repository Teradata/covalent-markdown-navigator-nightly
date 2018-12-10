import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { name, patterns, layouts, routes, baseURL } from '../data';

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  baseURL;
  
  usermenu: Object[] = [{
    icon: 'swap_horiz',
    route: '.',
    title: 'Switch account',
  }, {
    icon: 'tune',
    route: '.',
    title: 'Account settings',
  }, {
    icon: 'exit_to_app',
    route: '.',
    title: 'Sign out',
  },
];

  constructor(private _router: Router) { 
    Object.assign(this, { name, patterns, layouts, routes, baseURL })
  }
  ngOnInit() {
  }
}
