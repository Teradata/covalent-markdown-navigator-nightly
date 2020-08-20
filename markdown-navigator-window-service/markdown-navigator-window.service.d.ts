import { RendererFactory2, Type } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { TdMarkdownNavigatorWindowComponent, IMarkdownNavigatorWindowLabels } from '../markdown-navigator-window/markdown-navigator-window.component';
import { TdDialogService } from '@covalent/core/dialogs';
import { IMarkdownNavigatorItem, IMarkdownNavigatorCompareWith } from '../markdown-navigator.component';
import { ICopyCodeTooltips } from '@covalent/highlight';
export interface IMarkdownNavigatorWindowConfig {
    items: IMarkdownNavigatorItem[];
    dialogConfig?: MatDialogConfig;
    labels?: IMarkdownNavigatorWindowLabels;
    toolbarColor?: ThemePalette;
    startAt?: IMarkdownNavigatorItem | IMarkdownNavigatorItem[];
    compareWith?: IMarkdownNavigatorCompareWith;
    copyCodeToClipboard?: boolean;
    copyCodeTooltips?: ICopyCodeTooltips;
    footer?: Type<any>;
}
export declare class TdMarkdownNavigatorWindowService {
    private _tdDialogService;
    private _document;
    private rendererFactory;
    private _renderer2;
    private dragRef;
    private resizableDraggableDialog;
    private markdownNavigatorWindowDialog;
    private markdownNavigatorWindowDialogsOpen;
    constructor(_tdDialogService: TdDialogService, _document: any, rendererFactory: RendererFactory2);
    open(config: IMarkdownNavigatorWindowConfig): MatDialogRef<TdMarkdownNavigatorWindowComponent>;
    close(): void;
    get isOpen(): boolean;
    private _handleEvents;
    private _getDialogSize;
}
