/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'td-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer) {
    // Covalent Icons
    this._iconRegistry.registerFontClassAlias('covalent', 'covalent-icons');

    // SVG Icons
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
      this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-dark',
        this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-dark.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
    
    // SVG Icons
    this._iconRegistry.addSvgIcon('teradata', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
    this._iconRegistry.addSvgIcon('teradata-dark', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-dark.svg'));
    this._iconRegistry.addSvgIcon('teradata-solid', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-solid.svg'));
    this._iconRegistry.addSvgIcon('teradata-icon', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-icon.svg'));
    this._iconRegistry.addSvgIcon('github', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIcon('covalent', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    this._iconRegistry.addSvgIcon('covalent-mark', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
    this._iconRegistry.addSvgIcon('appcenter', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this._iconRegistry.addSvgIcon('control-center', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/control-center.svg'));
    this._iconRegistry.addSvgIcon('querygrid', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
    this._iconRegistry.addSvgIcon('listener', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this._iconRegistry.addSvgIcon('intellicloud', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/intellicloud.svg'));
    this._iconRegistry.addSvgIcon('workload-analytics', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/workload-analytics.svg'));
    this._iconRegistry.addSvgIcon('unity', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/unity.svg'));
    this._iconRegistry.addSvgIcon('viewpoint', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/viewpoint.svg'));
  }

}
