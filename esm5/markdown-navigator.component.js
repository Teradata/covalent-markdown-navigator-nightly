/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __awaiter, __generator, __read, __spread, __values } from "tslib";
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
export var DEFAULT_MARKDOWN_NAVIGATOR_LABELS = {
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
        var temp = new URL(url);
        if (temp.hash) {
            return removeLeadingHash(temp.hash);
        }
        else {
            /** @type {?} */
            var path = temp.pathname.split('/');
            /** @type {?} */
            var fileName = path[path.length - 1];
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
        var firstLine = markdownString.split(/[\r\n]+/).find((/**
         * @param {?} line
         * @return {?}
         */
        function (line) { return !!line; }));
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
    var e_1, _a;
    if (items) {
        try {
            for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var child = items_1_1.value;
                if (compareWith(child, item)) {
                    return [child];
                }
                /** @type {?} */
                var ancestors = getAncestors(child.children, item, compareWith);
                if (ancestors) {
                    return __spread([child], ancestors);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return undefined;
}
var TdMarkdownNavigatorComponent = /** @class */ (function () {
    function TdMarkdownNavigatorComponent(_markdownUrlLoaderService, _changeDetectorRef) {
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
    TdMarkdownNavigatorComponent.prototype.clickListener = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var element = (/** @type {?} */ (event.srcElement));
        if (element.matches('a[href]') && isMarkdownHref((/** @type {?} */ (element)))) {
            this.handleLinkClick(event);
        }
    };
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "showGoBackButton", {
        get: /**
         * @return {?}
         */
        function () {
            return this.historyStack.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "showHomeButton", {
        get: /**
         * @return {?}
         */
        function () {
            return this.historyStack.length > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "showHeader", {
        get: /**
         * @return {?}
         */
        function () {
            return this.showHomeButton || this.showGoBackButton || !!this.currentItemTitle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "showMenu", {
        get: /**
         * @return {?}
         */
        function () {
            return this.currentMenuItems && this.currentMenuItems.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "showTdMarkdownLoader", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.currentMarkdownItem && !!this.currentMarkdownItem.url && !this.showTdMarkdown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "showTdMarkdown", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.currentMarkdownItem && !!this.currentMarkdownItem.markdownString;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "url", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.currentMarkdownItem) {
                return this.currentMarkdownItem.url;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "httpOptions", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.currentMarkdownItem) {
                return this.currentMarkdownItem.httpOptions;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "markdownString", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.currentMarkdownItem) {
                return this.currentMarkdownItem.markdownString;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "anchor", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.currentMarkdownItem) {
                return this.currentMarkdownItem.anchor;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "showEmptyState", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.items || this.items.length < 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "goHomeLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.labels && this.labels.goHome) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.goHome;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "goBackLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.labels && this.labels.goBack) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.goBack;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "emptyStateLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.labels && this.labels.emptyState) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.emptyState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "currentItemTitle", {
        get: /**
         * @return {?}
         */
        function () {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.items) {
            this.reset();
            if (this.items && this.startAt) {
                this._jumpTo(this.startAt);
            }
        }
    };
    /**
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.goBack = /**
     * @return {?}
     */
    function () {
        if (this.historyStack.length > 1) {
            /** @type {?} */
            var parent_1 = this.historyStack[this.historyStack.length - 2];
            if (parent_1.children && parent_1.children.length > 0) {
                // if parent has children, show menu
                this.currentMenuItems = parent_1.children;
                this.currentMarkdownItem = undefined;
            }
            else {
                // else just render markdown
                this.currentMenuItems = [];
                this.currentMarkdownItem = parent_1;
            }
            this.historyStack = this.historyStack.slice(0, -1);
        }
        else {
            // one level down just go to root
            this.reset();
        }
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.handleItemSelected = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.historyStack = __spread(this.historyStack, [item]);
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
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.getTitle = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (item) {
            return (removeLeadingHash(item.anchor) ||
                item.title ||
                getTitleFromUrl(item.url) ||
                getTitleFromMarkdownString(item.markdownString) ||
                '').trim();
        }
    };
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype._jumpTo = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        this.reset();
        if (this.items && this.items.length > 0) {
            /** @type {?} */
            var ancestors = getAncestors(this.items, item, this.compareWith || defaultCompareWith);
            (ancestors || []).forEach((/**
             * @param {?} ancestor
             * @return {?}
             */
            function (ancestor) { return _this.handleItemSelected(ancestor); }));
        }
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.handleLinkClick = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var link, url, markdownString, error_1, win;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        link = (/** @type {?} */ (event.target));
                        url = new URL(link.href);
                        this.loading = true;
                        this._changeDetectorRef.markForCheck();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this._markdownUrlLoaderService.load(url.href)];
                    case 2:
                        markdownString = _a.sent();
                        // pass in url to be able to use currentMarkdownItem.url later on
                        this.handleItemSelected({ markdownString: markdownString, url: url.href });
                        this.markdownWrapper.nativeElement.scrollTop = 0;
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        win = window.open(url.href, '_blank');
                        win.focus();
                        return [3 /*break*/, 5];
                    case 4:
                        this.loading = false;
                        return [7 /*endfinally*/];
                    case 5:
                        this._changeDetectorRef.markForCheck();
                        return [2 /*return*/];
                }
            });
        });
    };
    TdMarkdownNavigatorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'td-markdown-navigator',
                    template: "<ng-container *ngIf=\"!showEmptyState\">\n  <mat-progress-bar *ngIf=\"loading\" mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n\n  <ng-container *ngIf=\"showHeader\">\n    <div [style.display]=\"'flex'\">\n      <button\n        *ngIf=\"showHomeButton\"\n        mat-icon-button\n        [matTooltip]=\"goHomeLabel\"\n        (click)=\"reset()\"\n        [attr.data-test]=\"'home-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goHomeLabel\">\n          home\n        </mat-icon>\n      </button>\n\n      <button\n        *ngIf=\"showGoBackButton\"\n        mat-icon-button\n        [matTooltip]=\"goBackLabel\"\n        (click)=\"goBack()\"\n        [attr.data-test]=\"'back-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goBackLabel\">\n          arrow_back\n        </mat-icon>\n      </button>\n      <span flex *ngIf=\"currentItemTitle\" class=\"mat-body-2 title truncate\" [attr.data-test]=\"'title'\">\n        {{ currentItemTitle }}\n      </span>\n    </div>\n\n    <mat-divider [style.position]=\"'relative'\"></mat-divider>\n  </ng-container>\n\n  <div *ngIf=\"showMenu\" class=\"td-markdown-list\">\n    <mat-action-list>\n      <button\n        *ngFor=\"let item of currentMenuItems\"\n        (click)=\"handleItemSelected(item)\"\n        mat-list-item\n        [matTooltip]=\"getTitle(item)\"\n        matTooltipPosition=\"before\"\n        matTooltipShowDelay=\"500\"\n      >\n        <mat-icon matListIcon>\n          subject\n        </mat-icon>\n        <span matLine class=\"truncate\">\n          {{ getTitle(item) }}\n        </span>\n        <mat-divider></mat-divider>\n      </button>\n    </mat-action-list>\n  </div>\n\n  <div *ngIf=\"showTdMarkdownLoader || showTdMarkdown\" class=\"markdown-wrapper\" #markdownWrapper>\n    <td-flavored-markdown-loader\n      *ngIf=\"showTdMarkdownLoader\"\n      [url]=\"url\"\n      [httpOptions]=\"httpOptions\"\n      [anchor]=\"anchor\"\n    ></td-flavored-markdown-loader>\n\n    <td-flavored-markdown\n      *ngIf=\"showTdMarkdown\"\n      [content]=\"markdownString\"\n      [hostedUrl]=\"url\"\n      [anchor]=\"anchor\"\n    ></td-flavored-markdown>\n  </div>\n</ng-container>\n\n<div *ngIf=\"showEmptyState\" layout=\"column\" layout-align=\"center center\" class=\" empty-state\">\n  <mat-icon matListAvatar>subject</mat-icon>\n  <h2>{{ emptyStateLabel }}</h2>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{position:relative;height:100%;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host .markdown-wrapper,:host .td-markdown-list{min-height:1px;overflow-y:auto;-webkit-box-flex:1;-ms-flex:1;flex:1;box-sizing:border-box}:host .markdown-wrapper{padding:16px 16px 0}:host .td-markdown-list>.mat-list{padding-top:0}:host td-flavored-markdown-loader ::ng-deep .mat-progress-bar{top:0;left:0;right:0;position:absolute}:host .title{display:inline-block;vertical-align:middle;margin:8px 0;padding-left:16px}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.empty-state{padding:32px}.empty-state mat-icon{font-size:4em}"]
                }] }
    ];
    /** @nocollapse */
    TdMarkdownNavigatorComponent.ctorParameters = function () { return [
        { type: TdMarkdownLoaderService },
        { type: ChangeDetectorRef }
    ]; };
    TdMarkdownNavigatorComponent.propDecorators = {
        items: [{ type: Input }],
        labels: [{ type: Input }],
        startAt: [{ type: Input }],
        compareWith: [{ type: Input }],
        markdownWrapper: [{ type: ViewChild, args: ['markdownWrapper', { static: false },] }],
        clickListener: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return TdMarkdownNavigatorComponent;
}());
export { TdMarkdownNavigatorComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLHVCQUF1QixHQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFFOUYsNENBT0M7OztJQU5DLHVDQUFlOztJQUNmLHFDQUFhOztJQUNiLDZDQUFxQjs7SUFDckIsZ0RBQXdCOztJQUN4Qix3Q0FBZ0I7O0lBQ2hCLDBDQUFvQzs7Ozs7QUFHdEMsOENBSUM7OztJQUhDLDBDQUFnQjs7SUFDaEIsMENBQWdCOztJQUNoQiw4Q0FBb0I7OztBQUt0QixNQUFNLEtBQU8saUNBQWlDLEdBQTZCO0lBQ3pFLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFVBQVUsRUFBRSx1QkFBdUI7Q0FDcEM7Ozs7O0FBRUQsU0FBUyxlQUFlLENBQUMsR0FBVztJQUNsQyxJQUFJLEdBQUcsRUFBRTs7WUFDRCxJQUFJLEdBQVEsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQzlCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JDO2FBQU07O2dCQUNDLElBQUksR0FBYSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O2dCQUN6QyxRQUFRLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhO1NBQ3hEO0tBQ0Y7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDOzs7OztBQUVELFNBQVMsMEJBQTBCLENBQUMsY0FBc0I7SUFDeEQsSUFBSSxjQUFjLEVBQUU7O1lBQ1osU0FBUyxHQUFXLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSTs7OztRQUFDLFVBQUMsSUFBWSxJQUFLLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBTixDQUFNLEVBQUM7UUFDeEYsT0FBTyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUM1QztJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7Ozs7O0FBRUQsU0FBUyxjQUFjLENBQUMsTUFBeUI7SUFDL0MsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsRSxDQUFDOzs7Ozs7QUFDRCxTQUFTLGtCQUFrQixDQUFDLEVBQTBCLEVBQUUsRUFBMEI7SUFDaEYsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ25CLENBQUM7Ozs7Ozs7QUFFRCxTQUFTLFlBQVksQ0FDbkIsS0FBK0IsRUFDL0IsSUFBNEIsRUFDNUIsV0FBMEM7O0lBRTFDLElBQUksS0FBSyxFQUFFOztZQUNULEtBQW9CLElBQUEsVUFBQSxTQUFBLEtBQUssQ0FBQSw0QkFBQSwrQ0FBRTtnQkFBdEIsSUFBTSxLQUFLLGtCQUFBO2dCQUNkLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQjs7b0JBQ0ssU0FBUyxHQUE2QixZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDO2dCQUMzRixJQUFJLFNBQVMsRUFBRTtvQkFDYixpQkFBUSxLQUFLLEdBQUssU0FBUyxFQUFFO2lCQUM5QjthQUNGOzs7Ozs7Ozs7S0FDRjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRDtJQTRDRSxzQ0FDVSx5QkFBa0QsRUFDbEQsa0JBQXFDO1FBRHJDLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBeUI7UUFDbEQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQVIvQyxpQkFBWSxHQUE2QixFQUFFLENBQUMsQ0FBQyxVQUFVOztRQUV2RCxxQkFBZ0IsR0FBNkIsRUFBRSxDQUFDLENBQUMscUJBQXFCOztRQUV0RSxZQUFPLEdBQVksS0FBSyxDQUFDO0lBS3RCLENBQUM7Ozs7O0lBR0osb0RBQWE7Ozs7SUFEYixVQUNjLEtBQVk7O1lBQ2xCLE9BQU8sR0FBZ0IsbUJBQWEsS0FBSyxDQUFDLFVBQVUsRUFBQTtRQUMxRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksY0FBYyxDQUFDLG1CQUFtQixPQUFPLEVBQUEsQ0FBQyxFQUFFO1lBQzVFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsc0JBQUksMERBQWdCOzs7O1FBQXBCO1lBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx3REFBYzs7OztRQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksb0RBQVU7Ozs7UUFBZDtZQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGtEQUFROzs7O1FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNuRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDhEQUFvQjs7OztRQUF4QjtZQUNFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDOUYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx3REFBYzs7OztRQUFsQjtZQUNFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQztRQUNqRixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDZDQUFHOzs7O1FBQVA7WUFDRSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDO2FBQ3JDO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSxxREFBVzs7OztRQUFmO1lBQ0UsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzVCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQzthQUM3QztRQUNILENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksd0RBQWM7Ozs7UUFBbEI7WUFDRSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDO2FBQ2hEO1FBQ0gsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxnREFBTTs7OztRQUFWO1lBQ0UsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzVCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQzthQUN4QztRQUNILENBQUM7OztPQUFBO0lBRUQsc0JBQUksd0RBQWM7Ozs7UUFBbEI7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxxREFBVzs7OztRQUFmO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxpQ0FBaUMsQ0FBQyxNQUFNLENBQUM7UUFDekYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxxREFBVzs7OztRQUFmO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxpQ0FBaUMsQ0FBQyxNQUFNLENBQUM7UUFDekYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx5REFBZTs7OztRQUFuQjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksaUNBQWlDLENBQUMsVUFBVSxDQUFDO1FBQ2pHLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMERBQWdCOzs7O1FBQXBCO1lBQ0UsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2hDLE9BQU8sRUFBRSxDQUFDO2FBQ1g7aUJBQU0sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQ25DLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUNoRDtpQkFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdkMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2RTtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQzs7O09BQUE7Ozs7O0lBRUQsa0RBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNqQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDNUI7U0FDRjtJQUNILENBQUM7Ozs7SUFFRCw0Q0FBSzs7O0lBQUw7UUFDRSxpQ0FBaUM7UUFDakMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzdHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUM7YUFBTTtZQUNMLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUM7U0FDdEM7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7OztJQUVELDZDQUFNOzs7SUFBTjtRQUNFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztnQkFDMUIsUUFBTSxHQUEyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN0RixJQUFJLFFBQU0sQ0FBQyxRQUFRLElBQUksUUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNqRCxvQ0FBb0M7Z0JBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFNLENBQUMsUUFBUSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLDRCQUE0QjtnQkFDNUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFFBQU0sQ0FBQzthQUNuQztZQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEQ7YUFBTTtZQUNMLGlDQUFpQztZQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDOzs7OztJQUVELHlEQUFrQjs7OztJQUFsQixVQUFtQixJQUE0QjtRQUM3QyxJQUFJLENBQUMsWUFBWSxZQUFPLElBQUksQ0FBQyxZQUFZLEdBQUUsSUFBSSxFQUFDLENBQUM7UUFDakQsSUFDRSxJQUFJLENBQUMsUUFBUTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUM7WUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFDdEU7WUFDQSxzREFBc0Q7WUFDdEQsa0JBQWtCO1lBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDM0Isa0JBQWtCO1lBQ2xCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwRCwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdkM7YUFBTTtZQUNMLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1lBQzNCLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7Ozs7O0lBRUQsK0NBQVE7Ozs7SUFBUixVQUFTLElBQTRCO1FBQ25DLElBQUksSUFBSSxFQUFFO1lBQ1IsT0FBTyxDQUNMLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxLQUFLO2dCQUNWLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUN6QiwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUMvQyxFQUFFLENBQ0gsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNWO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sOENBQU87Ozs7O0lBQWYsVUFBZ0IsSUFBNEI7UUFBNUMsaUJBV0M7UUFWQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztnQkFDakMsU0FBUyxHQUE2QixZQUFZLENBQ3RELElBQUksQ0FBQyxLQUFLLEVBQ1YsSUFBSSxFQUNKLElBQUksQ0FBQyxXQUFXLElBQUksa0JBQWtCLENBQ3ZDO1lBQ0QsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTzs7OztZQUFDLFVBQUMsUUFBZ0MsSUFBSyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBakMsQ0FBaUMsRUFBQyxDQUFDO1NBQ3BHO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7Ozs7OztJQUVhLHNEQUFlOzs7OztJQUE3QixVQUE4QixLQUFZOzs7Ozs7d0JBQ3hDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDakIsSUFBSSxHQUFzQixtQkFBbUIsS0FBSyxDQUFDLE1BQU0sRUFBQTt3QkFDekQsR0FBRyxHQUFRLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO3dCQUNwQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7Ozs7d0JBRU4scUJBQU0sSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUE1RSxjQUFjLEdBQVcsU0FBbUQ7d0JBQ2xGLGlFQUFpRTt3QkFDakUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsY0FBYyxnQkFBQSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQzs7Ozt3QkFFM0MsR0FBRyxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7d0JBQ25ELEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7O3dCQUVaLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOzs7d0JBRXZCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7Ozs7S0FDeEM7O2dCQWhQRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsMDFFQUFrRDtvQkFFbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkE5RXlDLHVCQUF1QjtnQkFIL0QsaUJBQWlCOzs7d0JBd0ZoQixLQUFLO3lCQU9MLEtBQUs7MEJBT0wsS0FBSzs4QkFRTCxLQUFLO2tDQUVMLFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0NBYTlDLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBZ01uQyxtQ0FBQztDQUFBLEFBalBELElBaVBDO1NBM09ZLDRCQUE0Qjs7Ozs7Ozs7SUFNdkMsNkNBQXlDOzs7Ozs7O0lBT3pDLDhDQUEwQzs7Ozs7OztJQU8xQywrQ0FBeUM7Ozs7Ozs7O0lBUXpDLG1EQUFvRDs7SUFFcEQsdURBQTZFOztJQUU3RSxvREFBNEM7O0lBQzVDLDJEQUE0Qzs7SUFDNUMsd0RBQWdEOztJQUVoRCwrQ0FBeUI7Ozs7O0lBR3ZCLGlFQUEwRDs7Ozs7SUFDMUQsMERBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHJlbW92ZUxlYWRpbmdIYXNoLCBpc0FuY2hvckxpbmssIFRkTWFya2Rvd25Mb2FkZXJTZXJ2aWNlIH0gZnJvbSAnQGNvdmFsZW50L21hcmtkb3duJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtIHtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgaHR0cE9wdGlvbnM/OiBvYmplY3Q7XG4gIG1hcmtkb3duU3RyaW5nPzogc3RyaW5nOyAvLyByYXcgbWFya2Rvd25cbiAgYW5jaG9yPzogc3RyaW5nO1xuICBjaGlsZHJlbj86IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMge1xuICBnb0hvbWU/OiBzdHJpbmc7XG4gIGdvQmFjaz86IHN0cmluZztcbiAgZW1wdHlTdGF0ZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGggPSAobzE6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0sIG8yOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKSA9PiBib29sZWFuO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTOiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMgPSB7XG4gIGdvSG9tZTogJ0dvIGhvbWUnLFxuICBnb0JhY2s6ICdHbyBiYWNrJyxcbiAgZW1wdHlTdGF0ZTogJ05vIGl0ZW0ocykgdG8gZGlzcGxheScsXG59O1xuXG5mdW5jdGlvbiBnZXRUaXRsZUZyb21VcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAodXJsKSB7XG4gICAgY29uc3QgdGVtcDogVVJMID0gbmV3IFVSTCh1cmwpO1xuICAgIGlmICh0ZW1wLmhhc2gpIHtcbiAgICAgIHJldHVybiByZW1vdmVMZWFkaW5nSGFzaCh0ZW1wLmhhc2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwYXRoOiBzdHJpbmdbXSA9IHRlbXAucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICAgIGNvbnN0IGZpbGVOYW1lOiBzdHJpbmcgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07XG4gICAgICByZXR1cm4gZmlsZU5hbWUucmVwbGFjZSgvXFwuW14vLl0rJC8sICcnKTsgLy8gcmVtb3ZlIC5tZFxuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBnZXRUaXRsZUZyb21NYXJrZG93blN0cmluZyhtYXJrZG93blN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKG1hcmtkb3duU3RyaW5nKSB7XG4gICAgY29uc3QgZmlyc3RMaW5lOiBzdHJpbmcgPSBtYXJrZG93blN0cmluZy5zcGxpdCgvW1xcclxcbl0rLykuZmluZCgobGluZTogc3RyaW5nKSA9PiAhIWxpbmUpO1xuICAgIHJldHVybiByZW1vdmVMZWFkaW5nSGFzaChmaXJzdExpbmUpLnRyaW0oKTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc01hcmtkb3duSHJlZihhbmNob3I6IEhUTUxBbmNob3JFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiAhaXNBbmNob3JMaW5rKGFuY2hvcikgJiYgYW5jaG9yLnBhdGhuYW1lLmVuZHNXaXRoKCcubWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlV2l0aChvMTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgbzI6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBib29sZWFuIHtcbiAgcmV0dXJuIG8xID09PSBvMjtcbn1cblxuZnVuY3Rpb24gZ2V0QW5jZXN0b3JzKFxuICBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdLFxuICBpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLFxuICBjb21wYXJlV2l0aDogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGgsXG4pOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10ge1xuICBpZiAoaXRlbXMpIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGl0ZW1zKSB7XG4gICAgICBpZiAoY29tcGFyZVdpdGgoY2hpbGQsIGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiBbY2hpbGRdO1xuICAgICAgfVxuICAgICAgY29uc3QgYW5jZXN0b3JzOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBnZXRBbmNlc3RvcnMoY2hpbGQuY2hpbGRyZW4sIGl0ZW0sIGNvbXBhcmVXaXRoKTtcbiAgICAgIGlmIChhbmNlc3RvcnMpIHtcbiAgICAgICAgcmV0dXJuIFtjaGlsZCwgLi4uYW5jZXN0b3JzXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGQtbWFya2Rvd24tbmF2aWdhdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVGRNYXJrZG93bk5hdmlnYXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdXG4gICAqXG4gICAqIExpc3Qgb2YgSU1hcmtkb3duTmF2aWdhdG9ySXRlbXMgdG8gYmUgcmVuZGVyZWRcbiAgICovXG4gIEBJbnB1dCgpIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG5cbiAgLyoqXG4gICAqIGxhYmVscz86IElNYXJrZG93bk5hdmlnYXRvckxhYmVsc1xuICAgKlxuICAgKiBUcmFuc2xhdGVkIGxhYmVsc1xuICAgKi9cbiAgQElucHV0KCkgbGFiZWxzOiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHM7XG5cbiAgLyoqXG4gICAqIHN0YXJ0QXQ/OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtXG4gICAqXG4gICAqIEl0ZW0gdG8gc3RhcnQgdG9cbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0QXQ6IElNYXJrZG93bk5hdmlnYXRvckl0ZW07XG5cbiAgLyoqXG4gICAqIGNvbXBhcmVXaXRoPzogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGhcbiAgICpcbiAgICogRnVuY3Rpb24gdXNlZCB0byBmaW5kIHN0YXJ0QXQgaXRlbVxuICAgKiBEZWZhdWx0cyB0byBjb21wYXJpc29uIGJ5IHN0cmljdCBlcXVhbGl0eSAoPT09KVxuICAgKi9cbiAgQElucHV0KCkgY29tcGFyZVdpdGg6IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoO1xuXG4gIEBWaWV3Q2hpbGQoJ21hcmtkb3duV3JhcHBlcicsIHsgc3RhdGljOiBmYWxzZSB9KSBtYXJrZG93bldyYXBwZXI6IEVsZW1lbnRSZWY7XG5cbiAgaGlzdG9yeVN0YWNrOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTsgLy8gaGlzdG9yeVxuICBjdXJyZW50TWFya2Rvd25JdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtOyAvLyBjdXJyZW50bHkgcmVuZGVyZWRcbiAgY3VycmVudE1lbnVJdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gW107IC8vIGN1cnJlbnQgbWVudSBpdGVtc1xuXG4gIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9tYXJrZG93blVybExvYWRlclNlcnZpY2U6IFRkTWFya2Rvd25Mb2FkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgY2xpY2tMaXN0ZW5lcihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD5ldmVudC5zcmNFbGVtZW50O1xuICAgIGlmIChlbGVtZW50Lm1hdGNoZXMoJ2FbaHJlZl0nKSAmJiBpc01hcmtkb3duSHJlZig8SFRNTEFuY2hvckVsZW1lbnQ+ZWxlbWVudCkpIHtcbiAgICAgIHRoaXMuaGFuZGxlTGlua0NsaWNrKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBnZXQgc2hvd0dvQmFja0J1dHRvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldCBzaG93SG9tZUJ1dHRvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMTtcbiAgfVxuXG4gIGdldCBzaG93SGVhZGVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNob3dIb21lQnV0dG9uIHx8IHRoaXMuc2hvd0dvQmFja0J1dHRvbiB8fCAhIXRoaXMuY3VycmVudEl0ZW1UaXRsZTtcbiAgfVxuXG4gIGdldCBzaG93TWVudSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TWVudUl0ZW1zICYmIHRoaXMuY3VycmVudE1lbnVJdGVtcy5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHNob3dUZE1hcmtkb3duTG9hZGVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbSAmJiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbS51cmwgJiYgIXRoaXMuc2hvd1RkTWFya2Rvd247XG4gIH1cblxuICBnZXQgc2hvd1RkTWFya2Rvd24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtICYmICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLm1hcmtkb3duU3RyaW5nO1xuICB9XG5cbiAgZ2V0IHVybCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0udXJsO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGdldCBodHRwT3B0aW9ucygpOiBvYmplY3Qge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uaHR0cE9wdGlvbnM7XG4gICAgfVxuICB9XG4gIGdldCBtYXJrZG93blN0cmluZygpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0ubWFya2Rvd25TdHJpbmc7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFuY2hvcigpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uYW5jaG9yO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaG93RW1wdHlTdGF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXRlbXMgfHwgdGhpcy5pdGVtcy5sZW5ndGggPCAxO1xuICB9XG5cbiAgZ2V0IGdvSG9tZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5nb0hvbWUpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUy5nb0hvbWU7XG4gIH1cblxuICBnZXQgZ29CYWNrTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmdvQmFjaykgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTLmdvQmFjaztcbiAgfVxuXG4gIGdldCBlbXB0eVN0YXRlTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmVtcHR5U3RhdGUpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUy5lbXB0eVN0YXRlO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRJdGVtVGl0bGUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VGl0bGUodGhpcy5oaXN0b3J5U3RhY2tbdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIC0gMV0pO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuaXRlbXMpIHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuc3RhcnRBdCkge1xuICAgICAgICB0aGlzLl9qdW1wVG8odGhpcy5zdGFydEF0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICAvLyBpZiBzaW5nbGUgaXRlbSBhbmQgbm8gY2hpbGRyZW5cbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMSAmJiAoIXRoaXMuaXRlbXNbMF0uY2hpbGRyZW4gfHwgdGhpcy5pdGVtc1swXS5jaGlsZHJlbi5sZW5ndGggPT09IDApKSB7XG4gICAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSBbXTtcbiAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IHRoaXMuaXRlbXNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IHRoaXMuaXRlbXM7XG4gICAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuaGlzdG9yeVN0YWNrID0gW107XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnb0JhY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IHBhcmVudDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSA9IHRoaXMuaGlzdG9yeVN0YWNrW3RoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCAtIDJdO1xuICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbiAmJiBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBpZiBwYXJlbnQgaGFzIGNoaWxkcmVuLCBzaG93IG1lbnVcbiAgICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gcGFyZW50LmNoaWxkcmVuO1xuICAgICAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBlbHNlIGp1c3QgcmVuZGVyIG1hcmtkb3duXG4gICAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSBwYXJlbnQ7XG4gICAgICB9XG4gICAgICB0aGlzLmhpc3RvcnlTdGFjayA9IHRoaXMuaGlzdG9yeVN0YWNrLnNsaWNlKDAsIC0xKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb25lIGxldmVsIGRvd24ganVzdCBnbyB0byByb290XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgaGFuZGxlSXRlbVNlbGVjdGVkKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLmhpc3RvcnlTdGFjayA9IFsuLi50aGlzLmhpc3RvcnlTdGFjaywgaXRlbV07XG4gICAgaWYgKFxuICAgICAgaXRlbS5jaGlsZHJlbiAmJlxuICAgICAgaXRlbS5jaGlsZHJlbi5sZW5ndGggPT09IDEgJiZcbiAgICAgICghaXRlbS5jaGlsZHJlblswXS5jaGlsZHJlbiB8fCBpdGVtLmNoaWxkcmVuWzBdLmNoaWxkcmVuLmxlbmd0aCA9PT0gMClcbiAgICApIHtcbiAgICAgIC8vIGNsaWNrZWQgb24gaXRlbSB3aXRoIG9uZSBjaGlsZCB0aGF0IGhhcyBubyBjaGlsZHJlblxuICAgICAgLy8gZG9uJ3Qgc2hvdyBtZW51XG4gICAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSBbXTtcbiAgICAgIC8vIHJlbmRlciBtYXJrZG93blxuICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gaXRlbS5jaGlsZHJlblswXTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBoYXMgY2hpbGRyZW4sIGdvIGluc2lkZVxuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gaXRlbS5jaGlsZHJlbjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZG9uJ3Qgc2hvdyBtZW51XG4gICAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSBbXTtcbiAgICAgIC8vIHJlbmRlciBtYXJrZG93blxuICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gaXRlbTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXRUaXRsZShpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogc3RyaW5nIHtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgcmVtb3ZlTGVhZGluZ0hhc2goaXRlbS5hbmNob3IpIHx8XG4gICAgICAgIGl0ZW0udGl0bGUgfHxcbiAgICAgICAgZ2V0VGl0bGVGcm9tVXJsKGl0ZW0udXJsKSB8fFxuICAgICAgICBnZXRUaXRsZUZyb21NYXJrZG93blN0cmluZyhpdGVtLm1hcmtkb3duU3RyaW5nKSB8fFxuICAgICAgICAnJ1xuICAgICAgKS50cmltKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfanVtcFRvKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBhbmNlc3RvcnM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IGdldEFuY2VzdG9ycyhcbiAgICAgICAgdGhpcy5pdGVtcyxcbiAgICAgICAgaXRlbSxcbiAgICAgICAgdGhpcy5jb21wYXJlV2l0aCB8fCBkZWZhdWx0Q29tcGFyZVdpdGgsXG4gICAgICApO1xuICAgICAgKGFuY2VzdG9ycyB8fCBbXSkuZm9yRWFjaCgoYW5jZXN0b3I6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pID0+IHRoaXMuaGFuZGxlSXRlbVNlbGVjdGVkKGFuY2VzdG9yKSk7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVMaW5rQ2xpY2soZXZlbnQ6IEV2ZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBsaW5rOiBIVE1MQW5jaG9yRWxlbWVudCA9IDxIVE1MQW5jaG9yRWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgY29uc3QgdXJsOiBVUkwgPSBuZXcgVVJMKGxpbmsuaHJlZik7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWFya2Rvd25TdHJpbmc6IHN0cmluZyA9IGF3YWl0IHRoaXMuX21hcmtkb3duVXJsTG9hZGVyU2VydmljZS5sb2FkKHVybC5ocmVmKTtcbiAgICAgIC8vIHBhc3MgaW4gdXJsIHRvIGJlIGFibGUgdG8gdXNlIGN1cnJlbnRNYXJrZG93bkl0ZW0udXJsIGxhdGVyIG9uXG4gICAgICB0aGlzLmhhbmRsZUl0ZW1TZWxlY3RlZCh7IG1hcmtkb3duU3RyaW5nLCB1cmw6IHVybC5ocmVmIH0pO1xuICAgICAgdGhpcy5tYXJrZG93bldyYXBwZXIubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCB3aW46IFdpbmRvdyA9IHdpbmRvdy5vcGVuKHVybC5ocmVmLCAnX2JsYW5rJyk7XG4gICAgICB3aW4uZm9jdXMoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=