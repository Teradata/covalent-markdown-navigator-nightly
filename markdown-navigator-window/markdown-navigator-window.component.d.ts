import { EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { IMarkdownNavigatorItem, IMarkdownNavigatorLabels, IMarkdownNavigatorCompareWith } from '../markdown-navigator.component';
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
    startAt: IMarkdownNavigatorItem;
    compareWith: IMarkdownNavigatorCompareWith;
    toolbarHeight: number;
    docked: boolean;
    closed: EventEmitter<void>;
    dockToggled: EventEmitter<boolean>;
    readonly markdownNavigatorLabels: IMarkdownNavigatorLabels;
    readonly titleLabel: string;
    readonly closeLabel: string;
    readonly toggleDockedStateLabel: string;
    toggleDockedState(): void;
}
