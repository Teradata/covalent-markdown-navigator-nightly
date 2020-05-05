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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (changes.items) {
                    this.reset();
                }
                if (changes.startAt && this.items && this.startAt) {
                    this._jumpTo(this.startAt);
                }
                return [2 /*return*/];
            });
        });
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
     * @param {?} itemOrPath
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype._jumpTo = /**
     * @private
     * @param {?} itemOrPath
     * @return {?}
     */
    function (itemOrPath) {
        return __awaiter(this, void 0, void 0, function () {
            var path;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.reset();
                        if (!(this.items && this.items.length > 0)) return [3 /*break*/, 4];
                        path = [];
                        if (!Array.isArray(itemOrPath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.followPath(this.items, itemOrPath)];
                    case 1:
                        path = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        path = this.findPath(this.items, itemOrPath);
                        _a.label = 3;
                    case 3:
                        (path || []).forEach((/**
                         * @param {?} pathItem
                         * @return {?}
                         */
                        function (pathItem) { return _this.handleItemSelected(pathItem); }));
                        _a.label = 4;
                    case 4:
                        this._changeDetectorRef.markForCheck();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @param {?} items
     * @param {?} path
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.followPath = /**
     * @private
     * @param {?} items
     * @param {?} path
     * @return {?}
     */
    function (items, path) {
        return __awaiter(this, void 0, void 0, function () {
            var pathItems, currentLevel, compareWith, _loop_1, this_1, path_1, path_1_1, pathItem, state_1, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pathItems = [];
                        currentLevel = items;
                        compareWith = this.compareWith || defaultCompareWith;
                        _loop_1 = function (pathItem) {
                            var foundItem;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        foundItem = currentLevel.find((/**
                                         * @param {?} item
                                         * @return {?}
                                         */
                                        function (item) {
                                            return compareWith(pathItem, item);
                                        }));
                                        if (!foundItem) return [3 /*break*/, 4];
                                        pathItems = __spread(pathItems, [foundItem]);
                                        if (!foundItem.children) return [3 /*break*/, 1];
                                        currentLevel = foundItem.children;
                                        return [3 /*break*/, 3];
                                    case 1:
                                        if (!foundItem.childrenUrl) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this_1.loadChildrenUrl(foundItem)];
                                    case 2:
                                        currentLevel = _a.sent();
                                        _a.label = 3;
                                    case 3: return [3 /*break*/, 5];
                                    case 4: return [2 /*return*/, "break"];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        path_1 = __values(path), path_1_1 = path_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!path_1_1.done) return [3 /*break*/, 5];
                        pathItem = path_1_1.value;
                        return [5 /*yield**/, _loop_1(pathItem)];
                    case 3:
                        state_1 = _b.sent();
                        if (state_1 === "break")
                            return [3 /*break*/, 5];
                        _b.label = 4;
                    case 4:
                        path_1_1 = path_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (path_1_1 && !path_1_1.done && (_a = path_1.return)) _a.call(path_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        if (pathItems.length !== path.length) {
                            pathItems = [];
                        }
                        return [2 /*return*/, pathItems];
                }
            });
        });
    };
    /**
     * @private
     * @param {?} items
     * @param {?} item
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype.findPath = /**
     * @private
     * @param {?} items
     * @param {?} item
     * @return {?}
     */
    function (items, item) {
        var e_2, _a;
        /** @type {?} */
        var compareWith = this.compareWith || defaultCompareWith;
        if (items) {
            try {
                for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                    var child = items_1_1.value;
                    if (compareWith(child, item)) {
                        return [child];
                    }
                    /** @type {?} */
                    var ancestors = this.findPath(child.children, item);
                    if (ancestors) {
                        return __spread([child], ancestors);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return undefined;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixJQUFJLEVBQ0osTUFBTSxFQUNOLFlBQVksRUFDWixlQUFlLEdBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU5RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRWxELDRDQVlDOzs7SUFYQyxvQ0FBWTs7SUFDWix1Q0FBZTs7SUFDZixxQ0FBYTs7SUFDYiw2Q0FBcUI7O0lBQ3JCLGdEQUF3Qjs7SUFDeEIsd0NBQWdCOztJQUNoQiwwQ0FBb0M7O0lBQ3BDLDZDQUFxQjs7SUFDckIsNkNBQXFCOztJQUNyQixzQ0FBYzs7SUFDZCx3Q0FBbUI7Ozs7O0FBR3JCLDhDQUlDOzs7SUFIQywwQ0FBZ0I7O0lBQ2hCLDBDQUFnQjs7SUFDaEIsOENBQW9COzs7QUFLdEIsTUFBTSxLQUFPLGlDQUFpQyxHQUE2QjtJQUN6RSxNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixVQUFVLEVBQUUsdUJBQXVCO0NBQ3BDOzs7OztBQUVELFNBQVMsZUFBZSxDQUFDLEdBQVc7SUFDbEMsSUFBSSxHQUFHLEVBQUU7O1lBQ0QsSUFBSSxHQUFRLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUM5QixJQUFJ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QVU7Ozt3QkEwRWhCLEtBQUs7eUJBT0wsS0FBSzswQkFPTCxLQUFLO3lCQU9MLEtBQUs7OEJBUUwsS0FBSztnQ0FFTCxNQUFNO2tDQUVOLFNBQVMsU0FBQyxpQkFBaUI7Z0NBa0IzQixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOztJQStSbkMsbUNBQUM7Q0FBQSxBQTlWRCxJQThWQztTQXhWWSw0QkFBNEI7Ozs7Ozs7O0lBTXZDLDZDQUF5Qzs7Ozs7OztJQU96Qyw4Q0FBMEM7Ozs7Ozs7SUFPMUMsK0NBQW9FOzs7Ozs7O0lBT3BFLDhDQUEyQjs7Ozs7Ozs7SUFRM0IsbURBQW9EOztJQUVwRCxxREFBZ0c7O0lBRWhHLHVEQUEwRDs7SUFFMUQsb0RBQTRDOztJQUM1QywyREFBNEM7O0lBQzVDLHdEQUFnRDs7SUFFaEQsK0NBQXlCOztJQUV6QiwyREFBNEI7O0lBQzVCLHdEQUF5Qjs7Ozs7SUFHdkIsaUVBQTBEOzs7OztJQUMxRCwwREFBNkM7Ozs7O0lBQzdDLGtEQUFnQzs7Ozs7SUFDaEMsNkNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBUeXBlLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgU2VjdXJpdHlDb250ZXh0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHJlbW92ZUxlYWRpbmdIYXNoLCBpc0FuY2hvckxpbmssIFRkTWFya2Rvd25Mb2FkZXJTZXJ2aWNlIH0gZnJvbSAnQGNvdmFsZW50L21hcmtkb3duJztcbmltcG9ydCB7IElUZEZsYXZvcmVkTWFya2Rvd25CdXR0b25DbGlja0V2ZW50IH0gZnJvbSAnQGNvdmFsZW50L2ZsYXZvcmVkLW1hcmtkb3duJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtIHtcbiAgaWQ/OiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICB1cmw/OiBzdHJpbmc7XG4gIGh0dHBPcHRpb25zPzogb2JqZWN0O1xuICBtYXJrZG93blN0cmluZz86IHN0cmluZzsgLy8gcmF3IG1hcmtkb3duXG4gIGFuY2hvcj86IHN0cmluZztcbiAgY2hpbGRyZW4/OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG4gIGNoaWxkcmVuVXJsPzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgaWNvbj86IHN0cmluZztcbiAgZm9vdGVyPzogVHlwZTxhbnk+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElNYXJrZG93bk5hdmlnYXRvckxhYmVscyB7XG4gIGdvSG9tZT86IHN0cmluZztcbiAgZ29CYWNrPzogc3RyaW5nO1xuICBlbXB0eVN0YXRlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aCA9IChvMTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgbzI6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pID0+IGJvb2xlYW47XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9MQUJFTFM6IElNYXJrZG93bk5hdmlnYXRvckxhYmVscyA9IHtcbiAgZ29Ib21lOiAnR28gaG9tZScsXG4gIGdvQmFjazogJ0dvIGJhY2snLFxuICBlbXB0eVN0YXRlOiAnTm8gaXRlbShzKSB0byBkaXNwbGF5Jyxcbn07XG5cbmZ1bmN0aW9uIGdldFRpdGxlRnJvbVVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICh1cmwpIHtcbiAgICBjb25zdCB0ZW1wOiBVUkwgPSBuZXcgVVJMKHVybCk7XG4gICAgaWYgKHRlbXAuaGFzaCkge1xuICAgICAgcmV0dXJuIHJlbW92ZUxlYWRpbmdIYXNoKHRlbXAuaGFzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBhdGg6IHN0cmluZ1tdID0gdGVtcC5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgICAgY29uc3QgZmlsZU5hbWU6IHN0cmluZyA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcbiAgICAgIHJldHVybiBmaWxlTmFtZS5yZXBsYWNlKC9cXC5bXi8uXSskLywgJycpOyAvLyByZW1vdmUgLm1kXG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGdldFRpdGxlRnJvbU1hcmtkb3duU3RyaW5nKG1hcmtkb3duU3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAobWFya2Rvd25TdHJpbmcpIHtcbiAgICBjb25zdCBmaXJzdExpbmU6IHN0cmluZyA9IG1hcmtkb3duU3RyaW5nLnNwbGl0KC9bXFxyXFxuXSsvKS5maW5kKChsaW5lOiBzdHJpbmcpID0+ICEhbGluZSk7XG4gICAgcmV0dXJuIHJlbW92ZUxlYWRpbmdIYXNoKGZpcnN0TGluZSkudHJpbSgpO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzTWFya2Rvd25IcmVmKGFuY2hvcjogSFRNTEFuY2hvckVsZW1lbnQpOiBib29sZWFuIHtcbiAgcmV0dXJuICFpc0FuY2hvckxpbmsoYW5jaG9yKSAmJiBhbmNob3IucGF0aG5hbWUuZW5kc1dpdGgoJy5tZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmVXaXRoKG8xOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLCBvMjogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IGJvb2xlYW4ge1xuICBpZiAobzEuaWQgJiYgbzIuaWQpIHtcbiAgICByZXR1cm4gbzEuaWQgPT09IG8yLmlkO1xuICB9XG4gIHJldHVybiBvMSA9PT0gbzI7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RkLW1hcmtkb3duLW5hdmlnYXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFRkTWFya2Rvd25OYXZpZ2F0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAvKipcbiAgICogaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXVxuICAgKlxuICAgKiBMaXN0IG9mIElNYXJrZG93bk5hdmlnYXRvckl0ZW1zIHRvIGJlIHJlbmRlcmVkXG4gICAqL1xuICBASW5wdXQoKSBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuXG4gIC8qKlxuICAgKiBsYWJlbHM/OiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHNcbiAgICpcbiAgICogVHJhbnNsYXRlZCBsYWJlbHNcbiAgICovXG4gIEBJbnB1dCgpIGxhYmVsczogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzO1xuXG4gIC8qKlxuICAgKiBzdGFydEF0PzogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSB8IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcbiAgICpcbiAgICogSXRlbSBvciBwYXRoIHRvIHN0YXJ0IGF0XG4gICAqL1xuICBASW5wdXQoKSBzdGFydEF0OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtIHwgSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuXG4gIC8qKlxuICAgKiBmb290ZXI/OiBUeXBlPGFueT5cbiAgICpcbiAgICogQ29tcG9uZW50IHRvIGJlIGRpc3BsYXllZCBpbiBmb290ZXJcbiAgICovXG4gIEBJbnB1dCgpIGZvb3RlcjogVHlwZTxhbnk+O1xuXG4gIC8qKlxuICAgKiBjb21wYXJlV2l0aD86IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoXG4gICAqXG4gICAqIEZ1bmN0aW9uIHVzZWQgdG8gZmluZCBzdGFydEF0IGl0ZW1cbiAgICogRGVmYXVsdHMgdG8gY29tcGFyaXNvbiBieSBzdHJpY3QgZXF1YWxpdHkgKD09PSlcbiAgICovXG4gIEBJbnB1dCgpIGNvbXBhcmVXaXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aDtcblxuICBAT3V0cHV0KCkgYnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPElUZEZsYXZvcmVkTWFya2Rvd25CdXR0b25DbGlja0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCdtYXJrZG93bldyYXBwZXInKSBtYXJrZG93bldyYXBwZXI6IEVsZW1lbnRSZWY7XG5cbiAgaGlzdG9yeVN0YWNrOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTsgLy8gaGlzdG9yeVxuICBjdXJyZW50TWFya2Rvd25JdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtOyAvLyBjdXJyZW50bHkgcmVuZGVyZWRcbiAgY3VycmVudE1lbnVJdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gW107IC8vIGN1cnJlbnQgbWVudSBpdGVtc1xuXG4gIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBtYXJrZG93bkxvYWRlckVycm9yOiBzdHJpbmc7XG4gIGNoaWxkcmVuVXJsRXJyb3I6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9tYXJrZG93blVybExvYWRlclNlcnZpY2U6IFRkTWFya2Rvd25Mb2FkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxuICApIHt9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBjbGlja0xpc3RlbmVyKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmV2ZW50LnNyY0VsZW1lbnQ7XG4gICAgaWYgKGVsZW1lbnQubWF0Y2hlcygnYVtocmVmXScpICYmIGlzTWFya2Rvd25IcmVmKDxIVE1MQW5jaG9yRWxlbWVudD5lbGVtZW50KSkge1xuICAgICAgdGhpcy5oYW5kbGVMaW5rQ2xpY2soZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaG93R29CYWNrQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHNob3dIb21lQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAxO1xuICB9XG5cbiAgZ2V0IHNob3dIZWFkZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd0hvbWVCdXR0b24gfHwgdGhpcy5zaG93R29CYWNrQnV0dG9uIHx8ICEhdGhpcy5jdXJyZW50SXRlbVRpdGxlO1xuICB9XG5cbiAgZ2V0IHNob3dNZW51KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRNZW51SXRlbXMgJiYgdGhpcy5jdXJyZW50TWVudUl0ZW1zLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQgc2hvd1RkTWFya2Rvd25Mb2FkZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtICYmICEhdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLnVybCAmJiAhdGhpcy5zaG93VGRNYXJrZG93bjtcbiAgfVxuXG4gIGdldCBzaG93VGRNYXJrZG93bigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gJiYgISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0ubWFya2Rvd25TdHJpbmc7XG4gIH1cblxuICBnZXQgdXJsKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS51cmw7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXQgZm9vdGVyQ29tcG9uZW50KCk6IGFueSB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSAmJiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uZm9vdGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLmZvb3RlcjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZm9vdGVyO1xuICB9XG4gIGdldCBodHRwT3B0aW9ucygpOiBvYmplY3Qge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uaHR0cE9wdGlvbnM7XG4gICAgfVxuICB9XG4gIGdldCBtYXJrZG93blN0cmluZygpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0ubWFya2Rvd25TdHJpbmc7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFuY2hvcigpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uYW5jaG9yO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaG93RW1wdHlTdGF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXRlbXMgfHwgdGhpcy5pdGVtcy5sZW5ndGggPCAxO1xuICB9XG5cbiAgZ2V0IGdvSG9tZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5nb0hvbWUpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUy5nb0hvbWU7XG4gIH1cblxuICBnZXQgZ29CYWNrTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmdvQmFjaykgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTLmdvQmFjaztcbiAgfVxuXG4gIGdldCBlbXB0eVN0YXRlTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmVtcHR5U3RhdGUpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUy5lbXB0eVN0YXRlO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRJdGVtVGl0bGUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VGl0bGUodGhpcy5oaXN0b3J5U3RhY2tbdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIC0gMV0pO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBhc3luYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGNoYW5nZXMuaXRlbXMpIHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuc3RhcnRBdCAmJiB0aGlzLml0ZW1zICYmIHRoaXMuc3RhcnRBdCkge1xuICAgICAgdGhpcy5fanVtcFRvKHRoaXMuc3RhcnRBdCk7XG4gICAgfVxuICB9XG5cbiAgaGFzQ2hpbGRyZW5PckNoaWxkcmVuVXJsKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB8fCAhIWl0ZW0uY2hpbGRyZW5Vcmw7XG4gIH1cbiAgY2xlYXJFcnJvcnMoKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrZG93bkxvYWRlckVycm9yID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuY2hpbGRyZW5VcmxFcnJvciA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcbiAgICAvLyBpZiBzaW5nbGUgaXRlbSBhbmQgbm8gY2hpbGRyZW5cbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy5oYXNDaGlsZHJlbk9yQ2hpbGRyZW5VcmwodGhpcy5pdGVtc1swXSkpIHtcbiAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IFtdO1xuICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gdGhpcy5pdGVtc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gdGhpcy5pdGVtcztcbiAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy5oaXN0b3J5U3RhY2sgPSBbXTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdvQmFjaygpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XG4gICAgaWYgKHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IHBhcmVudDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSA9IHRoaXMuaGlzdG9yeVN0YWNrW3RoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCAtIDJdO1xuICAgICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gcGFyZW50O1xuICAgICAgdGhpcy5oaXN0b3J5U3RhY2sgPSB0aGlzLmhpc3RvcnlTdGFjay5zbGljZSgwLCAtMSk7XG4gICAgICB0aGlzLnNldENoaWxkcmVuQXNDdXJyZW50TWVudUl0ZW1zKHBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG9uZSBsZXZlbCBkb3duIGp1c3QgZ28gdG8gcm9vdFxuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGhhbmRsZUl0ZW1TZWxlY3RlZChpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckVycm9ycygpO1xuICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IGl0ZW07XG4gICAgdGhpcy5oaXN0b3J5U3RhY2sgPSBbLi4udGhpcy5oaXN0b3J5U3RhY2ssIGl0ZW1dO1xuICAgIHRoaXMuc2V0Q2hpbGRyZW5Bc0N1cnJlbnRNZW51SXRlbXMoaXRlbSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBhc3luYyBzZXRDaGlsZHJlbkFzQ3VycmVudE1lbnVJdGVtcyhpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gW107XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgIGNvbnN0IHN0YWNrU25hcHNob3Q6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IHRoaXMuaGlzdG9yeVN0YWNrO1xuICAgIGxldCBjaGlsZHJlbjogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gW107XG4gICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgIGNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbjtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uY2hpbGRyZW5VcmwpIHtcbiAgICAgIGNoaWxkcmVuID0gYXdhaXQgdGhpcy5sb2FkQ2hpbGRyZW5VcmwoaXRlbSk7XG4gICAgfVxuICAgIGNvbnN0IG5ld1N0YWNrU25hcHNob3Q6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IHRoaXMuaGlzdG9yeVN0YWNrO1xuICAgIGlmIChcbiAgICAgIHN0YWNrU25hcHNob3QubGVuZ3RoID09PSBuZXdTdGFja1NuYXBzaG90Lmxlbmd0aCAmJlxuICAgICAgc3RhY2tTbmFwc2hvdC5ldmVyeSgoc3RhY2tJdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLCBpbmRleDogbnVtYmVyKSA9PiBzdGFja0l0ZW0gPT09IG5ld1N0YWNrU25hcHNob3RbaW5kZXhdKVxuICAgICkge1xuICAgICAgdGhpcy5jdXJyZW50TWVudUl0ZW1zID0gY2hpbGRyZW47XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBhc3luYyBsb2FkQ2hpbGRyZW5VcmwoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IFByb21pc2U8SU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdPiB7XG4gICAgY29uc3Qgc2FuaXRpemVkVXJsOiBzdHJpbmcgPSB0aGlzLl9zYW5pdGl6ZXIuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LlVSTCwgaXRlbS5jaGlsZHJlblVybCk7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9odHRwXG4gICAgICAgIC5nZXQ8SU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdPihzYW5pdGl6ZWRVcmwsIHsgLi4uaXRlbS5odHRwT3B0aW9ucyB9KVxuICAgICAgICAudG9Qcm9taXNlKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMuaGFuZGxlQ2hpbGRyZW5VcmxFcnJvcihlcnJvcik7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgZ2V0VGl0bGUoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHN0cmluZyB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHJlbW92ZUxlYWRpbmdIYXNoKGl0ZW0uYW5jaG9yKSB8fFxuICAgICAgICBpdGVtLnRpdGxlIHx8XG4gICAgICAgIGdldFRpdGxlRnJvbVVybChpdGVtLnVybCkgfHxcbiAgICAgICAgZ2V0VGl0bGVGcm9tTWFya2Rvd25TdHJpbmcoaXRlbS5tYXJrZG93blN0cmluZykgfHxcbiAgICAgICAgJydcbiAgICAgICkudHJpbSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldEljb24oaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IHN0cmluZyB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLmljb24gfHwgJ3N1YmplY3QnO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNoaWxkcmVuVXJsRXJyb3IoZXJyb3I6IEVycm9yKTogdm9pZCB7XG4gICAgdGhpcy5jaGlsZHJlblVybEVycm9yID0gZXJyb3IubWVzc2FnZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICBoYW5kbGVNYXJrZG93bkxvYWRlckVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xuICAgIHRoaXMubWFya2Rvd25Mb2FkZXJFcnJvciA9IGVycm9yLm1lc3NhZ2U7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9qdW1wVG8oaXRlbU9yUGF0aDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSB8IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBwYXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbU9yUGF0aCkpIHtcbiAgICAgICAgcGF0aCA9IGF3YWl0IHRoaXMuZm9sbG93UGF0aCh0aGlzLml0ZW1zLCBpdGVtT3JQYXRoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhdGggPSB0aGlzLmZpbmRQYXRoKHRoaXMuaXRlbXMsIGl0ZW1PclBhdGgpO1xuICAgICAgfVxuICAgICAgKHBhdGggfHwgW10pLmZvckVhY2goKHBhdGhJdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKSA9PiB0aGlzLmhhbmRsZUl0ZW1TZWxlY3RlZChwYXRoSXRlbSkpO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZm9sbG93UGF0aChcbiAgICBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdLFxuICAgIHBhdGg6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSxcbiAgKTogUHJvbWlzZTxJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10+IHtcbiAgICBsZXQgcGF0aEl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTtcbiAgICBsZXQgY3VycmVudExldmVsOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBpdGVtcztcbiAgICBjb25zdCBjb21wYXJlV2l0aDogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGggPSB0aGlzLmNvbXBhcmVXaXRoIHx8IGRlZmF1bHRDb21wYXJlV2l0aDtcbiAgICBmb3IgKGNvbnN0IHBhdGhJdGVtIG9mIHBhdGgpIHtcbiAgICAgIGNvbnN0IGZvdW5kSXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSA9IGN1cnJlbnRMZXZlbC5maW5kKChpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKSA9PlxuICAgICAgICBjb21wYXJlV2l0aChwYXRoSXRlbSwgaXRlbSksXG4gICAgICApO1xuXG4gICAgICBpZiAoZm91bmRJdGVtKSB7XG4gICAgICAgIHBhdGhJdGVtcyA9IFsuLi5wYXRoSXRlbXMsIGZvdW5kSXRlbV07XG5cbiAgICAgICAgaWYgKGZvdW5kSXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgIGN1cnJlbnRMZXZlbCA9IGZvdW5kSXRlbS5jaGlsZHJlbjtcbiAgICAgICAgfSBlbHNlIGlmIChmb3VuZEl0ZW0uY2hpbGRyZW5VcmwpIHtcbiAgICAgICAgICBjdXJyZW50TGV2ZWwgPSBhd2FpdCB0aGlzLmxvYWRDaGlsZHJlblVybChmb3VuZEl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhdGhJdGVtcy5sZW5ndGggIT09IHBhdGgubGVuZ3RoKSB7XG4gICAgICBwYXRoSXRlbXMgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGhJdGVtcztcbiAgfVxuXG4gIHByaXZhdGUgZmluZFBhdGgoaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSwgaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSk6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSB7XG4gICAgY29uc3QgY29tcGFyZVdpdGg6IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoID0gdGhpcy5jb21wYXJlV2l0aCB8fCBkZWZhdWx0Q29tcGFyZVdpdGg7XG4gICAgaWYgKGl0ZW1zKSB7XG4gICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGl0ZW1zKSB7XG4gICAgICAgIGlmIChjb21wYXJlV2l0aChjaGlsZCwgaXRlbSkpIHtcbiAgICAgICAgICByZXR1cm4gW2NoaWxkXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbmNlc3RvcnM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IHRoaXMuZmluZFBhdGgoY2hpbGQuY2hpbGRyZW4sIGl0ZW0pO1xuICAgICAgICBpZiAoYW5jZXN0b3JzKSB7XG4gICAgICAgICAgcmV0dXJuIFtjaGlsZCwgLi4uYW5jZXN0b3JzXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVMaW5rQ2xpY2soZXZlbnQ6IEV2ZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBsaW5rOiBIVE1MQW5jaG9yRWxlbWVudCA9IDxIVE1MQW5jaG9yRWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgY29uc3QgdXJsOiBVUkwgPSBuZXcgVVJMKGxpbmsuaHJlZik7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWFya2Rvd25TdHJpbmc6IHN0cmluZyA9IGF3YWl0IHRoaXMuX21hcmtkb3duVXJsTG9hZGVyU2VydmljZS5sb2FkKHVybC5ocmVmKTtcbiAgICAgIC8vIHBhc3MgaW4gdXJsIHRvIGJlIGFibGUgdG8gdXNlIGN1cnJlbnRNYXJrZG93bkl0ZW0udXJsIGxhdGVyIG9uXG4gICAgICB0aGlzLmhhbmRsZUl0ZW1TZWxlY3RlZCh7IG1hcmtkb3duU3RyaW5nLCB1cmw6IHVybC5ocmVmIH0pO1xuICAgICAgdGhpcy5tYXJrZG93bldyYXBwZXIubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCB3aW46IFdpbmRvdyA9IHdpbmRvdy5vcGVuKHVybC5ocmVmLCAnX2JsYW5rJyk7XG4gICAgICB3aW4uZm9jdXMoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=