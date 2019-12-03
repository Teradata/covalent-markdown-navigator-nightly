import { OnChanges, SimpleChanges, ElementRef } from '@angular/core';
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
export declare const DEFAULT_MARKDOWN_NAVIGATOR_LABELS: IMarkdownNavigatorLabels;
export declare class MarkdownNavigatorComponent implements OnChanges {
    private _markdownUrlLoaderService;
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
    markdownWrapper: ElementRef;
    historyStack: IMarkdownNavigatorItem[][];
    currentMarkdownItem: IMarkdownNavigatorItem;
    currentMenuItems: IMarkdownNavigatorItem[];
    loading: boolean;
    constructor(_markdownUrlLoaderService: MarkdownLoaderService);
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
    handleItemSelected(item: IMarkdownNavigatorItem): void;
    goBack(): void;
    getTitle(item: IMarkdownNavigatorItem): string;
    handleLinkClick(event: Event): Promise<void>;
}
