/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __awaiter } from "tslib";
import { Component, Input, HostListener, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, Type, Output, EventEmitter, SecurityContext, } from '@angular/core';
import { removeLeadingHash, isAnchorLink, TdMarkdownLoaderService } from '@covalent/markdown';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
/**
 * @record
 */
export function IMarkdownNavigatorItem() { }
if (false) {
    /** @type {?|undefined} */
    IMarkdownNavigatorItem.prototype.id;
    /** @type {?|undefined} */
    IMarkdownNavigatorItem.prototype.title;
    /** @type {?|undefined} */
    IMarkdownNavigatorItem.prototype.url;
    /** @type {?|undefined} */
    IMarkdownNavigatorItem.prototype.httpOptions;
    /** @type {?|undefined} */
    IMarkdownNavigatorItem.prototype.markdownString;
    /** @type {?|undefined} */
    IMarkdownNavigatorItem.prototype.anchor;
    /** @type {?|undefined} */
    IMarkdownNavigatorItem.prototype.children;
    /** @type {?|undefined} */
    IMarkdownNavigatorItem.prototype.childrenUrl;
    /** @type {?|undefined} */
    IMarkdownNavigatorItem.prototype.description;
    /** @type {?|undefined} */
    IMarkdownNavigatorItem.prototype.icon;
    /** @type {?|undefined} */
    IMarkdownNavigatorItem.prototype.footer;
}
/**
 * @record
 */
export function IMarkdownNavigatorLabels() { }
if (false) {
    /** @type {?|undefined} */
    IMarkdownNavigatorLabels.prototype.goHome;
    /** @type {?|undefined} */
    IMarkdownNavigatorLabels.prototype.goBack;
    /** @type {?|undefined} */
    IMarkdownNavigatorLabels.prototype.emptyState;
}
/** @type {?} */
export const DEFAULT_MARKDOWN_NAVIGATOR_LABELS = {
    goHome: 'Go home',
    goBack: 'Go back',
    emptyState: 'No item(s) to display',
};
/**
 * @param {?} url
 * @return {?}
 */
function getTitleFromUrl(url) {
    if (url) {
        /** @type {?} */
        const temp = new URL(url);
        if (temp.hash) {
            return removeLeadingHash(temp.hash);
        }
        else {
            /** @type {?} */
            const path = temp.pathname.split('/');
            /** @type {?} */
            const fileName = path[path.length - 1];
            return fileName.replace(/\.[^/.]+$/, ''); // remove .md
        }
    }
    return undefined;
}
/**
 * @param {?} markdownString
 * @return {?}
 */
function getTitleFromMarkdownString(markdownString) {
    if (markdownString) {
        /** @type {?} */
        const firstLine = markdownString.split(/[\r\n]+/).find((/**
         * @param {?} line
         * @return {?}
         */
        (line) => !!line));
        return removeLeadingHash(firstLine).trim();
    }
    return undefined;
}
/**
 * @param {?} anchor
 * @return {?}
 */
function isMarkdownHref(anchor) {
    return !isAnchorLink(anchor) && anchor.pathname.endsWith('.md');
}
/**
 * @param {?} o1
 * @param {?} o2
 * @return {?}
 */
