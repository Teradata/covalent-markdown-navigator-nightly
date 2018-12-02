import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';

@Component({
  selector: 'qs-contextual-docs',
  templateUrl: './contextual-docs.component.html',
  styleUrls: ['./contextual-docs.component.scss'],
})
export class ContextualDocsComponent implements OnInit {

  constructor(private _titleService: Title,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('Contextual Docs');
  }
}
