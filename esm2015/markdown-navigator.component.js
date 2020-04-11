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
/**
 * @param {?} items
 * @param {?} item
 * @param {?} compareWith
 * @return {?}
 */
function getAncestors(items, item, compareWith) {
    if (items) {
        for (const child of items) {
            if (compareWith(child, item)) {
                return [child];
            }
            /** @type {?} */
            const ancestors = getAncestors(child.children, item, compareWith);
            if (ancestors) {
                return [child, ...ancestors];
            }
        }
    }
    return undefined;
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
        if (changes.items) {
            this.reset();
            if (this.items && this.startAt) {
                this._jumpTo(this.startAt);
            }
        }
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
     * @param {?} item
     * @return {?}
     */
    _jumpTo(item) {
        this.reset();
        if (this.items && this.items.length > 0) {
            /** @type {?} */
            const ancestors = getAncestors(this.items, item, this.compareWith || defaultCompareWith);
            (ancestors || []).forEach((/**
             * @param {?} ancestor
             * @return {?}
             */
            (ancestor) => this.handleItemSelected(ancestor)));
        }
        this._changeDetectorRef.markForCheck();
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
                styles: [":host{position:relative;height:100%;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host .scroll-area{min-height:1px;overflow-y:auto;-webkit-box-flex:1;-ms-flex:1;flex:1;box-sizing:border-box}:host .markdown-wrapper{padding:16px 16px 0}:host .td-markdown-list>.mat-list{padding-top:0}:host td-flavored-markdown-loader ::ng-deep .mat-progress-bar{top:0;left:0;right:0;position:absolute}:host .title{display:inline-block;vertical-align:middle;margin:8px 0;padding-left:16px}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.empty-state{padding:32px}.empty-state mat-icon{font-size:4em}"]
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
     * startAt?: IMarkdownNavigatorItem
     *
     * Item to start to
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixJQUFJLEVBQ0osTUFBTSxFQUNOLFlBQVksRUFDWixlQUFlLEdBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU5RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRWxELDRDQVlDOzs7SUFYQyxvQ0FBWTs7SUFDWix1Q0FBZTs7SUFDZixxQ0FBYTs7SUFDYiw2Q0FBcUI7O0lBQ3JCLGdEQUF3Qjs7SUFDeEIsd0NBQWdCOztJQUNoQiwwQ0FBb0M7O0lBQ3BDLDZDQUFxQjs7SUFDckIsNkNBQXFCOztJQUNyQixzQ0FBYzs7SUFDZCx3Q0FBbUI7Ozs7O0FBR3JCLDhDQUlDOzs7SUFIQywwQ0FBZ0I7O0lBQ2hCLDBDQUFnQjs7SUFDaEIsOENBQW9COzs7QUFLdEIsTUFBTSxPQUFPLGlDQUFpQyxHQUE2QjtJQUN6RSxNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixVQUFVLEVBQUUsdUJBQXVCO0NBQ3BDOzs7OztBQUVELFNBQVMsZUFBZSxDQUFDLEdBQVc7SUFDbEMsSUFBSSxHQUFHLEVBQUU7O2NBQ0QsSUFBSSxHQUFRLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUM5QixJQUFJ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XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgSG9zdExpc3RlbmVyLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVHlwZSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFNlY3VyaXR5Q29udGV4dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyByZW1vdmVMZWFkaW5nSGFzaCwgaXNBbmNob3JMaW5rLCBUZE1hcmtkb3duTG9hZGVyU2VydmljZSB9IGZyb20gJ0Bjb3ZhbGVudC9tYXJrZG93bic7XG5pbXBvcnQgeyBJVGRGbGF2b3JlZE1hcmtkb3duQnV0dG9uQ2xpY2tFdmVudCB9IGZyb20gJ0Bjb3ZhbGVudC9mbGF2b3JlZC1tYXJrZG93bic7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1hcmtkb3duTmF2aWdhdG9ySXRlbSB7XG4gIGlkPzogc3RyaW5nO1xuICB0aXRsZT86IHN0cmluZztcbiAgdXJsPzogc3RyaW5nO1xuICBodHRwT3B0aW9ucz86IG9iamVjdDtcbiAgbWFya2Rvd25TdHJpbmc/OiBzdHJpbmc7IC8vIHJhdyBtYXJrZG93blxuICBhbmNob3I/OiBzdHJpbmc7XG4gIGNoaWxkcmVuPzogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuICBjaGlsZHJlblVybD86IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGljb24/OiBzdHJpbmc7XG4gIGZvb3Rlcj86IFR5cGU8YW55Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMge1xuICBnb0hvbWU/OiBzdHJpbmc7XG4gIGdvQmFjaz86IHN0cmluZztcbiAgZW1wdHlTdGF0ZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGggPSAobzE6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0sIG8yOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKSA9PiBib29sZWFuO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTOiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMgPSB7XG4gIGdvSG9tZTogJ0dvIGhvbWUnLFxuICBnb0JhY2s6ICdHbyBiYWNrJyxcbiAgZW1wdHlTdGF0ZTogJ05vIGl0ZW0ocykgdG8gZGlzcGxheScsXG59O1xuXG5mdW5jdGlvbiBnZXRUaXRsZUZyb21VcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAodXJsKSB7XG4gICAgY29uc3QgdGVtcDogVVJMID0gbmV3IFVSTCh1cmwpO1xuICAgIGlmICh0ZW1wLmhhc2gpIHtcbiAgICAgIHJldHVybiByZW1vdmVMZWFkaW5nSGFzaCh0ZW1wLmhhc2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwYXRoOiBzdHJpbmdbXSA9IHRlbXAucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICAgIGNvbnN0IGZpbGVOYW1lOiBzdHJpbmcgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07XG4gICAgICByZXR1cm4gZmlsZU5hbWUucmVwbGFjZSgvXFwuW14vLl0rJC8sICcnKTsgLy8gcmVtb3ZlIC5tZFxuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBnZXRUaXRsZUZyb21NYXJrZG93blN0cmluZyhtYXJrZG93blN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKG1hcmtkb3duU3RyaW5nKSB7XG4gICAgY29uc3QgZmlyc3RMaW5lOiBzdHJpbmcgPSBtYXJrZG93blN0cmluZy5zcGxpdCgvW1xcclxcbl0rLykuZmluZCgobGluZTogc3RyaW5nKSA9PiAhIWxpbmUpO1xuICAgIHJldHVybiByZW1vdmVMZWFkaW5nSGFzaChmaXJzdExpbmUpLnRyaW0oKTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc01hcmtkb3duSHJlZihhbmNob3I6IEhUTUxBbmNob3JFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiAhaXNBbmNob3JMaW5rKGFuY2hvcikgJiYgYW5jaG9yLnBhdGhuYW1lLmVuZHNXaXRoKCcubWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlV2l0aChvMTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgbzI6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBib29sZWFuIHtcbiAgaWYgKG8xLmlkICYmIG8yLmlkKSB7XG4gICAgcmV0dXJuIG8xLmlkID09PSBvMi5pZDtcbiAgfVxuICByZXR1cm4gbzEgPT09IG8yO1xufVxuXG5mdW5jdGlvbiBnZXRBbmNlc3RvcnMoXG4gIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10sXG4gIGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0sXG4gIGNvbXBhcmVXaXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aCxcbik6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSB7XG4gIGlmIChpdGVtcykge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgaXRlbXMpIHtcbiAgICAgIGlmIChjb21wYXJlV2l0aChjaGlsZCwgaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIFtjaGlsZF07XG4gICAgICB9XG4gICAgICBjb25zdCBhbmNlc3RvcnM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IGdldEFuY2VzdG9ycyhjaGlsZC5jaGlsZHJlbiwgaXRlbSwgY29tcGFyZVdpdGgpO1xuICAgICAgaWYgKGFuY2VzdG9ycykge1xuICAgICAgICByZXR1cm4gW2NoaWxkLCAuLi5hbmNlc3RvcnNdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ZC1tYXJrZG93bi1uYXZpZ2F0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBUZE1hcmtkb3duTmF2aWdhdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW11cbiAgICpcbiAgICogTGlzdCBvZiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtcyB0byBiZSByZW5kZXJlZFxuICAgKi9cbiAgQElucHV0KCkgaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcblxuICAvKipcbiAgICogbGFiZWxzPzogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzXG4gICAqXG4gICAqIFRyYW5zbGF0ZWQgbGFiZWxzXG4gICAqL1xuICBASW5wdXQoKSBsYWJlbHM6IElNYXJrZG93bk5hdmlnYXRvckxhYmVscztcblxuICAvKipcbiAgICogc3RhcnRBdD86IElNYXJrZG93bk5hdmlnYXRvckl0ZW1cbiAgICpcbiAgICogSXRlbSB0byBzdGFydCB0b1xuICAgKi9cbiAgQElucHV0KCkgc3RhcnRBdDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbTtcblxuICAvKipcbiAgICogZm9vdGVyPzogVHlwZTxhbnk+XG4gICAqXG4gICAqIENvbXBvbmVudCB0byBiZSBkaXNwbGF5ZWQgaW4gZm9vdGVyXG4gICAqL1xuICBASW5wdXQoKSBmb290ZXI6IFR5cGU8YW55PjtcblxuICAvKipcbiAgICogY29tcGFyZVdpdGg/OiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aFxuICAgKlxuICAgKiBGdW5jdGlvbiB1c2VkIHRvIGZpbmQgc3RhcnRBdCBpdGVtXG4gICAqIERlZmF1bHRzIHRvIGNvbXBhcmlzb24gYnkgc3RyaWN0IGVxdWFsaXR5ICg9PT0pXG4gICAqL1xuICBASW5wdXQoKSBjb21wYXJlV2l0aDogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGg7XG5cbiAgQE91dHB1dCgpIGJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxJVGRGbGF2b3JlZE1hcmtkb3duQnV0dG9uQ2xpY2tFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnbWFya2Rvd25XcmFwcGVyJykgbWFya2Rvd25XcmFwcGVyOiBFbGVtZW50UmVmO1xuXG4gIGhpc3RvcnlTdGFjazogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gW107IC8vIGhpc3RvcnlcbiAgY3VycmVudE1hcmtkb3duSXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbTsgLy8gY3VycmVudGx5IHJlbmRlcmVkXG4gIGN1cnJlbnRNZW51SXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IFtdOyAvLyBjdXJyZW50IG1lbnUgaXRlbXNcblxuICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgbWFya2Rvd25Mb2FkZXJFcnJvcjogc3RyaW5nO1xuICBjaGlsZHJlblVybEVycm9yOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfbWFya2Rvd25VcmxMb2FkZXJTZXJ2aWNlOiBUZE1hcmtkb3duTG9hZGVyU2VydmljZSxcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCxcbiAgKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgY2xpY2tMaXN0ZW5lcihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD5ldmVudC5zcmNFbGVtZW50O1xuICAgIGlmIChlbGVtZW50Lm1hdGNoZXMoJ2FbaHJlZl0nKSAmJiBpc01hcmtkb3duSHJlZig8SFRNTEFuY2hvckVsZW1lbnQ+ZWxlbWVudCkpIHtcbiAgICAgIHRoaXMuaGFuZGxlTGlua0NsaWNrKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBnZXQgc2hvd0dvQmFja0J1dHRvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldCBzaG93SG9tZUJ1dHRvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMTtcbiAgfVxuXG4gIGdldCBzaG93SGVhZGVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNob3dIb21lQnV0dG9uIHx8IHRoaXMuc2hvd0dvQmFja0J1dHRvbiB8fCAhIXRoaXMuY3VycmVudEl0ZW1UaXRsZTtcbiAgfVxuXG4gIGdldCBzaG93TWVudSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TWVudUl0ZW1zICYmIHRoaXMuY3VycmVudE1lbnVJdGVtcy5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHNob3dUZE1hcmtkb3duTG9hZGVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbSAmJiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbS51cmwgJiYgIXRoaXMuc2hvd1RkTWFya2Rvd247XG4gIH1cblxuICBnZXQgc2hvd1RkTWFya2Rvd24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtICYmICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLm1hcmtkb3duU3RyaW5nO1xuICB9XG5cbiAgZ2V0IHVybCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0udXJsO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZ2V0IGZvb3RlckNvbXBvbmVudCgpOiBhbnkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gJiYgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLmZvb3Rlcikge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5mb290ZXI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZvb3RlcjtcbiAgfVxuICBnZXQgaHR0cE9wdGlvbnMoKTogb2JqZWN0IHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLmh0dHBPcHRpb25zO1xuICAgIH1cbiAgfVxuICBnZXQgbWFya2Rvd25TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLm1hcmtkb3duU3RyaW5nO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhbmNob3IoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLmFuY2hvcjtcbiAgICB9XG4gIH1cblxuICBnZXQgc2hvd0VtcHR5U3RhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLml0ZW1zIHx8IHRoaXMuaXRlbXMubGVuZ3RoIDwgMTtcbiAgfVxuXG4gIGdldCBnb0hvbWVMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZ29Ib21lKSB8fCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9MQUJFTFMuZ29Ib21lO1xuICB9XG5cbiAgZ2V0IGdvQmFja0xhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5nb0JhY2spIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUy5nb0JhY2s7XG4gIH1cblxuICBnZXQgZW1wdHlTdGF0ZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5lbXB0eVN0YXRlKSB8fCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9MQUJFTFMuZW1wdHlTdGF0ZTtcbiAgfVxuXG4gIGdldCBjdXJyZW50SXRlbVRpdGxlKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VGl0bGUodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRpdGxlKHRoaXMuaGlzdG9yeVN0YWNrW3RoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCAtIDFdKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLml0ZW1zKSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLnN0YXJ0QXQpIHtcbiAgICAgICAgdGhpcy5fanVtcFRvKHRoaXMuc3RhcnRBdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzQ2hpbGRyZW5PckNoaWxkcmVuVXJsKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB8fCAhIWl0ZW0uY2hpbGRyZW5Vcmw7XG4gIH1cbiAgY2xlYXJFcnJvcnMoKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrZG93bkxvYWRlckVycm9yID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuY2hpbGRyZW5VcmxFcnJvciA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcbiAgICAvLyBpZiBzaW5nbGUgaXRlbSBhbmQgbm8gY2hpbGRyZW5cbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy5oYXNDaGlsZHJlbk9yQ2hpbGRyZW5VcmwodGhpcy5pdGVtc1swXSkpIHtcbiAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IFtdO1xuICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gdGhpcy5pdGVtc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gdGhpcy5pdGVtcztcbiAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy5oaXN0b3J5U3RhY2sgPSBbXTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdvQmFjaygpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XG4gICAgaWYgKHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IHBhcmVudDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSA9IHRoaXMuaGlzdG9yeVN0YWNrW3RoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCAtIDJdO1xuICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gcGFyZW50O1xuICAgICAgdGhpcy5oaXN0b3J5U3RhY2sgPSB0aGlzLmhpc3RvcnlTdGFjay5zbGljZSgwLCAtMSk7XG4gICAgICB0aGlzLnNldENoaWxkcmVuQXNDdXJyZW50TWVudUl0ZW1zKHBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG9uZSBsZXZlbCBkb3duIGp1c3QgZ28gdG8gcm9vdFxuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGhhbmRsZUl0ZW1TZWxlY3RlZChpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckVycm9ycygpO1xuICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IGl0ZW07XG4gICAgdGhpcy5oaXN0b3J5U3RhY2sgPSBbLi4udGhpcy5oaXN0b3J5U3RhY2ssIGl0ZW1dO1xuICAgIHRoaXMuc2V0Q2hpbGRyZW5Bc0N1cnJlbnRNZW51SXRlbXMoaXRlbSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBhc3luYyBzZXRDaGlsZHJlbkFzQ3VycmVudE1lbnVJdGVtcyhpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gW107XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgIGNvbnN0IHN0YWNrU25hcHNob3Q6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IHRoaXMuaGlzdG9yeVN0YWNrO1xuICAgIGxldCBjaGlsZHJlbjogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gW107XG4gICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgIGNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbjtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uY2hpbGRyZW5VcmwpIHtcbiAgICAgIGNoaWxkcmVuID0gYXdhaXQgdGhpcy5sb2FkQ2hpbGRyZW5VcmwoaXRlbSk7XG4gICAgfVxuICAgIGNvbnN0IG5ld1N0YWNrU25hcHNob3Q6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IHRoaXMuaGlzdG9yeVN0YWNrO1xuICAgIGlmIChcbiAgICAgIHN0YWNrU25hcHNob3QubGVuZ3RoID09PSBuZXdTdGFja1NuYXBzaG90Lmxlbmd0aCAmJlxuICAgICAgc3RhY2tTbmFwc2hvdC5ldmVyeSgoc3RhY2tJdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLCBpbmRleDogbnVtYmVyKSA9PiBzdGFja0l0ZW0gPT09IG5ld1N0YWNrU25hcHNob3RbaW5kZXhdKVxuICAgICkge1xuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gY2hpbGRyZW47XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBhc3luYyBsb2FkQ2hpbGRyZW5VcmwoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IFByb21pc2U8SU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdPiB7XG4gICAgY29uc3Qgc2FuaXRpemVkVXJsOiBzdHJpbmcgPSB0aGlzLl9zYW5pdGl6ZXIuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LlVSTCwgaXRlbS5jaGlsZHJlblVybCk7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9odHRwXG4gICAgICAgIC5nZXQ8SU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdPihzYW5pdGl6ZWRVcmwsIHsgLi4uaXRlbS5odHRwT3B0aW9ucyB9KVxuICAgICAgICAudG9Qcm9taXNlKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMuaGFuZGxlQ2hpbGRyZW5VcmxFcnJvcihlcnJvcik7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgZ2V0VGl0bGUoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHN0cmluZyB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHJlbW92ZUxlYWRpbmdIYXNoKGl0ZW0uYW5jaG9yKSB8fFxuICAgICAgICBpdGVtLnRpdGxlIHx8XG4gICAgICAgIGdldFRpdGxlRnJvbVVybChpdGVtLnVybCkgfHxcbiAgICAgICAgZ2V0VGl0bGVGcm9tTWFya2Rvd25TdHJpbmcoaXRlbS5tYXJrZG93blN0cmluZykgfHxcbiAgICAgICAgJydcbiAgICAgICkudHJpbSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldEljb24oaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHN0cmluZyB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLmljb24gfHwgJ3N1YmplY3QnO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNoaWxkcmVuVXJsRXJyb3IoZXJyb3I6IEVycm9yKTogdm9pZCB7XG4gICAgdGhpcy5jaGlsZHJlblVybEVycm9yID0gZXJyb3IubWVzc2FnZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICBoYW5kbGVNYXJrZG93bkxvYWRlckVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xuICAgIHRoaXMubWFya2Rvd25Mb2FkZXJFcnJvciA9IGVycm9yLm1lc3NhZ2U7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9qdW1wVG8oaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHZvaWQge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGFuY2VzdG9yczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gZ2V0QW5jZXN0b3JzKFxuICAgICAgICB0aGlzLml0ZW1zLFxuICAgICAgICBpdGVtLFxuICAgICAgICB0aGlzLmNvbXBhcmVXaXRoIHx8IGRlZmF1bHRDb21wYXJlV2l0aCxcbiAgICAgICk7XG4gICAgICAoYW5jZXN0b3JzIHx8IFtdKS5mb3JFYWNoKChhbmNlc3RvcjogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSkgPT4gdGhpcy5oYW5kbGVJdGVtU2VsZWN0ZWQoYW5jZXN0b3IpKTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUxpbmtDbGljayhldmVudDogRXZlbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGxpbms6IEhUTUxBbmNob3JFbGVtZW50ID0gPEhUTUxBbmNob3JFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICBjb25zdCB1cmw6IFVSTCA9IG5ldyBVUkwobGluay5ocmVmKTtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYXJrZG93blN0cmluZzogc3RyaW5nID0gYXdhaXQgdGhpcy5fbWFya2Rvd25VcmxMb2FkZXJTZXJ2aWNlLmxvYWQodXJsLmhyZWYpO1xuICAgICAgLy8gcGFzcyBpbiB1cmwgdG8gYmUgYWJsZSB0byB1c2UgY3VycmVudE1hcmtkb3duSXRlbS51cmwgbGF0ZXIgb25cbiAgICAgIHRoaXMuaGFuZGxlSXRlbVNlbGVjdGVkKHsgbWFya2Rvd25TdHJpbmcsIHVybDogdXJsLmhyZWYgfSk7XG4gICAgICB0aGlzLm1hcmtkb3duV3JhcHBlci5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IHdpbjogV2luZG93ID0gd2luZG93Lm9wZW4odXJsLmhyZWYsICdfYmxhbmsnKTtcbiAgICAgIHdpbi5mb2N1cygpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==