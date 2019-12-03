/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __awaiter, __generator, __read, __spread } from "tslib";
import { Component, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
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
var MarkdownNavigatorComponent = /** @class */ (function () {
    function MarkdownNavigatorComponent(_markdownUrlLoaderService) {
        this._markdownUrlLoaderService = _markdownUrlLoaderService;
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
    MarkdownNavigatorComponent.prototype.clickListener = /**
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
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "showGoBackButton", {
        get: /**
         * @return {?}
         */
        function () {
            return this.historyStack.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "showHomeButton", {
        get: /**
         * @return {?}
         */
        function () {
            return this.historyStack.length > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "showHeader", {
        get: /**
         * @return {?}
         */
        function () {
            return this.showHomeButton || this.showGoBackButton || !!this.currentItemTitle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "showMenu", {
        get: /**
         * @return {?}
         */
        function () {
            return this.currentMenuItems && this.currentMenuItems.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "showTdMarkdownLoader", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.currentMarkdownItem && !!this.currentMarkdownItem.url && !this.showTdMarkdown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "showTdMarkdown", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.currentMarkdownItem && !!this.currentMarkdownItem.markdownString;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "url", {
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
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "httpOptions", {
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
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "markdownString", {
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
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "anchor", {
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
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "showEmptyState", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.items || this.items.length < 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "goHomeLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.labels && this.labels.goHome) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.goHome;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "goBackLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.labels && this.labels.goBack) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.goBack;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "emptyStateLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.labels && this.labels.emptyState) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.emptyState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownNavigatorComponent.prototype, "currentItemTitle", {
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
            else if (this.historyStack[0] && this.historyStack[0][0]) {
                return this.getTitle(this.historyStack[0][0]);
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
    MarkdownNavigatorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.items) {
            this.reset();
        }
    };
    /**
     * @return {?}
     */
    MarkdownNavigatorComponent.prototype.reset = /**
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
    };
    /**
     * @param {?} item
     * @return {?}
     */
    MarkdownNavigatorComponent.prototype.handleItemSelected = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.currentMenuItems.length === 0) {
            // clicked on a markdown link within the current markdown file
            this.historyStack = __spread(this.historyStack, [[this.currentMarkdownItem]]);
        }
        else {
            this.historyStack = __spread(this.historyStack, [this.currentMenuItems]);
        }
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
    };
    /**
     * @return {?}
     */
    MarkdownNavigatorComponent.prototype.goBack = /**
     * @return {?}
     */
    function () {
        if (this.historyStack.length > 0) {
            /** @type {?} */
            var parent_1 = this.historyStack[this.historyStack.length - 1];
            if (parent_1.length === 1 && (!parent_1[0].children || parent_1[0].children.length === 0)) {
                this.currentMenuItems = [];
                this.currentMarkdownItem = parent_1[0];
            }
            else {
                this.currentMenuItems = parent_1;
                this.currentMarkdownItem = undefined;
            }
            this.historyStack = this.historyStack.slice(0, -1);
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    MarkdownNavigatorComponent.prototype.getTitle = /**
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
     * @param {?} event
     * @return {?}
     */
    MarkdownNavigatorComponent.prototype.handleLinkClick = /**
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
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MarkdownNavigatorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'td-markdown-navigator',
                    template: "<ng-container *ngIf=\"!showEmptyState\">\n  <mat-progress-bar *ngIf=\"loading\" mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n\n  <ng-container *ngIf=\"showHeader\">\n    <div [style.display]=\"'flex'\">\n      <button *ngIf=\"showHomeButton\" mat-icon-button [matTooltip]=\"goHomeLabel\" (click)=\"reset()\">\n        <mat-icon [attr.aria-label]=\"goHomeLabel\">\n          home\n        </mat-icon>\n      </button>\n\n      <button *ngIf=\"showGoBackButton\" mat-icon-button [matTooltip]=\"goBackLabel\" (click)=\"goBack()\">\n        <mat-icon [attr.aria-label]=\"goBackLabel\">\n          arrow_back\n        </mat-icon>\n      </button>\n      <span flex *ngIf=\"currentItemTitle\" class=\"mat-body-2 title truncate\">{{ currentItemTitle }}</span>\n    </div>\n\n    <mat-divider [style.position]=\"'relative'\"></mat-divider>\n  </ng-container>\n\n  <div *ngIf=\"showMenu\" class=\"td-markdown-list\">\n    <mat-action-list>\n      <button\n        *ngFor=\"let item of currentMenuItems\"\n        (click)=\"handleItemSelected(item)\"\n        mat-list-item\n        [matTooltip]=\"getTitle(item)\"\n        matTooltipPosition=\"before\"\n        matTooltipShowDelay=\"500\"\n      >\n        <mat-icon matListIcon>\n          subject\n        </mat-icon>\n        <span matLine class=\"truncate\">\n          {{ getTitle(item) }}\n        </span>\n        <mat-divider></mat-divider>\n      </button>\n    </mat-action-list>\n  </div>\n\n  <div *ngIf=\"showTdMarkdownLoader || showTdMarkdown\" class=\"markdown-wrapper\" #markdownWrapper>\n    <td-flavored-markdown-loader\n      *ngIf=\"showTdMarkdownLoader\"\n      [url]=\"url\"\n      [httpOptions]=\"httpOptions\"\n      [anchor]=\"anchor\"\n    ></td-flavored-markdown-loader>\n\n    <td-flavored-markdown\n      *ngIf=\"showTdMarkdown\"\n      [content]=\"markdownString\"\n      [hostedUrl]=\"url\"\n      [anchor]=\"anchor\"\n    ></td-flavored-markdown>\n  </div>\n</ng-container>\n\n<div *ngIf=\"showEmptyState\" layout=\"column\" layout-align=\"center center\" class=\" empty-state\">\n  <mat-icon matListAvatar>subject</mat-icon>\n  <h2>{{ emptyStateLabel }}</h2>\n</div>\n",
                    styles: [":host{position:relative;height:100%;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host .markdown-wrapper,:host .td-markdown-list{min-height:1px;overflow-y:auto;-webkit-box-flex:1;-ms-flex:1;flex:1;box-sizing:border-box}:host .markdown-wrapper{padding:16px 16px 0}:host .td-markdown-list>.mat-list{padding-top:0}:host td-flavored-markdown-loader ::ng-deep .mat-progress-bar{top:0;left:0;right:0;position:absolute}:host .title{display:inline-block;vertical-align:middle;margin:8px 0;padding-left:16px}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.empty-state{padding:32px}.empty-state mat-icon{font-size:4em}"]
                }] }
    ];
    /** @nocollapse */
    MarkdownNavigatorComponent.ctorParameters = function () { return [
        { type: MarkdownLoaderService }
    ]; };
    MarkdownNavigatorComponent.propDecorators = {
        items: [{ type: Input }],
        labels: [{ type: Input }],
        markdownWrapper: [{ type: ViewChild, args: ['markdownWrapper', { static: false },] }],
        clickListener: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return MarkdownNavigatorComponent;
}());
export { MarkdownNavigatorComponent };
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUU1Riw0Q0FPQzs7O0lBTkMsdUNBQWU7O0lBQ2YscUNBQWE7O0lBQ2IsNkNBQXFCOztJQUNyQixnREFBd0I7O0lBQ3hCLHdDQUFnQjs7SUFDaEIsMENBQW9DOzs7OztBQUd0Qyw4Q0FJQzs7O0lBSEMsMENBQWdCOztJQUNoQiwwQ0FBZ0I7O0lBQ2hCLDhDQUFvQjs7O0FBR3RCLE1BQU0sS0FBTyxpQ0FBaUMsR0FBNkI7SUFDekUsTUFBTSxFQUFFLFNBQVM7SUFDakIsTUFBTSxFQUFFLFNBQVM7SUFDakIsVUFBVSxFQUFFLHVCQUF1QjtDQUNwQzs7Ozs7QUFFRCxTQUFTLGVBQWUsQ0FBQyxHQUFXO0lBQ2xDLElBQUksR0FBRyxFQUFFOztZQUNELElBQUksR0FBUSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckM7YUFBTTs7Z0JBQ0MsSUFBSSxHQUFhLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7Z0JBQ3pDLFFBQVEsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDOUMsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWE7U0FDeEQ7S0FDRjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7Ozs7O0FBRUQsU0FBUywwQkFBMEIsQ0FBQyxjQUFzQjtJQUN4RCxJQUFJLGNBQWMsRUFBRTs7WUFDWixTQUFTLEdBQVcsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJOzs7O1FBQUMsVUFBQyxJQUFZLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFOLENBQU0sRUFBQztRQUN4RixPQUFPLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQzVDO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQzs7Ozs7QUFFRCxTQUFTLGNBQWMsQ0FBQyxNQUF5QjtJQUMvQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFFRDtJQTRCRSxvQ0FBb0IseUJBQWdEO1FBQWhELDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBdUI7UUFOcEUsaUJBQVksR0FBK0IsRUFBRSxDQUFDLENBQUMsVUFBVTs7UUFFekQscUJBQWdCLEdBQTZCLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQjs7UUFFdEUsWUFBTyxHQUFZLEtBQUssQ0FBQztJQUU4QyxDQUFDOzs7OztJQUd4RSxrREFBYTs7OztJQURiLFVBQ2MsS0FBWTs7WUFDbEIsT0FBTyxHQUFnQixtQkFBYSxLQUFLLENBQUMsVUFBVSxFQUFBO1FBQzFELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxjQUFjLENBQUMsbUJBQW1CLE9BQU8sRUFBQSxDQUFDLEVBQUU7WUFDNUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7SUFFRCxzQkFBSSx3REFBZ0I7Ozs7UUFBcEI7WUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHNEQUFjOzs7O1FBQWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxrREFBVTs7OztRQUFkO1lBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pGLENBQUM7OztPQUFBO0lBRUQsc0JBQUksZ0RBQVE7Ozs7UUFBWjtZQUNFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ25FLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNERBQW9COzs7O1FBQXhCO1lBQ0UsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM5RixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHNEQUFjOzs7O1FBQWxCO1lBQ0UsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDO1FBQ2pGLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMkNBQUc7Ozs7UUFBUDtZQUNFLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUM1QixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUM7YUFDckM7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDOzs7T0FBQTtJQUNELHNCQUFJLG1EQUFXOzs7O1FBQWY7WUFDRSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDO2FBQzdDO1FBQ0gsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSxzREFBYzs7OztRQUFsQjtZQUNFLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUM1QixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7YUFDaEQ7UUFDSCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDhDQUFNOzs7O1FBQVY7WUFDRSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxzREFBYzs7OztRQUFsQjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM5QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG1EQUFXOzs7O1FBQWY7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlDQUFpQyxDQUFDLE1BQU0sQ0FBQztRQUN6RixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG1EQUFXOzs7O1FBQWY7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlDQUFpQyxDQUFDLE1BQU0sQ0FBQztRQUN6RixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVEQUFlOzs7O1FBQW5CO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxpQ0FBaUMsQ0FBQyxVQUFVLENBQUM7UUFDakcsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx3REFBZ0I7Ozs7UUFBcEI7WUFDRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDaEMsT0FBTyxFQUFFLENBQUM7YUFDWDtpQkFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDbkMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ2hEO2lCQUFNLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMxRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9DO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDOzs7T0FBQTs7Ozs7SUFFRCxnREFBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7OztJQUVELDBDQUFLOzs7SUFBTDtRQUNFLGlDQUFpQztRQUNqQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDN0csSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0wsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRUQsdURBQWtCOzs7O0lBQWxCLFVBQW1CLElBQTRCO1FBQzdDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEMsOERBQThEO1lBQzlELElBQUksQ0FBQyxZQUFZLFlBQU8sSUFBSSxDQUFDLFlBQVksR0FBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFDLENBQUM7U0FDeEU7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLFlBQU8sSUFBSSxDQUFDLFlBQVksR0FBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsQ0FBQztTQUNuRTtRQUVELElBQ0UsSUFBSSxDQUFDLFFBQVE7WUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQ3RFO1lBQ0Esc0RBQXNEO1lBQ3RELGtCQUFrQjtZQUNsQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1lBQzNCLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QzthQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDcEQsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3ZDO2FBQU07WUFDTCxrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztZQUMzQixrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztTQUNqQztJQUNILENBQUM7Ozs7SUFFRCwyQ0FBTTs7O0lBQU47UUFDRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7Z0JBQzFCLFFBQU0sR0FBNkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDeEYsSUFBSSxRQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDbkYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFFBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBTSxDQUFDO2dCQUMvQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO2FBQ3RDO1lBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwRDtJQUNILENBQUM7Ozs7O0lBRUQsNkNBQVE7Ozs7SUFBUixVQUFTLElBQTRCO1FBQ25DLElBQUksSUFBSSxFQUFFO1lBQ1IsT0FBTyxDQUNMLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxLQUFLO2dCQUNWLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUN6QiwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUMvQyxFQUFFLENBQ0gsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNWO0lBQ0gsQ0FBQzs7Ozs7SUFFSyxvREFBZTs7OztJQUFyQixVQUFzQixLQUFZOzs7Ozs7d0JBQ2hDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDakIsSUFBSSxHQUFzQixtQkFBbUIsS0FBSyxDQUFDLE1BQU0sRUFBQTt3QkFDekQsR0FBRyxHQUFRLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOzs7O3dCQUVhLHFCQUFNLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBNUUsY0FBYyxHQUFXLFNBQW1EO3dCQUNsRixpRUFBaUU7d0JBQ2pFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLGNBQWMsZ0JBQUEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQzNELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7Ozs7d0JBRTNDLEdBQUcsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO3dCQUNuRCxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7Ozt3QkFFWixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7Ozs7O0tBRXhCOztnQkF6TUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLDJuRUFBa0Q7O2lCQUVuRDs7OztnQkFyRHlDLHFCQUFxQjs7O3dCQTRENUQsS0FBSzt5QkFPTCxLQUFLO2tDQUVMLFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0NBVTlDLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBNEtuQyxpQ0FBQztDQUFBLEFBMU1ELElBME1DO1NBck1ZLDBCQUEwQjs7Ozs7Ozs7SUFNckMsMkNBQXlDOzs7Ozs7O0lBT3pDLDRDQUEwQzs7SUFFMUMscURBQTZFOztJQUU3RSxrREFBOEM7O0lBQzlDLHlEQUE0Qzs7SUFDNUMsc0RBQWdEOztJQUVoRCw2Q0FBeUI7Ozs7O0lBRWIsK0RBQXdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBIb3N0TGlzdGVuZXIsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcmVtb3ZlTGVhZGluZ0hhc2gsIGlzQW5jaG9yTGluaywgTWFya2Rvd25Mb2FkZXJTZXJ2aWNlIH0gZnJvbSAnQGNvdmFsZW50L21hcmtkb3duJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtIHtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgaHR0cE9wdGlvbnM/OiBvYmplY3Q7XG4gIG1hcmtkb3duU3RyaW5nPzogc3RyaW5nOyAvLyByYXcgbWFya2Rvd25cbiAgYW5jaG9yPzogc3RyaW5nO1xuICBjaGlsZHJlbj86IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMge1xuICBnb0hvbWU/OiBzdHJpbmc7XG4gIGdvQmFjaz86IHN0cmluZztcbiAgZW1wdHlTdGF0ZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUzogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzID0ge1xuICBnb0hvbWU6ICdHbyBob21lJyxcbiAgZ29CYWNrOiAnR28gYmFjaycsXG4gIGVtcHR5U3RhdGU6ICdObyBpdGVtKHMpIHRvIGRpc3BsYXknLFxufTtcblxuZnVuY3Rpb24gZ2V0VGl0bGVGcm9tVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHVybCkge1xuICAgIGNvbnN0IHRlbXA6IFVSTCA9IG5ldyBVUkwodXJsKTtcbiAgICBpZiAodGVtcC5oYXNoKSB7XG4gICAgICByZXR1cm4gcmVtb3ZlTGVhZGluZ0hhc2godGVtcC5oYXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcGF0aDogc3RyaW5nW10gPSB0ZW1wLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICBjb25zdCBmaWxlTmFtZTogc3RyaW5nID0gcGF0aFtwYXRoLmxlbmd0aCAtIDFdO1xuICAgICAgcmV0dXJuIGZpbGVOYW1lLnJlcGxhY2UoL1xcLlteLy5dKyQvLCAnJyk7IC8vIHJlbW92ZSAubWRcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZ2V0VGl0bGVGcm9tTWFya2Rvd25TdHJpbmcobWFya2Rvd25TdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChtYXJrZG93blN0cmluZykge1xuICAgIGNvbnN0IGZpcnN0TGluZTogc3RyaW5nID0gbWFya2Rvd25TdHJpbmcuc3BsaXQoL1tcXHJcXG5dKy8pLmZpbmQoKGxpbmU6IHN0cmluZykgPT4gISFsaW5lKTtcbiAgICByZXR1cm4gcmVtb3ZlTGVhZGluZ0hhc2goZmlyc3RMaW5lKS50cmltKCk7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNNYXJrZG93bkhyZWYoYW5jaG9yOiBIVE1MQW5jaG9yRWxlbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gIWlzQW5jaG9yTGluayhhbmNob3IpICYmIGFuY2hvci5wYXRobmFtZS5lbmRzV2l0aCgnLm1kJyk7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RkLW1hcmtkb3duLW5hdmlnYXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Rvd25OYXZpZ2F0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAvKipcbiAgICogaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXVxuICAgKlxuICAgKiBMaXN0IG9mIElNYXJrZG93bk5hdmlnYXRvckl0ZW1zIHRvIGJlIHJlbmRlcmVkXG4gICAqL1xuICBASW5wdXQoKSBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuXG4gIC8qKlxuICAgKiBsYWJlbHM/OiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHNcbiAgICpcbiAgICogVHJhbnNsYXRlZCBsYWJlbHNcbiAgICovXG4gIEBJbnB1dCgpIGxhYmVsczogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzO1xuXG4gIEBWaWV3Q2hpbGQoJ21hcmtkb3duV3JhcHBlcicsIHsgc3RhdGljOiBmYWxzZSB9KSBtYXJrZG93bldyYXBwZXI6IEVsZW1lbnRSZWY7XG5cbiAgaGlzdG9yeVN0YWNrOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW11bXSA9IFtdOyAvLyBoaXN0b3J5XG4gIGN1cnJlbnRNYXJrZG93bkl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW07IC8vIGN1cnJlbnRseSByZW5kZXJlZFxuICBjdXJyZW50TWVudUl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTsgLy8gY3VycmVudCBtZW51IGl0ZW1zXG5cbiAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcmtkb3duVXJsTG9hZGVyU2VydmljZTogTWFya2Rvd25Mb2FkZXJTZXJ2aWNlKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgY2xpY2tMaXN0ZW5lcihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD5ldmVudC5zcmNFbGVtZW50O1xuICAgIGlmIChlbGVtZW50Lm1hdGNoZXMoJ2FbaHJlZl0nKSAmJiBpc01hcmtkb3duSHJlZig8SFRNTEFuY2hvckVsZW1lbnQ+ZWxlbWVudCkpIHtcbiAgICAgIHRoaXMuaGFuZGxlTGlua0NsaWNrKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBnZXQgc2hvd0dvQmFja0J1dHRvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldCBzaG93SG9tZUJ1dHRvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMTtcbiAgfVxuXG4gIGdldCBzaG93SGVhZGVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNob3dIb21lQnV0dG9uIHx8IHRoaXMuc2hvd0dvQmFja0J1dHRvbiB8fCAhIXRoaXMuY3VycmVudEl0ZW1UaXRsZTtcbiAgfVxuXG4gIGdldCBzaG93TWVudSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TWVudUl0ZW1zICYmIHRoaXMuY3VycmVudE1lbnVJdGVtcy5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHNob3dUZE1hcmtkb3duTG9hZGVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbSAmJiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbS51cmwgJiYgIXRoaXMuc2hvd1RkTWFya2Rvd247XG4gIH1cblxuICBnZXQgc2hvd1RkTWFya2Rvd24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtICYmICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLm1hcmtkb3duU3RyaW5nO1xuICB9XG5cbiAgZ2V0IHVybCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0udXJsO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGdldCBodHRwT3B0aW9ucygpOiBvYmplY3Qge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uaHR0cE9wdGlvbnM7XG4gICAgfVxuICB9XG4gIGdldCBtYXJrZG93blN0cmluZygpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0ubWFya2Rvd25TdHJpbmc7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFuY2hvcigpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uYW5jaG9yO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaG93RW1wdHlTdGF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXRlbXMgfHwgdGhpcy5pdGVtcy5sZW5ndGggPCAxO1xuICB9XG5cbiAgZ2V0IGdvSG9tZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5nb0hvbWUpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUy5nb0hvbWU7XG4gIH1cblxuICBnZXQgZ29CYWNrTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmdvQmFjaykgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTLmdvQmFjaztcbiAgfVxuXG4gIGdldCBlbXB0eVN0YXRlTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmVtcHR5U3RhdGUpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUy5lbXB0eVN0YXRlO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRJdGVtVGl0bGUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oaXN0b3J5U3RhY2tbMF0gJiYgdGhpcy5oaXN0b3J5U3RhY2tbMF1bMF0pIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRpdGxlKHRoaXMuaGlzdG9yeVN0YWNrWzBdWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLml0ZW1zKSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgLy8gaWYgc2luZ2xlIGl0ZW0gYW5kIG5vIGNoaWxkcmVuXG4gICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5sZW5ndGggPT09IDEgJiYgKCF0aGlzLml0ZW1zWzBdLmNoaWxkcmVuIHx8IHRoaXMuaXRlbXNbMF0uY2hpbGRyZW4ubGVuZ3RoID09PSAwKSkge1xuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gW107XG4gICAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSB0aGlzLml0ZW1zWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLmhpc3RvcnlTdGFjayA9IFtdO1xuICB9XG5cbiAgaGFuZGxlSXRlbVNlbGVjdGVkKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWVudUl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gY2xpY2tlZCBvbiBhIG1hcmtkb3duIGxpbmsgd2l0aGluIHRoZSBjdXJyZW50IG1hcmtkb3duIGZpbGVcbiAgICAgIHRoaXMuaGlzdG9yeVN0YWNrID0gWy4uLnRoaXMuaGlzdG9yeVN0YWNrLCBbdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtXV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGlzdG9yeVN0YWNrID0gWy4uLnRoaXMuaGlzdG9yeVN0YWNrLCB0aGlzLmN1cnJlbnRNZW51SXRlbXNdO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGl0ZW0uY2hpbGRyZW4gJiZcbiAgICAgIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmXG4gICAgICAoIWl0ZW0uY2hpbGRyZW5bMF0uY2hpbGRyZW4gfHwgaXRlbS5jaGlsZHJlblswXS5jaGlsZHJlbi5sZW5ndGggPT09IDApXG4gICAgKSB7XG4gICAgICAvLyBjbGlja2VkIG9uIGl0ZW0gd2l0aCBvbmUgY2hpbGQgdGhhdCBoYXMgbm8gY2hpbGRyZW5cbiAgICAgIC8vIGRvbid0IHNob3cgbWVudVxuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gW107XG4gICAgICAvLyByZW5kZXIgbWFya2Rvd25cbiAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IGl0ZW0uY2hpbGRyZW5bMF07XG4gICAgfSBlbHNlIGlmIChpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgLy8gaGFzIGNoaWxkcmVuLCBnbyBpbnNpZGVcbiAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IGl0ZW0uY2hpbGRyZW47XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGRvbid0IHNob3cgbWVudVxuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gW107XG4gICAgICAvLyByZW5kZXIgbWFya2Rvd25cbiAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IGl0ZW07XG4gICAgfVxuICB9XG5cbiAgZ29CYWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBwYXJlbnQ6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IHRoaXMuaGlzdG9yeVN0YWNrW3RoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKHBhcmVudC5sZW5ndGggPT09IDEgJiYgKCFwYXJlbnRbMF0uY2hpbGRyZW4gfHwgcGFyZW50WzBdLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gW107XG4gICAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IHBhcmVudFswXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IHBhcmVudDtcbiAgICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgdGhpcy5oaXN0b3J5U3RhY2sgPSB0aGlzLmhpc3RvcnlTdGFjay5zbGljZSgwLCAtMSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VGl0bGUoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHN0cmluZyB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHJlbW92ZUxlYWRpbmdIYXNoKGl0ZW0uYW5jaG9yKSB8fFxuICAgICAgICBpdGVtLnRpdGxlIHx8XG4gICAgICAgIGdldFRpdGxlRnJvbVVybChpdGVtLnVybCkgfHxcbiAgICAgICAgZ2V0VGl0bGVGcm9tTWFya2Rvd25TdHJpbmcoaXRlbS5tYXJrZG93blN0cmluZykgfHxcbiAgICAgICAgJydcbiAgICAgICkudHJpbSgpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGhhbmRsZUxpbmtDbGljayhldmVudDogRXZlbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGxpbms6IEhUTUxBbmNob3JFbGVtZW50ID0gPEhUTUxBbmNob3JFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICBjb25zdCB1cmw6IFVSTCA9IG5ldyBVUkwobGluay5ocmVmKTtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYXJrZG93blN0cmluZzogc3RyaW5nID0gYXdhaXQgdGhpcy5fbWFya2Rvd25VcmxMb2FkZXJTZXJ2aWNlLmxvYWQodXJsLmhyZWYpO1xuICAgICAgLy8gcGFzcyBpbiB1cmwgdG8gYmUgYWJsZSB0byB1c2UgY3VycmVudE1hcmtkb3duSXRlbS51cmwgbGF0ZXIgb25cbiAgICAgIHRoaXMuaGFuZGxlSXRlbVNlbGVjdGVkKHsgbWFya2Rvd25TdHJpbmcsIHVybDogdXJsLmhyZWYgfSk7XG4gICAgICB0aGlzLm1hcmtkb3duV3JhcHBlci5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IHdpbjogV2luZG93ID0gd2luZG93Lm9wZW4odXJsLmhyZWYsICdfYmxhbmsnKTtcbiAgICAgIHdpbi5mb2N1cygpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==