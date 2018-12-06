import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { name, patterns, layouts, routes, baseURL } from '../../data';

@Component({
  selector: 'qs-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {

  constructor(private _titleService: Title) {
    Object.assign(this, { name, patterns, layouts, routes, baseURL })
  }

  ngOnInit(): void {
    this._titleService.setTitle( 'Teradata Covalent - Sandbox' );
  }
}
