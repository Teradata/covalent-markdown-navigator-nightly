/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __awaiter, __generator, __read, __spread, __values } from "tslib";
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
    function TdMarkdownNavigatorComponent(_markdownUrlLoaderService, _changeDetectorRef, _sanitizer, _http) {
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
    Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "footerComponent", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.currentMarkdownItem && this.currentMarkdownItem.footer) {
                return this.currentMarkdownItem.footer;
            }
            return this.footer;
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
     * @param {?} item
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.hasChildrenOrChildrenUrl = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return (item.children && item.children.length > 0) || !!item.childrenUrl;
    };
    /**
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.clearErrors = /**
     * @return {?}
     */
    function () {
        this.markdownLoaderError = undefined;
        this.childrenUrlError = undefined;
    };
    /**
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.goBack = /**
     * @return {?}
     */
    function () {
        this.loading = false;
        this.clearErrors();
        if (this.historyStack.length > 1) {
            /** @type {?} */
            var parent_1 = this.historyStack[this.historyStack.length - 2];
            this.currentMarkdownItem = parent_1;
            this.historyStack = this.historyStack.slice(0, -1);
            this.setChildrenAsCurrentMenuItems(parent_1);
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
        this.clearErrors();
        this.currentMarkdownItem = item;
        this.historyStack = __spread(this.historyStack, [item]);
        this.setChildrenAsCurrentMenuItems(item);
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.setChildrenAsCurrentMenuItems = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var stackSnapshot, children, newStackSnapshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.currentMenuItems = [];
                        this.loading = true;
                        this._changeDetectorRef.markForCheck();
                        stackSnapshot = this.historyStack;
                        children = [];
                        if (!item.children) return [3 /*break*/, 1];
                        children = item.children;
                        return [3 /*break*/, 3];
                    case 1:
                        if (!item.childrenUrl) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.loadChildrenUrl(item)];
                    case 2:
                        children = _a.sent();
                        _a.label = 3;
                    case 3:
                        newStackSnapshot = this.historyStack;
                        if (stackSnapshot.length === newStackSnapshot.length &&
                            stackSnapshot.every((/**
                             * @param {?} stackItem
                             * @param {?} index
                             * @return {?}
                             */
                            function (stackItem, index) { return stackItem === newStackSnapshot[index]; }))) {
                            this.currentMenuItems = children;
                        }
                        this.loading = false;
                        this._changeDetectorRef.markForCheck();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.loadChildrenUrl = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var sanitizedUrl, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sanitizedUrl = this._sanitizer.sanitize(SecurityContext.URL, item.childrenUrl);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._http
                                .get(sanitizedUrl, __assign({}, item.httpOptions))
                                .toPromise()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        this.handleChildrenUrlError(error_1);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
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
     * @param {?} item
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.getIcon = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (item) {
            return item.icon || 'subject';
        }
    };
    /**
     * @param {?} error
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.handleChildrenUrlError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        this.childrenUrlError = error.message;
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} error
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.handleMarkdownLoaderError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        this.markdownLoaderError = error.message;
        this._changeDetectorRef.markForCheck();
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
            var link, url, markdownString, error_2, win;
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
                        error_2 = _a.sent();
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
                    template: "<ng-container *ngIf=\"!showEmptyState\">\n  <mat-progress-bar *ngIf=\"loading\" mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n\n  <ng-container *ngIf=\"showHeader\">\n    <div [style.display]=\"'flex'\">\n      <button\n        id=\"td-markdown-navigator-home-button\"\n        *ngIf=\"showHomeButton\"\n        mat-icon-button\n        [matTooltip]=\"goHomeLabel\"\n        (click)=\"reset()\"\n        [attr.data-test]=\"'home-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goHomeLabel\">\n          home\n        </mat-icon>\n      </button>\n\n      <button\n        id=\"td-markdown-navigator-back-button\"\n        *ngIf=\"showGoBackButton\"\n        mat-icon-button\n        [matTooltip]=\"goBackLabel\"\n        (click)=\"goBack()\"\n        [attr.data-test]=\"'back-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goBackLabel\">\n          arrow_back\n        </mat-icon>\n      </button>\n      <span flex *ngIf=\"currentItemTitle\" class=\"mat-body-2 title truncate\" [attr.data-test]=\"'title'\">\n        {{ currentItemTitle }}\n      </span>\n    </div>\n\n    <mat-divider [style.position]=\"'relative'\"></mat-divider>\n  </ng-container>\n\n  <div class=\"scroll-area\" id=\"td-markdown-navigator-content\">\n    <td-message\n      *ngIf=\"childrenUrlError\"\n      [sublabel]=\"childrenUrlError\"\n      color=\"warn\"\n      icon=\"error\"\n      [attr.data-test]=\"'children-url-error'\"\n    ></td-message>\n    <div *ngIf=\"showMenu\" class=\"td-markdown-list\">\n      <mat-action-list>\n        <button\n          *ngFor=\"let item of currentMenuItems; index as index\"\n          [id]=\"'td-markdown-navigator-list-item-' + (item.id ? item.id : index)\"\n          (click)=\"handleItemSelected(item)\"\n          mat-list-item\n          [matTooltip]=\"getTitle(item)\"\n          matTooltipPosition=\"before\"\n          matTooltipShowDelay=\"500\"\n        >\n          <mat-icon matListIcon>\n            {{ getIcon(item) }}\n          </mat-icon>\n          <span matLine class=\"truncate\">\n            {{ getTitle(item) }}\n          </span>\n          <span matLine class=\"truncate\">{{ item.description }}</span>\n          <mat-divider></mat-divider>\n        </button>\n      </mat-action-list>\n    </div>\n\n    <div *ngIf=\"showTdMarkdownLoader || showTdMarkdown\" class=\"markdown-wrapper\" #markdownWrapper>\n      <td-message\n        *ngIf=\"markdownLoaderError\"\n        [sublabel]=\"markdownLoaderError\"\n        color=\"warn\"\n        icon=\"error\"\n        [attr.data-test]=\"'markdown-loader-error'\"\n      ></td-message>\n      <td-flavored-markdown-loader\n        *ngIf=\"showTdMarkdownLoader\"\n        [url]=\"url\"\n        [httpOptions]=\"httpOptions\"\n        [anchor]=\"anchor\"\n        (loadFailed)=\"handleMarkdownLoaderError($event)\"\n      ></td-flavored-markdown-loader>\n\n      <td-flavored-markdown\n        *ngIf=\"showTdMarkdown\"\n        [content]=\"markdownString\"\n        [hostedUrl]=\"url\"\n        [anchor]=\"anchor\"\n        (buttonClicked)=\"buttonClicked.emit($event)\"\n      ></td-flavored-markdown>\n    </div>\n    <ng-container *ngComponentOutlet=\"footerComponent\"></ng-container>\n  </div>\n</ng-container>\n\n<div *ngIf=\"showEmptyState\" layout=\"column\" layout-align=\"center center\" class=\"empty-state\">\n  <mat-icon matListAvatar>subject</mat-icon>\n  <h2>{{ emptyStateLabel }}</h2>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{position:relative;height:100%;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}:host .scroll-area{min-height:1px;overflow-y:auto;-ms-flex:1;flex:1;box-sizing:border-box}:host .markdown-wrapper{padding:16px 16px 0}:host .td-markdown-list>.mat-list{padding-top:0}:host td-flavored-markdown-loader ::ng-deep .mat-progress-bar{top:0;left:0;right:0;position:absolute}:host .title{display:inline-block;vertical-align:middle;margin:8px 0;padding-left:16px}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.empty-state{padding:32px}.empty-state mat-icon{font-size:4em}"]
                }] }
    ];
    /** @nocollapse */
    TdMarkdownNavigatorComponent.ctorParameters = function () { return [
        { type: TdMarkdownLoaderService },
        { type: ChangeDetectorRef },
        { type: DomSanitizer },
        { type: HttpClient }
    ]; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixJQUFJLEVBQ0osTUFBTSxFQUNOLFlBQVksRUFDWixlQUFlLEdBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU5RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRWxELDRDQVlDOzs7SUFYQyxvQ0FBWTs7SUFDWix1Q0FBZTs7SUFDZixxQ0FBYTs7SUFDYiw2Q0FBcUI7O0lBQ3JCLGdEQUF3Qjs7SUFDeEIsd0NBQWdCOztJQUNoQiwwQ0FBb0M7O0lBQ3BDLDZDQUFxQjs7SUFDckIsNkNBQXFCOztJQUNyQixzQ0FBYzs7SUFDZCx3Q0FBbUI7Ozs7O0FBR3JCLDhDQUlDOzs7SUFIQywwQ0FBZ0I7O0lBQ2hCLDBDQUFnQjs7SUFDaEIsOENBQW9COzs7QUFLdEIsTUFBTSxLQUFPLGlDQUFpQyxHQUE2QjtJQUN6RSxNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixVQUFVLEVBQUUsdUJBQXVCO0NBQ3BDOzs7OztBQUVELFNBQVMsZUFBZSxDQUFDLEdBQVc7SUFDbEMsSUFBSSxHQUFHLEVBQUU7O1lBQ0QsSUFBSSxHQUFRLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQzthQUFNOztnQkFDQyxJQUFJLEdBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOztnQkFDekMsUUFBUSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUM5QyxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYTtTQUN4RDtLQUNGO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQzs7Ozs7QUFFRCxTQUFTLDBCQUEwQixDQUFDLGNBQXNCO0lBQ3hELElBQUksY0FBYyxFQUFFOztZQUNaLFNBQVMsR0FBVyxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUk7Ozs7UUFBQyxVQUFDLElBQVksSUFBSyxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxFQUFDO1FBQ3hGLE9BQU8saUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDNUM7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDOzs7OztBQUVELFNBQVMsY0FBYyxDQUFDLE1BQXlCO0lBQy9DLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEUsQ0FBQzs7Ozs7O0FBQ0QsU0FBUyxrQkFBa0IsQ0FBQyxFQUEwQixFQUFFLEVBQTBCO0lBQ2hGLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xCLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO0tBQ3hCO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ25CLENBQUM7Ozs7Ozs7QUFFRCxTQUFTLFlBQVksQ0FDbkIsS0FBK0IsRUFDL0IsSUFBNEIsRUFDNUIsV0FBMEM7O0lBRTFDLElBQUksS0FBSyxFQUFFOztZQUNULEtBQW9CLElBQUEsVUFBQSxTQUFBLEtBQUssQ0FBQSw0QkFBQSwrQ0FBRTtnQkFBdEIsSUFBTSxLQUFLLGtCQUFBO2dCQUNkLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQjs7b0JBQ0ssU0FBUyxHQUE2QixZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDO2dCQUMzRixJQUFJLFNBQVMsRUFBRTtvQkFDYixpQkFBUSxLQUFLLEdBQUssU0FBUyxFQUFFO2lCQUM5QjthQUNGOzs7Ozs7Ozs7S0FDRjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRDtJQXdERSxzQ0FDVSx5QkFBa0QsRUFDbEQsa0JBQXFDLEVBQ3JDLFVBQXdCLEVBQ3hCLEtBQWlCO1FBSGpCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBeUI7UUFDbEQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxlQUFVLEdBQVYsVUFBVSxDQUFjO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQVk7UUFqQmpCLGtCQUFhLEdBQXNELElBQUksWUFBWSxFQUFFLENBQUM7UUFJaEcsaUJBQVksR0FBNkIsRUFBRSxDQUFDLENBQUMsVUFBVTs7UUFFdkQscUJBQWdCLEdBQTZCLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQjs7UUFFdEUsWUFBTyxHQUFZLEtBQUssQ0FBQztJQVV0QixDQUFDOzs7OztJQUdKLG9EQUFhOzs7O0lBRGIsVUFDYyxLQUFZOztZQUNsQixPQUFPLEdBQWdCLG1CQUFhLEtBQUssQ0FBQyxVQUFVLEVBQUE7UUFDMUQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxtQkFBbUIsT0FBTyxFQUFBLENBQUMsRUFBRTtZQUM1RSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVELHNCQUFJLDBEQUFnQjs7OztRQUFwQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksd0RBQWM7Ozs7UUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9EQUFVOzs7O1FBQWQ7WUFDRSxPQUFPLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxrREFBUTs7OztRQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDbkUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw4REFBb0I7Ozs7UUFBeEI7WUFDRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzlGLENBQUM7OztPQUFBO0lBRUQsc0JBQUksd0RBQWM7Ozs7UUFBbEI7WUFDRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7UUFDakYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw2Q0FBRzs7OztRQUFQO1lBQ0UsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzVCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQzthQUNyQztZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUM7OztPQUFBO0lBRUQsc0JBQUkseURBQWU7Ozs7UUFBbkI7WUFDRSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFO2dCQUMvRCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUM7YUFDeEM7WUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSxxREFBVzs7OztRQUFmO1lBQ0UsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzVCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQzthQUM3QztRQUNILENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksd0RBQWM7Ozs7UUFBbEI7WUFDRSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDO2FBQ2hEO1FBQ0gsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxnREFBTTs7OztRQUFWO1lBQ0UsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzVCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQzthQUN4QztRQUNILENBQUM7OztPQUFBO0lBRUQsc0JBQUksd0RBQWM7Ozs7UUFBbEI7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxxREFBVzs7OztRQUFmO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxpQ0FBaUMsQ0FBQyxNQUFNLENBQUM7UUFDekYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxxREFBVzs7OztRQUFmO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxpQ0FBaUMsQ0FBQyxNQUFNLENBQUM7UUFDekYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx5REFBZTs7OztRQUFuQjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksaUNBQWlDLENBQUMsVUFBVSxDQUFDO1FBQ2pHLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMERBQWdCOzs7O1FBQXBCO1lBQ0UsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2hDLE9BQU8sRUFBRSxDQUFDO2FBQ1g7aUJBQU0sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQ25DLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUNoRDtpQkFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdkMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2RTtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQzs7O09BQUE7Ozs7O0lBRUQsa0RBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNqQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDNUI7U0FDRjtJQUNILENBQUM7Ozs7O0lBRUQsK0RBQXdCOzs7O0lBQXhCLFVBQXlCLElBQTRCO1FBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzNFLENBQUM7Ozs7SUFDRCxrREFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVELDRDQUFLOzs7SUFBTDtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixpQ0FBaUM7UUFDakMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDMUYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0wsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRUQsNkNBQU07OztJQUFOO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztnQkFDMUIsUUFBTSxHQUEyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBTSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFFBQU0sQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7UUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7Ozs7SUFFRCx5REFBa0I7Ozs7SUFBbEIsVUFBbUIsSUFBNEI7UUFDN0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksWUFBTyxJQUFJLENBQUMsWUFBWSxHQUFFLElBQUksRUFBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7Ozs7SUFFSyxvRUFBNkI7Ozs7SUFBbkMsVUFBb0MsSUFBNEI7Ozs7Ozt3QkFDOUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQzt3QkFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFFakMsYUFBYSxHQUE2QixJQUFJLENBQUMsWUFBWTt3QkFDN0QsUUFBUSxHQUE2QixFQUFFOzZCQUN2QyxJQUFJLENBQUMsUUFBUSxFQUFiLHdCQUFhO3dCQUNmLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDOzs7NkJBQ2hCLElBQUksQ0FBQyxXQUFXLEVBQWhCLHdCQUFnQjt3QkFDZCxxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBM0MsUUFBUSxHQUFHLFNBQWdDLENBQUM7Ozt3QkFFeEMsZ0JBQWdCLEdBQTZCLElBQUksQ0FBQyxZQUFZO3dCQUNwRSxJQUNFLGFBQWEsQ0FBQyxNQUFNLEtBQUssZ0JBQWdCLENBQUMsTUFBTTs0QkFDaEQsYUFBYSxDQUFDLEtBQUs7Ozs7OzRCQUFDLFVBQUMsU0FBaUMsRUFBRSxLQUFhLElBQUssT0FBQSxTQUFTLEtBQUssZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEVBQXJDLENBQXFDLEVBQUMsRUFDaEg7NEJBQ0EsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQzt5QkFDbEM7d0JBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7Ozs7S0FDeEM7Ozs7O0lBRUssc0RBQWU7Ozs7SUFBckIsVUFBc0IsSUFBNEI7Ozs7Ozt3QkFDMUMsWUFBWSxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozt3QkFFbkYscUJBQU0sSUFBSSxDQUFDLEtBQUs7aUNBQ3BCLEdBQUcsQ0FBMkIsWUFBWSxlQUFPLElBQUksQ0FBQyxXQUFXLEVBQUc7aUNBQ3BFLFNBQVMsRUFBRSxFQUFBOzRCQUZkLHNCQUFPLFNBRU8sRUFBQzs7O3dCQUVmLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFLLENBQUMsQ0FBQzt3QkFDbkMsc0JBQU8sRUFBRSxFQUFDOzs7OztLQUViOzs7OztJQUVELCtDQUFROzs7O0lBQVIsVUFBUyxJQUE0QjtRQUNuQyxJQUFJLElBQUksRUFBRTtZQUNSLE9BQU8sQ0FDTCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUM5QixJQUFJLENBQUMsS0FBSztnQkFDVixlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDekIsMEJBQTBCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFDL0MsRUFBRSxDQUNILENBQUMsSUFBSSxFQUFFLENBQUM7U0FDVjtJQUNILENBQUM7Ozs7O0lBRUQsOENBQU87Ozs7SUFBUCxVQUFRLElBQTRCO1FBQ2xDLElBQUksSUFBSSxFQUFFO1lBQ1IsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQztTQUMvQjtJQUNILENBQUM7Ozs7O0lBRUQsNkRBQXNCOzs7O0lBQXRCLFVBQXVCLEtBQVk7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDdEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7Ozs7O0lBQ0QsZ0VBQXlCOzs7O0lBQXpCLFVBQTBCLEtBQVk7UUFDcEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7Ozs7OztJQUVPLDhDQUFPOzs7OztJQUFmLFVBQWdCLElBQTRCO1FBQTVDLGlCQVdDO1FBVkMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7Z0JBQ2pDLFNBQVMsR0FBNkIsWUFBWSxDQUN0RCxJQUFJLENBQUMsS0FBSyxFQUNWLElBQUksRUFDSixJQUFJLENBQUMsV0FBVyxJQUFJLGtCQUFrQixDQUN2QztZQUNELENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFDLFFBQWdDLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQWpDLENBQWlDLEVBQUMsQ0FBQztTQUNwRztRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDOzs7Ozs7SUFFYSxzREFBZTs7Ozs7SUFBN0IsVUFBOEIsS0FBWTs7Ozs7O3dCQUN4QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQ2pCLElBQUksR0FBc0IsbUJBQW1CLEtBQUssQ0FBQyxNQUFNLEVBQUE7d0JBQ3pELEdBQUcsR0FBUSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3dCQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDOzs7O3dCQUVOLHFCQUFNLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBNUUsY0FBYyxHQUFXLFNBQW1EO3dCQUNsRixpRUFBaUU7d0JBQ2pFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLGNBQWMsZ0JBQUEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQzNELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7Ozs7d0JBRTNDLEdBQUcsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO3dCQUNuRCxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7Ozt3QkFFWixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7O3dCQUV2QixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7Ozs7O0tBQ3hDOztnQkE3U0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLHEzR0FBa0Q7b0JBRWxELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBekZ5Qyx1QkFBdUI7Z0JBUC9ELGlCQUFpQjtnQkFTVixZQUFZO2dCQUNaLFVBQVU7Ozt3QkE2RmhCLEtBQUs7eUJBT0wsS0FBSzswQkFPTCxLQUFLO3lCQU9MLEtBQUs7OEJBUUwsS0FBSztnQ0FFTCxNQUFNO2tDQUVOLFNBQVMsU0FBQyxpQkFBaUI7Z0NBa0IzQixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOztJQStPbkMsbUNBQUM7Q0FBQSxBQTlTRCxJQThTQztTQXhTWSw0QkFBNEI7Ozs7Ozs7O0lBTXZDLDZDQUF5Qzs7Ozs7OztJQU96Qyw4Q0FBMEM7Ozs7Ozs7SUFPMUMsK0NBQXlDOzs7Ozs7O0lBT3pDLDhDQUEyQjs7Ozs7Ozs7SUFRM0IsbURBQW9EOztJQUVwRCxxREFBZ0c7O0lBRWhHLHVEQUEwRDs7SUFFMUQsb0RBQTRDOztJQUM1QywyREFBNEM7O0lBQzVDLHdEQUFnRDs7SUFFaEQsK0NBQXlCOztJQUV6QiwyREFBNEI7O0lBQzVCLHdEQUF5Qjs7Ozs7SUFHdkIsaUVBQTBEOzs7OztJQUMxRCwwREFBNkM7Ozs7O0lBQzdDLGtEQUFnQzs7Ozs7SUFDaEMsNkNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBUeXBlLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgU2VjdXJpdHlDb250ZXh0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHJlbW92ZUxlYWRpbmdIYXNoLCBpc0FuY2hvckxpbmssIFRkTWFya2Rvd25Mb2FkZXJTZXJ2aWNlIH0gZnJvbSAnQGNvdmFsZW50L21hcmtkb3duJztcbmltcG9ydCB7IElUZEZsYXZvcmVkTWFya2Rvd25CdXR0b25DbGlja0V2ZW50IH0gZnJvbSAnQGNvdmFsZW50L2ZsYXZvcmVkLW1hcmtkb3duJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtIHtcbiAgaWQ/OiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICB1cmw/OiBzdHJpbmc7XG4gIGh0dHBPcHRpb25zPzogb2JqZWN0O1xuICBtYXJrZG93blN0cmluZz86IHN0cmluZzsgLy8gcmF3IG1hcmtkb3duXG4gIGFuY2hvcj86IHN0cmluZztcbiAgY2hpbGRyZW4/OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG4gIGNoaWxkcmVuVXJsPzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgaWNvbj86IHN0cmluZztcbiAgZm9vdGVyPzogVHlwZTxhbnk+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElNYXJrZG93bk5hdmlnYXRvckxhYmVscyB7XG4gIGdvSG9tZT86IHN0cmluZztcbiAgZ29CYWNrPzogc3RyaW5nO1xuICBlbXB0eVN0YXRlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aCA9IChvMTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgbzI6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pID0+IGJvb2xlYW47XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9MQUJFTFM6IElNYXJrZG93bk5hdmlnYXRvckxhYmVscyA9IHtcbiAgZ29Ib21lOiAnR28gaG9tZScsXG4gIGdvQmFjazogJ0dvIGJhY2snLFxuICBlbXB0eVN0YXRlOiAnTm8gaXRlbShzKSB0byBkaXNwbGF5Jyxcbn07XG5cbmZ1bmN0aW9uIGdldFRpdGxlRnJvbVVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICh1cmwpIHtcbiAgICBjb25zdCB0ZW1wOiBVUkwgPSBuZXcgVVJMKHVybCk7XG4gICAgaWYgKHRlbXAuaGFzaCkge1xuICAgICAgcmV0dXJuIHJlbW92ZUxlYWRpbmdIYXNoKHRlbXAuaGFzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBhdGg6IHN0cmluZ1tdID0gdGVtcC5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgICAgY29uc3QgZmlsZU5hbWU6IHN0cmluZyA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcbiAgICAgIHJldHVybiBmaWxlTmFtZS5yZXBsYWNlKC9cXC5bXi8uXSskLywgJycpOyAvLyByZW1vdmUgLm1kXG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGdldFRpdGxlRnJvbU1hcmtkb3duU3RyaW5nKG1hcmtkb3duU3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAobWFya2Rvd25TdHJpbmcpIHtcbiAgICBjb25zdCBmaXJzdExpbmU6IHN0cmluZyA9IG1hcmtkb3duU3RyaW5nLnNwbGl0KC9bXFxyXFxuXSsvKS5maW5kKChsaW5lOiBzdHJpbmcpID0+ICEhbGluZSk7XG4gICAgcmV0dXJuIHJlbW92ZUxlYWRpbmdIYXNoKGZpcnN0TGluZSkudHJpbSgpO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzTWFya2Rvd25IcmVmKGFuY2hvcjogSFRNTEFuY2hvckVsZW1lbnQpOiBib29sZWFuIHtcbiAgcmV0dXJuICFpc0FuY2hvckxpbmsoYW5jaG9yKSAmJiBhbmNob3IucGF0aG5hbWUuZW5kc1dpdGgoJy5tZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmVXaXRoKG8xOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLCBvMjogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IGJvb2xlYW4ge1xuICBpZiAobzEuaWQgJiYgbzIuaWQpIHtcbiAgICByZXR1cm4gbzEuaWQgPT09IG8yLmlkO1xuICB9XG4gIHJldHVybiBvMSA9PT0gbzI7XG59XG5cbmZ1bmN0aW9uIGdldEFuY2VzdG9ycyhcbiAgaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSxcbiAgaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSxcbiAgY29tcGFyZVdpdGg6IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoLFxuKTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdIHtcbiAgaWYgKGl0ZW1zKSB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBpdGVtcykge1xuICAgICAgaWYgKGNvbXBhcmVXaXRoKGNoaWxkLCBpdGVtKSkge1xuICAgICAgICByZXR1cm4gW2NoaWxkXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFuY2VzdG9yczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gZ2V0QW5jZXN0b3JzKGNoaWxkLmNoaWxkcmVuLCBpdGVtLCBjb21wYXJlV2l0aCk7XG4gICAgICBpZiAoYW5jZXN0b3JzKSB7XG4gICAgICAgIHJldHVybiBbY2hpbGQsIC4uLmFuY2VzdG9yc107XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RkLW1hcmtkb3duLW5hdmlnYXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFRkTWFya2Rvd25OYXZpZ2F0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAvKipcbiAgICogaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXVxuICAgKlxuICAgKiBMaXN0IG9mIElNYXJrZG93bk5hdmlnYXRvckl0ZW1zIHRvIGJlIHJlbmRlcmVkXG4gICAqL1xuICBASW5wdXQoKSBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuXG4gIC8qKlxuICAgKiBsYWJlbHM/OiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHNcbiAgICpcbiAgICogVHJhbnNsYXRlZCBsYWJlbHNcbiAgICovXG4gIEBJbnB1dCgpIGxhYmVsczogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzO1xuXG4gIC8qKlxuICAgKiBzdGFydEF0PzogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVxuICAgKlxuICAgKiBJdGVtIHRvIHN0YXJ0IHRvXG4gICAqL1xuICBASW5wdXQoKSBzdGFydEF0OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtO1xuXG4gIC8qKlxuICAgKiBmb290ZXI/OiBUeXBlPGFueT5cbiAgICpcbiAgICogQ29tcG9uZW50IHRvIGJlIGRpc3BsYXllZCBpbiBmb290ZXJcbiAgICovXG4gIEBJbnB1dCgpIGZvb3RlcjogVHlwZTxhbnk+O1xuXG4gIC8qKlxuICAgKiBjb21wYXJlV2l0aD86IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoXG4gICAqXG4gICAqIEZ1bmN0aW9uIHVzZWQgdG8gZmluZCBzdGFydEF0IGl0ZW1cbiAgICogRGVmYXVsdHMgdG8gY29tcGFyaXNvbiBieSBzdHJpY3QgZXF1YWxpdHkgKD09PSlcbiAgICovXG4gIEBJbnB1dCgpIGNvbXBhcmVXaXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aDtcblxuICBAT3V0cHV0KCkgYnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPElUZEZsYXZvcmVkTWFya2Rvd25CdXR0b25DbGlja0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCdtYXJrZG93bldyYXBwZXInKSBtYXJrZG93bldyYXBwZXI6IEVsZW1lbnRSZWY7XG5cbiAgaGlzdG9yeVN0YWNrOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTsgLy8gaGlzdG9yeVxuICBjdXJyZW50TWFya2Rvd25JdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtOyAvLyBjdXJyZW50bHkgcmVuZGVyZWRcbiAgY3VycmVudE1lbnVJdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gW107IC8vIGN1cnJlbnQgbWVudSBpdGVtc1xuXG4gIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBtYXJrZG93bkxvYWRlckVycm9yOiBzdHJpbmc7XG4gIGNoaWxkcmVuVXJsRXJyb3I6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9tYXJrZG93blVybExvYWRlclNlcnZpY2U6IFRkTWFya2Rvd25Mb2FkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxuICApIHt9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBjbGlja0xpc3RlbmVyKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmV2ZW50LnNyY0VsZW1lbnQ7XG4gICAgaWYgKGVsZW1lbnQubWF0Y2hlcygnYVtocmVmXScpICYmIGlzTWFya2Rvd25IcmVmKDxIVE1MQW5jaG9yRWxlbWVudD5lbGVtZW50KSkge1xuICAgICAgdGhpcy5oYW5kbGVMaW5rQ2xpY2soZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaG93R29CYWNrQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHNob3dIb21lQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAxO1xuICB9XG5cbiAgZ2V0IHNob3dIZWFkZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd0hvbWVCdXR0b24gfHwgdGhpcy5zaG93R29CYWNrQnV0dG9uIHx8ICEhdGhpcy5jdXJyZW50SXRlbVRpdGxlO1xuICB9XG5cbiAgZ2V0IHNob3dNZW51KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRNZW51SXRlbXMgJiYgdGhpcy5jdXJyZW50TWVudUl0ZW1zLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQgc2hvd1RkTWFya2Rvd25Mb2FkZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtICYmICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLnVybCAmJiAhdGhpcy5zaG93VGRNYXJrZG93bjtcbiAgfVxuXG4gIGdldCBzaG93VGRNYXJrZG93bigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gJiYgISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0ubWFya2Rvd25TdHJpbmc7XG4gIH1cblxuICBnZXQgdXJsKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS51cmw7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXQgZm9vdGVyQ29tcG9uZW50KCk6IGFueSB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSAmJiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uZm9vdGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLmZvb3RlcjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZm9vdGVyO1xuICB9XG4gIGdldCBodHRwT3B0aW9ucygpOiBvYmplY3Qge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uaHR0cE9wdGlvbnM7XG4gICAgfVxuICB9XG4gIGdldCBtYXJrZG93blN0cmluZygpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0ubWFya2Rvd25TdHJpbmc7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFuY2hvcigpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uYW5jaG9yO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaG93RW1wdHlTdGF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXRlbXMgfHwgdGhpcy5pdGVtcy5sZW5ndGggPCAxO1xuICB9XG5cbiAgZ2V0IGdvSG9tZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5nb0hvbWUpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUy5nb0hvbWU7XG4gIH1cblxuICBnZXQgZ29CYWNrTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmdvQmFjaykgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTLmdvQmFjaztcbiAgfVxuXG4gIGdldCBlbXB0eVN0YXRlTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmVtcHR5U3RhdGUpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUy5lbXB0eVN0YXRlO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRJdGVtVGl0bGUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VGl0bGUodGhpcy5oaXN0b3J5U3RhY2tbdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIC0gMV0pO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuaXRlbXMpIHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuc3RhcnRBdCkge1xuICAgICAgICB0aGlzLl9qdW1wVG8odGhpcy5zdGFydEF0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXNDaGlsZHJlbk9yQ2hpbGRyZW5VcmwoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHx8ICEhaXRlbS5jaGlsZHJlblVybDtcbiAgfVxuICBjbGVhckVycm9ycygpOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtkb3duTG9hZGVyRXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5jaGlsZHJlblVybEVycm9yID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5jbGVhckVycm9ycygpO1xuICAgIC8vIGlmIHNpbmdsZSBpdGVtIGFuZCBubyBjaGlsZHJlblxuICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoID09PSAxICYmICF0aGlzLmhhc0NoaWxkcmVuT3JDaGlsZHJlblVybCh0aGlzLml0ZW1zWzBdKSkge1xuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gW107XG4gICAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSB0aGlzLml0ZW1zWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLmhpc3RvcnlTdGFjayA9IFtdO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ29CYWNrKCk6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcbiAgICBpZiAodGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgcGFyZW50OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtID0gdGhpcy5oaXN0b3J5U3RhY2tbdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIC0gMl07XG4gICAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSBwYXJlbnQ7XG4gICAgICB0aGlzLmhpc3RvcnlTdGFjayA9IHRoaXMuaGlzdG9yeVN0YWNrLnNsaWNlKDAsIC0xKTtcbiAgICAgIHRoaXMuc2V0Q2hpbGRyZW5Bc0N1cnJlbnRNZW51SXRlbXMocGFyZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb25lIGxldmVsIGRvd24ganVzdCBnbyB0byByb290XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgaGFuZGxlSXRlbVNlbGVjdGVkKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XG4gICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gaXRlbTtcbiAgICB0aGlzLmhpc3RvcnlTdGFjayA9IFsuLi50aGlzLmhpc3RvcnlTdGFjaywgaXRlbV07XG4gICAgdGhpcy5zZXRDaGlsZHJlbkFzQ3VycmVudE1lbnVJdGVtcyhpdGVtKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGFzeW5jIHNldENoaWxkcmVuQXNDdXJyZW50TWVudUl0ZW1zKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSBbXTtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgY29uc3Qgc3RhY2tTbmFwc2hvdDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gdGhpcy5oaXN0b3J5U3RhY2s7XG4gICAgbGV0IGNoaWxkcmVuOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTtcbiAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgY2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5jaGlsZHJlblVybCkge1xuICAgICAgY2hpbGRyZW4gPSBhd2FpdCB0aGlzLmxvYWRDaGlsZHJlblVybChpdGVtKTtcbiAgICB9XG4gICAgY29uc3QgbmV3U3RhY2tTbmFwc2hvdDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gdGhpcy5oaXN0b3J5U3RhY2s7XG4gICAgaWYgKFxuICAgICAgc3RhY2tTbmFwc2hvdC5sZW5ndGggPT09IG5ld1N0YWNrU25hcHNob3QubGVuZ3RoICYmXG4gICAgICBzdGFja1NuYXBzaG90LmV2ZXJ5KChzdGFja0l0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0sIGluZGV4OiBudW1iZXIpID0+IHN0YWNrSXRlbSA9PT0gbmV3U3RhY2tTbmFwc2hvdFtpbmRleF0pXG4gICAgKSB7XG4gICAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSBjaGlsZHJlbjtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRDaGlsZHJlblVybChpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogUHJvbWlzZTxJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10+IHtcbiAgICBjb25zdCBzYW5pdGl6ZWRVcmw6IHN0cmluZyA9IHRoaXMuX3Nhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuVVJMLCBpdGVtLmNoaWxkcmVuVXJsKTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2h0dHBcbiAgICAgICAgLmdldDxJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10+KHNhbml0aXplZFVybCwgeyAuLi5pdGVtLmh0dHBPcHRpb25zIH0pXG4gICAgICAgIC50b1Byb21pc2UoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5oYW5kbGVDaGlsZHJlblVybEVycm9yKGVycm9yKTtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICBnZXRUaXRsZShpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogc3RyaW5nIHtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgcmVtb3ZlTGVhZGluZ0hhc2goaXRlbS5hbmNob3IpIHx8XG4gICAgICAgIGl0ZW0udGl0bGUgfHxcbiAgICAgICAgZ2V0VGl0bGVGcm9tVXJsKGl0ZW0udXJsKSB8fFxuICAgICAgICBnZXRUaXRsZUZyb21NYXJrZG93blN0cmluZyhpdGVtLm1hcmtkb3duU3RyaW5nKSB8fFxuICAgICAgICAnJ1xuICAgICAgKS50cmltKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SWNvbihpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogc3RyaW5nIHtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0uaWNvbiB8fCAnc3ViamVjdCc7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2hpbGRyZW5VcmxFcnJvcihlcnJvcjogRXJyb3IpOiB2b2lkIHtcbiAgICB0aGlzLmNoaWxkcmVuVXJsRXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG4gIGhhbmRsZU1hcmtkb3duTG9hZGVyRXJyb3IoZXJyb3I6IEVycm9yKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrZG93bkxvYWRlckVycm9yID0gZXJyb3IubWVzc2FnZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2p1bXBUbyhpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYW5jZXN0b3JzOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBnZXRBbmNlc3RvcnMoXG4gICAgICAgIHRoaXMuaXRlbXMsXG4gICAgICAgIGl0ZW0sXG4gICAgICAgIHRoaXMuY29tcGFyZVdpdGggfHwgZGVmYXVsdENvbXBhcmVXaXRoLFxuICAgICAgKTtcbiAgICAgIChhbmNlc3RvcnMgfHwgW10pLmZvckVhY2goKGFuY2VzdG9yOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKSA9PiB0aGlzLmhhbmRsZUl0ZW1TZWxlY3RlZChhbmNlc3RvcikpO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlTGlua0NsaWNrKGV2ZW50OiBFdmVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgbGluazogSFRNTEFuY2hvckVsZW1lbnQgPSA8SFRNTEFuY2hvckVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IHVybDogVVJMID0gbmV3IFVSTChsaW5rLmhyZWYpO1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1hcmtkb3duU3RyaW5nOiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9tYXJrZG93blVybExvYWRlclNlcnZpY2UubG9hZCh1cmwuaHJlZik7XG4gICAgICAvLyBwYXNzIGluIHVybCB0byBiZSBhYmxlIHRvIHVzZSBjdXJyZW50TWFya2Rvd25JdGVtLnVybCBsYXRlciBvblxuICAgICAgdGhpcy5oYW5kbGVJdGVtU2VsZWN0ZWQoeyBtYXJrZG93blN0cmluZywgdXJsOiB1cmwuaHJlZiB9KTtcbiAgICAgIHRoaXMubWFya2Rvd25XcmFwcGVyLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3Qgd2luOiBXaW5kb3cgPSB3aW5kb3cub3Blbih1cmwuaHJlZiwgJ19ibGFuaycpO1xuICAgICAgd2luLmZvY3VzKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19