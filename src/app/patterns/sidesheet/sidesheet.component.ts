import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';

@Component({
  selector: 'qs-sidesheet',
  templateUrl: './sidesheet.component.html',
  styleUrls: ['./sidesheet.component.scss'],
})

export class SideSheetComponent implements OnInit {

  constructor(private _titleService: Title,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('Side Sheet');
  }
}
