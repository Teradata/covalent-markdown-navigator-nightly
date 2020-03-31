import { OnChanges, SimpleChanges, ElementRef, ChangeDetectorRef, Type } from '@angular/core';
import { TdMarkdownLoaderService } from '@covalent/markdown';
export interface IMarkdownNavigatorItem {
    title?: string;
    url?: string;
    httpOptions?: object;
    markdownString?: string;
    anchor?: string;
    children?: IMarkdownNavigatorItem[];
    description?: string;
    icon?: string;
    footer?: Type<any>;
}
export interface IMarkdownNavigatorLabels {
    goHome?: string;
    goBack?: string;
    emptyState?: string;
}
export declare type IMarkdownNavigatorCompareWith = (o1: IMarkdownNavigatorItem, o2: IMarkdownNavigatorItem) => boolean;
export declare const DEFAULT_MARKDOWN_NAVIGATOR_LABELS: IMarkdownNavigatorLabels;
export declare class TdMarkdownNavigatorComponent implements OnChanges {
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
     * footer?: Type<any>
     *
     * Component to be displayed in footer
     */
    footer: Type<any>;
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
    constructor(_markdownUrlLoaderService: TdMarkdownLoaderService, _changeDetectorRef: ChangeDetectorRef);
    clickListener(event: Event): void;
    get showGoBackButton(): boolean;
    get showHomeButton(): boolean;
    get showHeader(): boolean;
    get showMenu(): boolean;
    get showTdMarkdownLoader(): boolean;
    get showTdMarkdown(): boolean;
    get url(): string;
    get footerComponent(): any;
    get httpOptions(): object;
    get markdownString(): string;
    get anchor(): string;
    get showEmptyState(): boolean;
    get goHomeLabel(): string;
    get goBackLabel(): string;
    get emptyStateLabel(): string;
    get currentItemTitle(): string;
    ngOnChanges(changes: SimpleChanges): void;
    reset(): void;
    goBack(): void;
    handleItemSelected(item: IMarkdownNavigatorItem): void;
    getTitle(item: IMarkdownNavigatorItem): string;
    getIcon(item: IMarkdownNavigatorItem): string;
    private _jumpTo;
    private handleLinkClick;
}
