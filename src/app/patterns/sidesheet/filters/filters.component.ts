import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';

@Component({
  selector: 'qs-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})

export class FiltersComponent implements OnInit {

  constructor(private _titleService: Title,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('Side Sheet');
  }
}