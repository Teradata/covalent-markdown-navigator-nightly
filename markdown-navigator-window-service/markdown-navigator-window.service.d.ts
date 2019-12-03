import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { MarkdownNavigatorWindowComponent, IMarkdownNavigatorWindowLabels } from '../markdown-navigator-window/markdown-navigator-window.component';
import { TdDialogService } from '@covalent/core/dialogs';
import { IMarkdownNavigatorItem } from '../markdown-navigator.component';
export interface IMarkdownNavigatorWindowConfig {
    items: IMarkdownNavigatorItem[];
    dialogConfig?: MatDialogConfig;
    labels?: IMarkdownNavigatorWindowLabels;
    toolbarColor?: ThemePalette;
}
export declare class MarkdownNavigatorWindowService {
    private _tdDialogService;
    markdownNavigatorWindowDialog: MatDialogRef<MarkdownNavigatorWindowComponent>;
    markdownNavigatorWindowDialogsOpen: number;
    constructor(_tdDialogService: TdDialogService);
    open(config: IMarkdownNavigatorWindowConfig): MatDialogRef<MarkdownNavigatorWindowComponent>;
    close(): void;
    readonly isOpen: boolean;
}
