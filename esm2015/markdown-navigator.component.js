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
                template: "<ng-container *ngIf=\"!showEmptyState\">\n  <mat-progress-bar *ngIf=\"loading\" mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n\n  <ng-container *ngIf=\"showHeader\">\n    <div [style.display]=\"'flex'\">\n      <button\n        *ngIf=\"showHomeButton\"\n        mat-icon-button\n        [matTooltip]=\"goHomeLabel\"\n        (click)=\"reset()\"\n        [attr.data-test]=\"'home-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goHomeLabel\">\n          home\n        </mat-icon>\n      </button>\n\n      <button\n        *ngIf=\"showGoBackButton\"\n        mat-icon-button\n        [matTooltip]=\"goBackLabel\"\n        (click)=\"goBack()\"\n        [attr.data-test]=\"'back-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goBackLabel\">\n          arrow_back\n        </mat-icon>\n      </button>\n      <span flex *ngIf=\"currentItemTitle\" class=\"mat-body-2 title truncate\" [attr.data-test]=\"'title'\">\n        {{ currentItemTitle }}\n      </span>\n    </div>\n\n    <mat-divider [style.position]=\"'relative'\"></mat-divider>\n  </ng-container>\n\n  <div class=\"scroll-area\">\n    <td-message\n      *ngIf=\"childrenUrlError\"\n      [sublabel]=\"childrenUrlError\"\n      color=\"warn\"\n      icon=\"error\"\n      [attr.data-test]=\"'children-url-error'\"\n    ></td-message>\n    <div *ngIf=\"showMenu\" class=\"td-markdown-list\">\n      <mat-action-list>\n        <button\n          *ngFor=\"let item of currentMenuItems\"\n          (click)=\"handleItemSelected(item)\"\n          mat-list-item\n          [matTooltip]=\"getTitle(item)\"\n          matTooltipPosition=\"before\"\n          matTooltipShowDelay=\"500\"\n        >\n          <mat-icon matListIcon>\n            {{ getIcon(item) }}\n          </mat-icon>\n          <span matLine class=\"truncate\">\n            {{ getTitle(item) }}\n          </span>\n          <span matLine class=\"truncate\">{{ item.description }}</span>\n          <mat-divider></mat-divider>\n        </button>\n      </mat-action-list>\n    </div>\n\n    <div *ngIf=\"showTdMarkdownLoader || showTdMarkdown\" class=\"markdown-wrapper\" #markdownWrapper>\n      <td-message\n        *ngIf=\"markdownLoaderError\"\n        [sublabel]=\"markdownLoaderError\"\n        color=\"warn\"\n        icon=\"error\"\n        [attr.data-test]=\"'markdown-loader-error'\"\n      ></td-message>\n      <td-flavored-markdown-loader\n        *ngIf=\"showTdMarkdownLoader\"\n        [url]=\"url\"\n        [httpOptions]=\"httpOptions\"\n        [anchor]=\"anchor\"\n        (loadFailed)=\"handleMarkdownLoaderError($event)\"\n      ></td-flavored-markdown-loader>\n\n      <td-flavored-markdown\n        *ngIf=\"showTdMarkdown\"\n        [content]=\"markdownString\"\n        [hostedUrl]=\"url\"\n        [anchor]=\"anchor\"\n        (buttonClicked)=\"buttonClicked.emit($event)\"\n      ></td-flavored-markdown>\n    </div>\n    <ng-container *ngComponentOutlet=\"footerComponent\"></ng-container>\n  </div>\n</ng-container>\n\n<div *ngIf=\"showEmptyState\" layout=\"column\" layout-align=\"center center\" class=\"empty-state\">\n  <mat-icon matListAvatar>subject</mat-icon>\n  <h2>{{ emptyStateLabel }}</h2>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixJQUFJLEVBQ0osTUFBTSxFQUNOLFlBQVksRUFDWixlQUFlLEdBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU5RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRWxELDRDQVdDOzs7SUFWQyx1Q0FBZTs7SUFDZixxQ0FBYTs7SUFDYiw2Q0FBcUI7O0lBQ3JCLGdEQUF3Qjs7SUFDeEIsd0NBQWdCOztJQUNoQiwwQ0FBb0M7O0lBQ3BDLDZDQUFxQjs7SUFDckIsNkNBQXFCOztJQUNyQixzQ0FBYzs7SUFDZCx3Q0FBbUI7Ozs7O0FBR3JCLDhDQUlDOzs7SUFIQywwQ0FBZ0I7O0lBQ2hCLDBDQUFnQjs7SUFDaEIsOENBQW9COzs7QUFLdEIsTUFBTSxPQUFPLGlDQUFpQyxHQUE2QjtJQUN6RSxNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixVQUFVLEVBQUUsdUJBQXVCO0NBQ3BDOzs7OztBQUVELFNBQVMsZUFBZSxDQUFDLEdBQVc7SUFDbEMsSUFBSSxHQUFHLEVBQUU7O2NBQ0QsSUFBSSxHQUFRLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUM5QixJQUFJLElBQUksQ0FBQyxJ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QU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7Z0JBQ25ELEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNiO29CQUFTO2dCQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3RCO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pDLENBQUM7S0FBQTs7O1lBN1NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyx1b0dBQWtEO2dCQUVsRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFyRnlDLHVCQUF1QjtZQVAvRCxpQkFBaUI7WUFTVixZQUFZO1lBQ1osVUFBVTs7O29CQXlGaEIsS0FBSztxQkFPTCxLQUFLO3NCQU9MLEtBQUs7cUJBT0wsS0FBSzswQkFRTCxLQUFLOzRCQUVMLE1BQU07OEJBRU4sU0FBUyxTQUFDLGlCQUFpQjs0QkFrQjNCLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7OztJQW5EakMsNkNBQXlDOzs7Ozs7O0lBT3pDLDhDQUEwQzs7Ozs7OztJQU8xQywrQ0FBeUM7Ozs7Ozs7SUFPekMsOENBQTJCOzs7Ozs7OztJQVEzQixtREFBb0Q7O0lBRXBELHFEQUFnRzs7SUFFaEcsdURBQTBEOztJQUUxRCxvREFBNEM7O0lBQzVDLDJEQUE0Qzs7SUFDNUMsd0RBQWdEOztJQUVoRCwrQ0FBeUI7O0lBRXpCLDJEQUE0Qjs7SUFDNUIsd0RBQXlCOzs7OztJQUd2QixpRUFBMEQ7Ozs7O0lBQzFELDBEQUE2Qzs7Ozs7SUFDN0Msa0RBQWdDOzs7OztJQUNoQyw2Q0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFR5cGUsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBTZWN1cml0eUNvbnRleHQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcmVtb3ZlTGVhZGluZ0hhc2gsIGlzQW5jaG9yTGluaywgVGRNYXJrZG93bkxvYWRlclNlcnZpY2UgfSBmcm9tICdAY292YWxlbnQvbWFya2Rvd24nO1xuaW1wb3J0IHsgSVRkRmxhdm9yZWRNYXJrZG93bkJ1dHRvbkNsaWNrRXZlbnQgfSBmcm9tICdAY292YWxlbnQvZmxhdm9yZWQtbWFya2Rvd24nO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYXJrZG93bk5hdmlnYXRvckl0ZW0ge1xuICB0aXRsZT86IHN0cmluZztcbiAgdXJsPzogc3RyaW5nO1xuICBodHRwT3B0aW9ucz86IG9iamVjdDtcbiAgbWFya2Rvd25TdHJpbmc/OiBzdHJpbmc7IC8vIHJhdyBtYXJrZG93blxuICBhbmNob3I/OiBzdHJpbmc7XG4gIGNoaWxkcmVuPzogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuICBjaGlsZHJlblVybD86IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGljb24/OiBzdHJpbmc7XG4gIGZvb3Rlcj86IFR5cGU8YW55Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMge1xuICBnb0hvbWU/OiBzdHJpbmc7XG4gIGdvQmFjaz86IHN0cmluZztcbiAgZW1wdHlTdGF0ZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGggPSAobzE6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0sIG8yOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKSA9PiBib29sZWFuO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTOiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMgPSB7XG4gIGdvSG9tZTogJ0dvIGhvbWUnLFxuICBnb0JhY2s6ICdHbyBiYWNrJyxcbiAgZW1wdHlTdGF0ZTogJ05vIGl0ZW0ocykgdG8gZGlzcGxheScsXG59O1xuXG5mdW5jdGlvbiBnZXRUaXRsZUZyb21VcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAodXJsKSB7XG4gICAgY29uc3QgdGVtcDogVVJMID0gbmV3IFVSTCh1cmwpO1xuICAgIGlmICh0ZW1wLmhhc2gpIHtcbiAgICAgIHJldHVybiByZW1vdmVMZWFkaW5nSGFzaCh0ZW1wLmhhc2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwYXRoOiBzdHJpbmdbXSA9IHRlbXAucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICAgIGNvbnN0IGZpbGVOYW1lOiBzdHJpbmcgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07XG4gICAgICByZXR1cm4gZmlsZU5hbWUucmVwbGFjZSgvXFwuW14vLl0rJC8sICcnKTsgLy8gcmVtb3ZlIC5tZFxuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBnZXRUaXRsZUZyb21NYXJrZG93blN0cmluZyhtYXJrZG93blN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKG1hcmtkb3duU3RyaW5nKSB7XG4gICAgY29uc3QgZmlyc3RMaW5lOiBzdHJpbmcgPSBtYXJrZG93blN0cmluZy5zcGxpdCgvW1xcclxcbl0rLykuZmluZCgobGluZTogc3RyaW5nKSA9PiAhIWxpbmUpO1xuICAgIHJldHVybiByZW1vdmVMZWFkaW5nSGFzaChmaXJzdExpbmUpLnRyaW0oKTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc01hcmtkb3duSHJlZihhbmNob3I6IEhUTUxBbmNob3JFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiAhaXNBbmNob3JMaW5rKGFuY2hvcikgJiYgYW5jaG9yLnBhdGhuYW1lLmVuZHNXaXRoKCcubWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlV2l0aChvMTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgbzI6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBib29sZWFuIHtcbiAgcmV0dXJuIG8xID09PSBvMjtcbn1cblxuZnVuY3Rpb24gZ2V0QW5jZXN0b3JzKFxuICBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdLFxuICBpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLFxuICBjb21wYXJlV2l0aDogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGgsXG4pOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10ge1xuICBpZiAoaXRlbXMpIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGl0ZW1zKSB7XG4gICAgICBpZiAoY29tcGFyZVdpdGgoY2hpbGQsIGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiBbY2hpbGRdO1xuICAgICAgfVxuICAgICAgY29uc3QgYW5jZXN0b3JzOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBnZXRBbmNlc3RvcnMoY2hpbGQuY2hpbGRyZW4sIGl0ZW0sIGNvbXBhcmVXaXRoKTtcbiAgICAgIGlmIChhbmNlc3RvcnMpIHtcbiAgICAgICAgcmV0dXJuIFtjaGlsZCwgLi4uYW5jZXN0b3JzXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGQtbWFya2Rvd24tbmF2aWdhdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVGRNYXJrZG93bk5hdmlnYXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdXG4gICAqXG4gICAqIExpc3Qgb2YgSU1hcmtkb3duTmF2aWdhdG9ySXRlbXMgdG8gYmUgcmVuZGVyZWRcbiAgICovXG4gIEBJbnB1dCgpIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG5cbiAgLyoqXG4gICAqIGxhYmVscz86IElNYXJrZG93bk5hdmlnYXRvckxhYmVsc1xuICAgKlxuICAgKiBUcmFuc2xhdGVkIGxhYmVsc1xuICAgKi9cbiAgQElucHV0KCkgbGFiZWxzOiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHM7XG5cbiAgLyoqXG4gICAqIHN0YXJ0QXQ/OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtXG4gICAqXG4gICAqIEl0ZW0gdG8gc3RhcnQgdG9cbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0QXQ6IElNYXJrZG93bk5hdmlnYXRvckl0ZW07XG5cbiAgLyoqXG4gICAqIGZvb3Rlcj86IFR5cGU8YW55PlxuICAgKlxuICAgKiBDb21wb25lbnQgdG8gYmUgZGlzcGxheWVkIGluIGZvb3RlclxuICAgKi9cbiAgQElucHV0KCkgZm9vdGVyOiBUeXBlPGFueT47XG5cbiAgLyoqXG4gICAqIGNvbXBhcmVXaXRoPzogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGhcbiAgICpcbiAgICogRnVuY3Rpb24gdXNlZCB0byBmaW5kIHN0YXJ0QXQgaXRlbVxuICAgKiBEZWZhdWx0cyB0byBjb21wYXJpc29uIGJ5IHN0cmljdCBlcXVhbGl0eSAoPT09KVxuICAgKi9cbiAgQElucHV0KCkgY29tcGFyZVdpdGg6IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoO1xuXG4gIEBPdXRwdXQoKSBidXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8SVRkRmxhdm9yZWRNYXJrZG93bkJ1dHRvbkNsaWNrRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ21hcmtkb3duV3JhcHBlcicpIG1hcmtkb3duV3JhcHBlcjogRWxlbWVudFJlZjtcblxuICBoaXN0b3J5U3RhY2s6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IFtdOyAvLyBoaXN0b3J5XG4gIGN1cnJlbnRNYXJrZG93bkl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW07IC8vIGN1cnJlbnRseSByZW5kZXJlZFxuICBjdXJyZW50TWVudUl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTsgLy8gY3VycmVudCBtZW51IGl0ZW1zXG5cbiAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG1hcmtkb3duTG9hZGVyRXJyb3I6IHN0cmluZztcbiAgY2hpbGRyZW5VcmxFcnJvcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX21hcmtkb3duVXJsTG9hZGVyU2VydmljZTogVGRNYXJrZG93bkxvYWRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgIHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsXG4gICkge31cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIGNsaWNrTGlzdGVuZXIoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcbiAgICBpZiAoZWxlbWVudC5tYXRjaGVzKCdhW2hyZWZdJykgJiYgaXNNYXJrZG93bkhyZWYoPEhUTUxBbmNob3JFbGVtZW50PmVsZW1lbnQpKSB7XG4gICAgICB0aGlzLmhhbmRsZUxpbmtDbGljayhldmVudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNob3dHb0JhY2tCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQgc2hvd0hvbWVCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDE7XG4gIH1cblxuICBnZXQgc2hvd0hlYWRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaG93SG9tZUJ1dHRvbiB8fCB0aGlzLnNob3dHb0JhY2tCdXR0b24gfHwgISF0aGlzLmN1cnJlbnRJdGVtVGl0bGU7XG4gIH1cblxuICBnZXQgc2hvd01lbnUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1lbnVJdGVtcyAmJiB0aGlzLmN1cnJlbnRNZW51SXRlbXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldCBzaG93VGRNYXJrZG93bkxvYWRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gJiYgISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0udXJsICYmICF0aGlzLnNob3dUZE1hcmtkb3duO1xuICB9XG5cbiAgZ2V0IHNob3dUZE1hcmtkb3duKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbSAmJiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5tYXJrZG93blN0cmluZztcbiAgfVxuXG4gIGdldCB1cmwoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLnVybDtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldCBmb290ZXJDb21wb25lbnQoKTogYW55IHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtICYmIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5mb290ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uZm9vdGVyO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mb290ZXI7XG4gIH1cbiAgZ2V0IGh0dHBPcHRpb25zKCk6IG9iamVjdCB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5odHRwT3B0aW9ucztcbiAgICB9XG4gIH1cbiAgZ2V0IG1hcmtkb3duU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5tYXJrZG93blN0cmluZztcbiAgICB9XG4gIH1cblxuICBnZXQgYW5jaG9yKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5hbmNob3I7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNob3dFbXB0eVN0YXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pdGVtcyB8fCB0aGlzLml0ZW1zLmxlbmd0aCA8IDE7XG4gIH1cblxuICBnZXQgZ29Ib21lTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmdvSG9tZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTLmdvSG9tZTtcbiAgfVxuXG4gIGdldCBnb0JhY2tMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZ29CYWNrKSB8fCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9MQUJFTFMuZ29CYWNrO1xuICB9XG5cbiAgZ2V0IGVtcHR5U3RhdGVMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZW1wdHlTdGF0ZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTLmVtcHR5U3RhdGU7XG4gIH1cblxuICBnZXQgY3VycmVudEl0ZW1UaXRsZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRpdGxlKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSh0aGlzLmhpc3RvcnlTdGFja1t0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggLSAxXSk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5pdGVtcykge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5zdGFydEF0KSB7XG4gICAgICAgIHRoaXMuX2p1bXBUbyh0aGlzLnN0YXJ0QXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhc0NoaWxkcmVuT3JDaGlsZHJlblVybChpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkgfHwgISFpdGVtLmNoaWxkcmVuVXJsO1xuICB9XG4gIGNsZWFyRXJyb3JzKCk6IHZvaWQge1xuICAgIHRoaXMubWFya2Rvd25Mb2FkZXJFcnJvciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNoaWxkcmVuVXJsRXJyb3IgPSB1bmRlZmluZWQ7XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XG4gICAgLy8gaWYgc2luZ2xlIGl0ZW0gYW5kIG5vIGNoaWxkcmVuXG4gICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5sZW5ndGggPT09IDEgJiYgIXRoaXMuaGFzQ2hpbGRyZW5PckNoaWxkcmVuVXJsKHRoaXMuaXRlbXNbMF0pKSB7XG4gICAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSBbXTtcbiAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IHRoaXMuaXRlbXNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IHRoaXMuaXRlbXM7XG4gICAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuaGlzdG9yeVN0YWNrID0gW107XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnb0JhY2soKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5jbGVhckVycm9ycygpO1xuICAgIGlmICh0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBwYXJlbnQ6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0gPSB0aGlzLmhpc3RvcnlTdGFja1t0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggLSAyXTtcbiAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IHBhcmVudDtcbiAgICAgIHRoaXMuaGlzdG9yeVN0YWNrID0gdGhpcy5oaXN0b3J5U3RhY2suc2xpY2UoMCwgLTEpO1xuICAgICAgdGhpcy5zZXRDaGlsZHJlbkFzQ3VycmVudE1lbnVJdGVtcyhwYXJlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBvbmUgbGV2ZWwgZG93biBqdXN0IGdvIHRvIHJvb3RcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBoYW5kbGVJdGVtU2VsZWN0ZWQoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHZvaWQge1xuICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcbiAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSBpdGVtO1xuICAgIHRoaXMuaGlzdG9yeVN0YWNrID0gWy4uLnRoaXMuaGlzdG9yeVN0YWNrLCBpdGVtXTtcbiAgICB0aGlzLnNldENoaWxkcmVuQXNDdXJyZW50TWVudUl0ZW1zKGl0ZW0pO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgYXN5bmMgc2V0Q2hpbGRyZW5Bc0N1cnJlbnRNZW51SXRlbXMoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IFtdO1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICBjb25zdCBzdGFja1NuYXBzaG90OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSB0aGlzLmhpc3RvcnlTdGFjaztcbiAgICBsZXQgY2hpbGRyZW46IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IFtdO1xuICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICBjaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW47XG4gICAgfSBlbHNlIGlmIChpdGVtLmNoaWxkcmVuVXJsKSB7XG4gICAgICBjaGlsZHJlbiA9IGF3YWl0IHRoaXMubG9hZENoaWxkcmVuVXJsKGl0ZW0pO1xuICAgIH1cbiAgICBjb25zdCBuZXdTdGFja1NuYXBzaG90OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSB0aGlzLmhpc3RvcnlTdGFjaztcbiAgICBpZiAoXG4gICAgICBzdGFja1NuYXBzaG90Lmxlbmd0aCA9PT0gbmV3U3RhY2tTbmFwc2hvdC5sZW5ndGggJiZcbiAgICAgIHN0YWNrU25hcHNob3QuZXZlcnkoKHN0YWNrSXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgaW5kZXg6IG51bWJlcikgPT4gc3RhY2tJdGVtID09PSBuZXdTdGFja1NuYXBzaG90W2luZGV4XSlcbiAgICApIHtcbiAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IGNoaWxkcmVuO1xuICAgIH1cblxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgYXN5bmMgbG9hZENoaWxkcmVuVXJsKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBQcm9taXNlPElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXT4ge1xuICAgIGNvbnN0IHNhbml0aXplZFVybDogc3RyaW5nID0gdGhpcy5fc2FuaXRpemVyLnNhbml0aXplKFNlY3VyaXR5Q29udGV4dC5VUkwsIGl0ZW0uY2hpbGRyZW5VcmwpO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5faHR0cFxuICAgICAgICAuZ2V0PElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXT4oc2FuaXRpemVkVXJsLCB7IC4uLml0ZW0uaHR0cE9wdGlvbnMgfSlcbiAgICAgICAgLnRvUHJvbWlzZSgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmhhbmRsZUNoaWxkcmVuVXJsRXJyb3IoZXJyb3IpO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIGdldFRpdGxlKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBzdHJpbmcge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICByZW1vdmVMZWFkaW5nSGFzaChpdGVtLmFuY2hvcikgfHxcbiAgICAgICAgaXRlbS50aXRsZSB8fFxuICAgICAgICBnZXRUaXRsZUZyb21VcmwoaXRlbS51cmwpIHx8XG4gICAgICAgIGdldFRpdGxlRnJvbU1hcmtkb3duU3RyaW5nKGl0ZW0ubWFya2Rvd25TdHJpbmcpIHx8XG4gICAgICAgICcnXG4gICAgICApLnRyaW0oKTtcbiAgICB9XG4gIH1cblxuICBnZXRJY29uKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBzdHJpbmcge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS5pY29uIHx8ICdzdWJqZWN0JztcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDaGlsZHJlblVybEVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xuICAgIHRoaXMuY2hpbGRyZW5VcmxFcnJvciA9IGVycm9yLm1lc3NhZ2U7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbiAgaGFuZGxlTWFya2Rvd25Mb2FkZXJFcnJvcihlcnJvcjogRXJyb3IpOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtkb3duTG9hZGVyRXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfanVtcFRvKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBhbmNlc3RvcnM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IGdldEFuY2VzdG9ycyhcbiAgICAgICAgdGhpcy5pdGVtcyxcbiAgICAgICAgaXRlbSxcbiAgICAgICAgdGhpcy5jb21wYXJlV2l0aCB8fCBkZWZhdWx0Q29tcGFyZVdpdGgsXG4gICAgICApO1xuICAgICAgKGFuY2VzdG9ycyB8fCBbXSkuZm9yRWFjaCgoYW5jZXN0b3I6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pID0+IHRoaXMuaGFuZGxlSXRlbVNlbGVjdGVkKGFuY2VzdG9yKSk7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVMaW5rQ2xpY2soZXZlbnQ6IEV2ZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBsaW5rOiBIVE1MQW5jaG9yRWxlbWVudCA9IDxIVE1MQW5jaG9yRWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgY29uc3QgdXJsOiBVUkwgPSBuZXcgVVJMKGxpbmsuaHJlZik7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWFya2Rvd25TdHJpbmc6IHN0cmluZyA9IGF3YWl0IHRoaXMuX21hcmtkb3duVXJsTG9hZGVyU2VydmljZS5sb2FkKHVybC5ocmVmKTtcbiAgICAgIC8vIHBhc3MgaW4gdXJsIHRvIGJlIGFibGUgdG8gdXNlIGN1cnJlbnRNYXJrZG93bkl0ZW0udXJsIGxhdGVyIG9uXG4gICAgICB0aGlzLmhhbmRsZUl0ZW1TZWxlY3RlZCh7IG1hcmtkb3duU3RyaW5nLCB1cmw6IHVybC5ocmVmIH0pO1xuICAgICAgdGhpcy5tYXJrZG93bldyYXBwZXIubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCB3aW46IFdpbmRvdyA9IHdpbmRvdy5vcGVuKHVybC5ocmVmLCAnX2JsYW5rJyk7XG4gICAgICB3aW4uZm9jdXMoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=