/**
 * @fileoverview added by tsickle
 * Generated from: markdown-navigator.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    /** @type {?|undefined} */
    IMarkdownNavigatorItem.prototype.startAtLink;
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
                this._jumpTo(this.startAt, undefined);
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
            let parent = this.historyStack[this.historyStack.length - 2];
            if (parent.startAtLink) {
                parent = this.historyStack[this.historyStack.length - 3]
                    ? this.historyStack[this.historyStack.length - 3]
                    : undefined;
                this.historyStack = this.historyStack.slice(0, -1);
            }
            if (parent) {
                this.currentMarkdownItem = parent;
                this.historyStack = this.historyStack.slice(0, -1);
                this.setChildrenAsCurrentMenuItems(parent);
            }
            else {
                this.reset();
            }
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
            if (children && children.length && item.startAtLink) {
                this._jumpTo(item.startAtLink, children);
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
     * @param {?} children
     * @return {?}
     */
    _jumpTo(itemOrPath, children) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const historyStack = this.historyStack;
            this.reset();
            if (this.items && this.items.length > 0) {
                /** @type {?} */
                let path = [];
                if (Array.isArray(itemOrPath)) {
                    path = yield this.followPath(this.items, itemOrPath);
                }
                else if (children && children.length > 0) {
                    this.historyStack = historyStack;
                    path = this.findPath(children, itemOrPath);
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
                styles: [":host{-ms-flex-direction:column;box-sizing:border-box;display:-ms-flexbox;display:flex;flex-direction:column;height:inherit;height:100%;position:relative}:host .scroll-area{-ms-flex:1;box-sizing:border-box;flex:1;min-height:1px;overflow-y:auto}:host .markdown-wrapper{padding:16px 16px 0}:host .td-markdown-list>.mat-list{padding-top:0}:host td-flavored-markdown-loader ::ng-deep .mat-progress-bar{left:0;position:absolute;right:0;top:0}:host .title{display:inline-block;margin:8px 0;padding-left:16px;vertical-align:middle}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.empty-state{padding:32px}.empty-state mat-icon{font-size:4em}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wbGF0Zm9ybS9tYXJrZG93bi1uYXZpZ2F0b3IvbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCxZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLElBQUksRUFDSixNQUFNLEVBQ04sWUFBWSxFQUNaLGVBQWUsR0FDaEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTlGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFHbEQsNENBYUM7OztJQVpDLG9DQUFZOztJQUNaLHVDQUFlOztJQUNmLHFDQUFhOztJQUNiLDZDQUFxQjs7SUFDckIsZ0RBQXdCOztJQUN4Qix3Q0FBZ0I7O0lBQ2hCLDBDQUFvQzs7SUFDcEMsNkNBQXFCOztJQUNyQiw2Q0FBcUI7O0lBQ3JCLHNDQUFjOztJQUNkLHdDQUFtQjs7SUFDbkIsNkNBQXFDOzs7OztBQUd2Qyw4Q0FJQzs7O0lBSEMsMENBQWdCOztJQUNoQiwwQ0FBZ0I7O0lBQ2hCLDhDQUFvQjs7O0FBS3RCLE1BQU0sT0FBTyxpQ0FBaUMsR0FBNkI7SUFDekUsTUFBTSxFQUFFLFNBQVM7SUFDakIsTUFBTSxFQUFFLFNBQVM7SUFDakIsVUFBVSxFQUFFLHVCQUF1QjtDQUNwQzs7Ozs7QUFFRCxTQUFTLGVBQWUsQ0FBQyxHQUFXO0lBQ2xDLElBQUksR0FBRyxFQUFFOztjQUNELElBQUksR0FBUSxJQUFJLEdBQUcs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LEdBQUcsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO2dCQUNuRCxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDYjtvQkFBUztnQkFDUixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN0QjtZQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxDQUFDO0tBQUE7OztZQWpZRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsdWhIQUFrRDtnQkFFbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBeEV5Qyx1QkFBdUI7WUFQL0QsaUJBQWlCO1lBU1YsWUFBWTtZQUNaLFVBQVU7OztvQkE0RWhCLEtBQUs7cUJBT0wsS0FBSztzQkFPTCxLQUFLO2tDQVFMLEtBQUs7K0JBT0wsS0FBSztxQkFPTCxLQUFLOzBCQVFMLEtBQUs7NEJBRUwsTUFBTTs4QkFFTixTQUFTLFNBQUMsaUJBQWlCOzRCQWtCM0IsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7Ozs7O0lBbEVqQyw2Q0FBeUM7Ozs7Ozs7SUFPekMsOENBQTBDOzs7Ozs7O0lBTzFDLCtDQUFvRTs7Ozs7Ozs7SUFRcEUsMkRBQThDOzs7Ozs7O0lBTzlDLHdEQUFrRDs7Ozs7OztJQU9sRCw4Q0FBMkI7Ozs7Ozs7O0lBUTNCLG1EQUFvRDs7SUFFcEQscURBQWdHOztJQUVoRyx1REFBMEQ7O0lBRTFELG9EQUE0Qzs7SUFDNUMsMkRBQTRDOztJQUM1Qyx3REFBZ0Q7O0lBRWhELCtDQUF5Qjs7SUFFekIsMkRBQTRCOztJQUM1Qix3REFBeUI7Ozs7O0lBR3ZCLGlFQUEwRDs7Ozs7SUFDMUQsMERBQTZDOzs7OztJQUM3QyxrREFBZ0M7Ozs7O0lBQ2hDLDZDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgSG9zdExpc3RlbmVyLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVHlwZSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFNlY3VyaXR5Q29udGV4dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyByZW1vdmVMZWFkaW5nSGFzaCwgaXNBbmNob3JMaW5rLCBUZE1hcmtkb3duTG9hZGVyU2VydmljZSB9IGZyb20gJ0Bjb3ZhbGVudC9tYXJrZG93bic7XG5pbXBvcnQgeyBJVGRGbGF2b3JlZE1hcmtkb3duQnV0dG9uQ2xpY2tFdmVudCB9IGZyb20gJ0Bjb3ZhbGVudC9mbGF2b3JlZC1tYXJrZG93bic7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJQ29weUNvZGVUb29sdGlwcyB9IGZyb20gJ0Bjb3ZhbGVudC9oaWdobGlnaHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYXJrZG93bk5hdmlnYXRvckl0ZW0ge1xuICBpZD86IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgaHR0cE9wdGlvbnM/OiBvYmplY3Q7XG4gIG1hcmtkb3duU3RyaW5nPzogc3RyaW5nOyAvLyByYXcgbWFya2Rvd25cbiAgYW5jaG9yPzogc3RyaW5nO1xuICBjaGlsZHJlbj86IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcbiAgY2hpbGRyZW5Vcmw/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBpY29uPzogc3RyaW5nO1xuICBmb290ZXI/OiBUeXBlPGFueT47XG4gIHN0YXJ0QXRMaW5rPzogSU1hcmtkb3duTmF2aWdhdG9ySXRlbTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMge1xuICBnb0hvbWU/OiBzdHJpbmc7XG4gIGdvQmFjaz86IHN0cmluZztcbiAgZW1wdHlTdGF0ZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGggPSAobzE6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0sIG8yOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKSA9PiBib29sZWFuO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTOiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMgPSB7XG4gIGdvSG9tZTogJ0dvIGhvbWUnLFxuICBnb0JhY2s6ICdHbyBiYWNrJyxcbiAgZW1wdHlTdGF0ZTogJ05vIGl0ZW0ocykgdG8gZGlzcGxheScsXG59O1xuXG5mdW5jdGlvbiBnZXRUaXRsZUZyb21VcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAodXJsKSB7XG4gICAgY29uc3QgdGVtcDogVVJMID0gbmV3IFVSTCh1cmwpO1xuICAgIGlmICh0ZW1wLmhhc2gpIHtcbiAgICAgIHJldHVybiByZW1vdmVMZWFkaW5nSGFzaCh0ZW1wLmhhc2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwYXRoOiBzdHJpbmdbXSA9IHRlbXAucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICAgIGNvbnN0IGZpbGVOYW1lOiBzdHJpbmcgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07XG4gICAgICByZXR1cm4gZmlsZU5hbWUucmVwbGFjZSgvXFwuW14vLl0rJC8sICcnKTsgLy8gcmVtb3ZlIC5tZFxuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBnZXRUaXRsZUZyb21NYXJrZG93blN0cmluZyhtYXJrZG93blN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKG1hcmtkb3duU3RyaW5nKSB7XG4gICAgY29uc3QgZmlyc3RMaW5lOiBzdHJpbmcgPSBtYXJrZG93blN0cmluZy5zcGxpdCgvW1xcclxcbl0rLykuZmluZCgobGluZTogc3RyaW5nKSA9PiAhIWxpbmUpO1xuICAgIHJldHVybiByZW1vdmVMZWFkaW5nSGFzaChmaXJzdExpbmUpLnRyaW0oKTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc01hcmtkb3duSHJlZihhbmNob3I6IEhUTUxBbmNob3JFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiAhaXNBbmNob3JMaW5rKGFuY2hvcikgJiYgYW5jaG9yLnBhdGhuYW1lLmVuZHNXaXRoKCcubWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlV2l0aChvMTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgbzI6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBib29sZWFuIHtcbiAgaWYgKG8xLmlkICYmIG8yLmlkKSB7XG4gICAgcmV0dXJuIG8xLmlkID09PSBvMi5pZDtcbiAgfVxuICByZXR1cm4gbzEgPT09IG8yO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ZC1tYXJrZG93bi1uYXZpZ2F0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBUZE1hcmtkb3duTmF2aWdhdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW11cbiAgICpcbiAgICogTGlzdCBvZiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtcyB0byBiZSByZW5kZXJlZFxuICAgKi9cbiAgQElucHV0KCkgaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcblxuICAvKipcbiAgICogbGFiZWxzPzogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzXG4gICAqXG4gICAqIFRyYW5zbGF0ZWQgbGFiZWxzXG4gICAqL1xuICBASW5wdXQoKSBsYWJlbHM6IElNYXJrZG93bk5hdmlnYXRvckxhYmVscztcblxuICAvKipcbiAgICogc3RhcnRBdD86IElNYXJrZG93bk5hdmlnYXRvckl0ZW0gfCBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG4gICAqXG4gICAqIEl0ZW0gb3IgcGF0aCB0byBzdGFydCBhdFxuICAgKi9cbiAgQElucHV0KCkgc3RhcnRBdDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSB8IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcblxuICAvKipcbiAgICogY29weUNvZGVUb0NsaXBib2FyZD86IGJvb2xlYW5cbiAgICpcbiAgICogRGlzcGxheSBjb3B5IGJ1dHRvbiBvbiBjb2RlIHNuaXBwZXRzIHRvIGNvcHkgY29kZSB0byBjbGlwYm9hcmQuXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBjb3B5Q29kZVRvQ2xpcGJvYXJkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIGNvcHlDb2RlVG9vbHRpcHM/OiBJQ29weUNvZGVUb29sdGlwc1xuICAgKlxuICAgKiBUb29sdGlwcyBmb3IgY29weSBidXR0b24gdG8gY29weSBhbmQgdXBvbiBjb3B5aW5nLlxuICAgKi9cbiAgQElucHV0KCkgY29weUNvZGVUb29sdGlwczogSUNvcHlDb2RlVG9vbHRpcHMgPSB7fTtcblxuICAvKipcbiAgICogZm9vdGVyPzogVHlwZTxhbnk+XG4gICAqXG4gICAqIENvbXBvbmVudCB0byBiZSBkaXNwbGF5ZWQgaW4gZm9vdGVyXG4gICAqL1xuICBASW5wdXQoKSBmb290ZXI6IFR5cGU8YW55PjtcblxuICAvKipcbiAgICogY29tcGFyZVdpdGg/OiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aFxuICAgKlxuICAgKiBGdW5jdGlvbiB1c2VkIHRvIGZpbmQgc3RhcnRBdCBpdGVtXG4gICAqIERlZmF1bHRzIHRvIGNvbXBhcmlzb24gYnkgc3RyaWN0IGVxdWFsaXR5ICg9PT0pXG4gICAqL1xuICBASW5wdXQoKSBjb21wYXJlV2l0aDogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGg7XG5cbiAgQE91dHB1dCgpIGJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxJVGRGbGF2b3JlZE1hcmtkb3duQnV0dG9uQ2xpY2tFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnbWFya2Rvd25XcmFwcGVyJykgbWFya2Rvd25XcmFwcGVyOiBFbGVtZW50UmVmO1xuXG4gIGhpc3RvcnlTdGFjazogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gW107IC8vIGhpc3RvcnlcbiAgY3VycmVudE1hcmtkb3duSXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbTsgLy8gY3VycmVudGx5IHJlbmRlcmVkXG4gIGN1cnJlbnRNZW51SXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IFtdOyAvLyBjdXJyZW50IG1lbnUgaXRlbXNcblxuICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgbWFya2Rvd25Mb2FkZXJFcnJvcjogc3RyaW5nO1xuICBjaGlsZHJlblVybEVycm9yOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfbWFya2Rvd25VcmxMb2FkZXJTZXJ2aWNlOiBUZE1hcmtkb3duTG9hZGVyU2VydmljZSxcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCxcbiAgKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgY2xpY2tMaXN0ZW5lcihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD5ldmVudC5zcmNFbGVtZW50O1xuICAgIGlmIChlbGVtZW50Lm1hdGNoZXMoJ2FbaHJlZl0nKSAmJiBpc01hcmtkb3duSHJlZig8SFRNTEFuY2hvckVsZW1lbnQ+ZWxlbWVudCkpIHtcbiAgICAgIHRoaXMuaGFuZGxlTGlua0NsaWNrKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBnZXQgc2hvd0dvQmFja0J1dHRvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldCBzaG93SG9tZUJ1dHRvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMTtcbiAgfVxuXG4gIGdldCBzaG93SGVhZGVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNob3dIb21lQnV0dG9uIHx8IHRoaXMuc2hvd0dvQmFja0J1dHRvbiB8fCAhIXRoaXMuY3VycmVudEl0ZW1UaXRsZTtcbiAgfVxuXG4gIGdldCBzaG93TWVudSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TWVudUl0ZW1zICYmIHRoaXMuY3VycmVudE1lbnVJdGVtcy5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHNob3dUZE1hcmtkb3duTG9hZGVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbSAmJiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbS51cmwgJiYgIXRoaXMuc2hvd1RkTWFya2Rvd247XG4gIH1cblxuICBnZXQgc2hvd1RkTWFya2Rvd24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtICYmICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLm1hcmtkb3duU3RyaW5nO1xuICB9XG5cbiAgZ2V0IHVybCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0udXJsO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZ2V0IGZvb3RlckNvbXBvbmVudCgpOiBhbnkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gJiYgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLmZvb3Rlcikge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5mb290ZXI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZvb3RlcjtcbiAgfVxuICBnZXQgaHR0cE9wdGlvbnMoKTogb2JqZWN0IHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLmh0dHBPcHRpb25zO1xuICAgIH1cbiAgfVxuICBnZXQgbWFya2Rvd25TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLm1hcmtkb3duU3RyaW5nO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhbmNob3IoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLmFuY2hvcjtcbiAgICB9XG4gIH1cblxuICBnZXQgc2hvd0VtcHR5U3RhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLml0ZW1zIHx8IHRoaXMuaXRlbXMubGVuZ3RoIDwgMTtcbiAgfVxuXG4gIGdldCBnb0hvbWVMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZ29Ib21lKSB8fCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9MQUJFTFMuZ29Ib21lO1xuICB9XG5cbiAgZ2V0IGdvQmFja0xhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5nb0JhY2spIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUy5nb0JhY2s7XG4gIH1cblxuICBnZXQgZW1wdHlTdGF0ZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5lbXB0eVN0YXRlKSB8fCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9MQUJFTFMuZW1wdHlTdGF0ZTtcbiAgfVxuXG4gIGdldCBjdXJyZW50SXRlbVRpdGxlKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VGl0bGUodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRpdGxlKHRoaXMuaGlzdG9yeVN0YWNrW3RoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCAtIDFdKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgYXN5bmMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChjaGFuZ2VzLml0ZW1zKSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnN0YXJ0QXQgJiYgdGhpcy5pdGVtcyAmJiB0aGlzLnN0YXJ0QXQpIHtcbiAgICAgIHRoaXMuX2p1bXBUbyh0aGlzLnN0YXJ0QXQsIHVuZGVmaW5lZCk7XG4gICAgfVxuICB9XG5cbiAgaGFzQ2hpbGRyZW5PckNoaWxkcmVuVXJsKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB8fCAhIWl0ZW0uY2hpbGRyZW5Vcmw7XG4gIH1cbiAgY2xlYXJFcnJvcnMoKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrZG93bkxvYWRlckVycm9yID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuY2hpbGRyZW5VcmxFcnJvciA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcbiAgICAvLyBpZiBzaW5nbGUgaXRlbSBhbmQgbm8gY2hpbGRyZW5cbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy5oYXNDaGlsZHJlbk9yQ2hpbGRyZW5VcmwodGhpcy5pdGVtc1swXSkpIHtcbiAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IFtdO1xuICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gdGhpcy5pdGVtc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gdGhpcy5pdGVtcztcbiAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy5oaXN0b3J5U3RhY2sgPSBbXTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdvQmFjaygpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XG4gICAgaWYgKHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDEpIHtcbiAgICAgIGxldCBwYXJlbnQ6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0gPSB0aGlzLmhpc3RvcnlTdGFja1t0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggLSAyXTtcblxuICAgICAgaWYgKHBhcmVudC5zdGFydEF0TGluaykge1xuICAgICAgICBwYXJlbnQgPSB0aGlzLmhpc3RvcnlTdGFja1t0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggLSAzXVxuICAgICAgICAgID8gdGhpcy5oaXN0b3J5U3RhY2tbdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIC0gM11cbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5oaXN0b3J5U3RhY2sgPSB0aGlzLmhpc3RvcnlTdGFjay5zbGljZSgwLCAtMSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gcGFyZW50O1xuICAgICAgICB0aGlzLmhpc3RvcnlTdGFjayA9IHRoaXMuaGlzdG9yeVN0YWNrLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgdGhpcy5zZXRDaGlsZHJlbkFzQ3VycmVudE1lbnVJdGVtcyhwYXJlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBvbmUgbGV2ZWwgZG93biBqdXN0IGdvIHRvIHJvb3RcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBoYW5kbGVJdGVtU2VsZWN0ZWQoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHZvaWQge1xuICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcbiAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSBpdGVtO1xuICAgIHRoaXMuaGlzdG9yeVN0YWNrID0gWy4uLnRoaXMuaGlzdG9yeVN0YWNrLCBpdGVtXTtcbiAgICB0aGlzLnNldENoaWxkcmVuQXNDdXJyZW50TWVudUl0ZW1zKGl0ZW0pO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgYXN5bmMgc2V0Q2hpbGRyZW5Bc0N1cnJlbnRNZW51SXRlbXMoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IFtdO1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICBjb25zdCBzdGFja1NuYXBzaG90OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSB0aGlzLmhpc3RvcnlTdGFjaztcbiAgICBsZXQgY2hpbGRyZW46IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IFtdO1xuICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICBjaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW47XG4gICAgfSBlbHNlIGlmIChpdGVtLmNoaWxkcmVuVXJsKSB7XG4gICAgICBjaGlsZHJlbiA9IGF3YWl0IHRoaXMubG9hZENoaWxkcmVuVXJsKGl0ZW0pO1xuICAgIH1cbiAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoICYmIGl0ZW0uc3RhcnRBdExpbmspIHtcbiAgICAgIHRoaXMuX2p1bXBUbyhpdGVtLnN0YXJ0QXRMaW5rLCBjaGlsZHJlbik7XG4gICAgfVxuICAgIGNvbnN0IG5ld1N0YWNrU25hcHNob3Q6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IHRoaXMuaGlzdG9yeVN0YWNrO1xuICAgIGlmIChcbiAgICAgIHN0YWNrU25hcHNob3QubGVuZ3RoID09PSBuZXdTdGFja1NuYXBzaG90Lmxlbmd0aCAmJlxuICAgICAgc3RhY2tTbmFwc2hvdC5ldmVyeSgoc3RhY2tJdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLCBpbmRleDogbnVtYmVyKSA9PiBzdGFja0l0ZW0gPT09IG5ld1N0YWNrU25hcHNob3RbaW5kZXhdKVxuICAgICkge1xuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gY2hpbGRyZW47XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBhc3luYyBsb2FkQ2hpbGRyZW5VcmwoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IFByb21pc2U8SU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdPiB7XG4gICAgY29uc3Qgc2FuaXRpemVkVXJsOiBzdHJpbmcgPSB0aGlzLl9zYW5pdGl6ZXIuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LlVSTCwgaXRlbS5jaGlsZHJlblVybCk7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9odHRwXG4gICAgICAgIC5nZXQ8SU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdPihzYW5pdGl6ZWRVcmwsIHsgLi4uaXRlbS5odHRwT3B0aW9ucyB9KVxuICAgICAgICAudG9Qcm9taXNlKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMuaGFuZGxlQ2hpbGRyZW5VcmxFcnJvcihlcnJvcik7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgZ2V0VGl0bGUoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHN0cmluZyB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHJlbW92ZUxlYWRpbmdIYXNoKGl0ZW0uYW5jaG9yKSB8fFxuICAgICAgICBpdGVtLnRpdGxlIHx8XG4gICAgICAgIGdldFRpdGxlRnJvbVVybChpdGVtLnVybCkgfHxcbiAgICAgICAgZ2V0VGl0bGVGcm9tTWFya2Rvd25TdHJpbmcoaXRlbS5tYXJrZG93blN0cmluZykgfHxcbiAgICAgICAgJydcbiAgICAgICkudHJpbSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldEljb24oaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHN0cmluZyB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLmljb24gfHwgJ3N1YmplY3QnO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNoaWxkcmVuVXJsRXJyb3IoZXJyb3I6IEVycm9yKTogdm9pZCB7XG4gICAgdGhpcy5jaGlsZHJlblVybEVycm9yID0gZXJyb3IubWVzc2FnZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICBoYW5kbGVNYXJrZG93bkxvYWRlckVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xuICAgIHRoaXMubWFya2Rvd25Mb2FkZXJFcnJvciA9IGVycm9yLm1lc3NhZ2U7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9qdW1wVG8oXG4gICAgaXRlbU9yUGF0aDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSB8IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSxcbiAgICBjaGlsZHJlbjogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBoaXN0b3J5U3RhY2s6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IHRoaXMuaGlzdG9yeVN0YWNrO1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBwYXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW1PclBhdGgpKSB7XG4gICAgICAgIHBhdGggPSBhd2FpdCB0aGlzLmZvbGxvd1BhdGgodGhpcy5pdGVtcywgaXRlbU9yUGF0aCk7XG4gICAgICB9IGVsc2UgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5U3RhY2sgPSBoaXN0b3J5U3RhY2s7XG4gICAgICAgIHBhdGggPSB0aGlzLmZpbmRQYXRoKGNoaWxkcmVuLCBpdGVtT3JQYXRoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhdGggPSB0aGlzLmZpbmRQYXRoKHRoaXMuaXRlbXMsIGl0ZW1PclBhdGgpO1xuICAgICAgfVxuICAgICAgKHBhdGggfHwgW10pLmZvckVhY2goKHBhdGhJdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKSA9PiB0aGlzLmhhbmRsZUl0ZW1TZWxlY3RlZChwYXRoSXRlbSkpO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZm9sbG93UGF0aChcbiAgICBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdLFxuICAgIHBhdGg6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSxcbiAgKTogUHJvbWlzZTxJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10+IHtcbiAgICBsZXQgcGF0aEl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTtcbiAgICBsZXQgY3VycmVudExldmVsOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBpdGVtcztcbiAgICBjb25zdCBjb21wYXJlV2l0aDogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGggPSB0aGlzLmNvbXBhcmVXaXRoIHx8IGRlZmF1bHRDb21wYXJlV2l0aDtcbiAgICBmb3IgKGNvbnN0IHBhdGhJdGVtIG9mIHBhdGgpIHtcbiAgICAgIGNvbnN0IGZvdW5kSXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSA9IGN1cnJlbnRMZXZlbC5maW5kKChpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKSA9PlxuICAgICAgICBjb21wYXJlV2l0aChwYXRoSXRlbSwgaXRlbSksXG4gICAgICApO1xuXG4gICAgICBpZiAoZm91bmRJdGVtKSB7XG4gICAgICAgIHBhdGhJdGVtcyA9IFsuLi5wYXRoSXRlbXMsIGZvdW5kSXRlbV07XG5cbiAgICAgICAgaWYgKGZvdW5kSXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgIGN1cnJlbnRMZXZlbCA9IGZvdW5kSXRlbS5jaGlsZHJlbjtcbiAgICAgICAgfSBlbHNlIGlmIChmb3VuZEl0ZW0uY2hpbGRyZW5VcmwpIHtcbiAgICAgICAgICBjdXJyZW50TGV2ZWwgPSBhd2FpdCB0aGlzLmxvYWRDaGlsZHJlblVybChmb3VuZEl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhdGhJdGVtcy5sZW5ndGggIT09IHBhdGgubGVuZ3RoKSB7XG4gICAgICBwYXRoSXRlbXMgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGhJdGVtcztcbiAgfVxuXG4gIHByaXZhdGUgZmluZFBhdGgoaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSwgaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSB7XG4gICAgY29uc3QgY29tcGFyZVdpdGg6IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoID0gdGhpcy5jb21wYXJlV2l0aCB8fCBkZWZhdWx0Q29tcGFyZVdpdGg7XG4gICAgaWYgKGl0ZW1zKSB7XG4gICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGl0ZW1zKSB7XG4gICAgICAgIGlmIChjb21wYXJlV2l0aChjaGlsZCwgaXRlbSkpIHtcbiAgICAgICAgICByZXR1cm4gW2NoaWxkXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbmNlc3RvcnM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IHRoaXMuZmluZFBhdGgoY2hpbGQuY2hpbGRyZW4sIGl0ZW0pO1xuICAgICAgICBpZiAoYW5jZXN0b3JzKSB7XG4gICAgICAgICAgcmV0dXJuIFtjaGlsZCwgLi4uYW5jZXN0b3JzXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVMaW5rQ2xpY2soZXZlbnQ6IEV2ZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBsaW5rOiBIVE1MQW5jaG9yRWxlbWVudCA9IDxIVE1MQW5jaG9yRWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgY29uc3QgdXJsOiBVUkwgPSBuZXcgVVJMKGxpbmsuaHJlZik7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWFya2Rvd25TdHJpbmc6IHN0cmluZyA9IGF3YWl0IHRoaXMuX21hcmtkb3duVXJsTG9hZGVyU2VydmljZS5sb2FkKHVybC5ocmVmKTtcbiAgICAgIC8vIHBhc3MgaW4gdXJsIHRvIGJlIGFibGUgdG8gdXNlIGN1cnJlbnRNYXJrZG93bkl0ZW0udXJsIGxhdGVyIG9uXG4gICAgICB0aGlzLmhhbmRsZUl0ZW1TZWxlY3RlZCh7IG1hcmtkb3duU3RyaW5nLCB1cmw6IHVybC5ocmVmIH0pO1xuICAgICAgdGhpcy5tYXJrZG93bldyYXBwZXIubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCB3aW46IFdpbmRvdyA9IHdpbmRvdy5vcGVuKHVybC5ocmVmLCAnX2JsYW5rJyk7XG4gICAgICB3aW4uZm9jdXMoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=