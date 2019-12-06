import { OnChanges, SimpleChanges, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MarkdownLoaderService } from '@covalent/markdown';
export interface IMarkdownNavigatorItem {
    title?: string;
    url?: string;
    httpOptions?: object;
    markdownString?: string;
    anchor?: string;
    children?: IMarkdownNavigatorItem[];
}
export interface IMarkdownNavigatorLabels {
    goHome?: string;
    goBack?: string;
    emptyState?: string;
}
export declare type IMarkdownNavigatorCompareWith = (o1: IMarkdownNavigatorItem, o2: IMarkdownNavigatorItem) => boolean;
export declare const DEFAULT_MARKDOWN_NAVIGATOR_LABELS: IMarkdownNavigatorLabels;
export declare class MarkdownNavigatorComponent implements OnChanges {
    private _markdownUrlLoaderService;
    private _changeDetectorRef;
    /**
     * items: IMarkdownNavigatorItem[]
     *
     * List of IMarkdownNavigatorItems to be rendered
     */
    items: IMarkdownNavigatorItem[];
    /**
     * labels?: IMarkdownNavigatorLabels
     *
     * Translated labels
     */
    labels: IMarkdownNavigatorLabels;
    /**
     * startAt?: IMarkdownNavigatorItem
     *
     * Item to start to
     */
    startAt: IMarkdownNavigatorItem;
    /**
     * compareWith?: IMarkdownNavigatorCompareWith
     *
     * Function used to find startAt item
     * Defaults to comparison by strict equality (===)
     */
    compareWith: IMarkdownNavigatorCompareWith;
    markdownWrapper: ElementRef;
    historyStack: IMarkdownNavigatorItem[];
    currentMarkdownItem: IMarkdownNavigatorItem;
    currentMenuItems: IMarkdownNavigatorItem[];
    loading: boolean;
    constructor(_markdownUrlLoaderService: MarkdownLoaderService, _changeDetectorRef: ChangeDetectorRef);
    clickListener(event: Event): void;
    readonly showGoBackButton: boolean;
    readonly showHomeButton: boolean;
    readonly showHeader: boolean;
    readonly showMenu: boolean;
    readonly showTdMarkdownLoader: boolean;
    readonly showTdMarkdown: boolean;
    readonly url: string;
    readonly httpOptions: object;
    readonly markdownString: string;
    readonly anchor: string;
    readonly showEmptyState: boolean;
    readonly goHomeLabel: string;
    readonly goBackLabel: string;
    readonly emptyStateLabel: string;
    readonly currentItemTitle: string;
    ngOnChanges(changes: SimpleChanges): void;
    reset(): void;
    goBack(): void;
    handleItemSelected(item: IMarkdownNavigatorItem): void;
    getTitle(item: IMarkdownNavigatorItem): string;
    private _jumpTo;
    private handleLinkClick;
}
