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
                    this._jumpTo(this.startAt, undefined);
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
            if (parent_1.startAtLink) {
                parent_1 = this.historyStack[this.historyStack.length - 3]
                    ? this.historyStack[this.historyStack.length - 3]
                    : undefined;
                this.historyStack = this.historyStack.slice(0, -1);
            }
            if (parent_1) {
                this.currentMarkdownItem = parent_1;
                this.historyStack = this.historyStack.slice(0, -1);
                this.setChildrenAsCurrentMenuItems(parent_1);
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
                        if (children && children.length && item.startAtLink) {
                            this._jumpTo(item.startAtLink, children);
                        }
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
     * @param {?} children
     * @return {?}
     */
    TdMarkdownNavigatorComponent.prototype._jumpTo = /**
     * @private
     * @param {?} itemOrPath
     * @param {?} children
     * @return {?}
     */
    function (itemOrPath, children) {
        return __awaiter(this, void 0, void 0, function () {
            var historyStack, path;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        historyStack = this.historyStack;
                        this.reset();
                        if (!(this.items && this.items.length > 0)) return [3 /*break*/, 4];
                        path = [];
                        if (!Array.isArray(itemOrPath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.followPath(this.items, itemOrPath)];
                    case 1:
                        path = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (children && children.length > 0) {
                            this.historyStack = historyStack;
                            path = this.findPath(children, itemOrPath);
                        }
                        else {
                            path = this.findPath(this.items, itemOrPath);
                        }
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
                    template: "<ng-container *ngIf=\"!showEmptyState\">\n  <mat-progress-bar *ngIf=\"loading\" mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n\n  <ng-container *ngIf=\"showHeader\">\n    <div [style.display]=\"'flex'\">\n      <button\n        id=\"td-markdown-navigator-home-button\"\n        *ngIf=\"showHomeButton\"\n        mat-icon-button\n        [matTooltip]=\"goHomeLabel\"\n        (click)=\"reset()\"\n        [attr.data-test]=\"'home-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goHomeLabel\">home</mat-icon>\n      </button>\n\n      <button\n        id=\"td-markdown-navigator-back-button\"\n        *ngIf=\"showGoBackButton\"\n        mat-icon-button\n        [matTooltip]=\"goBackLabel\"\n        (click)=\"goBack()\"\n        [attr.data-test]=\"'back-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goBackLabel\">arrow_back</mat-icon>\n      </button>\n      <span flex *ngIf=\"currentItemTitle\" class=\"mat-body-2 title truncate\" [attr.data-test]=\"'title'\">\n        {{ currentItemTitle }}\n      </span>\n    </div>\n\n    <mat-divider [style.position]=\"'relative'\"></mat-divider>\n  </ng-container>\n\n  <div class=\"scroll-area\" id=\"td-markdown-navigator-content\">\n    <td-message\n      *ngIf=\"childrenUrlError\"\n      [sublabel]=\"childrenUrlError\"\n      color=\"warn\"\n      icon=\"error\"\n      [attr.data-test]=\"'children-url-error'\"\n    ></td-message>\n    <div *ngIf=\"showMenu\" class=\"td-markdown-list\">\n      <mat-action-list>\n        <button\n          *ngFor=\"let item of currentMenuItems; index as index\"\n          [id]=\"'td-markdown-navigator-list-item-' + (item.id ? item.id : index)\"\n          (click)=\"handleItemSelected(item)\"\n          mat-list-item\n          [matTooltip]=\"getTitle(item)\"\n          matTooltipPosition=\"before\"\n          matTooltipShowDelay=\"500\"\n        >\n          <mat-icon matListIcon>\n            {{ getIcon(item) }}\n          </mat-icon>\n          <span matLine class=\"truncate\">\n            {{ getTitle(item) }}\n          </span>\n          <span matLine class=\"truncate\">{{ item.description }}</span>\n          <mat-divider></mat-divider>\n        </button>\n      </mat-action-list>\n    </div>\n\n    <div *ngIf=\"showTdMarkdownLoader || showTdMarkdown\" class=\"markdown-wrapper\" #markdownWrapper>\n      <td-message\n        *ngIf=\"markdownLoaderError\"\n        [sublabel]=\"markdownLoaderError\"\n        color=\"warn\"\n        icon=\"error\"\n        [attr.data-test]=\"'markdown-loader-error'\"\n      ></td-message>\n      <td-flavored-markdown-loader\n        *ngIf=\"showTdMarkdownLoader\"\n        [url]=\"url\"\n        [httpOptions]=\"httpOptions\"\n        [anchor]=\"anchor\"\n        [copyCodeToClipboard]=\"copyCodeToClipboard\"\n        [copyCodeTooltips]=\"copyCodeTooltips\"\n        (loadFailed)=\"handleMarkdownLoaderError($event)\"\n      ></td-flavored-markdown-loader>\n      <td-flavored-markdown\n        *ngIf=\"showTdMarkdown\"\n        [content]=\"markdownString\"\n        [hostedUrl]=\"url\"\n        [anchor]=\"anchor\"\n        [copyCodeToClipboard]=\"copyCodeToClipboard\"\n        [copyCodeTooltips]=\"copyCodeTooltips\"\n        (buttonClicked)=\"buttonClicked.emit($event)\"\n      ></td-flavored-markdown>\n    </div>\n    <ng-container *ngComponentOutlet=\"footerComponent\"></ng-container>\n  </div>\n</ng-container>\n\n<div *ngIf=\"showEmptyState\" layout=\"column\" layout-align=\"center center\" class=\"empty-state\">\n  <mat-icon matListAvatar>subject</mat-icon>\n  <h2>{{ emptyStateLabel }}</h2>\n</div>\n",
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
        copyCodeToClipboard: [{ type: Input }],
        copyCodeTooltips: [{ type: Input }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixJQUFJLEVBQ0osTUFBTSxFQUNOLFlBQVksRUFDWixlQUFlLEdBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU5RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBR2xELDRDQWFDOzs7SUFaQyxvQ0FBWTs7SUFDWix1Q0FBZTs7SUFDZixxQ0FBYTs7SUFDYiw2Q0FBcUI7O0lBQ3JCLGdEQUF3Qjs7SUFDeEIsd0NBQWdCOztJQUNoQiwwQ0FBb0M7O0lBQ3BDLDZDQUFxQjs7SUFDckIsNkNBQXFCOztJQUNyQixzQ0FBYzs7SUFDZCx3Q0FBbUI7O0lBQ25CLDZDQUFxQzs7Ozs7QUFHdkMsOENBSUM7OztJQUhDLDBDQUFnQjs7SUFDaEIsMENBQWdCOztJQUNoQiw4Q0FBb0I7OztBQUt0QixNQUFNLEtBQU8saUNBQWlDLEdBQTZCO0lBQ3pFLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFVBQVUsRUFBRSx1QkFBdUI7Q0FDcEM7Ozs7O0FBRUQsU0FBUyxlQUFlLENBQUMsR0FBVztJQUNsQyxJQUFJLEdBQUcsRUFBRTs7WUFDRCxJQUFJLEdBQVEsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQzlCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JDO2FBQU07O2dCQUNDLElBQUksR0FBYSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O2dCQUN6QyxRQUFRLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhO1NBQ3hEO0tBQ0Y7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDOzs7OztBQUVELFNBQVMsMEJBQTBCLENBQUMsY0FBc0I7SUFDeEQsSUFBSSxjQUFjLEVBQUU7O1lBQ1osU0FBUyxHQUFXLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSTs7OztRQUFDLFVBQUMsSUFBWSxJQUFLLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBTixDQUFNLEVBQUM7UUFDeEYsT0FBTyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUM1QztJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7Ozs7O0FBRUQsU0FBUyxjQUFjLENBQUMsTUFBeUI7SUFDL0MsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsRSxDQUFDOzs7Ozs7QUFDRCxTQUFTLGtCQUFrQixDQUFDLEVBQTBCLEVBQUUsRUFBMEI7SUFDaEYsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEIsT0FBTyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FDeEI7SUFDRCxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDbkIsQ0FBQztBQUVEO0lBdUVFLHNDQUNVLHlCQUFrRCxFQUNsRCxrQkFBcUMsRUFDckMsVUFBd0IsRUFDeEIsS0FBaUI7UUFIakIsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUF5QjtRQUNsRCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLGVBQVUsR0FBVixVQUFVLENBQWM7UUFDeEIsVUFBSyxHQUFMLEtBQUssQ0FBWTs7Ozs7OztRQXpDbEIsd0JBQW1CLEdBQVksS0FBSyxDQUFDOzs7Ozs7UUFPckMscUJBQWdCLEdBQXNCLEVBQUUsQ0FBQztRQWlCeEMsa0JBQWEsR0FBc0QsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUloRyxpQkFBWSxHQUE2QixFQUFFLENBQUMsQ0FBQyxVQUFVOztRQUV2RCxxQkFBZ0IsR0FBNkIsRUFBRSxDQUFDLENBQUMscUJBQXFCOztRQUV0RSxZQUFPLEdBQVksS0FBSyxDQUFDO0lBVXRCLENBQUM7Ozs7O0lBR0osb0RBQWE7Ozs7SUFEYixVQUNjLEtBQVk7O1lBQ2xCLE9BQU8sR0FBZ0IsbUJBQWEsS0FBSyxDQUFDLFVBQVUsRUFBQTtRQUMxRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksY0FBYyxDQUFDLG1CQUFtQixPQUFPLEVBQUEsQ0FBQyxFQUFFO1lBQzVFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsc0JBQUksMERBQWdCOzs7O1FBQXBCO1lBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx3REFBYzs7OztRQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksb0RBQVU7Ozs7UUFBZDtZQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGtEQUFROzs7O1FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNuRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDhEQUFvQjs7OztRQUF4QjtZQUNFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDOUYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx3REFBYzs7OztRQUFsQjtZQUNFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQztRQUNqRixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDZDQUFHOzs7O1FBQVA7WUFDRSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDO2FBQ3JDO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx5REFBZTs7OztRQUFuQjtZQUNFLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUU7Z0JBQy9ELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQzthQUN4QztZQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUNELHNCQUFJLHFEQUFXOzs7O1FBQWY7WUFDRSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDO2FBQzdDO1FBQ0gsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSx3REFBYzs7OztRQUFsQjtZQUNFLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUM1QixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7YUFDaEQ7UUFDSCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGdEQUFNOzs7O1FBQVY7WUFDRSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx3REFBYzs7OztRQUFsQjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM5QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHFEQUFXOzs7O1FBQWY7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlDQUFpQyxDQUFDLE1BQU0sQ0FBQztRQUN6RixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHFEQUFXOzs7O1FBQWY7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlDQUFpQyxDQUFDLE1BQU0sQ0FBQztRQUN6RixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHlEQUFlOzs7O1FBQW5CO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxpQ0FBaUMsQ0FBQyxVQUFVLENBQUM7UUFDakcsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwwREFBZ0I7Ozs7UUFBcEI7WUFDRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDaEMsT0FBTyxFQUFFLENBQUM7YUFDWDtpQkFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDbkMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ2hEO2lCQUFNLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZFO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDOzs7T0FBQTs7Ozs7SUFFSyxrREFBVzs7OztJQUFqQixVQUFrQixPQUFzQjs7O2dCQUN0QyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDZDtnQkFDRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7aUJBQ3ZDOzs7O0tBQ0Y7Ozs7O0lBRUQsK0RBQXdCOzs7O0lBQXhCLFVBQXlCLElBQTRCO1FBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzNFLENBQUM7Ozs7SUFDRCxrREFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVELDRDQUFLOzs7SUFBTDtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixpQ0FBaUM7UUFDakMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDMUYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0wsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRUQsNkNBQU07OztJQUFOO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztnQkFDNUIsUUFBTSxHQUEyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUVwRixJQUFJLFFBQU0sQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RCLFFBQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDdEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUNqRCxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUNkLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7WUFFRCxJQUFJLFFBQU0sRUFBRTtnQkFDVixJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBTSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsNkJBQTZCLENBQUMsUUFBTSxDQUFDLENBQUM7YUFDNUM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2Q7U0FDRjthQUFNO1lBQ0wsaUNBQWlDO1lBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7Ozs7O0lBRUQseURBQWtCOzs7O0lBQWxCLFVBQW1CLElBQTRCO1FBQzdDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLFlBQU8sSUFBSSxDQUFDLFlBQVksR0FBRSxJQUFJLEVBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7Ozs7O0lBRUssb0VBQTZCOzs7O0lBQW5DLFVBQW9DLElBQTRCOzs7Ozs7d0JBQzlELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7d0JBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO3dCQUNwQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBRWpDLGFBQWEsR0FBNkIsSUFBSSxDQUFDLFlBQVk7d0JBQzdELFFBQVEsR0FBNkIsRUFBRTs2QkFDdkMsSUFBSSxDQUFDLFFBQVEsRUFBYix3QkFBYTt3QkFDZixRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7OzZCQUNoQixJQUFJLENBQUMsV0FBVyxFQUFoQix3QkFBZ0I7d0JBQ2QscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQTNDLFFBQVEsR0FBRyxTQUFnQyxDQUFDOzs7d0JBRTlDLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTs0QkFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3lCQUMxQzt3QkFDSyxnQkFBZ0IsR0FBNkIsSUFBSSxDQUFDLFlBQVk7d0JBQ3BFLElBQ0UsYUFBYSxDQUFDLE1BQU0sS0FBSyxnQkFBZ0IsQ0FBQyxNQUFNOzRCQUNoRCxhQUFhLENBQUMsS0FBSzs7Ozs7NEJBQUMsVUFBQyxTQUFpQyxFQUFFLEtBQWEsSUFBSyxPQUFBLFNBQVMsS0FBSyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFBckMsQ0FBcUMsRUFBQyxFQUNoSDs0QkFDQSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO3lCQUNsQzt3QkFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzt3QkFDckIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDOzs7OztLQUN4Qzs7Ozs7SUFFSyxzREFBZTs7OztJQUFyQixVQUFzQixJQUE0Qjs7Ozs7O3dCQUMxQyxZQUFZLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDOzs7O3dCQUVuRixxQkFBTSxJQUFJLENBQUMsS0FBSztpQ0FDcEIsR0FBRyxDQUEyQixZQUFZLGVBQU8sSUFBSSxDQUFDLFdBQVcsRUFBRztpQ0FDcEUsU0FBUyxFQUFFLEVBQUE7NEJBRmQsc0JBQU8sU0FFTyxFQUFDOzs7d0JBRWYsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQUssQ0FBQyxDQUFDO3dCQUNuQyxzQkFBTyxFQUFFLEVBQUM7Ozs7O0tBRWI7Ozs7O0lBRUQsK0NBQVE7Ozs7SUFBUixVQUFTLElBQTRCO1FBQ25DLElBQUksSUFBSSxFQUFFO1lBQ1IsT0FBTyxDQUNMLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxLQUFLO2dCQUNWLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUN6QiwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUMvQyxFQUFFLENBQ0gsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNWO0lBQ0gsQ0FBQzs7Ozs7SUFFRCw4Q0FBTzs7OztJQUFQLFVBQVEsSUFBNEI7UUFDbEMsSUFBSSxJQUFJLEVBQUU7WUFDUixPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7Ozs7SUFFRCw2REFBc0I7Ozs7SUFBdEIsVUFBdUIsS0FBWTtRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN0QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7Ozs7SUFDRCxnRUFBeUI7Ozs7SUFBekIsVUFBMEIsS0FBWTtRQUNwQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7Ozs7OztJQUVhLDhDQUFPOzs7Ozs7SUFBckIsVUFDRSxVQUE2RCxFQUM3RCxRQUFrQzs7Ozs7Ozt3QkFFNUIsWUFBWSxHQUE2QixJQUFJLENBQUMsWUFBWTt3QkFDaEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOzZCQUNULENBQUEsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUEsRUFBbkMsd0JBQW1DO3dCQUNqQyxJQUFJLEdBQTZCLEVBQUU7NkJBQ25DLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQXpCLHdCQUF5Qjt3QkFDcEIscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxFQUFBOzt3QkFBcEQsSUFBSSxHQUFHLFNBQTZDLENBQUM7Ozt3QkFDaEQsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7NEJBQzFDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDOzRCQUNqQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7eUJBQzVDOzZCQUFNOzRCQUNMLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7eUJBQzlDOzs7d0JBQ0QsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTzs7Ozt3QkFBQyxVQUFDLFFBQWdDLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQWpDLENBQWlDLEVBQUMsQ0FBQzs7O3dCQUVoRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7Ozs7O0tBQ3hDOzs7Ozs7O0lBRWEsaURBQVU7Ozs7OztJQUF4QixVQUNFLEtBQStCLEVBQy9CLElBQThCOzs7Ozs7O3dCQUUxQixTQUFTLEdBQTZCLEVBQUU7d0JBQ3hDLFlBQVksR0FBNkIsS0FBSzt3QkFDNUMsV0FBVyxHQUFrQyxJQUFJLENBQUMsV0FBVyxJQUFJLGtCQUFrQjs0Q0FDOUUsUUFBUTs7Ozs7d0NBQ1gsU0FBUyxHQUEyQixZQUFZLENBQUMsSUFBSTs7Ozt3Q0FBQyxVQUFDLElBQTRCOzRDQUN2RixPQUFBLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO3dDQUEzQixDQUEyQixFQUM1Qjs2Q0FFRyxTQUFTLEVBQVQsd0JBQVM7d0NBQ1gsU0FBUyxZQUFPLFNBQVMsR0FBRSxTQUFTLEVBQUMsQ0FBQzs2Q0FFbEMsU0FBUyxDQUFDLFFBQVEsRUFBbEIsd0JBQWtCO3dDQUNwQixZQUFZLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQzs7OzZDQUN6QixTQUFTLENBQUMsV0FBVyxFQUFyQix3QkFBcUI7d0NBQ2YscUJBQU0sT0FBSyxlQUFlLENBQUMsU0FBUyxDQUFDLEVBQUE7O3dDQUFwRCxZQUFZLEdBQUcsU0FBcUMsQ0FBQzs7Ozs7Ozs7Ozs7O3dCQVhwQyxTQUFBLFNBQUEsSUFBSSxDQUFBOzs7O3dCQUFoQixRQUFRO3NEQUFSLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFpQm5CLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFOzRCQUNwQyxTQUFTLEdBQUcsRUFBRSxDQUFDO3lCQUNoQjt3QkFDRCxzQkFBTyxTQUFTLEVBQUM7Ozs7S0FDbEI7Ozs7Ozs7SUFFTywrQ0FBUTs7Ozs7O0lBQWhCLFVBQWlCLEtBQStCLEVBQUUsSUFBNEI7OztZQUN0RSxXQUFXLEdBQWtDLElBQUksQ0FBQyxXQUFXLElBQUksa0JBQWtCO1FBQ3pGLElBQUksS0FBSyxFQUFFOztnQkFDVCxLQUFvQixJQUFBLFVBQUEsU0FBQSxLQUFLLENBQUEsNEJBQUEsK0NBQUU7b0JBQXRCLElBQU0sS0FBSyxrQkFBQTtvQkFDZCxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUU7d0JBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDaEI7O3dCQUNLLFNBQVMsR0FBNkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztvQkFDL0UsSUFBSSxTQUFTLEVBQUU7d0JBQ2IsaUJBQVEsS0FBSyxHQUFLLFNBQVMsRUFBRTtxQkFDOUI7aUJBQ0Y7Ozs7Ozs7OztTQUNGO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7Ozs7O0lBRWEsc0RBQWU7Ozs7O0lBQTdCLFVBQThCLEtBQVk7Ozs7Ozt3QkFDeEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO3dCQUNqQixJQUFJLEdBQXNCLG1CQUFtQixLQUFLLENBQUMsTUFBTSxFQUFBO3dCQUN6RCxHQUFHLEdBQVEsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7Ozt3QkFFTixxQkFBTSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQTVFLGNBQWMsR0FBVyxTQUFtRDt3QkFDbEYsaUVBQWlFO3dCQUNqRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxjQUFjLGdCQUFBLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUMzRCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDOzs7O3dCQUUzQyxHQUFHLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQzt3QkFDbkQsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDOzs7d0JBRVosSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Ozt3QkFFdkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDOzs7OztLQUN4Qzs7Z0JBallGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyx1aEhBQWtEO29CQUVsRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQXhFeUMsdUJBQXVCO2dCQVAvRCxpQkFBaUI7Z0JBU1YsWUFBWTtnQkFDWixVQUFVOzs7d0JBNEVoQixLQUFLO3lCQU9MLEtBQUs7MEJBT0wsS0FBSztzQ0FRTCxLQUFLO21DQU9MLEtBQUs7eUJBT0wsS0FBSzs4QkFRTCxLQUFLO2dDQUVMLE1BQU07a0NBRU4sU0FBUyxTQUFDLGlCQUFpQjtnQ0FrQjNCLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBb1RuQyxtQ0FBQztDQUFBLEFBbFlELElBa1lDO1NBNVhZLDRCQUE0Qjs7Ozs7Ozs7SUFNdkMsNkNBQXlDOzs7Ozs7O0lBT3pDLDhDQUEwQzs7Ozs7OztJQU8xQywrQ0FBb0U7Ozs7Ozs7O0lBUXBFLDJEQUE4Qzs7Ozs7OztJQU85Qyx3REFBa0Q7Ozs7Ozs7SUFPbEQsOENBQTJCOzs7Ozs7OztJQVEzQixtREFBb0Q7O0lBRXBELHFEQUFnRzs7SUFFaEcsdURBQTBEOztJQUUxRCxvREFBNEM7O0lBQzVDLDJEQUE0Qzs7SUFDNUMsd0RBQWdEOztJQUVoRCwrQ0FBeUI7O0lBRXpCLDJEQUE0Qjs7SUFDNUIsd0RBQXlCOzs7OztJQUd2QixpRUFBMEQ7Ozs7O0lBQzFELDBEQUE2Qzs7Ozs7SUFDN0Msa0RBQWdDOzs7OztJQUNoQyw2Q0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFR5cGUsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBTZWN1cml0eUNvbnRleHQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcmVtb3ZlTGVhZGluZ0hhc2gsIGlzQW5jaG9yTGluaywgVGRNYXJrZG93bkxvYWRlclNlcnZpY2UgfSBmcm9tICdAY292YWxlbnQvbWFya2Rvd24nO1xuaW1wb3J0IHsgSVRkRmxhdm9yZWRNYXJrZG93bkJ1dHRvbkNsaWNrRXZlbnQgfSBmcm9tICdAY292YWxlbnQvZmxhdm9yZWQtbWFya2Rvd24nO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSUNvcHlDb2RlVG9vbHRpcHMgfSBmcm9tICdAY292YWxlbnQvaGlnaGxpZ2h0JztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtIHtcbiAgaWQ/OiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICB1cmw/OiBzdHJpbmc7XG4gIGh0dHBPcHRpb25zPzogb2JqZWN0O1xuICBtYXJrZG93blN0cmluZz86IHN0cmluZzsgLy8gcmF3IG1hcmtkb3duXG4gIGFuY2hvcj86IHN0cmluZztcbiAgY2hpbGRyZW4/OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG4gIGNoaWxkcmVuVXJsPzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgaWNvbj86IHN0cmluZztcbiAgZm9vdGVyPzogVHlwZTxhbnk+O1xuICBzdGFydEF0TGluaz86IElNYXJrZG93bk5hdmlnYXRvckl0ZW07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzIHtcbiAgZ29Ib21lPzogc3RyaW5nO1xuICBnb0JhY2s/OiBzdHJpbmc7XG4gIGVtcHR5U3RhdGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoID0gKG8xOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLCBvMjogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSkgPT4gYm9vbGVhbjtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX0xBQkVMUzogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzID0ge1xuICBnb0hvbWU6ICdHbyBob21lJyxcbiAgZ29CYWNrOiAnR28gYmFjaycsXG4gIGVtcHR5U3RhdGU6ICdObyBpdGVtKHMpIHRvIGRpc3BsYXknLFxufTtcblxuZnVuY3Rpb24gZ2V0VGl0bGVGcm9tVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHVybCkge1xuICAgIGNvbnN0IHRlbXA6IFVSTCA9IG5ldyBVUkwodXJsKTtcbiAgICBpZiAodGVtcC5oYXNoKSB7XG4gICAgICByZXR1cm4gcmVtb3ZlTGVhZGluZ0hhc2godGVtcC5oYXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcGF0aDogc3RyaW5nW10gPSB0ZW1wLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICBjb25zdCBmaWxlTmFtZTogc3RyaW5nID0gcGF0aFtwYXRoLmxlbmd0aCAtIDFdO1xuICAgICAgcmV0dXJuIGZpbGVOYW1lLnJlcGxhY2UoL1xcLlteLy5dKyQvLCAnJyk7IC8vIHJlbW92ZSAubWRcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZ2V0VGl0bGVGcm9tTWFya2Rvd25TdHJpbmcobWFya2Rvd25TdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChtYXJrZG93blN0cmluZykge1xuICAgIGNvbnN0IGZpcnN0TGluZTogc3RyaW5nID0gbWFya2Rvd25TdHJpbmcuc3BsaXQoL1tcXHJcXG5dKy8pLmZpbmQoKGxpbmU6IHN0cmluZykgPT4gISFsaW5lKTtcbiAgICByZXR1cm4gcmVtb3ZlTGVhZGluZ0hhc2goZmlyc3RMaW5lKS50cmltKCk7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNNYXJrZG93bkhyZWYoYW5jaG9yOiBIVE1MQW5jaG9yRWxlbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gIWlzQW5jaG9yTGluayhhbmNob3IpICYmIGFuY2hvci5wYXRobmFtZS5lbmRzV2l0aCgnLm1kJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyZVdpdGgobzE6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0sIG8yOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogYm9vbGVhbiB7XG4gIGlmIChvMS5pZCAmJiBvMi5pZCkge1xuICAgIHJldHVybiBvMS5pZCA9PT0gbzIuaWQ7XG4gIH1cbiAgcmV0dXJuIG8xID09PSBvMjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGQtbWFya2Rvd24tbmF2aWdhdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVGRNYXJrZG93bk5hdmlnYXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdXG4gICAqXG4gICAqIExpc3Qgb2YgSU1hcmtkb3duTmF2aWdhdG9ySXRlbXMgdG8gYmUgcmVuZGVyZWRcbiAgICovXG4gIEBJbnB1dCgpIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG5cbiAgLyoqXG4gICAqIGxhYmVscz86IElNYXJrZG93bk5hdmlnYXRvckxhYmVsc1xuICAgKlxuICAgKiBUcmFuc2xhdGVkIGxhYmVsc1xuICAgKi9cbiAgQElucHV0KCkgbGFiZWxzOiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHM7XG5cbiAgLyoqXG4gICAqIHN0YXJ0QXQ/OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtIHwgSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuICAgKlxuICAgKiBJdGVtIG9yIHBhdGggdG8gc3RhcnQgYXRcbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0QXQ6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0gfCBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG5cbiAgLyoqXG4gICAqIGNvcHlDb2RlVG9DbGlwYm9hcmQ/OiBib29sZWFuXG4gICAqXG4gICAqIERpc3BsYXkgY29weSBidXR0b24gb24gY29kZSBzbmlwcGV0cyB0byBjb3B5IGNvZGUgdG8gY2xpcGJvYXJkLlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgY29weUNvZGVUb0NsaXBib2FyZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBjb3B5Q29kZVRvb2x0aXBzPzogSUNvcHlDb2RlVG9vbHRpcHNcbiAgICpcbiAgICogVG9vbHRpcHMgZm9yIGNvcHkgYnV0dG9uIHRvIGNvcHkgYW5kIHVwb24gY29weWluZy5cbiAgICovXG4gIEBJbnB1dCgpIGNvcHlDb2RlVG9vbHRpcHM6IElDb3B5Q29kZVRvb2x0aXBzID0ge307XG5cbiAgLyoqXG4gICAqIGZvb3Rlcj86IFR5cGU8YW55PlxuICAgKlxuICAgKiBDb21wb25lbnQgdG8gYmUgZGlzcGxheWVkIGluIGZvb3RlclxuICAgKi9cbiAgQElucHV0KCkgZm9vdGVyOiBUeXBlPGFueT47XG5cbiAgLyoqXG4gICAqIGNvbXBhcmVXaXRoPzogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGhcbiAgICpcbiAgICogRnVuY3Rpb24gdXNlZCB0byBmaW5kIHN0YXJ0QXQgaXRlbVxuICAgKiBEZWZhdWx0cyB0byBjb21wYXJpc29uIGJ5IHN0cmljdCBlcXVhbGl0eSAoPT09KVxuICAgKi9cbiAgQElucHV0KCkgY29tcGFyZVdpdGg6IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoO1xuXG4gIEBPdXRwdXQoKSBidXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8SVRkRmxhdm9yZWRNYXJrZG93bkJ1dHRvbkNsaWNrRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ21hcmtkb3duV3JhcHBlcicpIG1hcmtkb3duV3JhcHBlcjogRWxlbWVudFJlZjtcblxuICBoaXN0b3J5U3RhY2s6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSA9IFtdOyAvLyBoaXN0b3J5XG4gIGN1cnJlbnRNYXJrZG93bkl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW07IC8vIGN1cnJlbnRseSByZW5kZXJlZFxuICBjdXJyZW50TWVudUl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTsgLy8gY3VycmVudCBtZW51IGl0ZW1zXG5cbiAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG1hcmtkb3duTG9hZGVyRXJyb3I6IHN0cmluZztcbiAgY2hpbGRyZW5VcmxFcnJvcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX21hcmtkb3duVXJsTG9hZGVyU2VydmljZTogVGRNYXJrZG93bkxvYWRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgIHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsXG4gICkge31cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIGNsaWNrTGlzdGVuZXIoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcbiAgICBpZiAoZWxlbWVudC5tYXRjaGVzKCdhW2hyZWZdJykgJiYgaXNNYXJrZG93bkhyZWYoPEhUTUxBbmNob3JFbGVtZW50PmVsZW1lbnQpKSB7XG4gICAgICB0aGlzLmhhbmRsZUxpbmtDbGljayhldmVudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNob3dHb0JhY2tCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQgc2hvd0hvbWVCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCA+IDE7XG4gIH1cblxuICBnZXQgc2hvd0hlYWRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaG93SG9tZUJ1dHRvbiB8fCB0aGlzLnNob3dHb0JhY2tCdXR0b24gfHwgISF0aGlzLmN1cnJlbnRJdGVtVGl0bGU7XG4gIH1cblxuICBnZXQgc2hvd01lbnUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1lbnVJdGVtcyAmJiB0aGlzLmN1cnJlbnRNZW51SXRlbXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldCBzaG93VGRNYXJrZG93bkxvYWRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gJiYgISF0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0udXJsICYmICF0aGlzLnNob3dUZE1hcmtkb3duO1xuICB9XG5cbiAgZ2V0IHNob3dUZE1hcmtkb3duKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbSAmJiAhIXRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5tYXJrZG93blN0cmluZztcbiAgfVxuXG4gIGdldCB1cmwoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtLnVybDtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldCBmb290ZXJDb21wb25lbnQoKTogYW55IHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFya2Rvd25JdGVtICYmIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5mb290ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0uZm9vdGVyO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mb290ZXI7XG4gIH1cbiAgZ2V0IGh0dHBPcHRpb25zKCk6IG9iamVjdCB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5odHRwT3B0aW9ucztcbiAgICB9XG4gIH1cbiAgZ2V0IG1hcmtkb3duU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5tYXJrZG93blN0cmluZztcbiAgICB9XG4gIH1cblxuICBnZXQgYW5jaG9yKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbS5hbmNob3I7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNob3dFbXB0eVN0YXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pdGVtcyB8fCB0aGlzLml0ZW1zLmxlbmd0aCA8IDE7XG4gIH1cblxuICBnZXQgZ29Ib21lTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmdvSG9tZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTLmdvSG9tZTtcbiAgfVxuXG4gIGdldCBnb0JhY2tMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZ29CYWNrKSB8fCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9MQUJFTFMuZ29CYWNrO1xuICB9XG5cbiAgZ2V0IGVtcHR5U3RhdGVMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZW1wdHlTdGF0ZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfTEFCRUxTLmVtcHR5U3RhdGU7XG4gIH1cblxuICBnZXQgY3VycmVudEl0ZW1UaXRsZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRpdGxlKHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSh0aGlzLmhpc3RvcnlTdGFja1t0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggLSAxXSk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGFzeW5jIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoY2hhbmdlcy5pdGVtcykge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5zdGFydEF0ICYmIHRoaXMuaXRlbXMgJiYgdGhpcy5zdGFydEF0KSB7XG4gICAgICB0aGlzLl9qdW1wVG8odGhpcy5zdGFydEF0LCB1bmRlZmluZWQpO1xuICAgIH1cbiAgfVxuXG4gIGhhc0NoaWxkcmVuT3JDaGlsZHJlblVybChpdGVtOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkgfHwgISFpdGVtLmNoaWxkcmVuVXJsO1xuICB9XG4gIGNsZWFyRXJyb3JzKCk6IHZvaWQge1xuICAgIHRoaXMubWFya2Rvd25Mb2FkZXJFcnJvciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNoaWxkcmVuVXJsRXJyb3IgPSB1bmRlZmluZWQ7XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XG4gICAgLy8gaWYgc2luZ2xlIGl0ZW0gYW5kIG5vIGNoaWxkcmVuXG4gICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5sZW5ndGggPT09IDEgJiYgIXRoaXMuaGFzQ2hpbGRyZW5PckNoaWxkcmVuVXJsKHRoaXMuaXRlbXNbMF0pKSB7XG4gICAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSBbXTtcbiAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IHRoaXMuaXRlbXNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IHRoaXMuaXRlbXM7XG4gICAgICB0aGlzLmN1cnJlbnRNYXJrZG93bkl0ZW0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuaGlzdG9yeVN0YWNrID0gW107XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnb0JhY2soKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5jbGVhckVycm9ycygpO1xuICAgIGlmICh0aGlzLmhpc3RvcnlTdGFjay5sZW5ndGggPiAxKSB7XG4gICAgICBsZXQgcGFyZW50OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtID0gdGhpcy5oaXN0b3J5U3RhY2tbdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIC0gMl07XG5cbiAgICAgIGlmIChwYXJlbnQuc3RhcnRBdExpbmspIHtcbiAgICAgICAgcGFyZW50ID0gdGhpcy5oaXN0b3J5U3RhY2tbdGhpcy5oaXN0b3J5U3RhY2subGVuZ3RoIC0gM11cbiAgICAgICAgICA/IHRoaXMuaGlzdG9yeVN0YWNrW3RoaXMuaGlzdG9yeVN0YWNrLmxlbmd0aCAtIDNdXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuaGlzdG9yeVN0YWNrID0gdGhpcy5oaXN0b3J5U3RhY2suc2xpY2UoMCwgLTEpO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHRoaXMuY3VycmVudE1hcmtkb3duSXRlbSA9IHBhcmVudDtcbiAgICAgICAgdGhpcy5oaXN0b3J5U3RhY2sgPSB0aGlzLmhpc3RvcnlTdGFjay5zbGljZSgwLCAtMSk7XG4gICAgICAgIHRoaXMuc2V0Q2hpbGRyZW5Bc0N1cnJlbnRNZW51SXRlbXMocGFyZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb25lIGxldmVsIGRvd24ganVzdCBnbyB0byByb290XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgaGFuZGxlSXRlbVNlbGVjdGVkKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XG4gICAgdGhpcy5jdXJyZW50TWFya2Rvd25JdGVtID0gaXRlbTtcbiAgICB0aGlzLmhpc3RvcnlTdGFjayA9IFsuLi50aGlzLmhpc3RvcnlTdGFjaywgaXRlbV07XG4gICAgdGhpcy5zZXRDaGlsZHJlbkFzQ3VycmVudE1lbnVJdGVtcyhpdGVtKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGFzeW5jIHNldENoaWxkcmVuQXNDdXJyZW50TWVudUl0ZW1zKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmN1cnJlbnRNZW51SXRlbXMgPSBbXTtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgY29uc3Qgc3RhY2tTbmFwc2hvdDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gdGhpcy5oaXN0b3J5U3RhY2s7XG4gICAgbGV0IGNoaWxkcmVuOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSBbXTtcbiAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgY2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5jaGlsZHJlblVybCkge1xuICAgICAgY2hpbGRyZW4gPSBhd2FpdCB0aGlzLmxvYWRDaGlsZHJlblVybChpdGVtKTtcbiAgICB9XG4gICAgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCAmJiBpdGVtLnN0YXJ0QXRMaW5rKSB7XG4gICAgICB0aGlzLl9qdW1wVG8oaXRlbS5zdGFydEF0TGluaywgY2hpbGRyZW4pO1xuICAgIH1cbiAgICBjb25zdCBuZXdTdGFja1NuYXBzaG90OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSB0aGlzLmhpc3RvcnlTdGFjaztcbiAgICBpZiAoXG4gICAgICBzdGFja1NuYXBzaG90Lmxlbmd0aCA9PT0gbmV3U3RhY2tTbmFwc2hvdC5sZW5ndGggJiZcbiAgICAgIHN0YWNrU25hcHNob3QuZXZlcnkoKHN0YWNrSXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgaW5kZXg6IG51bWJlcikgPT4gc3RhY2tJdGVtID09PSBuZXdTdGFja1NuYXBzaG90W2luZGV4XSlcbiAgICApIHtcbiAgICAgIHRoaXMuY3VycmVudE1lbnVJdGVtcyA9IGNoaWxkcmVuO1xuICAgIH1cblxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgYXN5bmMgbG9hZENoaWxkcmVuVXJsKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBQcm9taXNlPElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXT4ge1xuICAgIGNvbnN0IHNhbml0aXplZFVybDogc3RyaW5nID0gdGhpcy5fc2FuaXRpemVyLnNhbml0aXplKFNlY3VyaXR5Q29udGV4dC5VUkwsIGl0ZW0uY2hpbGRyZW5VcmwpO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5faHR0cFxuICAgICAgICAuZ2V0PElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXT4oc2FuaXRpemVkVXJsLCB7IC4uLml0ZW0uaHR0cE9wdGlvbnMgfSlcbiAgICAgICAgLnRvUHJvbWlzZSgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmhhbmRsZUNoaWxkcmVuVXJsRXJyb3IoZXJyb3IpO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIGdldFRpdGxlKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBzdHJpbmcge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICByZW1vdmVMZWFkaW5nSGFzaChpdGVtLmFuY2hvcikgfHxcbiAgICAgICAgaXRlbS50aXRsZSB8fFxuICAgICAgICBnZXRUaXRsZUZyb21VcmwoaXRlbS51cmwpIHx8XG4gICAgICAgIGdldFRpdGxlRnJvbU1hcmtkb3duU3RyaW5nKGl0ZW0ubWFya2Rvd25TdHJpbmcpIHx8XG4gICAgICAgICcnXG4gICAgICApLnRyaW0oKTtcbiAgICB9XG4gIH1cblxuICBnZXRJY29uKGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBzdHJpbmcge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS5pY29uIHx8ICdzdWJqZWN0JztcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDaGlsZHJlblVybEVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xuICAgIHRoaXMuY2hpbGRyZW5VcmxFcnJvciA9IGVycm9yLm1lc3NhZ2U7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbiAgaGFuZGxlTWFya2Rvd25Mb2FkZXJFcnJvcihlcnJvcjogRXJyb3IpOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtkb3duTG9hZGVyRXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfanVtcFRvKFxuICAgIGl0ZW1PclBhdGg6IElNYXJrZG93bk5hdmlnYXRvckl0ZW0gfCBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10sXG4gICAgY2hpbGRyZW46IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaGlzdG9yeVN0YWNrOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSB0aGlzLmhpc3RvcnlTdGFjaztcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgcGF0aDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gW107XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtT3JQYXRoKSkge1xuICAgICAgICBwYXRoID0gYXdhaXQgdGhpcy5mb2xsb3dQYXRoKHRoaXMuaXRlbXMsIGl0ZW1PclBhdGgpO1xuICAgICAgfSBlbHNlIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeVN0YWNrID0gaGlzdG9yeVN0YWNrO1xuICAgICAgICBwYXRoID0gdGhpcy5maW5kUGF0aChjaGlsZHJlbiwgaXRlbU9yUGF0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXRoID0gdGhpcy5maW5kUGF0aCh0aGlzLml0ZW1zLCBpdGVtT3JQYXRoKTtcbiAgICAgIH1cbiAgICAgIChwYXRoIHx8IFtdKS5mb3JFYWNoKChwYXRoSXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSkgPT4gdGhpcy5oYW5kbGVJdGVtU2VsZWN0ZWQocGF0aEl0ZW0pKTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGZvbGxvd1BhdGgoXG4gICAgaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXSxcbiAgICBwYXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10sXG4gICk6IFByb21pc2U8SU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdPiB7XG4gICAgbGV0IHBhdGhJdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gW107XG4gICAgbGV0IGN1cnJlbnRMZXZlbDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdID0gaXRlbXM7XG4gICAgY29uc3QgY29tcGFyZVdpdGg6IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoID0gdGhpcy5jb21wYXJlV2l0aCB8fCBkZWZhdWx0Q29tcGFyZVdpdGg7XG4gICAgZm9yIChjb25zdCBwYXRoSXRlbSBvZiBwYXRoKSB7XG4gICAgICBjb25zdCBmb3VuZEl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0gPSBjdXJyZW50TGV2ZWwuZmluZCgoaXRlbTogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSkgPT5cbiAgICAgICAgY29tcGFyZVdpdGgocGF0aEl0ZW0sIGl0ZW0pLFxuICAgICAgKTtcblxuICAgICAgaWYgKGZvdW5kSXRlbSkge1xuICAgICAgICBwYXRoSXRlbXMgPSBbLi4ucGF0aEl0ZW1zLCBmb3VuZEl0ZW1dO1xuXG4gICAgICAgIGlmIChmb3VuZEl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICBjdXJyZW50TGV2ZWwgPSBmb3VuZEl0ZW0uY2hpbGRyZW47XG4gICAgICAgIH0gZWxzZSBpZiAoZm91bmRJdGVtLmNoaWxkcmVuVXJsKSB7XG4gICAgICAgICAgY3VycmVudExldmVsID0gYXdhaXQgdGhpcy5sb2FkQ2hpbGRyZW5VcmwoZm91bmRJdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYXRoSXRlbXMubGVuZ3RoICE9PSBwYXRoLmxlbmd0aCkge1xuICAgICAgcGF0aEl0ZW1zID0gW107XG4gICAgfVxuICAgIHJldHVybiBwYXRoSXRlbXM7XG4gIH1cblxuICBwcml2YXRlIGZpbmRQYXRoKGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10sIGl0ZW06IElNYXJrZG93bk5hdmlnYXRvckl0ZW0pOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10ge1xuICAgIGNvbnN0IGNvbXBhcmVXaXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aCA9IHRoaXMuY29tcGFyZVdpdGggfHwgZGVmYXVsdENvbXBhcmVXaXRoO1xuICAgIGlmIChpdGVtcykge1xuICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBpdGVtcykge1xuICAgICAgICBpZiAoY29tcGFyZVdpdGgoY2hpbGQsIGl0ZW0pKSB7XG4gICAgICAgICAgcmV0dXJuIFtjaGlsZF07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYW5jZXN0b3JzOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW10gPSB0aGlzLmZpbmRQYXRoKGNoaWxkLmNoaWxkcmVuLCBpdGVtKTtcbiAgICAgICAgaWYgKGFuY2VzdG9ycykge1xuICAgICAgICAgIHJldHVybiBbY2hpbGQsIC4uLmFuY2VzdG9yc107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlTGlua0NsaWNrKGV2ZW50OiBFdmVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgbGluazogSFRNTEFuY2hvckVsZW1lbnQgPSA8SFRNTEFuY2hvckVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IHVybDogVVJMID0gbmV3IFVSTChsaW5rLmhyZWYpO1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1hcmtkb3duU3RyaW5nOiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9tYXJrZG93blVybExvYWRlclNlcnZpY2UubG9hZCh1cmwuaHJlZik7XG4gICAgICAvLyBwYXNzIGluIHVybCB0byBiZSBhYmxlIHRvIHVzZSBjdXJyZW50TWFya2Rvd25JdGVtLnVybCBsYXRlciBvblxuICAgICAgdGhpcy5oYW5kbGVJdGVtU2VsZWN0ZWQoeyBtYXJrZG93blN0cmluZywgdXJsOiB1cmwuaHJlZiB9KTtcbiAgICAgIHRoaXMubWFya2Rvd25XcmFwcGVyLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3Qgd2luOiBXaW5kb3cgPSB3aW5kb3cub3Blbih1cmwuaHJlZiwgJ19ibGFuaycpO1xuICAgICAgd2luLmZvY3VzKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19