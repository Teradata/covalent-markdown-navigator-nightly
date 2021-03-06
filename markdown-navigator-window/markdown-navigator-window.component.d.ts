import { EventEmitter, Type } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { IMarkdownNavigatorItem, IMarkdownNavigatorLabels, IMarkdownNavigatorCompareWith } from '../markdown-navigator.component';
import { ITdFlavoredMarkdownButtonClickEvent } from '@covalent/flavored-markdown';
import { ICopyCodeTooltips } from '@covalent/highlight';
export interface IMarkdownNavigatorWindowLabels extends IMarkdownNavigatorLabels {
    title?: string;
    close?: string;
    dock?: string;
    unDock?: string;
}
export declare const DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS: IMarkdownNavigatorWindowLabels;
export declare class TdMarkdownNavigatorWindowComponent {
    items: IMarkdownNavigatorItem[];
    labels: IMarkdownNavigatorWindowLabels;
    toolbarColor: ThemePalette;
    startAt: IMarkdownNavigatorItem | IMarkdownNavigatorItem[];
    compareWith: IMarkdownNavigatorCompareWith;
    docked: boolean;
    copyCodeToClipboard: boolean;
    copyCodeTooltips: ICopyCodeTooltips;
    footer: Type<any>;
    closed: EventEmitter<void>;
    dockToggled: EventEmitter<boolean>;
    buttonClicked: EventEmitter<ITdFlavoredMarkdownButtonClickEvent>;
    get markdownNavigatorLabels(): IMarkdownNavigatorLabels;
    get titleLabel(): string;
    get closeLabel(): string;
    get toggleDockedStateLabel(): string;
    toggleDockedState(): void;
}
