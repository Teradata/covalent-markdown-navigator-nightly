/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __awaiter } from "tslib";
import { Component, Input, HostListener, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, } from '@angular/core';
import { removeLeadingHash, isAnchorLink, MarkdownLoaderService } from '@covalent/markdown';
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
export class MarkdownNavigatorComponent {
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
        if (item.children &&
            item.children.length === 1 &&
            (!item.children[0].children || item.children[0].children.length === 0)) {
            // clicked on item with one child that has no children
            // don't show menu
            this.currentMenuItems = [];
            // render markdown
            this.currentMarkdownItem = item.children[0];
        }
        else if (item.children && item.children.length > 0) {
            // has children, go inside
            this.currentMenuItems = item.children;
        }
        else {
            // don't show menu
            this.currentMenuItems = [];
            // render markdown
            this.currentMarkdownItem = item;
        }
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
MarkdownNavigatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'td-markdown-navigator',
                template: "<ng-container *ngIf=\"!showEmptyState\">\n  <mat-progress-bar *ngIf=\"loading\" mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n\n  <ng-container *ngIf=\"showHeader\">\n    <div [style.display]=\"'flex'\">\n      <button\n        *ngIf=\"showHomeButton\"\n        mat-icon-button\n        [matTooltip]=\"goHomeLabel\"\n        (click)=\"reset()\"\n        [attr.data-test]=\"'home-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goHomeLabel\">\n          home\n        </mat-icon>\n      </button>\n\n      <button\n        *ngIf=\"showGoBackButton\"\n        mat-icon-button\n        [matTooltip]=\"goBackLabel\"\n        (click)=\"goBack()\"\n        [attr.data-test]=\"'back-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goBackLabel\">\n          arrow_back\n        </mat-icon>\n      </button>\n      <span flex *ngIf=\"currentItemTitle\" class=\"mat-body-2 title truncate\" [attr.data-test]=\"'title'\">\n        {{ currentItemTitle }}\n      </span>\n    </div>\n\n    <mat-divider [style.position]=\"'relative'\"></mat-divider>\n  </ng-container>\n\n  <div *ngIf=\"showMenu\" class=\"td-markdown-list\">\n    <mat-action-list>\n      <button\n        *ngFor=\"let item of currentMenuItems\"\n        (click)=\"handleItemSelected(item)\"\n        mat-list-item\n        [matTooltip]=\"getTitle(item)\"\n        matTooltipPosition=\"before\"\n        matTooltipShowDelay=\"500\"\n      >\n        <mat-icon matListIcon>\n          subject\n        </mat-icon>\n        <span matLine class=\"truncate\">\n          {{ getTitle(item) }}\n        </span>\n        <mat-divider></mat-divider>\n      </button>\n    </mat-action-list>\n  </div>\n\n  <div *ngIf=\"showTdMarkdownLoader || showTdMarkdown\" class=\"markdown-wrapper\" #markdownWrapper>\n    <td-flavored-markdown-loader\n      *ngIf=\"showTdMarkdownLoader\"\n      [url]=\"url\"\n      [httpOptions]=\"httpOptions\"\n      [anchor]=\"anchor\"\n    ></td-flavored-markdown-loader>\n\n    <td-flavored-markdown\n      *ngIf=\"showTdMarkdown\"\n      [content]=\"markdownString\"\n      [hostedUrl]=\"url\"\n      [anchor]=\"anchor\"\n    ></td-flavored-markdown>\n  </div>\n</ng-container>\n\n<div *ngIf=\"showEmptyState\" layout=\"column\" layout-align=\"center center\" class=\" empty-state\">\n  <mat-icon matListAvatar>subject</mat-icon>\n  <h2>{{ emptyStateLabel }}</h2>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{position:relative;height:100%;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host .markdown-wrapper,:host .td-markdown-list{min-height:1px;overflow-y:auto;-webkit-box-flex:1;-ms-flex:1;flex:1;box-sizing:border-box}:host .markdown-wrapper{padding:16px 16px 0}:host .td-markdown-list>.mat-list{padding-top:0}:host td-flavored-markdown-loader ::ng-deep .mat-progress-bar{top:0;left:0;right:0;position:absolute}:host .title{display:inline-block;vertical-align:middle;margin:8px 0;padding-left:16px}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.empty-state{padding:32px}.empty-state mat-icon{font-size:4em}"]
            }] }
];
/** @nocollapse */
MarkdownNavigatorComponent.ctorParameters = () => [
    { type: MarkdownLoaderService },
    { type: ChangeDetectorRef }
];
MarkdownNavigatorComponent.propDecorators = {
    items: [{ type: Input }],
    labels: [{ type: Input }],
    startAt: [{ type: Input }],
    compareWith: [{ type: Input }],
    markdownWrapper: [{ type: ViewChild, args: ['markdownWrapper', { static: false },] }],
    clickListener: [{ type: HostListener, args: ['click', ['$event'],] }]
};
if (false) {
    /**
     * items: IMarkdownNavigatorItem[]
     *
     * List of IMarkdownNavigatorItems to be rendered
     * @type {?}
     */
    MarkdownNavigatorComponent.prototype.items;
    /**
     * labels?: IMarkdownNavigatorLabels
     *
     * Translated labels
     * @type {?}
     */
    MarkdownNavigatorComponent.prototype.labels;
    /**
     * startAt?: IMarkdownNavigatorItem
     *
     * Item to start to
     * @type {?}
     */
    MarkdownNavigatorComponent.prototype.startAt;
    /**
     * compareWith?: IMarkdownNavigatorCompareWith
     *
     * Function used to find startAt item
     * Defaults to comparison by strict equality (===)
     * @type {?}
     */
    MarkdownNavigatorComponent.prototype.compareWith;
    /** @type {?} */
    MarkdownNavigatorComponent.prototype.markdownWrapper;
    /** @type {?} */
    MarkdownNavigatorComponent.prototype.historyStack;
    /** @type {?} */
    MarkdownNavigatorComponent.prototype.currentMarkdownItem;
    /** @type {?} */
    MarkdownNavigatorComponent.prototype.currentMenuItems;
    /** @type {?} */
    MarkdownNavigatorComponent.prototype.loading;
    /**
     * @type {?}
     * @private
     */
    MarkdownNavigatorComponent.prototype._markdownUrlLoaderService;
    /**
     * @type {?}
     * @private
     */
    MarkdownNavigatorComponent.prototype._changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLHVCQUF1QixHQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFFNUYsNENBT0M7OztJQU5DLHVDQUFlOztJQUNmLHFDQUFhOztJQUNiLDZDQUFxQjs7SUFDckIsZ0RBQXdCOztJQUN4Qix3Q0FBZ0I7O0lBQ2hCLDBDQUFvQzs7Ozs7QUFHdEMsOENBSUM7OztJQUhDLDBDQUFnQjs7SUFDaEIsMENBQWdCOztJQUNoQiw4Q0FBb0I7OztBQUt0QixNQUFNLE9BQU8saUNBQWlDLEdBQTZCO0lBQ3pFLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFVBQVUsRUFBRSx1QkFBdUI7Q0FDcEM7Ozs7O0FBRUQsU0FBUyxlQUFlLENBQUMsR0FBVztJQUNsQyxJQUFJLEdBQUcsRUFBRTs7Y0FDRCxJQUFJLEdBQVEsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQzlCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JDO2FBQU07O2tCQUNDLElBQUksR0FBYSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O2tCQUN6QyxRQUFRLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFD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SUFHdkIsK0RBQXdEOzs7OztJQUN4RCx3REFBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcmVtb3ZlTGVhZGluZ0hhc2gsIGlzQW5jaG9yTGluaywgTWFya2Rvd25Mb2FkZXJTZXJ2aWNlIH0gZnJvbSAnQGNvdmFsZW50L21hcmtkb3duJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtIHtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgaHR0cE9wdGlvbnM/OiBvYmplY3Q7XG4gIG1hcmtkb3duU3RyaW5nPzogc3RyaW5nOyAvLyByYXcgbWFya2Rvd25cbiAgYW5jaG9yPzogc3RyaW5nO1xuICBjaGlsZHJlbj86IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMge1xuICBnb0hvbWU/OiBzdHJpbmc7XG4gIGdvQmFjaz86IHN0cmluZztcbiAgZW1wdHlTdGF0ZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGggPSAobzE6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0sIG8yOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKSA9PiBib29sZWFuO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTOiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMgPSB7XG4gIGdvSG9tZTogJ0dvIGhvbWUnLFxuICBnb0JhY2s6ICdHbyBiYWNrJyxcbiAgZW1wdHlTdGF0ZTogJ05vIGl0ZW0ocykgdG8gZGlzcGxheScsXG59O1xuXG5mdW5jdGlvbiBnZXRUaXRsZUZyb21VcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAodXJsKSB7XG4gICAgY29uc3QgdGVtcDogVVJMID0gbmV3IFVSTCh1cmwpO1xuICAgIGlmICh0ZW1wLmhhc2gpIHtcbiAgICAgIHJldHVybiByZW1vdmVMZWFkaW5nSGFzaCh0ZW1wLmhhc2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwYXRoOiBzdHJpbmdbXSA9IHRlbXAucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICAgIGNvbnN0IGZpbGVOYW1lOiBzdHJpbmcgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07XG4gICAgICByZXR1cm4gZmlsZU5hbWUucmVwbGFjZSgvXFwuW14vLl0rJC8sICcnKTsgLy8gcmVtb3ZlIC5tZFxuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBnZXRUaXRsZUZyb21NYXJrZG93blN0cmluZyhtYXJrZG93blN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKG1hcmtkb3duU3RyaW5nKSB7XG4gICAgY29uc3QgZmlyc3RMaW5lOiBzdHJpbmcgPSBtYXJrZG93blN0cmluZy5zcGxpdCgvW1xcclxcbl0rLykuZmluZCgobGluZTogc3RyaW5nKSA9PiAhIWxpbmUpO1xuICAgIHJldHVybiByZW1vdmVMZWFkaW5nSGFzaChmaXJzdExpbmUpLnRyaW0oKTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc01hcmtkb3duSHJlZihhbmNob3I6IEhUTUxBbmNob3JFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiAhaXNBbmNob3JMaW5rKGFuY2hvcikgJiYgYW5jaG9yLnBhdGhuYW1lLmVuZHNXaXRoKCcubWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlV2l0aChvMTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgbzI6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBib29sZWFuIHtcbiAgcmV0dXJuIG8xID09PSBvMjtcbn1cblxuZnVuY3Rpb24gZ2V0QW5jZXN0b3JzKFxuICBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdLFxuICBpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLFxuICBjb21wYXJlV2l0aDogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGgsXG4pOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10ge1xuICBpZiAoaXRlbXMpIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGl0ZW1zKSB7XG4gICAgICBpZiAoY29tcGFyZVdpdGgoY2hpbGQsIGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiBbY2hpbGRdO1xuICAgICAgfVxuICAgICAgY29uc3QgYW5jZXN0b3JzOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBnZXRBbmNlc3RvcnMoY2hpbGQuY2hpbGRyZW4sIGl0ZW0sIGNvbXBhcmVXaXRoKTtcbiAgICAgIGlmIChhbmNlc3RvcnMpIHtcbiAgICAgICAgcmV0dXJuIFtjaGlsZCwgLi4uYW5jZXN0b3JzXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGQtbWFya2Rvd24tbmF2aWdhdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Rvd25OYXZpZ2F0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAvKipcbiAgICogaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXVxuICAgKlxuICAgKiBMaXN0IG9mIElNYXJrZG93bk5hdmlnYXRvckl0ZW1zIHRvIGJlIHJlbmRlcmVkXG4gICAqL1xuICBASW5wdXQoKSBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuXG4gIC8qKlxuICAgKiBsYWJlbHM/OiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHNcbiAgICpcbiAgICogVHJhbnNsYXRlZCBsYWJlbHNcbiAgICovXG4gIEBJbnB1dCgpIGxhYmVsczogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzO1xuXG4gIC8qKlxuICAgKiBzdGFydEF0PzogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVxuICAgKlxuICAgKiBJdGVtIHRvIHN0YXJ0IHRvXG4gICAqL1xuICBASW5wdXQoKSBzdGFydEF0OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtO1xuXG4gIC8qKlxuICAgKiBjb21wYXJlV2l0aD86IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoXG4gICAqXG4gICAqIEZ1bmN0aW9uIHVzZWQgdG8gZmluZCBzdGFydEF0IGl0ZW1cbiAgICogRGVmYXVsdHMgdG8gY29tcGFyaXNvbiBieSBzdHJpY3QgZXF1YWxpdHkgKD09PSlcbiAgICovXG4gIEBJbnB1dCgpIGNvbXBhcmVXaXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aDtcblxuICBAVmlld0NoaWxkKCdtYXJrZG93bldyYXBwZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgbWFya2Rvd25XcmFwcGVyOiBFbGVtZW50UmVmO1xuXG4gIGhpc3RvcnlTdGFjazogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gW107IC8vIGhpc3RvcnlcbiAgY3VycmVudE1hcmtkb3duSXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbTsgLy8gY3VycmVudGx5IHJlbmRlcmVkXG4gIGN1cnJlbnRNZW51SXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IFtdOyAvLyBjdXJyZW50IG1lbnUgaXRlbXNcblxuICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfbWFya2Rvd25VcmxMb2FkZXJTZXJ2aWNlOiBNYXJrZG93bkxvYWRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHt9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBjbGlja0xpc3RlbmVyKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmV2ZW50LnNyY0VsZW1lbnQ7XG4gICAgaWYgKGVsZW1lbnQubWF0Y2hlcygnYVtocmVmXScpICYmIGlzTWFya2Rvd25IcmVmKDxIVE1MQW5jaG9yRWxlbWVudD5lbGVtZW50KSkge1xuICAgICAgdGhpcy5oYW5kbGVMaW5rQ2xpY2soZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaG93R29CYWNrQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHNob3dIb21lQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAxO1xuICB9XG5cbiAgZ2V0IHNob3dIZWFkZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd0hvbWVCdXR0b24gfHwgdGhpcy5zaG93R29CYWNrQnV0dG9uIHx8ICEhdGhpcy5jdXJyZW50SXRlbVRpdGxlO1xuICB9XG5cbiAgZ2V0IHNob3dNZW51KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRNZW51SXRlbXMgJiYgdGhpcy5jdXJyZW50TWVudUl0ZW1zLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQgc2hvd1RkTWFya2Rvd25Mb2FkZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtICYmICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLnVybCAmJiAhdGhpcy5zaG93VGRNYXJrZG93bjtcbiAgfVxuXG4gIGdldCBzaG93VGRNYXJrZG93bigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gJiYgISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0ubWFya2Rvd25TdHJpbmc7XG4gIH1cblxuICBnZXQgdXJsKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS51cmw7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgZ2V0IGh0dHBPcHRpb25zKCk6IG9iamVjdCB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5odHRwT3B0aW9ucztcbiAgICB9XG4gIH1cbiAgZ2V0IG1hcmtkb3duU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5tYXJrZG93blN0cmluZztcbiAgICB9XG4gIH1cblxuICBnZXQgYW5jaG9yKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5hbmNob3I7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNob3dFbXB0eVN0YXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pdGVtcyB8fCB0aGlzLml0ZW1zLmxlbmd0aCA8IDE7XG4gIH1cblxuICBnZXQgZ29Ib21lTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmdvSG9tZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTLmdvSG9tZTtcbiAgfVxuXG4gIGdldCBnb0JhY2tMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZ29CYWNrKSB8fCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9MQUJFTFMuZ29CYWNrO1xuICB9XG5cbiAgZ2V0IGVtcHR5U3RhdGVMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZW1wdHlTdGF0ZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTLmVtcHR5U3RhdGU7XG4gIH1cblxuICBnZXQgY3VycmVudEl0ZW1UaXRsZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRpdGxlKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSh0aGlzLmhpc3RvcnlTdGFja1t0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggLSAxXSk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5pdGVtcykge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5zdGFydEF0KSB7XG4gICAgICAgIHRoaXMuX2p1bXBUbyh0aGlzLnN0YXJ0QXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIC8vIGlmIHNpbmdsZSBpdGVtIGFuZCBubyBjaGlsZHJlblxuICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoID09PSAxICYmICghdGhpcy5pdGVtc1swXS5jaGlsZHJlbiB8fCB0aGlzLml0ZW1zWzBdLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IFtdO1xuICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gdGhpcy5pdGVtc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gdGhpcy5pdGVtcztcbiAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy5oaXN0b3J5U3RhY2sgPSBbXTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdvQmFjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgcGFyZW50OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtID0gdGhpcy5oaXN0b3J5U3RhY2tbdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIC0gMl07XG4gICAgICBpZiAocGFyZW50LmNoaWxkcmVuICYmIHBhcmVudC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGlmIHBhcmVudCBoYXMgY2hpbGRyZW4sIHNob3cgbWVudVxuICAgICAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSBwYXJlbnQuY2hpbGRyZW47XG4gICAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGVsc2UganVzdCByZW5kZXIgbWFya2Rvd25cbiAgICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gW107XG4gICAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IHBhcmVudDtcbiAgICAgIH1cbiAgICAgIHRoaXMuaGlzdG9yeVN0YWNrID0gdGhpcy5oaXN0b3J5U3RhY2suc2xpY2UoMCwgLTEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBvbmUgbGV2ZWwgZG93biBqdXN0IGdvIHRvIHJvb3RcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBoYW5kbGVJdGVtU2VsZWN0ZWQoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHZvaWQge1xuICAgIHRoaXMuaGlzdG9yeVN0YWNrID0gWy4uLnRoaXMuaGlzdG9yeVN0YWNrLCBpdGVtXTtcbiAgICBpZiAoXG4gICAgICBpdGVtLmNoaWxkcmVuICYmXG4gICAgICBpdGVtLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgKCFpdGVtLmNoaWxkcmVuWzBdLmNoaWxkcmVuIHx8IGl0ZW0uY2hpbGRyZW5bMF0uY2hpbGRyZW4ubGVuZ3RoID09PSAwKVxuICAgICkge1xuICAgICAgLy8gY2xpY2tlZCBvbiBpdGVtIHdpdGggb25lIGNoaWxkIHRoYXQgaGFzIG5vIGNoaWxkcmVuXG4gICAgICAvLyBkb24ndCBzaG93IG1lbnVcbiAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IFtdO1xuICAgICAgLy8gcmVuZGVyIG1hcmtkb3duXG4gICAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSBpdGVtLmNoaWxkcmVuWzBdO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGhhcyBjaGlsZHJlbiwgZ28gaW5zaWRlXG4gICAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSBpdGVtLmNoaWxkcmVuO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBkb24ndCBzaG93IG1lbnVcbiAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IFtdO1xuICAgICAgLy8gcmVuZGVyIG1hcmtkb3duXG4gICAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSBpdGVtO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldFRpdGxlKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBzdHJpbmcge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICByZW1vdmVMZWFkaW5nSGFzaChpdGVtLmFuY2hvcikgfHxcbiAgICAgICAgaXRlbS50aXRsZSB8fFxuICAgICAgICBnZXRUaXRsZUZyb21VcmwoaXRlbS51cmwpIHx8XG4gICAgICAgIGdldFRpdGxlRnJvbU1hcmtkb3duU3RyaW5nKGl0ZW0ubWFya2Rvd25TdHJpbmcpIHx8XG4gICAgICAgICcnXG4gICAgICApLnRyaW0oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9qdW1wVG8oaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHZvaWQge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGFuY2VzdG9yczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gZ2V0QW5jZXN0b3JzKFxuICAgICAgICB0aGlzLml0ZW1zLFxuICAgICAgICBpdGVtLFxuICAgICAgICB0aGlzLmNvbXBhcmVXaXRoIHx8IGRlZmF1bHRDb21wYXJlV2l0aCxcbiAgICAgICk7XG4gICAgICAoYW5jZXN0b3JzIHx8IFtdKS5mb3JFYWNoKChhbmNlc3RvcjogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSkgPT4gdGhpcy5oYW5kbGVJdGVtU2VsZWN0ZWQoYW5jZXN0b3IpKTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUxpbmtDbGljayhldmVudDogRXZlbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGxpbms6IEhUTUxBbmNob3JFbGVtZW50ID0gPEhUTUxBbmNob3JFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICBjb25zdCB1cmw6IFVSTCA9IG5ldyBVUkwobGluay5ocmVmKTtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYXJrZG93blN0cmluZzogc3RyaW5nID0gYXdhaXQgdGhpcy5fbWFya2Rvd25VcmxMb2FkZXJTZXJ2aWNlLmxvYWQodXJsLmhyZWYpO1xuICAgICAgLy8gcGFzcyBpbiB1cmwgdG8gYmUgYWJsZSB0byB1c2UgY3VycmVudE1hcmtkb3duSXRlbS51cmwgbGF0ZXIgb25cbiAgICAgIHRoaXMuaGFuZGxlSXRlbVNlbGVjdGVkKHsgbWFya2Rvd25TdHJpbmcsIHVybDogdXJsLmhyZWYgfSk7XG4gICAgICB0aGlzLm1hcmtkb3duV3JhcHBlci5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IHdpbjogV2luZG93ID0gd2luZG93Lm9wZW4odXJsLmhyZWYsICdfYmxhbmsnKTtcbiAgICAgIHdpbi5mb2N1cygpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==