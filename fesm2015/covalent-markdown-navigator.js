import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, ViewChild, HostListener, EventEmitter, Output, Injectable, Inject, RendererFactory2, Directive, NgModule } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { __awaiter } from 'tslib';
import { removeLeadingHash, isAnchorLink, TdMarkdownLoaderService } from '@covalent/markdown';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CovalentFlavoredMarkdownModule } from '@covalent/flavored-markdown';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ResizableDraggableDialog, TdDialogService, CovalentDialogsModule } from '@covalent/core/dialogs';

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
const DEFAULT_MARKDOWN_NAVIGATOR_LABELS = {
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
class TdMarkdownNavigatorComponent {
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
TdMarkdownNavigatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'td-markdown-navigator',
                template: "<ng-container *ngIf=\"!showEmptyState\">\n  <mat-progress-bar *ngIf=\"loading\" mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n\n  <ng-container *ngIf=\"showHeader\">\n    <div [style.display]=\"'flex'\">\n      <button\n        *ngIf=\"showHomeButton\"\n        mat-icon-button\n        [matTooltip]=\"goHomeLabel\"\n        (click)=\"reset()\"\n        [attr.data-test]=\"'home-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goHomeLabel\">\n          home\n        </mat-icon>\n      </button>\n\n      <button\n        *ngIf=\"showGoBackButton\"\n        mat-icon-button\n        [matTooltip]=\"goBackLabel\"\n        (click)=\"goBack()\"\n        [attr.data-test]=\"'back-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goBackLabel\">\n          arrow_back\n        </mat-icon>\n      </button>\n      <span flex *ngIf=\"currentItemTitle\" class=\"mat-body-2 title truncate\" [attr.data-test]=\"'title'\">\n        {{ currentItemTitle }}\n      </span>\n    </div>\n\n    <mat-divider [style.position]=\"'relative'\"></mat-divider>\n  </ng-container>\n\n  <div *ngIf=\"showMenu\" class=\"td-markdown-list\">\n    <mat-action-list>\n      <button\n        *ngFor=\"let item of currentMenuItems\"\n        (click)=\"handleItemSelected(item)\"\n        mat-list-item\n        [matTooltip]=\"getTitle(item)\"\n        matTooltipPosition=\"before\"\n        matTooltipShowDelay=\"500\"\n      >\n        <mat-icon matListIcon>\n          subject\n        </mat-icon>\n        <span matLine class=\"truncate\">\n          {{ getTitle(item) }}\n        </span>\n        <mat-divider></mat-divider>\n      </button>\n    </mat-action-list>\n  </div>\n\n  <div *ngIf=\"showTdMarkdownLoader || showTdMarkdown\" class=\"markdown-wrapper\" #markdownWrapper>\n    <td-flavored-markdown-loader\n      *ngIf=\"showTdMarkdownLoader\"\n      [url]=\"url\"\n      [httpOptions]=\"httpOptions\"\n      [anchor]=\"anchor\"\n    ></td-flavored-markdown-loader>\n\n    <td-flavored-markdown\n      *ngIf=\"showTdMarkdown\"\n      [content]=\"markdownString\"\n      [hostedUrl]=\"url\"\n      [anchor]=\"anchor\"\n    ></td-flavored-markdown>\n  </div>\n</ng-container>\n\n<div *ngIf=\"showEmptyState\" layout=\"column\" layout-align=\"center center\" class=\" empty-state\">\n  <mat-icon matListAvatar>subject</mat-icon>\n  <h2>{{ emptyStateLabel }}</h2>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{position:relative;height:100%;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host .markdown-wrapper,:host .td-markdown-list{min-height:1px;overflow-y:auto;-webkit-box-flex:1;-ms-flex:1;flex:1;box-sizing:border-box}:host .markdown-wrapper{padding:16px 16px 0}:host .td-markdown-list>.mat-list{padding-top:0}:host td-flavored-markdown-loader ::ng-deep .mat-progress-bar{top:0;left:0;right:0;position:absolute}:host .title{display:inline-block;vertical-align:middle;margin:8px 0;padding-left:16px}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.empty-state{padding:32px}.empty-state mat-icon{font-size:4em}"]
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
const DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS = {
    title: 'Help',
    close: 'Close',
    dock: 'Dock',
    unDock: 'Undock',
};
class TdMarkdownNavigatorWindowComponent {
    constructor() {
        this.toolbarColor = 'primary';
        this.toolbarHeight = 56;
        this.docked = false;
        this.closed = new EventEmitter();
        this.dockToggled = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get markdownNavigatorLabels() {
        if (this.labels) {
            const { goHome, goBack, emptyState } = this.labels;
            return {
                goHome,
                goBack,
                emptyState,
            };
        }
    }
    /**
     * @return {?}
     */
    get titleLabel() {
        return (this.labels && this.labels.title) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.title;
    }
    /**
     * @return {?}
     */
    get closeLabel() {
        return (this.labels && this.labels.close) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.close;
    }
    /**
     * @return {?}
     */
    get toggleDockedStateLabel() {
        if (this.docked) {
            return (this.labels && this.labels.unDock) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.unDock;
        }
        else {
            return (this.labels && this.labels.dock) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.dock;
        }
    }
    /**
     * @return {?}
     */
    toggleDockedState() {
        this.dockToggled.emit(this.docked);
    }
}
TdMarkdownNavigatorWindowComponent.decorators = [
    { type: Component, args: [{
                selector: 'td-markdown-navigator-window',
                template: "<mat-toolbar\n  [color]=\"toolbarColor\"\n  class=\"td-markdown-navigator-window-toolbar\"\n  [style.min-height.px]=\"toolbarHeight\"\n  [style.cursor]=\"docked ? 'inherit' : 'move'\"\n>\n  <mat-toolbar-row [style.height.px]=\"toolbarHeight\">\n    <div layout=\"row\" layout-align=\"start center\" flex>\n      <span class=\"mat-title td-markdown-navigator-window-title truncate\" flex>\n        {{ titleLabel }}\n      </span>\n      <!-- TODO: Resizing a drag-and-drop element was not working so removed docking/undocking for now-->\n      <!--\n      <button mat-icon-button [matTooltip]=\"toggleDockedStateLabel\" (click)=\"toggleDockedState()\">\n        <mat-icon [attr.aria-label]=\"toggleDockedStateLabel\">\n          {{ docked ? 'unfold_more' : 'unfold_less' }}\n        </mat-icon>\n      </button>\n      -->\n      <button\n        mat-icon-button\n        [matTooltip]=\"closeLabel\"\n        (click)=\"closed.emit()\"\n        class=\"td-markdown-navigator-window-close\"\n        [attr.data-test]=\"'close-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"closeLabel\">\n          close\n        </mat-icon>\n      </button>\n    </div>\n  </mat-toolbar-row>\n</mat-toolbar>\n\n<td-markdown-navigator\n  [items]=\"items\"\n  [labels]=\"markdownNavigatorLabels\"\n  [style.display]=\"docked ? 'none' : 'inherit'\"\n  [startAt]=\"startAt\"\n  [compareWith]=\"compareWith\"\n></td-markdown-navigator>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.td-markdown-navigator-window-title{margin-bottom:0}td-markdown-navigator{height:calc(100% - 56px)}.td-markdown-navigator-window-close{margin:0 -8px}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}::ng-deep .td-draggable-markdown-navigator-window-wrapper>.mat-dialog-container{padding:0}"]
            }] }
];
TdMarkdownNavigatorWindowComponent.propDecorators = {
    items: [{ type: Input }],
    labels: [{ type: Input }],
    toolbarColor: [{ type: Input }],
    startAt: [{ type: Input }],
    compareWith: [{ type: Input }],
    docked: [{ type: Input }],
    closed: [{ type: Output }],
    dockToggled: [{ type: Output }]
};
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
    TdMarkdownNavigatorWindowComponent.prototype.toolbarHeight;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.docked;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.closed;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.dockToggled;
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
}
/** @type {?} */
const CDK_OVERLAY_CUSTOM_CLASS = 'td-draggable-markdown-navigator-window-wrapper';
/** @type {?} */
const DEFAULT_POSITION = { bottom: '0px', right: '0px' };
/** @type {?} */
const DEFAULT_WIDTH = '360px';
/** @type {?} */
const DEFAULT_HEIGHT = '75vh';
/** @type {?} */
const MIN_HEIGHT = '56px';
/** @type {?} */
const MAX_WIDTH = '100vw';
/** @type {?} */
const DEFAULT_DRAGGABLE_DIALOG_CONFIG = {
    hasBackdrop: false,
    closeOnNavigation: true,
    panelClass: CDK_OVERLAY_CUSTOM_CLASS,
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
class TdMarkdownNavigatorWindowService {
    /**
     * @param {?} _tdDialogService
     * @param {?} _document
     * @param {?} rendererFactory
     */
    constructor(_tdDialogService, _document, rendererFactory) {
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
    open(config) {
        this.close();
        /** @type {?} */
        const draggableConfig = Object.assign(Object.assign({}, DEFAULT_DRAGGABLE_DIALOG_CONFIG), config.dialogConfig);
        const { matDialogRef, dragRefSubject, } = this._tdDialogService.openDraggable({
            component: TdMarkdownNavigatorWindowComponent,
            config: draggableConfig,
            dragHandleSelectors: ['.td-markdown-navigator-window-toolbar'],
            draggableClass: 'td-draggable-markdown-navigator-window',
        });
        this.markdownNavigatorWindowDialog = matDialogRef;
        this.markdownNavigatorWindowDialog.componentInstance.items = config.items;
        this.markdownNavigatorWindowDialog.componentInstance.labels = config.labels;
        this.markdownNavigatorWindowDialog.componentInstance.startAt = config.startAt;
        this.markdownNavigatorWindowDialog.componentInstance.compareWith = config.compareWith;
        this.markdownNavigatorWindowDialog.componentInstance.toolbarColor =
            'toolbarColor' in config ? config.toolbarColor : 'primary';
        this.markdownNavigatorWindowDialogsOpen++;
        dragRefSubject.subscribe((/**
         * @param {?} dragRf
         * @return {?}
         */
        (dragRf) => {
            this.dragRef = dragRf;
            this.resizableDraggableDialog = new ResizableDraggableDialog(this._document, this._renderer2, this.markdownNavigatorWindowDialog, this.dragRef);
        }));
        this._handleEvents();
        return this.markdownNavigatorWindowDialog;
    }
    /**
     * @return {?}
     */
    close() {
        if (this.markdownNavigatorWindowDialog) {
            if (this.resizableDraggableDialog) {
                this.resizableDraggableDialog.detach();
            }
            this.markdownNavigatorWindowDialog.close();
        }
    }
    /**
     * @return {?}
     */
    get isOpen() {
        return this.markdownNavigatorWindowDialogsOpen > 0;
    }
    /**
     * @private
     * @return {?}
     */
    _handleEvents() {
        /** @type {?} */
        let position;
        /** @type {?} */
        let dimensions;
        this.markdownNavigatorWindowDialog.componentInstance.closed.subscribe((/**
         * @return {?}
         */
        () => this.close()));
        this.markdownNavigatorWindowDialog.componentInstance.dockToggled.subscribe((/**
         * @param {?} docked
         * @return {?}
         */
        (docked) => {
            if (docked) {
                this.markdownNavigatorWindowDialog.componentInstance.docked = false;
                this.markdownNavigatorWindowDialog.updateSize(dimensions.width, dimensions.height);
                this.markdownNavigatorWindowDialog.updatePosition({ top: '0px', right: '0px', bottom: '0px', left: '0px' });
                this.dragRef.setFreeDragPosition(position);
                this.dragRef.disabled = false;
                this.resizableDraggableDialog.attach();
            }
            else {
                dimensions = this._getDialogSize(this.markdownNavigatorWindowDialog);
                position = this.dragRef.getFreeDragPosition();
                this.markdownNavigatorWindowDialog.componentInstance.docked = true;
                this.markdownNavigatorWindowDialog.updateSize(DEFAULT_WIDTH, MIN_HEIGHT);
                this.markdownNavigatorWindowDialog.updatePosition(DEFAULT_POSITION);
                this.dragRef.reset();
                this.dragRef.disabled = true;
                this.resizableDraggableDialog.detach();
            }
        }));
        this.markdownNavigatorWindowDialog
            .afterClosed()
            .toPromise()
            .then((/**
         * @return {?}
         */
        () => {
            this.markdownNavigatorWindowDialogsOpen--;
        }));
    }
    /**
     * @private
     * @param {?} dialogRef
     * @return {?}
     */
    _getDialogSize(dialogRef) {
        const { width, height } = getComputedStyle(((/** @type {?} */ (this._document.getElementById(dialogRef.id)))).parentElement);
        return {
            width,
            height,
        };
    }
}
TdMarkdownNavigatorWindowService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TdMarkdownNavigatorWindowService.ctorParameters = () => [
    { type: TdDialogService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: RendererFactory2 }
];
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
class TdMarkdownNavigatorWindowDirective {
    /**
     * @param {?} _markdownNavigatorWindowService
     */
    constructor(_markdownNavigatorWindowService) {
        this._markdownNavigatorWindowService = _markdownNavigatorWindowService;
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    click() {
        if (!this.disabled) {
            this._markdownNavigatorWindowService.open(this.config);
        }
    }
}
TdMarkdownNavigatorWindowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[tdMarkdownNavigatorWindow]',
            },] }
];
/** @nocollapse */
TdMarkdownNavigatorWindowDirective.ctorParameters = () => [
    { type: TdMarkdownNavigatorWindowService }
];
TdMarkdownNavigatorWindowDirective.propDecorators = {
    config: [{ type: Input, args: ['tdMarkdownNavigatorWindow',] }],
    disabled: [{ type: Input }],
    click: [{ type: HostListener, args: ['click',] }]
};
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
class CovalentMarkdownNavigatorModule {
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
                declarations: [TdMarkdownNavigatorComponent, TdMarkdownNavigatorWindowComponent, TdMarkdownNavigatorWindowDirective],
                exports: [TdMarkdownNavigatorComponent, TdMarkdownNavigatorWindowComponent, TdMarkdownNavigatorWindowDirective],
                providers: [TdMarkdownNavigatorWindowService],
            },] }
];

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
