import { RendererFactory2 } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { MarkdownNavigatorWindowComponent, IMarkdownNavigatorWindowLabels } from '../markdown-navigator-window/markdown-navigator-window.component';
import { TdDialogService } from '@covalent/core/dialogs';
import { IMarkdownNavigatorItem, IMarkdownNavigatorCompareWith } from '../markdown-navigator.component';
export interface IMarkdownNavigatorWindowConfig {
    items: IMarkdownNavigatorItem[];
    dialogConfig?: MatDialogConfig;
    labels?: IMarkdownNavigatorWindowLabels;
    toolbarColor?: ThemePalette;
    startAt?: IMarkdownNavigatorItem;
    compareWith?: IMarkdownNavigatorCompareWith;
}
export declare class MarkdownNavigatorWindowService {
    private _tdDialogService;
    private _document;
    private rendererFactory;
    private _renderer2;
    private dragRef;
    private resizableDraggableDialog;
    private markdownNavigatorWindowDialog;
    private markdownNavigatorWindowDialogsOpen;
    constructor(_tdDialogService: TdDialogService, _document: any, rendererFactory: RendererFactory2);
    open(config: IMarkdownNavigatorWindowConfig): MatDialogRef<MarkdownNavigatorWindowComponent>;
    close(): void;
    readonly isOpen: boolean;
    private _handleEvents;
    private _getDialogSize;
}
