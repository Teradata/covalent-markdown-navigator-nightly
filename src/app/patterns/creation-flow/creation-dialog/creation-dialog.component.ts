import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';

@Component({
  selector: 'qs-creation-dialog',
  templateUrl: './creation-dialog.component.html',
  styleUrls: ['./creation-dialog.component.scss'],
})
export class CreationDialogComponent implements OnInit {

  constructor(private _titleService: Title,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('Creation Flow');
  }
}