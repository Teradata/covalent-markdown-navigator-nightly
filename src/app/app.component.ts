import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { TdMediaService, TdDigitsPipe } from '@covalent/core';

@Component({
  selector: 'td-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-resources/feat/sandbox/src/assets/icons/teradata.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-dark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-resources/feat/sandbox/src/assets/icons/teradata-dark.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-resources/feat/sandbox/src/assets/icons/covalent.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-resources/feat/sandbox/src/assets/icons/covalent-mark.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-resources/feat/sandbox/src/assets/icons/github.svg'));
      this._iconRegistry.addSvgIconInNamespace('assets', 'app_center',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-resources/feat/sandbox/src/assets/icons/appcenter.svg'));
      this._iconRegistry.addSvgIconInNamespace('assets', 'data-labs',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-resources/feat/sandbox/src/assets/icons/data-labs.svg'));
      this._iconRegistry.addSvgIconInNamespace('assets', 'ingest',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-resources/feat/sandbox/src/assets/icons/ingest.svg'));
      this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-resources/feat/sandbox/src/assets/icons/querygrid.svg'));
      this._iconRegistry.addSvgIconInNamespace('assets', 'unity',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-resources/feat/sandbox/src/assets/icons/unity.svg'));
      this._iconRegistry.addSvgIconInNamespace('assets', 'viewpoint',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-resources/feat/sandbox/src/assets/icons/viewpoint.svg'));
      
      this._iconRegistry.addSvgIconInNamespace('assets', 'workload-analytics',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-resources/feat/sandbox/src/assets/icons/workload-analytics.svg'));
  }
}