function defaultCompareWith(o1, o2) {
    if (o1.id && o2.id) {
        return o1.id === o2.id;
    }
    return o1 === o2;
}
export class TdMarkdownNavigatorComponent {
    /**
     * @param {?} _markdownUrlLoaderService
     * @param {?} _changeDetectorRef
     * @param {?} _sanitizer
     * @param {?} _http
     */
    constructor(_markdownUrlLoaderService, _changeDetectorRef, _sanitizer, _http) {
        this._markdownUrlLoaderService = _markdownUrlLoaderService;
        this._changeDetectorRef = _changeDetectorRef;
        this._sanitizer = _sanitizer;
        this._http = _http;
        /**
         * copyCodeToClipboard?: boolean
         *
         * Display copy button on code snippets to copy code to clipboard.
         *
         */
        this.copyCodeToClipboard = false;
        /**
         * copyCodeTooltips?: ICopyCodeTooltips
         *
         * Tooltips for copy button to copy and upon copying.
         */
        this.copyCodeTooltips = {};
        this.buttonClicked = new EventEmitter();
        this.historyStack = []; // history
        // currently rendered
        this.currentMenuItems = []; // current menu items
        // current menu items
        this.loading = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickListener(event) {
        /** @type {?} */
        const element = (/** @type {?} */ (event.srcElement));
        if (element.matches('a[href]') && isMarkdownHref((/** @type {?} */ (element)))) {
            this.handleLinkClick(event);
        }
    }
    /**
     * @return {?}
     */
    get showGoBackButton() {
        return this.historyStack.length > 0;
    }
    /**
     * @return {?}
     */
    get showHomeButton() {
        return this.historyStack.length > 1;
    }
    /**
     * @return {?}
     */
    get showHeader() {
        return this.showHomeButton || this.showGoBackButton || !!this.currentItemTitle;
    }
    /**
     * @return {?}
     */
    get showMenu() {
        return this.currentMenuItems && this.currentMenuItems.length > 0;
    }
    /**
     * @return {?}
     */
    get showTdMarkdownLoader() {
        return !!this.currentMarkdownItem && !!this.currentMarkdownItem.url && !this.showTdMarkdown;
    }
    /**
     * @return {?}
     */
    get showTdMarkdown() {
        return !!this.currentMarkdownItem && !!this.currentMarkdownItem.markdownString;
    }
    /**
     * @return {?}
     */
    get url() {
        if (this.currentMarkdownItem) {
            return this.currentMarkdownItem.url;
        }
        return undefined;
    }
    /**
     * @return {?}
     */
    get footerComponent() {
        if (this.currentMarkdownItem && this.currentMarkdownItem.footer) {
            return this.currentMarkdownItem.footer;
        }
        return this.footer;
    }
    /**
     * @return {?}
     */
    get httpOptions() {
        if (this.currentMarkdownItem) {
            return this.currentMarkdownItem.httpOptions;
        }
    }
    /**
     * @return {?}
     */
    get markdownString() {
        if (this.currentMarkdownItem) {
            return this.currentMarkdownItem.markdownString;
        }
    }
    /**
     * @return {?}
     */
    get anchor() {
        if (this.currentMarkdownItem) {
            return this.currentMarkdownItem.anchor;
        }
    }
    /**
     * @return {?}
     */
    get showEmptyState() {
        return !this.items || this.items.length < 1;
    }
    /**
     * @return {?}
     */
    get goHomeLabel() {
        return (this.labels && this.labels.goHome) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.goHome;
    }
    /**
     * @return {?}
     */
    get goBackLabel() {
        return (this.labels && this.labels.goBack) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.goBack;
    }
    /**
     * @return {?}
     */
    get emptyStateLabel() {
        return (this.labels && this.labels.emptyState) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.emptyState;
    }
    /**
     * @return {?}
     */
    get currentItemTitle() {
        if (this.historyStack.length < 1) {
            return '';
        }
        else if (this.currentMarkdownItem) {
            return this.getTitle(this.currentMarkdownItem);
        }
        else if (this.historyStack.length > 0) {
            return this.getTitle(this.historyStack[this.historyStack.length - 1]);
        }
        return '';
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (changes.items) {
                this.reset();
            }
            if (changes.startAt && this.items && this.startAt) {
                this._jumpTo(this.startAt);
            }
        });
    }
    /**
     * @param {?} item
     * @return {?}
     */
    hasChildrenOrChildrenUrl(item) {
        return (item.children && item.children.length > 0) || !!item.childrenUrl;
    }
    /**
     * @return {?}
     */
    clearErrors() {
        this.markdownLoaderError = undefined;
        this.childrenUrlError = undefined;
    }
    /**
     * @return {?}
     */
    reset() {
        this.loading = false;
        this.clearErrors();
        // if single item and no children
        if (this.items && this.items.length === 1 && !this.hasChildrenOrChildrenUrl(this.items[0])) {
            this.currentMenuItems = [];
            this.currentMarkdownItem = this.items[0];
        }
        else {
            this.currentMenuItems = this.items;
            this.currentMarkdownItem = undefined;
        }
        this.historyStack = [];
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    goBack() {
        this.loading = false;
        this.clearErrors();
        if (this.historyStack.length > 1) {
            /** @type {?} */
            const parent = this.historyStack[this.historyStack.length - 2];
            this.currentMarkdownItem = parent;
            this.historyStack = this.historyStack.slice(0, -1);
            this.setChildrenAsCurrentMenuItems(parent);
        }
        else {
            // one level down just go to root
            this.reset();
        }
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    handleItemSelected(item) {
        this.clearErrors();
        this.currentMarkdownItem = item;
        this.historyStack = [...this.historyStack, item];
        this.setChildrenAsCurrentMenuItems(item);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    setChildrenAsCurrentMenuItems(item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentMenuItems = [];
            this.loading = true;
            this._changeDetectorRef.markForCheck();
            /** @type {?} */
            const stackSnapshot = this.historyStack;
            /** @type {?} */
            let children = [];
            if (item.children) {
                children = item.children;
            }
            else if (item.childrenUrl) {
                children = yield this.loadChildrenUrl(item);
            }
            /** @type {?} */
            const newStackSnapshot = this.historyStack;
            if (stackSnapshot.length === newStackSnapshot.length &&
                stackSnapshot.every((/**
                 * @param {?} stackItem
                 * @param {?} index
                 * @return {?}
                 */
                (stackItem, index) => stackItem === newStackSnapshot[index]))) {
                this.currentMenuItems = children;
            }
            this.loading = false;
            this._changeDetectorRef.markForCheck();
        });
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadChildrenUrl(item) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const sanitizedUrl = this._sanitizer.sanitize(SecurityContext.URL, item.childrenUrl);
            try {
                return yield this._http
                    .get(sanitizedUrl, Object.assign({}, item.httpOptions))
                    .toPromise();
            }
            catch (error) {
                this.handleChildrenUrlError(error);
                return [];
            }
        });
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getTitle(item) {
        if (item) {
            return (removeLeadingHash(item.anchor) ||
                item.title ||
                getTitleFromUrl(item.url) ||
                getTitleFromMarkdownString(item.markdownString) ||
                '').trim();
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getIcon(item) {
        if (item) {
            return item.icon || 'subject';
        }
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleChildrenUrlError(error) {
        this.childrenUrlError = error.message;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleMarkdownLoaderError(error) {
        this.markdownLoaderError = error.message;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @private
     * @param {?} itemOrPath
     * @return {?}
     */
    _jumpTo(itemOrPath) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reset();
            if (this.items && this.items.length > 0) {
                /** @type {?} */
                let path = [];
                if (Array.isArray(itemOrPath)) {
                    path = yield this.followPath(this.items, itemOrPath);
                }
                else {
                    path = this.findPath(this.items, itemOrPath);
                }
                (path || []).forEach((/**
                 * @param {?} pathItem
                 * @return {?}
                 */
                (pathItem) => this.handleItemSelected(pathItem)));
            }
            this._changeDetectorRef.markForCheck();
        });
    }
    /**
     * @private
     * @param {?} items
     * @param {?} path
     * @return {?}
     */
    followPath(items, path) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let pathItems = [];
            /** @type {?} */
            let currentLevel = items;
            /** @type {?} */
            const compareWith = this.compareWith || defaultCompareWith;
            for (const pathItem of path) {
                /** @type {?} */
                const foundItem = currentLevel.find((/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => compareWith(pathItem, item)));
                if (foundItem) {
                    pathItems = [...pathItems, foundItem];
                    if (foundItem.children) {
                        currentLevel = foundItem.children;
                    }
                    else if (foundItem.childrenUrl) {
                        currentLevel = yield this.loadChildrenUrl(foundItem);
                    }
                }
                else {
                    break;
                }
            }
            if (pathItems.length !== path.length) {
                pathItems = [];
            }
            return pathItems;
        });
    }
    /**
     * @private
     * @param {?} items
     * @param {?} item
     * @return {?}
     */
    findPath(items, item) {
        /** @type {?} */
        const compareWith = this.compareWith || defaultCompareWith;
        if (items) {
            for (const child of items) {
                if (compareWith(child, item)) {
                    return [child];
                }
                /** @type {?} */
                const ancestors = this.findPath(child.children, item);
                if (ancestors) {
                    return [child, ...ancestors];
                }
            }
        }
        return undefined;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handleLinkClick(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            /** @type {?} */
            const link = (/** @type {?} */ (event.target));
            /** @type {?} */
            const url = new URL(link.href);
            this.loading = true;
            this._changeDetectorRef.markForCheck();
            try {
                /** @type {?} */
                const markdownString = yield this._markdownUrlLoaderService.load(url.href);
                // pass in url to be able to use currentMarkdownItem.url later on
                this.handleItemSelected({ markdownString, url: url.href });
                this.markdownWrapper.nativeElement.scrollTop = 0;
            }
            catch (error) {
                /** @type {?} */
                const win = window.open(url.href, '_blank');
                win.focus();
            }
            finally {
                this.loading = false;
            }
            this._changeDetectorRef.markForCheck();
        });
    }
}
TdMarkdownNavigatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'td-markdown-navigator',
                template: "<ng-container *ngIf=\"!showEmptyState\">\n  <mat-progress-bar *ngIf=\"loading\" mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n\n  <ng-container *ngIf=\"showHeader\">\n    <div [style.display]=\"'flex'\">\n      <button\n        id=\"td-markdown-navigator-home-button\"\n        *ngIf=\"showHomeButton\"\n        mat-icon-button\n        [matTooltip]=\"goHomeLabel\"\n        (click)=\"reset()\"\n        [attr.data-test]=\"'home-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goHomeLabel\">home</mat-icon>\n      </button>\n\n      <button\n        id=\"td-markdown-navigator-back-button\"\n        *ngIf=\"showGoBackButton\"\n        mat-icon-button\n        [matTooltip]=\"goBackLabel\"\n        (click)=\"goBack()\"\n        [attr.data-test]=\"'back-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goBackLabel\">arrow_back</mat-icon>\n      </button>\n      <span flex *ngIf=\"currentItemTitle\" class=\"mat-body-2 title truncate\" [attr.data-test]=\"'title'\">\n        {{ currentItemTitle }}\n      </span>\n    </div>\n\n    <mat-divider [style.position]=\"'relative'\"></mat-divider>\n  </ng-container>\n\n  <div class=\"scroll-area\" id=\"td-markdown-navigator-content\">\n    <td-message\n      *ngIf=\"childrenUrlError\"\n      [sublabel]=\"childrenUrlError\"\n      color=\"warn\"\n      icon=\"error\"\n      [attr.data-test]=\"'children-url-error'\"\n    ></td-message>\n    <div *ngIf=\"showMenu\" class=\"td-markdown-list\">\n      <mat-action-list>\n        <button\n          *ngFor=\"let item of currentMenuItems; index as index\"\n          [id]=\"'td-markdown-navigator-list-item-' + (item.id ? item.id : index)\"\n          (click)=\"handleItemSelected(item)\"\n          mat-list-item\n          [matTooltip]=\"getTitle(item)\"\n          matTooltipPosition=\"before\"\n          matTooltipShowDelay=\"500\"\n        >\n          <mat-icon matListIcon>\n            {{ getIcon(item) }}\n          </mat-icon>\n          <span matLine class=\"truncate\">\n            {{ getTitle(item) }}\n          </span>\n          <span matLine class=\"truncate\">{{ item.description }}</span>\n          <mat-divider></mat-divider>\n        </button>\n      </mat-action-list>\n    </div>\n\n    <div *ngIf=\"showTdMarkdownLoader || showTdMarkdown\" class=\"markdown-wrapper\" #markdownWrapper>\n      <td-message\n        *ngIf=\"markdownLoaderError\"\n        [sublabel]=\"markdownLoaderError\"\n        color=\"warn\"\n        icon=\"error\"\n        [attr.data-test]=\"'markdown-loader-error'\"\n      ></td-message>\n      <td-flavored-markdown-loader\n        *ngIf=\"showTdMarkdownLoader\"\n        [url]=\"url\"\n        [httpOptions]=\"httpOptions\"\n        [anchor]=\"anchor\"\n        [copyCodeToClipboard]=\"copyCodeToClipboard\"\n        [copyCodeTooltips]=\"copyCodeTooltips\"\n        (loadFailed)=\"handleMarkdownLoaderError($event)\"\n      ></td-flavored-markdown-loader>\n      <td-flavored-markdown\n        *ngIf=\"showTdMarkdown\"\n        [content]=\"markdownString\"\n        [hostedUrl]=\"url\"\n        [anchor]=\"anchor\"\n        [copyCodeToClipboard]=\"copyCodeToClipboard\"\n        [copyCodeTooltips]=\"copyCodeTooltips\"\n        (buttonClicked)=\"buttonClicked.emit($event)\"\n      ></td-flavored-markdown>\n    </div>\n    <ng-container *ngComponentOutlet=\"footerComponent\"></ng-container>\n  </div>\n</ng-container>\n\n<div *ngIf=\"showEmptyState\" layout=\"column\" layout-align=\"center center\" class=\"empty-state\">\n  <mat-icon matListAvatar>subject</mat-icon>\n  <h2>{{ emptyStateLabel }}</h2>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{position:relative;height:100%;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}:host .scroll-area{min-height:1px;overflow-y:auto;-ms-flex:1;flex:1;box-sizing:border-box}:host .markdown-wrapper{padding:16px 16px 0}:host .td-markdown-list>.mat-list{padding-top:0}:host td-flavored-markdown-loader ::ng-deep .mat-progress-bar{top:0;left:0;right:0;position:absolute}:host .title{display:inline-block;vertical-align:middle;margin:8px 0;padding-left:16px}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.empty-state{padding:32px}.empty-state mat-icon{font-size:4em}"]
            }] }
];
/** @nocollapse */
TdMarkdownNavigatorComponent.ctorParameters = () => [
    { type: TdMarkdownLoaderService },
    { type: ChangeDetectorRef },
    { type: DomSanitizer },
    { type: HttpClient }
];
TdMarkdownNavigatorComponent.propDecorators = {
    items: [{ type: Input }],
    labels: [{ type: Input }],
    startAt: [{ type: Input }],
    copyCodeToClipboard: [{ type: Input }],
    copyCodeTooltips: [{ type: Input }],
    footer: [{ type: Input }],
    compareWith: [{ type: Input }],
    buttonClicked: [{ type: Output }],
    markdownWrapper: [{ type: ViewChild, args: ['markdownWrapper',] }],
    clickListener: [{ type: HostListener, args: ['click', ['$event'],] }]
};
if (false) {
    /**
     * items: IMarkdownNavigatorItem[]
     *
     * List of IMarkdownNavigatorItems to be rendered
     * @type {?}
     */
    TdMarkdownNavigatorComponent.prototype.items;
    /**
     * labels?: IMarkdownNavigatorLabels
     *
     * Translated labels
     * @type {?}
     */
    TdMarkdownNavigatorComponent.prototype.labels;
    /**
     * startAt?: IMarkdownNavigatorItem | IMarkdownNavigatorItem[];
     *
     * Item or path to start at
     * @type {?}
     */
    TdMarkdownNavigatorComponent.prototype.startAt;
    /**
     * copyCodeToClipboard?: boolean
     *
     * Display copy button on code snippets to copy code to clipboard.
     *
     * @type {?}
     */
    TdMarkdownNavigatorComponent.prototype.copyCodeToClipboard;
    /**
     * copyCodeTooltips?: ICopyCodeTooltips
     *
     * Tooltips for copy button to copy and upon copying.
     * @type {?}
     */
    TdMarkdownNavigatorComponent.prototype.copyCodeTooltips;
    /**
     * footer?: Type<any>
     *
     * Component to be displayed in footer
     * @type {?}
     */
    TdMarkdownNavigatorComponent.prototype.footer;
    /**
     * compareWith?: IMarkdownNavigatorCompareWith
     *
     * Function used to find startAt item
     * Defaults to comparison by strict equality (===)
     * @type {?}
     */
    TdMarkdownNavigatorComponent.prototype.compareWith;
    /** @type {?} */
    TdMarkdownNavigatorComponent.prototype.buttonClicked;
    /** @type {?} */
    TdMarkdownNavigatorComponent.prototype.markdownWrapper;
    /** @type {?} */
    TdMarkdownNavigatorComponent.prototype.historyStack;
    /** @type {?} */
    TdMarkdownNavigatorComponent.prototype.currentMarkdownItem;
    /** @type {?} */
    TdMarkdownNavigatorComponent.prototype.currentMenuItems;
    /** @type {?} */
    TdMarkdownNavigatorComponent.prototype.loading;
    /** @type {?} */
    TdMarkdownNavigatorComponent.prototype.markdownLoaderError;
    /** @type {?} */
    TdMarkdownNavigatorComponent.prototype.childrenUrlError;
    /**
     * @type {?}
     * @private
     */
    TdMarkdownNavigatorComponent.prototype._markdownUrlLoaderService;
    /**
     * @type {?}
     * @private
     */
    TdMarkdownNavigatorComponent.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    TdMarkdownNavigatorComponent.prototype._sanitizer;
    /**
     * @type {?}
     * @private
     */
    TdMarkdownNavigatorComponent.prototype._http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixJQUFJLEVBQ0osTUFBTSxFQUNOLFlBQVksRUFDWixlQUFlLEdBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU5RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBR2xELDRDQVlDOzs7SUFYQyxvQ0FBWTs7SUFDWix1Q0FBZTs7SUFDZixxQ0FBYTs7SUFDYiw2Q0FBcUI7O0lBQ3JCLGdEQUF3Qjs7SUFDeEIsd0NBQWdCOztJQUNoQiwwQ0FBb0M7O0lBQ3BDLDZDQUFxQjs7SUFDckIsNkNBQXFCOztJQUNyQixzQ0FBYzs7SUFDZCx3Q0FBbUI7Ozs7O0FBR3JCLDhDQUlDOzs7SUFIQywwQ0FBZ0I7O0lBQ2hCLDBDQUFnQjs7SUFDaEIsOENBQW9COzs7QUFLdEIsTUFBTSxPQUFPLGlDQUFpQyxHQUE2QjtJQUN6RSxNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixVQUFVLEVBQUUsdUJBQXVCO0NBQ3BDOzs7OztBQUVELFNBQVMsZUFBZSxDQUFDLEdBQVc7SUFDbEMsSUFBSSxHQUFHLEVBQUU7O2NBQ0QsSUFBSSxHQUFRLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUM5QixJQUFJ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QTRCOztJQUM1Qix3REFBeUI7Ozs7O0lBR3ZCLGlFQUEwRDs7Ozs7SUFDMUQsMERBQTZDOzs7OztJQUM3QyxrREFBZ0M7Ozs7O0lBQ2hDLDZDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgSG9zdExpc3RlbmVyLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVHlwZSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFNlY3VyaXR5Q29udGV4dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyByZW1vdmVMZWFkaW5nSGFzaCwgaXNBbmNob3JMaW5rLCBUZE1hcmtkb3duTG9hZGVyU2VydmljZSB9IGZyb20gJ0Bjb3ZhbGVudC9tYXJrZG93bic7XG5pbXBvcnQgeyBJVGRGbGF2b3JlZE1hcmtkb3duQnV0dG9uQ2xpY2tFdmVudCB9IGZyb20gJ0Bjb3ZhbGVudC9mbGF2b3JlZC1tYXJrZG93bic7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJQ29weUNvZGVUb29sdGlwcyB9IGZyb20gJ0Bjb3ZhbGVudC9oaWdobGlnaHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYXJrZG93bk5hdmlnYXRvckl0ZW0ge1xuICBpZD86IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgaHR0cE9wdGlvbnM/OiBvYmplY3Q7XG4gIG1hcmtkb3duU3RyaW5nPzogc3RyaW5nOyAvLyByYXcgbWFya2Rvd25cbiAgYW5jaG9yPzogc3RyaW5nO1xuICBjaGlsZHJlbj86IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcbiAgY2hpbGRyZW5Vcmw/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBpY29uPzogc3RyaW5nO1xuICBmb290ZXI/OiBUeXBlPGFueT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzIHtcbiAgZ29Ib21lPzogc3RyaW5nO1xuICBnb0JhY2s/OiBzdHJpbmc7XG4gIGVtcHR5U3RhdGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoID0gKG8xOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLCBvMjogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSkgPT4gYm9vbGVhbjtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUzogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzID0ge1xuICBnb0hvbWU6ICdHbyBob21lJyxcbiAgZ29CYWNrOiAnR28gYmFjaycsXG4gIGVtcHR5U3RhdGU6ICdObyBpdGVtKHMpIHRvIGRpc3BsYXknLFxufTtcblxuZnVuY3Rpb24gZ2V0VGl0bGVGcm9tVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHVybCkge1xuICAgIGNvbnN0IHRlbXA6IFVSTCA9IG5ldyBVUkwodXJsKTtcbiAgICBpZiAodGVtcC5oYXNoKSB7XG4gICAgICByZXR1cm4gcmVtb3ZlTGVhZGluZ0hhc2godGVtcC5oYXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcGF0aDogc3RyaW5nW10gPSB0ZW1wLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICBjb25zdCBmaWxlTmFtZTogc3RyaW5nID0gcGF0aFtwYXRoLmxlbmd0aCAtIDFdO1xuICAgICAgcmV0dXJuIGZpbGVOYW1lLnJlcGxhY2UoL1xcLlteLy5dKyQvLCAnJyk7IC8vIHJlbW92ZSAubWRcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZ2V0VGl0bGVGcm9tTWFya2Rvd25TdHJpbmcobWFya2Rvd25TdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChtYXJrZG93blN0cmluZykge1xuICAgIGNvbnN0IGZpcnN0TGluZTogc3RyaW5nID0gbWFya2Rvd25TdHJpbmcuc3BsaXQoL1tcXHJcXG5dKy8pLmZpbmQoKGxpbmU6IHN0cmluZykgPT4gISFsaW5lKTtcbiAgICByZXR1cm4gcmVtb3ZlTGVhZGluZ0hhc2goZmlyc3RMaW5lKS50cmltKCk7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNNYXJrZG93bkhyZWYoYW5jaG9yOiBIVE1MQW5jaG9yRWxlbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gIWlzQW5jaG9yTGluayhhbmNob3IpICYmIGFuY2hvci5wYXRobmFtZS5lbmRzV2l0aCgnLm1kJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyZVdpdGgobzE6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0sIG8yOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogYm9vbGVhbiB7XG4gIGlmIChvMS5pZCAmJiBvMi5pZCkge1xuICAgIHJldHVybiBvMS5pZCA9PT0gbzIuaWQ7XG4gIH1cbiAgcmV0dXJuIG8xID09PSBvMjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGQtbWFya2Rvd24tbmF2aWdhdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVGRNYXJrZG93bk5hdmlnYXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdXG4gICAqXG4gICAqIExpc3Qgb2YgSU1hcmtkb3duTmF2aWdhdG9ySXRlbXMgdG8gYmUgcmVuZGVyZWRcbiAgICovXG4gIEBJbnB1dCgpIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG5cbiAgLyoqXG4gICAqIGxhYmVscz86IElNYXJrZG93bk5hdmlnYXRvckxhYmVsc1xuICAgKlxuICAgKiBUcmFuc2xhdGVkIGxhYmVsc1xuICAgKi9cbiAgQElucHV0KCkgbGFiZWxzOiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHM7XG5cbiAgLyoqXG4gICAqIHN0YXJ0QXQ/OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtIHwgSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuICAgKlxuICAgKiBJdGVtIG9yIHBhdGggdG8gc3RhcnQgYXRcbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0QXQ6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0gfCBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG5cbiAgLyoqXG4gICAqIGNvcHlDb2RlVG9DbGlwYm9hcmQ/OiBib29sZWFuXG4gICAqXG4gICAqIERpc3BsYXkgY29weSBidXR0b24gb24gY29kZSBzbmlwcGV0cyB0byBjb3B5IGNvZGUgdG8gY2xpcGJvYXJkLlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgY29weUNvZGVUb0NsaXBib2FyZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBjb3B5Q29kZVRvb2x0aXBzPzogSUNvcHlDb2RlVG9vbHRpcHNcbiAgICpcbiAgICogVG9vbHRpcHMgZm9yIGNvcHkgYnV0dG9uIHRvIGNvcHkgYW5kIHVwb24gY29weWluZy5cbiAgICovXG4gIEBJbnB1dCgpIGNvcHlDb2RlVG9vbHRpcHM6IElDb3B5Q29kZVRvb2x0aXBzID0ge307XG5cbiAgLyoqXG4gICAqIGZvb3Rlcj86IFR5cGU8YW55PlxuICAgKlxuICAgKiBDb21wb25lbnQgdG8gYmUgZGlzcGxheWVkIGluIGZvb3RlclxuICAgKi9cbiAgQElucHV0KCkgZm9vdGVyOiBUeXBlPGFueT47XG5cbiAgLyoqXG4gICAqIGNvbXBhcmVXaXRoPzogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGhcbiAgICpcbiAgICogRnVuY3Rpb24gdXNlZCB0byBmaW5kIHN0YXJ0QXQgaXRlbVxuICAgKiBEZWZhdWx0cyB0byBjb21wYXJpc29uIGJ5IHN0cmljdCBlcXVhbGl0eSAoPT09KVxuICAgKi9cbiAgQElucHV0KCkgY29tcGFyZVdpdGg6IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoO1xuXG4gIEBPdXRwdXQoKSBidXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8SVRkRmxhdm9yZWRNYXJrZG93bkJ1dHRvbkNsaWNrRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ21hcmtkb3duV3JhcHBlcicpIG1hcmtkb3duV3JhcHBlcjogRWxlbWVudFJlZjtcblxuICBoaXN0b3J5U3RhY2s6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IFtdOyAvLyBoaXN0b3J5XG4gIGN1cnJlbnRNYXJrZG93bkl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW07IC8vIGN1cnJlbnRseSByZW5kZXJlZFxuICBjdXJyZW50TWVudUl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTsgLy8gY3VycmVudCBtZW51IGl0ZW1zXG5cbiAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG1hcmtkb3duTG9hZGVyRXJyb3I6IHN0cmluZztcbiAgY2hpbGRyZW5VcmxFcnJvcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX21hcmtkb3duVXJsTG9hZGVyU2VydmljZTogVGRNYXJrZG93bkxvYWRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgIHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsXG4gICkge31cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIGNsaWNrTGlzdGVuZXIoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcbiAgICBpZiAoZWxlbWVudC5tYXRjaGVzKCdhW2hyZWZdJykgJiYgaXNNYXJrZG93bkhyZWYoPEhUTUxBbmNob3JFbGVtZW50PmVsZW1lbnQpKSB7XG4gICAgICB0aGlzLmhhbmRsZUxpbmtDbGljayhldmVudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNob3dHb0JhY2tCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQgc2hvd0hvbWVCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDE7XG4gIH1cblxuICBnZXQgc2hvd0hlYWRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaG93SG9tZUJ1dHRvbiB8fCB0aGlzLnNob3dHb0JhY2tCdXR0b24gfHwgISF0aGlzLmN1cnJlbnRJdGVtVGl0bGU7XG4gIH1cblxuICBnZXQgc2hvd01lbnUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1lbnVJdGVtcyAmJiB0aGlzLmN1cnJlbnRNZW51SXRlbXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldCBzaG93VGRNYXJrZG93bkxvYWRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gJiYgISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0udXJsICYmICF0aGlzLnNob3dUZE1hcmtkb3duO1xuICB9XG5cbiAgZ2V0IHNob3dUZE1hcmtkb3duKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbSAmJiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5tYXJrZG93blN0cmluZztcbiAgfVxuXG4gIGdldCB1cmwoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLnVybDtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldCBmb290ZXJDb21wb25lbnQoKTogYW55IHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtICYmIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5mb290ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uZm9vdGVyO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mb290ZXI7XG4gIH1cbiAgZ2V0IGh0dHBPcHRpb25zKCk6IG9iamVjdCB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5odHRwT3B0aW9ucztcbiAgICB9XG4gIH1cbiAgZ2V0IG1hcmtkb3duU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5tYXJrZG93blN0cmluZztcbiAgICB9XG4gIH1cblxuICBnZXQgYW5jaG9yKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5hbmNob3I7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNob3dFbXB0eVN0YXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pdGVtcyB8fCB0aGlzLml0ZW1zLmxlbmd0aCA8IDE7XG4gIH1cblxuICBnZXQgZ29Ib21lTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmdvSG9tZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTLmdvSG9tZTtcbiAgfVxuXG4gIGdldCBnb0JhY2tMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZ29CYWNrKSB8fCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9MQUJFTFMuZ29CYWNrO1xuICB9XG5cbiAgZ2V0IGVtcHR5U3RhdGVMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZW1wdHlTdGF0ZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTLmVtcHR5U3RhdGU7XG4gIH1cblxuICBnZXQgY3VycmVudEl0ZW1UaXRsZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRpdGxlKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSh0aGlzLmhpc3RvcnlTdGFja1t0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggLSAxXSk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGFzeW5jIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoY2hhbmdlcy5pdGVtcykge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5zdGFydEF0ICYmIHRoaXMuaXRlbXMgJiYgdGhpcy5zdGFydEF0KSB7XG4gICAgICB0aGlzLl9qdW1wVG8odGhpcy5zdGFydEF0KTtcbiAgICB9XG4gIH1cblxuICBoYXNDaGlsZHJlbk9yQ2hpbGRyZW5VcmwoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHx8ICEhaXRlbS5jaGlsZHJlblVybDtcbiAgfVxuICBjbGVhckVycm9ycygpOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtkb3duTG9hZGVyRXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5jaGlsZHJlblVybEVycm9yID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5jbGVhckVycm9ycygpO1xuICAgIC8vIGlmIHNpbmdsZSBpdGVtIGFuZCBubyBjaGlsZHJlblxuICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoID09PSAxICYmICF0aGlzLmhhc0NoaWxkcmVuT3JDaGlsZHJlblVybCh0aGlzLml0ZW1zWzBdKSkge1xuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gW107XG4gICAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSB0aGlzLml0ZW1zWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLmhpc3RvcnlTdGFjayA9IFtdO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ29CYWNrKCk6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcbiAgICBpZiAodGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgcGFyZW50OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtID0gdGhpcy5oaXN0b3J5U3RhY2tbdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIC0gMl07XG4gICAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSBwYXJlbnQ7XG4gICAgICB0aGlzLmhpc3RvcnlTdGFjayA9IHRoaXMuaGlzdG9yeVN0YWNrLnNsaWNlKDAsIC0xKTtcbiAgICAgIHRoaXMuc2V0Q2hpbGRyZW5Bc0N1cnJlbnRNZW51SXRlbXMocGFyZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb25lIGxldmVsIGRvd24ganVzdCBnbyB0byByb290XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgaGFuZGxlSXRlbVNlbGVjdGVkKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XG4gICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gaXRlbTtcbiAgICB0aGlzLmhpc3RvcnlTdGFjayA9IFsuLi50aGlzLmhpc3RvcnlTdGFjaywgaXRlbV07XG4gICAgdGhpcy5zZXRDaGlsZHJlbkFzQ3VycmVudE1lbnVJdGVtcyhpdGVtKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGFzeW5jIHNldENoaWxkcmVuQXNDdXJyZW50TWVudUl0ZW1zKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSBbXTtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgY29uc3Qgc3RhY2tTbmFwc2hvdDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gdGhpcy5oaXN0b3J5U3RhY2s7XG4gICAgbGV0IGNoaWxkcmVuOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTtcbiAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgY2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5jaGlsZHJlblVybCkge1xuICAgICAgY2hpbGRyZW4gPSBhd2FpdCB0aGlzLmxvYWRDaGlsZHJlblVybChpdGVtKTtcbiAgICB9XG4gICAgY29uc3QgbmV3U3RhY2tTbmFwc2hvdDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gdGhpcy5oaXN0b3J5U3RhY2s7XG4gICAgaWYgKFxuICAgICAgc3RhY2tTbmFwc2hvdC5sZW5ndGggPT09IG5ld1N0YWNrU25hcHNob3QubGVuZ3RoICYmXG4gICAgICBzdGFja1NuYXBzaG90LmV2ZXJ5KChzdGFja0l0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0sIGluZGV4OiBudW1iZXIpID0+IHN0YWNrSXRlbSA9PT0gbmV3U3RhY2tTbmFwc2hvdFtpbmRleF0pXG4gICAgKSB7XG4gICAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSBjaGlsZHJlbjtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRDaGlsZHJlblVybChpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogUHJvbWlzZTxJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10+IHtcbiAgICBjb25zdCBzYW5pdGl6ZWRVcmw6IHN0cmluZyA9IHRoaXMuX3Nhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuVVJMLCBpdGVtLmNoaWxkcmVuVXJsKTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2h0dHBcbiAgICAgICAgLmdldDxJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10+KHNhbml0aXplZFVybCwgeyAuLi5pdGVtLmh0dHBPcHRpb25zIH0pXG4gICAgICAgIC50b1Byb21pc2UoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5oYW5kbGVDaGlsZHJlblVybEVycm9yKGVycm9yKTtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICBnZXRUaXRsZShpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogc3RyaW5nIHtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgcmVtb3ZlTGVhZGluZ0hhc2goaXRlbS5hbmNob3IpIHx8XG4gICAgICAgIGl0ZW0udGl0bGUgfHxcbiAgICAgICAgZ2V0VGl0bGVGcm9tVXJsKGl0ZW0udXJsKSB8fFxuICAgICAgICBnZXRUaXRsZUZyb21NYXJrZG93blN0cmluZyhpdGVtLm1hcmtkb3duU3RyaW5nKSB8fFxuICAgICAgICAnJ1xuICAgICAgKS50cmltKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SWNvbihpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogc3RyaW5nIHtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0uaWNvbiB8fCAnc3ViamVjdCc7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2hpbGRyZW5VcmxFcnJvcihlcnJvcjogRXJyb3IpOiB2b2lkIHtcbiAgICB0aGlzLmNoaWxkcmVuVXJsRXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG4gIGhhbmRsZU1hcmtkb3duTG9hZGVyRXJyb3IoZXJyb3I6IEVycm9yKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrZG93bkxvYWRlckVycm9yID0gZXJyb3IubWVzc2FnZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2p1bXBUbyhpdGVtT3JQYXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtIHwgSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IHBhdGg6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IFtdO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtT3JQYXRoKSkge1xuICAgICAgICBwYXRoID0gYXdhaXQgdGhpcy5mb2xsb3dQYXRoKHRoaXMuaXRlbXMsIGl0ZW1PclBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGF0aCA9IHRoaXMuZmluZFBhdGgodGhpcy5pdGVtcywgaXRlbU9yUGF0aCk7XG4gICAgICB9XG4gICAgICAocGF0aCB8fCBbXSkuZm9yRWFjaCgocGF0aEl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pID0+IHRoaXMuaGFuZGxlSXRlbVNlbGVjdGVkKHBhdGhJdGVtKSk7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBmb2xsb3dQYXRoKFxuICAgIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10sXG4gICAgcGF0aDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdLFxuICApOiBQcm9taXNlPElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXT4ge1xuICAgIGxldCBwYXRoSXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IFtdO1xuICAgIGxldCBjdXJyZW50TGV2ZWw6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IGl0ZW1zO1xuICAgIGNvbnN0IGNvbXBhcmVXaXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aCA9IHRoaXMuY29tcGFyZVdpdGggfHwgZGVmYXVsdENvbXBhcmVXaXRoO1xuICAgIGZvciAoY29uc3QgcGF0aEl0ZW0gb2YgcGF0aCkge1xuICAgICAgY29uc3QgZm91bmRJdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtID0gY3VycmVudExldmVsLmZpbmQoKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pID0+XG4gICAgICAgIGNvbXBhcmVXaXRoKHBhdGhJdGVtLCBpdGVtKSxcbiAgICAgICk7XG5cbiAgICAgIGlmIChmb3VuZEl0ZW0pIHtcbiAgICAgICAgcGF0aEl0ZW1zID0gWy4uLnBhdGhJdGVtcywgZm91bmRJdGVtXTtcblxuICAgICAgICBpZiAoZm91bmRJdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgY3VycmVudExldmVsID0gZm91bmRJdGVtLmNoaWxkcmVuO1xuICAgICAgICB9IGVsc2UgaWYgKGZvdW5kSXRlbS5jaGlsZHJlblVybCkge1xuICAgICAgICAgIGN1cnJlbnRMZXZlbCA9IGF3YWl0IHRoaXMubG9hZENoaWxkcmVuVXJsKGZvdW5kSXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGF0aEl0ZW1zLmxlbmd0aCAhPT0gcGF0aC5sZW5ndGgpIHtcbiAgICAgIHBhdGhJdGVtcyA9IFtdO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aEl0ZW1zO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kUGF0aChpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdLCBpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdIHtcbiAgICBjb25zdCBjb21wYXJlV2l0aDogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGggPSB0aGlzLmNvbXBhcmVXaXRoIHx8IGRlZmF1bHRDb21wYXJlV2l0aDtcbiAgICBpZiAoaXRlbXMpIHtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgaXRlbXMpIHtcbiAgICAgICAgaWYgKGNvbXBhcmVXaXRoKGNoaWxkLCBpdGVtKSkge1xuICAgICAgICAgIHJldHVybiBbY2hpbGRdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFuY2VzdG9yczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gdGhpcy5maW5kUGF0aChjaGlsZC5jaGlsZHJlbiwgaXRlbSk7XG4gICAgICAgIGlmIChhbmNlc3RvcnMpIHtcbiAgICAgICAgICByZXR1cm4gW2NoaWxkLCAuLi5hbmNlc3RvcnNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUxpbmtDbGljayhldmVudDogRXZlbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGxpbms6IEhUTUxBbmNob3JFbGVtZW50ID0gPEhUTUxBbmNob3JFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICBjb25zdCB1cmw6IFVSTCA9IG5ldyBVUkwobGluay5ocmVmKTtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYXJrZG93blN0cmluZzogc3RyaW5nID0gYXdhaXQgdGhpcy5fbWFya2Rvd25VcmxMb2FkZXJTZXJ2aWNlLmxvYWQodXJsLmhyZWYpO1xuICAgICAgLy8gcGFzcyBpbiB1cmwgdG8gYmUgYWJsZSB0byB1c2UgY3VycmVudE1hcmtkb3duSXRlbS51cmwgbGF0ZXIgb25cbiAgICAgIHRoaXMuaGFuZGxlSXRlbVNlbGVjdGVkKHsgbWFya2Rvd25TdHJpbmcsIHVybDogdXJsLmhyZWYgfSk7XG4gICAgICB0aGlzLm1hcmtkb3duV3JhcHBlci5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IHdpbjogV2luZG93ID0gd2luZG93Lm9wZW4odXJsLmhyZWYsICdfYmxhbmsnKTtcbiAgICAgIHdpbi5mb2N1cygpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==