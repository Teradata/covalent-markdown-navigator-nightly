import { EventEmitter, SecurityContext, Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, ViewChild, HostListener, Injectable, Inject, RendererFactory2, Directive, NgModule } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { __values, __spread, __awaiter, __generator, __assign } from 'tslib';
import { removeLeadingHash, isAnchorLink, TdMarkdownLoaderService } from '@covalent/markdown';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CovalentFlavoredMarkdownModule } from '@covalent/flavored-markdown';
import { ResizableDraggableDialog, TdDialogService, CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentMessageModule } from '@covalent/core/message';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IMarkdownNavigatorItem() { }
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
function IMarkdownNavigatorLabels() { }
if (false) {
    /** @type {?|undefined} */
    IMarkdownNavigatorLabels.prototype.goHome;
    /** @type {?|undefined} */
    IMarkdownNavigatorLabels.prototype.goBack;
    /** @type {?|undefined} */
    IMarkdownNavigatorLabels.prototype.emptyState;
}
/** @type {?} */
var DEFAULT_MARKDOWN_NAVIGATOR_LABELS = {
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
                    styles: [":host{position:relative;height:100%;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host .scroll-area{min-height:1px;overflow-y:auto;-webkit-box-flex:1;-ms-flex:1;flex:1;box-sizing:border-box}:host .markdown-wrapper{padding:16px 16px 0}:host .td-markdown-list>.mat-list{padding-top:0}:host td-flavored-markdown-loader ::ng-deep .mat-progress-bar{top:0;left:0;right:0;position:absolute}:host .title{display:inline-block;vertical-align:middle;margin:8px 0;padding-left:16px}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.empty-state{padding:32px}.empty-state mat-icon{font-size:4em}"]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IMarkdownNavigatorWindowLabels() { }
if (false) {
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowLabels.prototype.title;
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowLabels.prototype.close;
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowLabels.prototype.dock;
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowLabels.prototype.unDock;
}
/** @type {?} */
var DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS = {
    title: 'Help',
    close: 'Close',
    dock: 'Dock',
    unDock: 'Undock',
};
var TdMarkdownNavigatorWindowComponent = /** @class */ (function () {
    function TdMarkdownNavigatorWindowComponent() {
        this.toolbarColor = 'primary';
        this.docked = false;
        this.closed = new EventEmitter();
        this.dockToggled = new EventEmitter();
        this.buttonClicked = new EventEmitter();
    }
    Object.defineProperty(TdMarkdownNavigatorWindowComponent.prototype, "markdownNavigatorLabels", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.labels) {
                var _a = this.labels, goHome = _a.goHome, goBack = _a.goBack, emptyState = _a.emptyState;
                return {
                    goHome: goHome,
                    goBack: goBack,
                    emptyState: emptyState,
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorWindowComponent.prototype, "titleLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.labels && this.labels.title) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorWindowComponent.prototype, "closeLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.labels && this.labels.close) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.close;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorWindowComponent.prototype, "toggleDockedStateLabel", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.docked) {
                return (this.labels && this.labels.unDock) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.unDock;
            }
            else {
                return (this.labels && this.labels.dock) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.dock;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TdMarkdownNavigatorWindowComponent.prototype.toggleDockedState = /**
     * @return {?}
     */
    function () {
        this.dockToggled.emit(this.docked);
    };
    TdMarkdownNavigatorWindowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'td-markdown-navigator-window',
                    template: "<td-window-dialog\n  [toolbarColor]=\"toolbarColor\"\n  [docked]=\"docked\"\n  [title]=\"titleLabel\"\n  [toggleDockedStateLabel]=\"toggleDockedStateLabel\"\n  [closeLabel]=\"closeLabel\"\n  (dockToggled)=\"toggleDockedState()\"\n  (closed)=\"closed.emit()\"\n>\n  <td-markdown-navigator\n    [items]=\"items\"\n    [labels]=\"markdownNavigatorLabels\"\n    [style.display]=\"docked ? 'none' : 'inherit'\"\n    [startAt]=\"startAt\"\n    [compareWith]=\"compareWith\"\n    [footer]=\"footer\"\n    (buttonClicked)=\"buttonClicked.emit($event)\"\n  ></td-markdown-navigator>\n</td-window-dialog>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}td-markdown-navigator{height:calc(100% - 56px)}"]
                }] }
    ];
    TdMarkdownNavigatorWindowComponent.propDecorators = {
        items: [{ type: Input }],
        labels: [{ type: Input }],
        toolbarColor: [{ type: Input }],
        startAt: [{ type: Input }],
        compareWith: [{ type: Input }],
        docked: [{ type: Input }],
        footer: [{ type: Input }],
        closed: [{ type: Output }],
        dockToggled: [{ type: Output }],
        buttonClicked: [{ type: Output }]
    };
    return TdMarkdownNavigatorWindowComponent;
}());
if (false) {
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.items;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.labels;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.toolbarColor;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.startAt;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.compareWith;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.docked;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.footer;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.closed;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.dockToggled;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.buttonClicked;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IMarkdownNavigatorWindowConfig() { }
if (false) {
    /** @type {?} */
    IMarkdownNavigatorWindowConfig.prototype.items;
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowConfig.prototype.dialogConfig;
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowConfig.prototype.labels;
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowConfig.prototype.toolbarColor;
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowConfig.prototype.startAt;
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowConfig.prototype.compareWith;
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowConfig.prototype.footer;
}
/** @type {?} */
var CDK_OVERLAY_CUSTOM_CLASS = 'td-window-dialog';
/** @type {?} */
var DEFAULT_POSITION = { bottom: '0px', right: '0px' };
/** @type {?} */
var DEFAULT_WIDTH = '360px';
/** @type {?} */
var DEFAULT_HEIGHT = '75vh';
/** @type {?} */
var MIN_HEIGHT = '56px';
/** @type {?} */
var MAX_WIDTH = '100vw';
/** @type {?} */
var DEFAULT_DRAGGABLE_DIALOG_CONFIG = {
    hasBackdrop: false,
    closeOnNavigation: true,
    panelClass: [CDK_OVERLAY_CUSTOM_CLASS],
    position: DEFAULT_POSITION,
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
    maxWidth: MAX_WIDTH,
};
/**
 * @record
 */
function IDialogDimensions() { }
if (false) {
    /** @type {?} */
    IDialogDimensions.prototype.width;
    /** @type {?} */
    IDialogDimensions.prototype.height;
}
var TdMarkdownNavigatorWindowService = /** @class */ (function () {
    function TdMarkdownNavigatorWindowService(_tdDialogService, _document, rendererFactory) {
        this._tdDialogService = _tdDialogService;
        this._document = _document;
        this.rendererFactory = rendererFactory;
        this.markdownNavigatorWindowDialog = undefined;
        this.markdownNavigatorWindowDialogsOpen = 0;
        this._renderer2 = rendererFactory.createRenderer(undefined, undefined);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    TdMarkdownNavigatorWindowService.prototype.open = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        this.close();
        /** @type {?} */
        var panelClass = __spread(DEFAULT_DRAGGABLE_DIALOG_CONFIG.panelClass);
        if (config.dialogConfig && config.dialogConfig.panelClass) {
            if (Array.isArray(config.dialogConfig.panelClass)) {
                panelClass = __spread(config.dialogConfig.panelClass);
            }
            else {
                panelClass = [config.dialogConfig.panelClass];
            }
        }
        /** @type {?} */
        var draggableConfig = __assign(__assign(__assign({}, DEFAULT_DRAGGABLE_DIALOG_CONFIG), config.dialogConfig), { panelClass: panelClass });
        var _a = this._tdDialogService.openDraggable({
            component: TdMarkdownNavigatorWindowComponent,
            config: draggableConfig,
            dragHandleSelectors: ['.td-window-dialog-toolbar'],
            draggableClass: 'td-draggable-markdown-navigator-window',
        }), matDialogRef = _a.matDialogRef, dragRefSubject = _a.dragRefSubject;
        this.markdownNavigatorWindowDialog = matDialogRef;
        this.markdownNavigatorWindowDialog.componentInstance.items = config.items;
        this.markdownNavigatorWindowDialog.componentInstance.labels = config.labels;
        this.markdownNavigatorWindowDialog.componentInstance.startAt = config.startAt;
        this.markdownNavigatorWindowDialog.componentInstance.compareWith = config.compareWith;
        this.markdownNavigatorWindowDialog.componentInstance.toolbarColor =
            'toolbarColor' in config ? config.toolbarColor : 'primary';
        this.markdownNavigatorWindowDialogsOpen++;
        this.markdownNavigatorWindowDialog.componentInstance.footer = config.footer;
        dragRefSubject.subscribe((/**
         * @param {?} dragRf
         * @return {?}
         */
        function (dragRf) {
            _this.dragRef = dragRf;
            _this.resizableDraggableDialog = new ResizableDraggableDialog(_this._document, _this._renderer2, _this.markdownNavigatorWindowDialog, _this.dragRef);
        }));
        this._handleEvents();
        return this.markdownNavigatorWindowDialog;
    };
    /**
     * @return {?}
     */
    TdMarkdownNavigatorWindowService.prototype.close = /**
     * @return {?}
     */
    function () {
        if (this.markdownNavigatorWindowDialog) {
            if (this.resizableDraggableDialog) {
                this.resizableDraggableDialog.detach();
            }
            this.markdownNavigatorWindowDialog.close();
        }
    };
    Object.defineProperty(TdMarkdownNavigatorWindowService.prototype, "isOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this.markdownNavigatorWindowDialogsOpen > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    TdMarkdownNavigatorWindowService.prototype._handleEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var position;
        /** @type {?} */
        var dimensions;
        this.markdownNavigatorWindowDialog.componentInstance.closed.subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
        this.markdownNavigatorWindowDialog.componentInstance.dockToggled.subscribe((/**
         * @param {?} docked
         * @return {?}
         */
        function (docked) {
            if (docked) {
                _this.markdownNavigatorWindowDialog.componentInstance.docked = false;
                _this.markdownNavigatorWindowDialog.updateSize(dimensions.width, dimensions.height);
                _this.markdownNavigatorWindowDialog.updatePosition({ top: '0px', right: '0px', bottom: '0px', left: '0px' });
                _this.dragRef.setFreeDragPosition(position);
                _this.dragRef.disabled = false;
                _this.resizableDraggableDialog.attach();
            }
            else {
                dimensions = _this._getDialogSize(_this.markdownNavigatorWindowDialog);
                position = _this.dragRef.getFreeDragPosition();
                _this.markdownNavigatorWindowDialog.componentInstance.docked = true;
                _this.markdownNavigatorWindowDialog.updateSize(DEFAULT_WIDTH, MIN_HEIGHT);
                _this.markdownNavigatorWindowDialog.updatePosition(DEFAULT_POSITION);
                _this.dragRef.reset();
                _this.dragRef.disabled = true;
                _this.resizableDraggableDialog.detach();
            }
        }));
        this.markdownNavigatorWindowDialog
            .afterClosed()
            .toPromise()
            .then((/**
         * @return {?}
         */
        function () {
            _this.markdownNavigatorWindowDialogsOpen--;
        }));
    };
    /**
     * @private
     * @param {?} dialogRef
     * @return {?}
     */
    TdMarkdownNavigatorWindowService.prototype._getDialogSize = /**
     * @private
     * @param {?} dialogRef
     * @return {?}
     */
    function (dialogRef) {
        var _a = getComputedStyle(((/** @type {?} */ (this._document.getElementById(dialogRef.id)))).parentElement), width = _a.width, height = _a.height;
        return {
            width: width,
            height: height,
        };
    };
    TdMarkdownNavigatorWindowService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TdMarkdownNavigatorWindowService.ctorParameters = function () { return [
        { type: TdDialogService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: RendererFactory2 }
    ]; };
    return TdMarkdownNavigatorWindowService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    TdMarkdownNavigatorWindowService.prototype._renderer2;
    /**
     * @type {?}
     * @private
     */
    TdMarkdownNavigatorWindowService.prototype.dragRef;
    /**
     * @type {?}
     * @private
     */
    TdMarkdownNavigatorWindowService.prototype.resizableDraggableDialog;
    /**
     * @type {?}
     * @private
     */
    TdMarkdownNavigatorWindowService.prototype.markdownNavigatorWindowDialog;
    /**
     * @type {?}
     * @private
     */
    TdMarkdownNavigatorWindowService.prototype.markdownNavigatorWindowDialogsOpen;
    /**
     * @type {?}
     * @private
     */
    TdMarkdownNavigatorWindowService.prototype._tdDialogService;
    /**
     * @type {?}
     * @private
     */
    TdMarkdownNavigatorWindowService.prototype._document;
    /**
     * @type {?}
     * @private
     */
    TdMarkdownNavigatorWindowService.prototype.rendererFactory;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TdMarkdownNavigatorWindowDirective = /** @class */ (function () {
    function TdMarkdownNavigatorWindowDirective(_markdownNavigatorWindowService) {
        this._markdownNavigatorWindowService = _markdownNavigatorWindowService;
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    TdMarkdownNavigatorWindowDirective.prototype.click = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this._markdownNavigatorWindowService.open(this.config);
        }
    };
    TdMarkdownNavigatorWindowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[tdMarkdownNavigatorWindow]',
                },] }
    ];
    /** @nocollapse */
    TdMarkdownNavigatorWindowDirective.ctorParameters = function () { return [
        { type: TdMarkdownNavigatorWindowService }
    ]; };
    TdMarkdownNavigatorWindowDirective.propDecorators = {
        config: [{ type: Input, args: ['tdMarkdownNavigatorWindow',] }],
        disabled: [{ type: Input }],
        click: [{ type: HostListener, args: ['click',] }]
    };
    return TdMarkdownNavigatorWindowDirective;
}());
if (false) {
    /** @type {?} */
    TdMarkdownNavigatorWindowDirective.prototype.config;
    /** @type {?} */
    TdMarkdownNavigatorWindowDirective.prototype.disabled;
    /**
     * @type {?}
     * @private
     */
    TdMarkdownNavigatorWindowDirective.prototype._markdownNavigatorWindowService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CovalentMarkdownNavigatorModule = /** @class */ (function () {
    function CovalentMarkdownNavigatorModule() {
    }
    CovalentMarkdownNavigatorModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        // material
                        MatButtonModule,
                        MatTooltipModule,
                        MatListModule,
                        MatIconModule,
                        MatProgressBarModule,
                        CovalentMessageModule,
                        CovalentFlavoredMarkdownModule,
                        CovalentDialogsModule,
                    ],
                    declarations: [TdMarkdownNavigatorComponent, TdMarkdownNavigatorWindowComponent, TdMarkdownNavigatorWindowDirective],
                    exports: [TdMarkdownNavigatorComponent, TdMarkdownNavigatorWindowComponent, TdMarkdownNavigatorWindowDirective],
                    providers: [TdMarkdownNavigatorWindowService],
                },] }
    ];
    return CovalentMarkdownNavigatorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { CovalentMarkdownNavigatorModule, DEFAULT_MARKDOWN_NAVIGATOR_LABELS, DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS, TdMarkdownNavigatorComponent, TdMarkdownNavigatorWindowComponent, TdMarkdownNavigatorWindowService, TdMarkdownNavigatorWindowDirective as ɵa };
//# sourceMappingURL=covalent-markdown-navigator.js.map
