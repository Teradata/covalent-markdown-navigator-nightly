/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __awaiter } from "tslib";
import { Component, Input, HostListener, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, } from '@angular/core';
import { removeLeadingHash, isAnchorLink, TdMarkdownLoaderService } from '@covalent/markdown';
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
    IMarkdownNavigatorItem.prototype.description;
    /** @type {?|undefined} */
    IMarkdownNavigatorItem.prototype.icon;
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
     */
    constructor(_markdownUrlLoaderService, _changeDetectorRef) {
        this._markdownUrlLoaderService = _markdownUrlLoaderService;
        this._changeDetectorRef = _changeDetectorRef;
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
     * @return {?}
     */
    reset() {
        // if single item and no children
        if (this.items && this.items.length === 1 && (!this.items[0].children || this.items[0].children.length === 0)) {
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
        if (this.historyStack.length > 1) {
            /** @type {?} */
            const parent = this.historyStack[this.historyStack.length - 2];
            if (parent.children && parent.children.length > 0) {
                // if parent has children, show menu
                this.currentMenuItems = parent.children;
                this.currentMarkdownItem = undefined;
            }
            else {
                // else just render markdown
                this.currentMenuItems = [];
                this.currentMarkdownItem = parent;
            }
            this.historyStack = this.historyStack.slice(0, -1);
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
        this.historyStack = [...this.historyStack, item];
        this.currentMenuItems = item.children;
        this.currentMarkdownItem = item;
        this._changeDetectorRef.markForCheck();
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
                template: "<ng-container *ngIf=\"!showEmptyState\">\n  <mat-progress-bar *ngIf=\"loading\" mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n\n  <ng-container *ngIf=\"showHeader\">\n    <div [style.display]=\"'flex'\">\n      <button\n        *ngIf=\"showHomeButton\"\n        mat-icon-button\n        [matTooltip]=\"goHomeLabel\"\n        (click)=\"reset()\"\n        [attr.data-test]=\"'home-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goHomeLabel\">\n          home\n        </mat-icon>\n      </button>\n\n      <button\n        *ngIf=\"showGoBackButton\"\n        mat-icon-button\n        [matTooltip]=\"goBackLabel\"\n        (click)=\"goBack()\"\n        [attr.data-test]=\"'back-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goBackLabel\">\n          arrow_back\n        </mat-icon>\n      </button>\n      <span flex *ngIf=\"currentItemTitle\" class=\"mat-body-2 title truncate\" [attr.data-test]=\"'title'\">\n        {{ currentItemTitle }}\n      </span>\n    </div>\n\n    <mat-divider [style.position]=\"'relative'\"></mat-divider>\n  </ng-container>\n\n  <div class=\"scroll-area\">\n    <div *ngIf=\"showMenu\" class=\"td-markdown-list\">\n      <mat-action-list>\n        <button\n          *ngFor=\"let item of currentMenuItems\"\n          (click)=\"handleItemSelected(item)\"\n          mat-list-item\n          [matTooltip]=\"getTitle(item)\"\n          matTooltipPosition=\"before\"\n          matTooltipShowDelay=\"500\"\n        >\n          <mat-icon matListIcon>\n            {{ getIcon(item) }}\n          </mat-icon>\n          <span matLine class=\"truncate\">\n            {{ getTitle(item) }}\n          </span>\n          <span matLine class=\"truncate\">{{ item.description }}</span>\n          <mat-divider></mat-divider>\n        </button>\n      </mat-action-list>\n    </div>\n\n    <div *ngIf=\"showTdMarkdownLoader || showTdMarkdown\" class=\"markdown-wrapper\" #markdownWrapper>\n      <td-flavored-markdown-loader\n        *ngIf=\"showTdMarkdownLoader\"\n        [url]=\"url\"\n        [httpOptions]=\"httpOptions\"\n        [anchor]=\"anchor\"\n      ></td-flavored-markdown-loader>\n\n      <td-flavored-markdown\n        *ngIf=\"showTdMarkdown\"\n        [content]=\"markdownString\"\n        [hostedUrl]=\"url\"\n        [anchor]=\"anchor\"\n      ></td-flavored-markdown>\n    </div>\n  </div>\n</ng-container>\n\n<div *ngIf=\"showEmptyState\" layout=\"column\" layout-align=\"center center\" class=\" empty-state\">\n  <mat-icon matListAvatar>subject</mat-icon>\n  <h2>{{ emptyStateLabel }}</h2>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{position:relative;height:100%;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host .scroll-area{min-height:1px;overflow-y:auto;-webkit-box-flex:1;-ms-flex:1;flex:1;box-sizing:border-box}:host .markdown-wrapper{padding:16px 16px 0}:host .td-markdown-list>.mat-list{padding-top:0}:host td-flavored-markdown-loader ::ng-deep .mat-progress-bar{top:0;left:0;right:0;position:absolute}:host .title{display:inline-block;vertical-align:middle;margin:8px 0;padding-left:16px}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.empty-state{padding:32px}.empty-state mat-icon{font-size:4em}"]
            }] }
];
/** @nocollapse */
TdMarkdownNavigatorComponent.ctorParameters = () => [
    { type: TdMarkdownLoaderService },
    { type: ChangeDetectorRef }
];
TdMarkdownNavigatorComponent.propDecorators = {
    items: [{ type: Input }],
    labels: [{ type: Input }],
    startAt: [{ type: Input }],
    compareWith: [{ type: Input }],
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
     * compareWith?: IMarkdownNavigatorCompareWith
     *
     * Function used to find startAt item
     * Defaults to comparison by strict equality (===)
     * @type {?}
     */
    TdMarkdownNavigatorComponent.prototype.compareWith;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLHVCQUF1QixHQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFFOUYsNENBU0M7OztJQVJDLHVDQUFlOztJQUNmLHFDQUFhOztJQUNiLDZDQUFxQjs7SUFDckIsZ0RBQXdCOztJQUN4Qix3Q0FBZ0I7O0lBQ2hCLDBDQUFvQzs7SUFDcEMsNkNBQXFCOztJQUNyQixzQ0FBYzs7Ozs7QUFHaEIsOENBSUM7OztJQUhDLDBDQUFnQjs7SUFDaEIsMENBQWdCOztJQUNoQiw4Q0FBb0I7OztBQUt0QixNQUFNLE9BQU8saUNBQWlDLEdBQTZCO0lBQ3pFLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFVBQVUsRUFBRSx1QkFBdUI7Q0FDcEM7Ozs7O0FBRUQsU0FBUyxlQUFlLENBQUMsR0FBVztJQUNsQyxJQUFJLEdBQUcsRUFBRTs7Y0FDRCxJQUFJLEdBQVEsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQzlCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JDO2FBQU07O2tCQUNDLElBQUksR0FBYSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O2tCQUN6QyxRQUFRLEdBQVcsSUFBSSxDQUFDLElB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Z0JBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDdEI7WUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekMsQ0FBQztLQUFBOzs7WUFyT0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLDZoRkFBa0Q7Z0JBRWxELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQWhGeUMsdUJBQXVCO1lBSC9ELGlCQUFpQjs7O29CQTBGaEIsS0FBSztxQkFPTCxLQUFLO3NCQU9MLEtBQUs7MEJBUUwsS0FBSzs4QkFFTCxTQUFTLFNBQUMsaUJBQWlCOzRCQWEzQixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOzs7Ozs7Ozs7SUFyQ2pDLDZDQUF5Qzs7Ozs7OztJQU96Qyw4Q0FBMEM7Ozs7Ozs7SUFPMUMsK0NBQXlDOzs7Ozs7OztJQVF6QyxtREFBb0Q7O0lBRXBELHVEQUEwRDs7SUFFMUQsb0RBQTRDOztJQUM1QywyREFBNEM7O0lBQzVDLHdEQUFnRDs7SUFFaEQsK0NBQXlCOzs7OztJQUd2QixpRUFBMEQ7Ozs7O0lBQzFELDBEQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgSG9zdExpc3RlbmVyLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyByZW1vdmVMZWFkaW5nSGFzaCwgaXNBbmNob3JMaW5rLCBUZE1hcmtkb3duTG9hZGVyU2VydmljZSB9IGZyb20gJ0Bjb3ZhbGVudC9tYXJrZG93bic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1hcmtkb3duTmF2aWdhdG9ySXRlbSB7XG4gIHRpdGxlPzogc3RyaW5nO1xuICB1cmw/OiBzdHJpbmc7XG4gIGh0dHBPcHRpb25zPzogb2JqZWN0O1xuICBtYXJrZG93blN0cmluZz86IHN0cmluZzsgLy8gcmF3IG1hcmtkb3duXG4gIGFuY2hvcj86IHN0cmluZztcbiAgY2hpbGRyZW4/OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBpY29uPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElNYXJrZG93bk5hdmlnYXRvckxhYmVscyB7XG4gIGdvSG9tZT86IHN0cmluZztcbiAgZ29CYWNrPzogc3RyaW5nO1xuICBlbXB0eVN0YXRlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aCA9IChvMTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgbzI6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pID0+IGJvb2xlYW47XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9MQUJFTFM6IElNYXJrZG93bk5hdmlnYXRvckxhYmVscyA9IHtcbiAgZ29Ib21lOiAnR28gaG9tZScsXG4gIGdvQmFjazogJ0dvIGJhY2snLFxuICBlbXB0eVN0YXRlOiAnTm8gaXRlbShzKSB0byBkaXNwbGF5Jyxcbn07XG5cbmZ1bmN0aW9uIGdldFRpdGxlRnJvbVVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICh1cmwpIHtcbiAgICBjb25zdCB0ZW1wOiBVUkwgPSBuZXcgVVJMKHVybCk7XG4gICAgaWYgKHRlbXAuaGFzaCkge1xuICAgICAgcmV0dXJuIHJlbW92ZUxlYWRpbmdIYXNoKHRlbXAuaGFzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBhdGg6IHN0cmluZ1tdID0gdGVtcC5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgICAgY29uc3QgZmlsZU5hbWU6IHN0cmluZyA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcbiAgICAgIHJldHVybiBmaWxlTmFtZS5yZXBsYWNlKC9cXC5bXi8uXSskLywgJycpOyAvLyByZW1vdmUgLm1kXG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGdldFRpdGxlRnJvbU1hcmtkb3duU3RyaW5nKG1hcmtkb3duU3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAobWFya2Rvd25TdHJpbmcpIHtcbiAgICBjb25zdCBmaXJzdExpbmU6IHN0cmluZyA9IG1hcmtkb3duU3RyaW5nLnNwbGl0KC9bXFxyXFxuXSsvKS5maW5kKChsaW5lOiBzdHJpbmcpID0+ICEhbGluZSk7XG4gICAgcmV0dXJuIHJlbW92ZUxlYWRpbmdIYXNoKGZpcnN0TGluZSkudHJpbSgpO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzTWFya2Rvd25IcmVmKGFuY2hvcjogSFRNTEFuY2hvckVsZW1lbnQpOiBib29sZWFuIHtcbiAgcmV0dXJuICFpc0FuY2hvckxpbmsoYW5jaG9yKSAmJiBhbmNob3IucGF0aG5hbWUuZW5kc1dpdGgoJy5tZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmVXaXRoKG8xOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLCBvMjogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbzEgPT09IG8yO1xufVxuXG5mdW5jdGlvbiBnZXRBbmNlc3RvcnMoXG4gIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10sXG4gIGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0sXG4gIGNvbXBhcmVXaXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aCxcbik6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSB7XG4gIGlmIChpdGVtcykge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgaXRlbXMpIHtcbiAgICAgIGlmIChjb21wYXJlV2l0aChjaGlsZCwgaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIFtjaGlsZF07XG4gICAgICB9XG4gICAgICBjb25zdCBhbmNlc3RvcnM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IGdldEFuY2VzdG9ycyhjaGlsZC5jaGlsZHJlbiwgaXRlbSwgY29tcGFyZVdpdGgpO1xuICAgICAgaWYgKGFuY2VzdG9ycykge1xuICAgICAgICByZXR1cm4gW2NoaWxkLCAuLi5hbmNlc3RvcnNdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ZC1tYXJrZG93bi1uYXZpZ2F0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBUZE1hcmtkb3duTmF2aWdhdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW11cbiAgICpcbiAgICogTGlzdCBvZiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtcyB0byBiZSByZW5kZXJlZFxuICAgKi9cbiAgQElucHV0KCkgaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcblxuICAvKipcbiAgICogbGFiZWxzPzogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzXG4gICAqXG4gICAqIFRyYW5zbGF0ZWQgbGFiZWxzXG4gICAqL1xuICBASW5wdXQoKSBsYWJlbHM6IElNYXJrZG93bk5hdmlnYXRvckxhYmVscztcblxuICAvKipcbiAgICogc3RhcnRBdD86IElNYXJrZG93bk5hdmlnYXRvckl0ZW1cbiAgICpcbiAgICogSXRlbSB0byBzdGFydCB0b1xuICAgKi9cbiAgQElucHV0KCkgc3RhcnRBdDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbTtcblxuICAvKipcbiAgICogY29tcGFyZVdpdGg/OiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aFxuICAgKlxuICAgKiBGdW5jdGlvbiB1c2VkIHRvIGZpbmQgc3RhcnRBdCBpdGVtXG4gICAqIERlZmF1bHRzIHRvIGNvbXBhcmlzb24gYnkgc3RyaWN0IGVxdWFsaXR5ICg9PT0pXG4gICAqL1xuICBASW5wdXQoKSBjb21wYXJlV2l0aDogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGg7XG5cbiAgQFZpZXdDaGlsZCgnbWFya2Rvd25XcmFwcGVyJykgbWFya2Rvd25XcmFwcGVyOiBFbGVtZW50UmVmO1xuXG4gIGhpc3RvcnlTdGFjazogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gW107IC8vIGhpc3RvcnlcbiAgY3VycmVudE1hcmtkb3duSXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbTsgLy8gY3VycmVudGx5IHJlbmRlcmVkXG4gIGN1cnJlbnRNZW51SXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IFtdOyAvLyBjdXJyZW50IG1lbnUgaXRlbXNcblxuICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfbWFya2Rvd25VcmxMb2FkZXJTZXJ2aWNlOiBUZE1hcmtkb3duTG9hZGVyU2VydmljZSxcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge31cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIGNsaWNrTGlzdGVuZXIoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcbiAgICBpZiAoZWxlbWVudC5tYXRjaGVzKCdhW2hyZWZdJykgJiYgaXNNYXJrZG93bkhyZWYoPEhUTUxBbmNob3JFbGVtZW50PmVsZW1lbnQpKSB7XG4gICAgICB0aGlzLmhhbmRsZUxpbmtDbGljayhldmVudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNob3dHb0JhY2tCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQgc2hvd0hvbWVCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDE7XG4gIH1cblxuICBnZXQgc2hvd0hlYWRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaG93SG9tZUJ1dHRvbiB8fCB0aGlzLnNob3dHb0JhY2tCdXR0b24gfHwgISF0aGlzLmN1cnJlbnRJdGVtVGl0bGU7XG4gIH1cblxuICBnZXQgc2hvd01lbnUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1lbnVJdGVtcyAmJiB0aGlzLmN1cnJlbnRNZW51SXRlbXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldCBzaG93VGRNYXJrZG93bkxvYWRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gJiYgISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0udXJsICYmICF0aGlzLnNob3dUZE1hcmtkb3duO1xuICB9XG5cbiAgZ2V0IHNob3dUZE1hcmtkb3duKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbSAmJiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5tYXJrZG93blN0cmluZztcbiAgfVxuXG4gIGdldCB1cmwoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLnVybDtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBnZXQgaHR0cE9wdGlvbnMoKTogb2JqZWN0IHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLmh0dHBPcHRpb25zO1xuICAgIH1cbiAgfVxuICBnZXQgbWFya2Rvd25TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLm1hcmtkb3duU3RyaW5nO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhbmNob3IoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLmFuY2hvcjtcbiAgICB9XG4gIH1cblxuICBnZXQgc2hvd0VtcHR5U3RhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLml0ZW1zIHx8IHRoaXMuaXRlbXMubGVuZ3RoIDwgMTtcbiAgfVxuXG4gIGdldCBnb0hvbWVMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZ29Ib21lKSB8fCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9MQUJFTFMuZ29Ib21lO1xuICB9XG5cbiAgZ2V0IGdvQmFja0xhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5nb0JhY2spIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUy5nb0JhY2s7XG4gIH1cblxuICBnZXQgZW1wdHlTdGF0ZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5lbXB0eVN0YXRlKSB8fCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9MQUJFTFMuZW1wdHlTdGF0ZTtcbiAgfVxuXG4gIGdldCBjdXJyZW50SXRlbVRpdGxlKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VGl0bGUodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRpdGxlKHRoaXMuaGlzdG9yeVN0YWNrW3RoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCAtIDFdKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLml0ZW1zKSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLnN0YXJ0QXQpIHtcbiAgICAgICAgdGhpcy5fanVtcFRvKHRoaXMuc3RhcnRBdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgLy8gaWYgc2luZ2xlIGl0ZW0gYW5kIG5vIGNoaWxkcmVuXG4gICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5sZW5ndGggPT09IDEgJiYgKCF0aGlzLml0ZW1zWzBdLmNoaWxkcmVuIHx8IHRoaXMuaXRlbXNbMF0uY2hpbGRyZW4ubGVuZ3RoID09PSAwKSkge1xuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gW107XG4gICAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSB0aGlzLml0ZW1zWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLmhpc3RvcnlTdGFjayA9IFtdO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ29CYWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBwYXJlbnQ6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0gPSB0aGlzLmhpc3RvcnlTdGFja1t0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggLSAyXTtcbiAgICAgIGlmIChwYXJlbnQuY2hpbGRyZW4gJiYgcGFyZW50LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gaWYgcGFyZW50IGhhcyBjaGlsZHJlbiwgc2hvdyBtZW51XG4gICAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IHBhcmVudC5jaGlsZHJlbjtcbiAgICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZWxzZSBqdXN0IHJlbmRlciBtYXJrZG93blxuICAgICAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gcGFyZW50O1xuICAgICAgfVxuICAgICAgdGhpcy5oaXN0b3J5U3RhY2sgPSB0aGlzLmhpc3RvcnlTdGFjay5zbGljZSgwLCAtMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG9uZSBsZXZlbCBkb3duIGp1c3QgZ28gdG8gcm9vdFxuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGhhbmRsZUl0ZW1TZWxlY3RlZChpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5oaXN0b3J5U3RhY2sgPSBbLi4udGhpcy5oaXN0b3J5U3RhY2ssIGl0ZW1dO1xuICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IGl0ZW0uY2hpbGRyZW47XG4gICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gaXRlbTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldFRpdGxlKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBzdHJpbmcge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICByZW1vdmVMZWFkaW5nSGFzaChpdGVtLmFuY2hvcikgfHxcbiAgICAgICAgaXRlbS50aXRsZSB8fFxuICAgICAgICBnZXRUaXRsZUZyb21VcmwoaXRlbS51cmwpIHx8XG4gICAgICAgIGdldFRpdGxlRnJvbU1hcmtkb3duU3RyaW5nKGl0ZW0ubWFya2Rvd25TdHJpbmcpIHx8XG4gICAgICAgICcnXG4gICAgICApLnRyaW0oKTtcbiAgICB9XG4gIH1cblxuICBnZXRJY29uKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBzdHJpbmcge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS5pY29uIHx8ICdzdWJqZWN0JztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9qdW1wVG8oaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHZvaWQge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGFuY2VzdG9yczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gZ2V0QW5jZXN0b3JzKFxuICAgICAgICB0aGlzLml0ZW1zLFxuICAgICAgICBpdGVtLFxuICAgICAgICB0aGlzLmNvbXBhcmVXaXRoIHx8IGRlZmF1bHRDb21wYXJlV2l0aCxcbiAgICAgICk7XG4gICAgICAoYW5jZXN0b3JzIHx8IFtdKS5mb3JFYWNoKChhbmNlc3RvcjogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSkgPT4gdGhpcy5oYW5kbGVJdGVtU2VsZWN0ZWQoYW5jZXN0b3IpKTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUxpbmtDbGljayhldmVudDogRXZlbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGxpbms6IEhUTUxBbmNob3JFbGVtZW50ID0gPEhUTUxBbmNob3JFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICBjb25zdCB1cmw6IFVSTCA9IG5ldyBVUkwobGluay5ocmVmKTtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYXJrZG93blN0cmluZzogc3RyaW5nID0gYXdhaXQgdGhpcy5fbWFya2Rvd25VcmxMb2FkZXJTZXJ2aWNlLmxvYWQodXJsLmhyZWYpO1xuICAgICAgLy8gcGFzcyBpbiB1cmwgdG8gYmUgYWJsZSB0byB1c2UgY3VycmVudE1hcmtkb3duSXRlbS51cmwgbGF0ZXIgb25cbiAgICAgIHRoaXMuaGFuZGxlSXRlbVNlbGVjdGVkKHsgbWFya2Rvd25TdHJpbmcsIHVybDogdXJsLmhyZWYgfSk7XG4gICAgICB0aGlzLm1hcmtkb3duV3JhcHBlci5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IHdpbjogV2luZG93ID0gd2luZG93Lm9wZW4odXJsLmhyZWYsICdfYmxhbmsnKTtcbiAgICAgIHdpbi5mb2N1cygpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==