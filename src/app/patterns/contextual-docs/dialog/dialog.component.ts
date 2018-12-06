import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';
import { baseURL } from '../../../../data';

@Component({
  selector: 'qs-contextual-docs',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})

export class DialogComponent implements OnInit {

  constructor(private _titleService: Title,
    public media: TdMediaService) {
      Object.assign(this, { baseURL })
  }

  ngOnInit(): void {
    this._titleService.setTitle('Contextual Docs - Dialog');
  }
}
