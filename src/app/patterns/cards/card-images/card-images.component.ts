import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';
import { baseURL } from '../../../../data';

@Component({
  selector: 'qs-card-images',
  templateUrl: './card-images.component.html',
  styleUrls: ['./card-images.component.scss'],
})
export class CardImagesComponent implements OnInit {

  constructor(private _titleService: Title,
              public media: TdMediaService) {
    Object.assign(this, { baseURL })
  }

  ngOnInit(): void {
    this._titleService.setTitle('Cards');
  }
}
