import { OnChanges, SimpleChanges, ElementRef, ChangeDetectorRef, Type, EventEmitter } from '@angular/core';
import { TdMarkdownLoaderService } from '@covalent/markdown';
import { ITdFlavoredMarkdownButtonClickEvent } from '@covalent/flavored-markdown';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
export interface IMarkdownNavigatorItem {
    id?: string;
    title?: string;
    url?: string;
    httpOptions?: object;
    markdownString?: string;
    anchor?: string;
    children?: IMarkdownNavigatorItem[];
    childrenUrl?: string;
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
    private _sanitizer;
    private _http;
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
     * startAt?: IMarkdownNavigatorItem | IMarkdownNavigatorItem[];
     *
     * Item or path to start at
     */
    startAt: IMarkdownNavigatorItem | IMarkdownNavigatorItem[];
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
    buttonClicked: EventEmitter<ITdFlavoredMarkdownButtonClickEvent>;
    markdownWrapper: ElementRef;
    historyStack: IMarkdownNavigatorItem[];
    currentMarkdownItem: IMarkdownNavigatorItem;
    currentMenuItems: IMarkdownNavigatorItem[];
    loading: boolean;
    markdownLoaderError: string;
    childrenUrlError: string;
    constructor(_markdownUrlLoaderService: TdMarkdownLoaderService, _changeDetectorRef: ChangeDetectorRef, _sanitizer: DomSanitizer, _http: HttpClient);
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
    ngOnChanges(changes: SimpleChanges): Promise<void>;
    hasChildrenOrChildrenUrl(item: IMarkdownNavigatorItem): boolean;
    clearErrors(): void;
    reset(): void;
    goBack(): void;
    handleItemSelected(item: IMarkdownNavigatorItem): void;
    setChildrenAsCurrentMenuItems(item: IMarkdownNavigatorItem): Promise<void>;
    loadChildrenUrl(item: IMarkdownNavigatorItem): Promise<IMarkdownNavigatorItem[]>;
    getTitle(item: IMarkdownNavigatorItem): string;
    getIcon(item: IMarkdownNavigatorItem): string;
    handleChildrenUrlError(error: Error): void;
    handleMarkdownLoaderError(error: Error): void;
    private _jumpTo;
    private followPath;
    private findPath;
    private handleLinkClick;
}
