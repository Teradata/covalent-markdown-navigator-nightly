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
                template: "<ng-container *ngIf=\"!showEmptyState\">\n  <mat-progress-bar *ngIf=\"loading\" mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n\n  <ng-container *ngIf=\"showHeader\">\n    <div [style.display]=\"'flex'\">\n      <button\n        id=\"td-markdown-navigator-home-button\"\n        *ngIf=\"showHomeButton\"\n        mat-icon-button\n        [matTooltip]=\"goHomeLabel\"\n        (click)=\"reset()\"\n        [attr.data-test]=\"'home-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goHomeLabel\">\n          home\n        </mat-icon>\n      </button>\n\n      <button\n        id=\"td-markdown-navigator-back-button\"\n        *ngIf=\"showGoBackButton\"\n        mat-icon-button\n        [matTooltip]=\"goBackLabel\"\n        (click)=\"goBack()\"\n        [attr.data-test]=\"'back-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goBackLabel\">\n          arrow_back\n        </mat-icon>\n      </button>\n      <span flex *ngIf=\"currentItemTitle\" class=\"mat-body-2 title truncate\" [attr.data-test]=\"'title'\">\n        {{ currentItemTitle }}\n      </span>\n    </div>\n\n    <mat-divider [style.position]=\"'relative'\"></mat-divider>\n  </ng-container>\n\n  <div class=\"scroll-area\" id=\"td-markdown-navigator-content\">\n    <td-message\n      *ngIf=\"childrenUrlError\"\n      [sublabel]=\"childrenUrlError\"\n      color=\"warn\"\n      icon=\"error\"\n      [attr.data-test]=\"'children-url-error'\"\n    ></td-message>\n    <div *ngIf=\"showMenu\" class=\"td-markdown-list\">\n      <mat-action-list>\n        <button\n          *ngFor=\"let item of currentMenuItems; index as index\"\n          [id]=\"'td-markdown-navigator-list-item-' + (item.id ? item.id : index)\"\n          (click)=\"handleItemSelected(item)\"\n          mat-list-item\n          [matTooltip]=\"getTitle(item)\"\n          matTooltipPosition=\"before\"\n          matTooltipShowDelay=\"500\"\n        >\n          <mat-icon matListIcon>\n            {{ getIcon(item) }}\n          </mat-icon>\n          <span matLine class=\"truncate\">\n            {{ getTitle(item) }}\n          </span>\n          <span matLine class=\"truncate\">{{ item.description }}</span>\n          <mat-divider></mat-divider>\n        </button>\n      </mat-action-list>\n    </div>\n\n    <div *ngIf=\"showTdMarkdownLoader || showTdMarkdown\" class=\"markdown-wrapper\" #markdownWrapper>\n      <td-message\n        *ngIf=\"markdownLoaderError\"\n        [sublabel]=\"markdownLoaderError\"\n        color=\"warn\"\n        icon=\"error\"\n        [attr.data-test]=\"'markdown-loader-error'\"\n      ></td-message>\n      <td-flavored-markdown-loader\n        *ngIf=\"showTdMarkdownLoader\"\n        [url]=\"url\"\n        [httpOptions]=\"httpOptions\"\n        [anchor]=\"anchor\"\n        (loadFailed)=\"handleMarkdownLoaderError($event)\"\n      ></td-flavored-markdown-loader>\n\n      <td-flavored-markdown\n        *ngIf=\"showTdMarkdown\"\n        [content]=\"markdownString\"\n        [hostedUrl]=\"url\"\n        [anchor]=\"anchor\"\n        (buttonClicked)=\"buttonClicked.emit($event)\"\n      ></td-flavored-markdown>\n    </div>\n    <ng-container *ngComponentOutlet=\"footerComponent\"></ng-container>\n  </div>\n</ng-container>\n\n<div *ngIf=\"showEmptyState\" layout=\"column\" layout-align=\"center center\" class=\"empty-state\">\n  <mat-icon matListAvatar>subject</mat-icon>\n  <h2>{{ emptyStateLabel }}</h2>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixJQUFJLEVBQ0osTUFBTSxFQUNOLFlBQVksRUFDWixlQUFlLEdBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU5RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRWxELDRDQVlDOzs7SUFYQyxvQ0FBWTs7SUFDWix1Q0FBZTs7SUFDZixxQ0FBYTs7SUFDYiw2Q0FBcUI7O0lBQ3JCLGdEQUF3Qjs7SUFDeEIsd0NBQWdCOztJQUNoQiwwQ0FBb0M7O0lBQ3BDLDZDQUFxQjs7SUFDckIsNkNBQXFCOztJQUNyQixzQ0FBYzs7SUFDZCx3Q0FBbUI7Ozs7O0FBR3JCLDhDQUlDOzs7SUFIQywwQ0FBZ0I7O0lBQ2hCLDBDQUFnQjs7SUFDaEIsOENBQW9COzs7QUFLdEIsTUFBTSxPQUFPLGlDQUFpQyxHQUE2QjtJQUN6RSxNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixVQUFVLEVBQUUsdUJBQXVCO0NBQ3BDOzs7OztBQUVELFNBQVMsZUFBZSxDQUFDLEdBQVc7SUFDbEMsSUFBSSxHQUFHLEVBQUU7O2NBQ0QsSUFBSSxHQUFRLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUM5QixJQUFJ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ICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBUeXBlLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgU2VjdXJpdHlDb250ZXh0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHJlbW92ZUxlYWRpbmdIYXNoLCBpc0FuY2hvckxpbmssIFRkTWFya2Rvd25Mb2FkZXJTZXJ2aWNlIH0gZnJvbSAnQGNvdmFsZW50L21hcmtkb3duJztcbmltcG9ydCB7IElUZEZsYXZvcmVkTWFya2Rvd25CdXR0b25DbGlja0V2ZW50IH0gZnJvbSAnQGNvdmFsZW50L2ZsYXZvcmVkLW1hcmtkb3duJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtIHtcbiAgaWQ/OiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICB1cmw/OiBzdHJpbmc7XG4gIGh0dHBPcHRpb25zPzogb2JqZWN0O1xuICBtYXJrZG93blN0cmluZz86IHN0cmluZzsgLy8gcmF3IG1hcmtkb3duXG4gIGFuY2hvcj86IHN0cmluZztcbiAgY2hpbGRyZW4/OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG4gIGNoaWxkcmVuVXJsPzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgaWNvbj86IHN0cmluZztcbiAgZm9vdGVyPzogVHlwZTxhbnk+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElNYXJrZG93bk5hdmlnYXRvckxhYmVscyB7XG4gIGdvSG9tZT86IHN0cmluZztcbiAgZ29CYWNrPzogc3RyaW5nO1xuICBlbXB0eVN0YXRlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aCA9IChvMTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgbzI6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pID0+IGJvb2xlYW47XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9MQUJFTFM6IElNYXJrZG93bk5hdmlnYXRvckxhYmVscyA9IHtcbiAgZ29Ib21lOiAnR28gaG9tZScsXG4gIGdvQmFjazogJ0dvIGJhY2snLFxuICBlbXB0eVN0YXRlOiAnTm8gaXRlbShzKSB0byBkaXNwbGF5Jyxcbn07XG5cbmZ1bmN0aW9uIGdldFRpdGxlRnJvbVVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICh1cmwpIHtcbiAgICBjb25zdCB0ZW1wOiBVUkwgPSBuZXcgVVJMKHVybCk7XG4gICAgaWYgKHRlbXAuaGFzaCkge1xuICAgICAgcmV0dXJuIHJlbW92ZUxlYWRpbmdIYXNoKHRlbXAuaGFzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBhdGg6IHN0cmluZ1tdID0gdGVtcC5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgICAgY29uc3QgZmlsZU5hbWU6IHN0cmluZyA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcbiAgICAgIHJldHVybiBmaWxlTmFtZS5yZXBsYWNlKC9cXC5bXi8uXSskLywgJycpOyAvLyByZW1vdmUgLm1kXG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGdldFRpdGxlRnJvbU1hcmtkb3duU3RyaW5nKG1hcmtkb3duU3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAobWFya2Rvd25TdHJpbmcpIHtcbiAgICBjb25zdCBmaXJzdExpbmU6IHN0cmluZyA9IG1hcmtkb3duU3RyaW5nLnNwbGl0KC9bXFxyXFxuXSsvKS5maW5kKChsaW5lOiBzdHJpbmcpID0+ICEhbGluZSk7XG4gICAgcmV0dXJuIHJlbW92ZUxlYWRpbmdIYXNoKGZpcnN0TGluZSkudHJpbSgpO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzTWFya2Rvd25IcmVmKGFuY2hvcjogSFRNTEFuY2hvckVsZW1lbnQpOiBib29sZWFuIHtcbiAgcmV0dXJuICFpc0FuY2hvckxpbmsoYW5jaG9yKSAmJiBhbmNob3IucGF0aG5hbWUuZW5kc1dpdGgoJy5tZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmVXaXRoKG8xOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLCBvMjogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IGJvb2xlYW4ge1xuICBpZiAobzEuaWQgJiYgbzIuaWQpIHtcbiAgICByZXR1cm4gbzEuaWQgPT09IG8yLmlkO1xuICB9XG4gIHJldHVybiBvMSA9PT0gbzI7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RkLW1hcmtkb3duLW5hdmlnYXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFRkTWFya2Rvd25OYXZpZ2F0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAvKipcbiAgICogaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXVxuICAgKlxuICAgKiBMaXN0IG9mIElNYXJrZG93bk5hdmlnYXRvckl0ZW1zIHRvIGJlIHJlbmRlcmVkXG4gICAqL1xuICBASW5wdXQoKSBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuXG4gIC8qKlxuICAgKiBsYWJlbHM/OiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHNcbiAgICpcbiAgICogVHJhbnNsYXRlZCBsYWJlbHNcbiAgICovXG4gIEBJbnB1dCgpIGxhYmVsczogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzO1xuXG4gIC8qKlxuICAgKiBzdGFydEF0PzogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSB8IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcbiAgICpcbiAgICogSXRlbSBvciBwYXRoIHRvIHN0YXJ0IGF0XG4gICAqL1xuICBASW5wdXQoKSBzdGFydEF0OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtIHwgSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuXG4gIC8qKlxuICAgKiBmb290ZXI/OiBUeXBlPGFueT5cbiAgICpcbiAgICogQ29tcG9uZW50IHRvIGJlIGRpc3BsYXllZCBpbiBmb290ZXJcbiAgICovXG4gIEBJbnB1dCgpIGZvb3RlcjogVHlwZTxhbnk+O1xuXG4gIC8qKlxuICAgKiBjb21wYXJlV2l0aD86IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoXG4gICAqXG4gICAqIEZ1bmN0aW9uIHVzZWQgdG8gZmluZCBzdGFydEF0IGl0ZW1cbiAgICogRGVmYXVsdHMgdG8gY29tcGFyaXNvbiBieSBzdHJpY3QgZXF1YWxpdHkgKD09PSlcbiAgICovXG4gIEBJbnB1dCgpIGNvbXBhcmVXaXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aDtcblxuICBAT3V0cHV0KCkgYnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPElUZEZsYXZvcmVkTWFya2Rvd25CdXR0b25DbGlja0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCdtYXJrZG93bldyYXBwZXInKSBtYXJrZG93bldyYXBwZXI6IEVsZW1lbnRSZWY7XG5cbiAgaGlzdG9yeVN0YWNrOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTsgLy8gaGlzdG9yeVxuICBjdXJyZW50TWFya2Rvd25JdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtOyAvLyBjdXJyZW50bHkgcmVuZGVyZWRcbiAgY3VycmVudE1lbnVJdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gW107IC8vIGN1cnJlbnQgbWVudSBpdGVtc1xuXG4gIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBtYXJrZG93bkxvYWRlckVycm9yOiBzdHJpbmc7XG4gIGNoaWxkcmVuVXJsRXJyb3I6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9tYXJrZG93blVybExvYWRlclNlcnZpY2U6IFRkTWFya2Rvd25Mb2FkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxuICApIHt9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBjbGlja0xpc3RlbmVyKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmV2ZW50LnNyY0VsZW1lbnQ7XG4gICAgaWYgKGVsZW1lbnQubWF0Y2hlcygnYVtocmVmXScpICYmIGlzTWFya2Rvd25IcmVmKDxIVE1MQW5jaG9yRWxlbWVudD5lbGVtZW50KSkge1xuICAgICAgdGhpcy5oYW5kbGVMaW5rQ2xpY2soZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaG93R29CYWNrQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHNob3dIb21lQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAxO1xuICB9XG5cbiAgZ2V0IHNob3dIZWFkZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd0hvbWVCdXR0b24gfHwgdGhpcy5zaG93R29CYWNrQnV0dG9uIHx8ICEhdGhpcy5jdXJyZW50SXRlbVRpdGxlO1xuICB9XG5cbiAgZ2V0IHNob3dNZW51KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRNZW51SXRlbXMgJiYgdGhpcy5jdXJyZW50TWVudUl0ZW1zLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQgc2hvd1RkTWFya2Rvd25Mb2FkZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtICYmICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLnVybCAmJiAhdGhpcy5zaG93VGRNYXJrZG93bjtcbiAgfVxuXG4gIGdldCBzaG93VGRNYXJrZG93bigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gJiYgISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0ubWFya2Rvd25TdHJpbmc7XG4gIH1cblxuICBnZXQgdXJsKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS51cmw7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXQgZm9vdGVyQ29tcG9uZW50KCk6IGFueSB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSAmJiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uZm9vdGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLmZvb3RlcjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZm9vdGVyO1xuICB9XG4gIGdldCBodHRwT3B0aW9ucygpOiBvYmplY3Qge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uaHR0cE9wdGlvbnM7XG4gICAgfVxuICB9XG4gIGdldCBtYXJrZG93blN0cmluZygpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0ubWFya2Rvd25TdHJpbmc7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFuY2hvcigpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uYW5jaG9yO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaG93RW1wdHlTdGF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXRlbXMgfHwgdGhpcy5pdGVtcy5sZW5ndGggPCAxO1xuICB9XG5cbiAgZ2V0IGdvSG9tZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5nb0hvbWUpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUy5nb0hvbWU7XG4gIH1cblxuICBnZXQgZ29CYWNrTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmdvQmFjaykgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTLmdvQmFjaztcbiAgfVxuXG4gIGdldCBlbXB0eVN0YXRlTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmVtcHR5U3RhdGUpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUy5lbXB0eVN0YXRlO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRJdGVtVGl0bGUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VGl0bGUodGhpcy5oaXN0b3J5U3RhY2tbdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIC0gMV0pO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBhc3luYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGNoYW5nZXMuaXRlbXMpIHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuc3RhcnRBdCAmJiB0aGlzLml0ZW1zICYmIHRoaXMuc3RhcnRBdCkge1xuICAgICAgdGhpcy5fanVtcFRvKHRoaXMuc3RhcnRBdCk7XG4gICAgfVxuICB9XG5cbiAgaGFzQ2hpbGRyZW5PckNoaWxkcmVuVXJsKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB8fCAhIWl0ZW0uY2hpbGRyZW5Vcmw7XG4gIH1cbiAgY2xlYXJFcnJvcnMoKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrZG93bkxvYWRlckVycm9yID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuY2hpbGRyZW5VcmxFcnJvciA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcbiAgICAvLyBpZiBzaW5nbGUgaXRlbSBhbmQgbm8gY2hpbGRyZW5cbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy5oYXNDaGlsZHJlbk9yQ2hpbGRyZW5VcmwodGhpcy5pdGVtc1swXSkpIHtcbiAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IFtdO1xuICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gdGhpcy5pdGVtc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gdGhpcy5pdGVtcztcbiAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy5oaXN0b3J5U3RhY2sgPSBbXTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdvQmFjaygpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XG4gICAgaWYgKHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IHBhcmVudDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSA9IHRoaXMuaGlzdG9yeVN0YWNrW3RoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCAtIDJdO1xuICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gcGFyZW50O1xuICAgICAgdGhpcy5oaXN0b3J5U3RhY2sgPSB0aGlzLmhpc3RvcnlTdGFjay5zbGljZSgwLCAtMSk7XG4gICAgICB0aGlzLnNldENoaWxkcmVuQXNDdXJyZW50TWVudUl0ZW1zKHBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG9uZSBsZXZlbCBkb3duIGp1c3QgZ28gdG8gcm9vdFxuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGhhbmRsZUl0ZW1TZWxlY3RlZChpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckVycm9ycygpO1xuICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IGl0ZW07XG4gICAgdGhpcy5oaXN0b3J5U3RhY2sgPSBbLi4udGhpcy5oaXN0b3J5U3RhY2ssIGl0ZW1dO1xuICAgIHRoaXMuc2V0Q2hpbGRyZW5Bc0N1cnJlbnRNZW51SXRlbXMoaXRlbSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBhc3luYyBzZXRDaGlsZHJlbkFzQ3VycmVudE1lbnVJdGVtcyhpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gW107XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgIGNvbnN0IHN0YWNrU25hcHNob3Q6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IHRoaXMuaGlzdG9yeVN0YWNrO1xuICAgIGxldCBjaGlsZHJlbjogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gW107XG4gICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgIGNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbjtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uY2hpbGRyZW5VcmwpIHtcbiAgICAgIGNoaWxkcmVuID0gYXdhaXQgdGhpcy5sb2FkQ2hpbGRyZW5VcmwoaXRlbSk7XG4gICAgfVxuICAgIGNvbnN0IG5ld1N0YWNrU25hcHNob3Q6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IHRoaXMuaGlzdG9yeVN0YWNrO1xuICAgIGlmIChcbiAgICAgIHN0YWNrU25hcHNob3QubGVuZ3RoID09PSBuZXdTdGFja1NuYXBzaG90Lmxlbmd0aCAmJlxuICAgICAgc3RhY2tTbmFwc2hvdC5ldmVyeSgoc3RhY2tJdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLCBpbmRleDogbnVtYmVyKSA9PiBzdGFja0l0ZW0gPT09IG5ld1N0YWNrU25hcHNob3RbaW5kZXhdKVxuICAgICkge1xuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gY2hpbGRyZW47XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBhc3luYyBsb2FkQ2hpbGRyZW5VcmwoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IFByb21pc2U8SU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdPiB7XG4gICAgY29uc3Qgc2FuaXRpemVkVXJsOiBzdHJpbmcgPSB0aGlzLl9zYW5pdGl6ZXIuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LlVSTCwgaXRlbS5jaGlsZHJlblVybCk7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9odHRwXG4gICAgICAgIC5nZXQ8SU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdPihzYW5pdGl6ZWRVcmwsIHsgLi4uaXRlbS5odHRwT3B0aW9ucyB9KVxuICAgICAgICAudG9Qcm9taXNlKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMuaGFuZGxlQ2hpbGRyZW5VcmxFcnJvcihlcnJvcik7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgZ2V0VGl0bGUoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHN0cmluZyB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHJlbW92ZUxlYWRpbmdIYXNoKGl0ZW0uYW5jaG9yKSB8fFxuICAgICAgICBpdGVtLnRpdGxlIHx8XG4gICAgICAgIGdldFRpdGxlRnJvbVVybChpdGVtLnVybCkgfHxcbiAgICAgICAgZ2V0VGl0bGVGcm9tTWFya2Rvd25TdHJpbmcoaXRlbS5tYXJrZG93blN0cmluZykgfHxcbiAgICAgICAgJydcbiAgICAgICkudHJpbSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldEljb24oaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHN0cmluZyB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLmljb24gfHwgJ3N1YmplY3QnO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNoaWxkcmVuVXJsRXJyb3IoZXJyb3I6IEVycm9yKTogdm9pZCB7XG4gICAgdGhpcy5jaGlsZHJlblVybEVycm9yID0gZXJyb3IubWVzc2FnZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICBoYW5kbGVNYXJrZG93bkxvYWRlckVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xuICAgIHRoaXMubWFya2Rvd25Mb2FkZXJFcnJvciA9IGVycm9yLm1lc3NhZ2U7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9qdW1wVG8oaXRlbU9yUGF0aDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSB8IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBwYXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbU9yUGF0aCkpIHtcbiAgICAgICAgcGF0aCA9IGF3YWl0IHRoaXMuZm9sbG93UGF0aCh0aGlzLml0ZW1zLCBpdGVtT3JQYXRoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhdGggPSB0aGlzLmZpbmRQYXRoKHRoaXMuaXRlbXMsIGl0ZW1PclBhdGgpO1xuICAgICAgfVxuICAgICAgKHBhdGggfHwgW10pLmZvckVhY2goKHBhdGhJdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKSA9PiB0aGlzLmhhbmRsZUl0ZW1TZWxlY3RlZChwYXRoSXRlbSkpO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZm9sbG93UGF0aChcbiAgICBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdLFxuICAgIHBhdGg6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSxcbiAgKTogUHJvbWlzZTxJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10+IHtcbiAgICBsZXQgcGF0aEl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTtcbiAgICBsZXQgY3VycmVudExldmVsOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBpdGVtcztcbiAgICBjb25zdCBjb21wYXJlV2l0aDogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGggPSB0aGlzLmNvbXBhcmVXaXRoIHx8IGRlZmF1bHRDb21wYXJlV2l0aDtcbiAgICBmb3IgKGNvbnN0IHBhdGhJdGVtIG9mIHBhdGgpIHtcbiAgICAgIGNvbnN0IGZvdW5kSXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSA9IGN1cnJlbnRMZXZlbC5maW5kKChpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKSA9PlxuICAgICAgICBjb21wYXJlV2l0aChwYXRoSXRlbSwgaXRlbSksXG4gICAgICApO1xuXG4gICAgICBpZiAoZm91bmRJdGVtKSB7XG4gICAgICAgIHBhdGhJdGVtcyA9IFsuLi5wYXRoSXRlbXMsIGZvdW5kSXRlbV07XG5cbiAgICAgICAgaWYgKGZvdW5kSXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgIGN1cnJlbnRMZXZlbCA9IGZvdW5kSXRlbS5jaGlsZHJlbjtcbiAgICAgICAgfSBlbHNlIGlmIChmb3VuZEl0ZW0uY2hpbGRyZW5VcmwpIHtcbiAgICAgICAgICBjdXJyZW50TGV2ZWwgPSBhd2FpdCB0aGlzLmxvYWRDaGlsZHJlblVybChmb3VuZEl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhdGhJdGVtcy5sZW5ndGggIT09IHBhdGgubGVuZ3RoKSB7XG4gICAgICBwYXRoSXRlbXMgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGhJdGVtcztcbiAgfVxuXG4gIHByaXZhdGUgZmluZFBhdGgoaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSwgaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSB7XG4gICAgY29uc3QgY29tcGFyZVdpdGg6IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoID0gdGhpcy5jb21wYXJlV2l0aCB8fCBkZWZhdWx0Q29tcGFyZVdpdGg7XG4gICAgaWYgKGl0ZW1zKSB7XG4gICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGl0ZW1zKSB7XG4gICAgICAgIGlmIChjb21wYXJlV2l0aChjaGlsZCwgaXRlbSkpIHtcbiAgICAgICAgICByZXR1cm4gW2NoaWxkXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbmNlc3RvcnM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IHRoaXMuZmluZFBhdGgoY2hpbGQuY2hpbGRyZW4sIGl0ZW0pO1xuICAgICAgICBpZiAoYW5jZXN0b3JzKSB7XG4gICAgICAgICAgcmV0dXJuIFtjaGlsZCwgLi4uYW5jZXN0b3JzXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVMaW5rQ2xpY2soZXZlbnQ6IEV2ZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBsaW5rOiBIVE1MQW5jaG9yRWxlbWVudCA9IDxIVE1MQW5jaG9yRWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgY29uc3QgdXJsOiBVUkwgPSBuZXcgVVJMKGxpbmsuaHJlZik7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWFya2Rvd25TdHJpbmc6IHN0cmluZyA9IGF3YWl0IHRoaXMuX21hcmtkb3duVXJsTG9hZGVyU2VydmljZS5sb2FkKHVybC5ocmVmKTtcbiAgICAgIC8vIHBhc3MgaW4gdXJsIHRvIGJlIGFibGUgdG8gdXNlIGN1cnJlbnRNYXJrZG93bkl0ZW0udXJsIGxhdGVyIG9uXG4gICAgICB0aGlzLmhhbmRsZUl0ZW1TZWxlY3RlZCh7IG1hcmtkb3duU3RyaW5nLCB1cmw6IHVybC5ocmVmIH0pO1xuICAgICAgdGhpcy5tYXJrZG93bldyYXBwZXIubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCB3aW46IFdpbmRvdyA9IHdpbmRvdy5vcGVuKHVybC5ocmVmLCAnX2JsYW5rJyk7XG4gICAgICB3aW4uZm9jdXMoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=