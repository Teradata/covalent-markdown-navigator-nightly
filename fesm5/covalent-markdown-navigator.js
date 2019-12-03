import { Component, Input, ViewChild, HostListener, EventEmitter, Output, Injectable, Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { __spread, __awaiter, __generator, __assign } from 'tslib';
import { removeLeadingHash, isAnchorLink, MarkdownLoaderService } from '@covalent/markdown';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CovalentFlavoredMarkdownModule } from '@covalent/flavored-markdown';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TdDialogService, CovalentDialogsModule } from '@covalent/core/dialogs';

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
}
/** @type {?} */
var DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS = {
    title: 'Help',
    close: 'Close',
};
var MarkdownNavigatorWindowComponent = /** @class */ (function () {
    function MarkdownNavigatorWindowComponent() {
        this.toolbarColor = 'primary';
        this.toolbarHeight = 56;
        this.closed = new EventEmitter();
    }
    Object.defineProperty(MarkdownNavigatorWindowComponent.prototype, "markdownNavigatorLabels", {
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
    Object.defineProperty(MarkdownNavigatorWindowComponent.prototype, "titleLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.labels && this.labels.title) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownNavigatorWindowComponent.prototype, "closeLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.labels && this.labels.close) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.close;
        },
        enumerable: true,
        configurable: true
    });
    MarkdownNavigatorWindowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'td-markdown-navigator-window',
                    template: "<mat-toolbar [color]=\"toolbarColor\" class=\"td-markdown-navigator-window-toolbar\" [style.min-height.px]=\"toolbarHeight\">\n  <mat-toolbar-row [style.height.px]=\"toolbarHeight\" [style.padding-right.px]=\"0\">\n    <div layout=\"row\" layout-align=\"start center\" flex>\n      <span class=\"mat-title td-markdown-navigator-window-title\" flex>\n        {{ titleLabel }}\n      </span>\n      <!-- TODO: Resizing a drag-and-drop element was not working so removed minimize/maximize for now-->\n      <button\n        mat-icon-button\n        [matTooltip]=\"closeLabel\"\n        (click)=\"closed.emit()\"\n        class=\"td-markdown-navigator-window-close\"\n      >\n        <mat-icon [attr.aria-label]=\"closeLabel\">\n          close\n        </mat-icon>\n      </button>\n    </div>\n  </mat-toolbar-row>\n</mat-toolbar>\n\n<td-markdown-navigator [items]=\"items\" [labels]=\"markdownNavigatorLabels\"></td-markdown-navigator>\n",
                    styles: [":host{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host.td-draggable-markdown-navigator-window .td-markdown-navigator-window-toolbar{cursor:move}.td-markdown-navigator-window-title{margin-bottom:0}::ng-deep .td-draggable-markdown-navigator-window-wrapper>.mat-dialog-container{padding:0}"]
                }] }
    ];
    MarkdownNavigatorWindowComponent.propDecorators = {
        items: [{ type: Input }],
        labels: [{ type: Input }],
        toolbarColor: [{ type: Input }],
        closed: [{ type: Output }]
    };
    return MarkdownNavigatorWindowComponent;
}());
if (false) {
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.items;
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.labels;
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.toolbarColor;
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.toolbarHeight;
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.closed;
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
}
/** @type {?} */
var CDK_OVERLAY_CUSTOM_CLASS = 'td-draggable-markdown-navigator-window-wrapper';
/** @type {?} */
var DEFAULT_DRAGGABLE_DIALOG_CONFIG = {
    hasBackdrop: false,
    closeOnNavigation: true,
    panelClass: CDK_OVERLAY_CUSTOM_CLASS,
    position: { bottom: '0px', right: '0px' },
    height: '475px',
    width: '360px',
};
var MarkdownNavigatorWindowService = /** @class */ (function () {
    function MarkdownNavigatorWindowService(_tdDialogService) {
        this._tdDialogService = _tdDialogService;
        this.markdownNavigatorWindowDialog = undefined;
        this.markdownNavigatorWindowDialogsOpen = 0;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    MarkdownNavigatorWindowService.prototype.open = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        this.close();
        this.markdownNavigatorWindowDialog = this._tdDialogService.openDraggable({
            component: MarkdownNavigatorWindowComponent,
            config: __assign(__assign({}, DEFAULT_DRAGGABLE_DIALOG_CONFIG), config.dialogConfig),
            dragHandleSelectors: ['.td-markdown-navigator-window-toolbar'],
            draggableClass: 'td-draggable-markdown-navigator-window',
        });
        this.markdownNavigatorWindowDialogsOpen++;
        this.markdownNavigatorWindowDialog.componentInstance.items = config.items;
        this.markdownNavigatorWindowDialog.componentInstance.labels = config.labels;
        this.markdownNavigatorWindowDialog.componentInstance.toolbarColor =
            'toolbarColor' in config ? config.toolbarColor : 'primary';
        this.markdownNavigatorWindowDialog.componentInstance.closed.subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
        this.markdownNavigatorWindowDialog
            .afterClosed()
            .toPromise()
            .then((/**
         * @return {?}
         */
        function () {
            _this.markdownNavigatorWindowDialogsOpen--;
        }));
        return this.markdownNavigatorWindowDialog;
    };
    /**
     * @return {?}
     */
    MarkdownNavigatorWindowService.prototype.close = /**
     * @return {?}
     */
    function () {
        if (this.markdownNavigatorWindowDialog) {
            this.markdownNavigatorWindowDialog.close();
        }
    };
    Object.defineProperty(MarkdownNavigatorWindowService.prototype, "isOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this.markdownNavigatorWindowDialogsOpen > 0;
        },
        enumerable: true,
        configurable: true
    });
    MarkdownNavigatorWindowService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MarkdownNavigatorWindowService.ctorParameters = function () { return [
        { type: TdDialogService }
    ]; };
    return MarkdownNavigatorWindowService;
}());
if (false) {
    /** @type {?} */
    MarkdownNavigatorWindowService.prototype.markdownNavigatorWindowDialog;
    /** @type {?} */
    MarkdownNavigatorWindowService.prototype.markdownNavigatorWindowDialogsOpen;
    /**
     * @type {?}
     * @private
     */
    MarkdownNavigatorWindowService.prototype._tdDialogService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MarkdownNavigatorWindowDirective = /** @class */ (function () {
    function MarkdownNavigatorWindowDirective(_markdownNavigatorWindowService) {
        this._markdownNavigatorWindowService = _markdownNavigatorWindowService;
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    MarkdownNavigatorWindowDirective.prototype.click = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this._markdownNavigatorWindowService.open(this.config);
        }
    };
    MarkdownNavigatorWindowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[tdMarkdownNavigatorWindow]',
                },] }
    ];
    /** @nocollapse */
    MarkdownNavigatorWindowDirective.ctorParameters = function () { return [
        { type: MarkdownNavigatorWindowService }
    ]; };
    MarkdownNavigatorWindowDirective.propDecorators = {
        config: [{ type: Input, args: ['tdMarkdownNavigatorWindow',] }],
        disabled: [{ type: Input }],
        click: [{ type: HostListener, args: ['click',] }]
    };
    return MarkdownNavigatorWindowDirective;
}());
if (false) {
    /** @type {?} */
    MarkdownNavigatorWindowDirective.prototype.config;
    /** @type {?} */
    MarkdownNavigatorWindowDirective.prototype.disabled;
    /**
     * @type {?}
     * @private
     */
    MarkdownNavigatorWindowDirective.prototype._markdownNavigatorWindowService;
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
                        MatToolbarModule,
                        CovalentFlavoredMarkdownModule,
                        CovalentDialogsModule,
                    ],
                    declarations: [MarkdownNavigatorComponent, MarkdownNavigatorWindowComponent, MarkdownNavigatorWindowDirective],
                    exports: [MarkdownNavigatorComponent, MarkdownNavigatorWindowComponent, MarkdownNavigatorWindowDirective],
                    entryComponents: [MarkdownNavigatorWindowComponent],
                    providers: [MarkdownNavigatorWindowService],
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

export { CovalentMarkdownNavigatorModule, DEFAULT_MARKDOWN_NAVIGATOR_LABELS, DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS, MarkdownNavigatorComponent, MarkdownNavigatorWindowComponent, MarkdownNavigatorWindowService, MarkdownNavigatorWindowDirective as ɵa };
//# sourceMappingURL=covalent-markdown-navigator.js.map
