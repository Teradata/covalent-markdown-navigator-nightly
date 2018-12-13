import { Component } from '@angular/core';
import { name, patterns, layouts, routes, baseURL } from '../data';

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  baseURL: String;

  constructor() { 
    Object.assign(this, { name, patterns, layouts, routes, baseURL });
  }
}
