import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';

@Component({
  selector: 'qs-docs-sidesheet',
  templateUrl: './docs-sidesheet.component.html',
  styleUrls: ['./docs-sidesheet.component.scss'],
})
export class DocsSideSheetComponent implements OnInit {

  name: string = "Sandbox";
  showDescription: boolean = false;
  sheet1: boolean = true;
  sheet2: boolean = false;
  sheet3: boolean = false;
  mode: string = "side";

  constructor(private _titleService: Title,
    public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('Contextual Docs - Side Sheet');
  }

  showSheet(sheet): void {
    this.sheet1 = false;
    this.sheet2 = false;
    this.sheet3 = false;
    this.mode = "over";
    if(sheet === 1) {
      this.sheet1 = true;
    } else if (sheet === 2) {
      this.sheet2 = true;
    } else {
      this.sheet3 = true;
      this.mode = "side";
    }
  }
}
