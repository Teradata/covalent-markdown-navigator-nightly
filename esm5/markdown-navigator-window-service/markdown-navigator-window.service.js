/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign } from "tslib";
import { Injectable, Inject, RendererFactory2 } from '@angular/core';
import { MarkdownNavigatorWindowComponent, } from '../markdown-navigator-window/markdown-navigator-window.component';
import { TdDialogService, ResizableDraggableDialog } from '@covalent/core/dialogs';
import { DOCUMENT } from '@angular/common';
/**
 * @record
 */
export function IMarkdownNavigatorWindowConfig() { }
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
var CDK_OVERLAY_CUSTOM_CLASS = 'td-draggable-markdown-navigator-window-wrapper';
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
var MarkdownNavigatorWindowService = /** @class */ (function () {
    function MarkdownNavigatorWindowService(_tdDialogService, _document, rendererFactory) {
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
    MarkdownNavigatorWindowService.prototype.open = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        this.close();
        /** @type {?} */
        var draggableConfig = __assign(__assign({}, DEFAULT_DRAGGABLE_DIALOG_CONFIG), config.dialogConfig);
        var _a = this._tdDialogService.openDraggable({
            component: MarkdownNavigatorWindowComponent,
            config: draggableConfig,
            dragHandleSelectors: ['.td-markdown-navigator-window-toolbar'],
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
    MarkdownNavigatorWindowService.prototype.close = /**
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
    /**
     * @private
     * @return {?}
     */
    MarkdownNavigatorWindowService.prototype._handleEvents = /**
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
    MarkdownNavigatorWindowService.prototype._getDialogSize = /**
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
    MarkdownNavigatorWindowService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MarkdownNavigatorWindowService.ctorParameters = function () { return [
        { type: TdDialogService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: RendererFactory2 }
    ]; };
    return MarkdownNavigatorWindowService;
}());
export { MarkdownNavigatorWindowService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MarkdownNavigatorWindowService.prototype._renderer2;
    /**
     * @type {?}
     * @private
     */
    MarkdownNavigatorWindowService.prototype.dragRef;
    /**
     * @type {?}
     * @private
     */
    MarkdownNavigatorWindowService.prototype.resizableDraggableDialog;
    /**
     * @type {?}
     * @private
     */
    MarkdownNavigatorWindowService.prototype.markdownNavigatorWindowDialog;
    /**
     * @type {?}
     * @private
     */
    MarkdownNavigatorWindowService.prototype.markdownNavigatorWindowDialogsOpen;
    /**
     * @type {?}
     * @private
     */
    MarkdownNavigatorWindowService.prototype._tdDialogService;
    /**
     * @type {?}
     * @private
     */
    MarkdownNavigatorWindowService.prototype._document;
    /**
     * @type {?}
     * @private
     */
    MarkdownNavigatorWindowService.prototype.rendererFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvdmFsZW50L21hcmtkb3duLW5hdmlnYXRvci8iLCJzb3VyY2VzIjpbIm1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctc2VydmljZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUdoRixPQUFPLEVBQ0wsZ0NBQWdDLEdBRWpDLE1BQU0sa0VBQWtFLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBa0Isd0JBQXdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFHM0Msb0RBT0M7OztJQU5DLCtDQUFnQzs7SUFDaEMsc0RBQStCOztJQUMvQixnREFBd0M7O0lBQ3hDLHNEQUE0Qjs7SUFDNUIsaURBQWlDOztJQUNqQyxxREFBNEM7OztJQUd4Qyx3QkFBd0IsR0FBVyxnREFBZ0Q7O0lBRW5GLGdCQUFnQixHQUFtQixFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTs7SUFDbEUsYUFBYSxHQUFXLE9BQU87O0lBQy9CLGNBQWMsR0FBVyxNQUFNOztJQUMvQixVQUFVLEdBQVcsTUFBTTs7SUFDM0IsU0FBUyxHQUFXLE9BQU87O0lBRTNCLCtCQUErQixHQUFvQjtJQUN2RCxXQUFXLEVBQUUsS0FBSztJQUNsQixpQkFBaUIsRUFBRSxJQUFJO0lBQ3ZCLFVBQVUsRUFBRSx3QkFBd0I7SUFDcEMsUUFBUSxFQUFFLGdCQUFnQjtJQUMxQixNQUFNLEVBQUUsY0FBYztJQUN0QixLQUFLLEVBQUUsYUFBYTtJQUNwQixRQUFRLEVBQUUsU0FBUztDQUNwQjs7OztBQUVELGdDQUdD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QjthQUMvQixXQUFXLEVBQUU7YUFDYixTQUFTLEVBQUU7YUFDWCxJQUFJOzs7UUFBQztZQUNKLEtBQUksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO1FBQzVDLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRU8sdURBQWM7Ozs7O0lBQXRCLFVBQXVCLFNBQXlEO1FBQ3hFLElBQUEsdUdBRUwsRUFGTyxnQkFBSyxFQUFFLGtCQUVkO1FBQ0QsT0FBTztZQUNMLEtBQUssT0FBQTtZQUNMLE1BQU0sUUFBQTtTQUNQLENBQUM7SUFDSixDQUFDOztnQkF6R0YsVUFBVTs7OztnQkFyQ0YsZUFBZTtnREErQ25CLE1BQU0sU0FBQyxRQUFRO2dCQXREUyxnQkFBZ0I7O0lBc0o3QyxxQ0FBQztDQUFBLEFBMUdELElBMEdDO1NBekdZLDhCQUE4Qjs7Ozs7O0lBQ3pDLG9EQUE4Qjs7Ozs7SUFDOUIsaURBQXlCOzs7OztJQUN6QixrRUFBMkQ7Ozs7O0lBQzNELHVFQUFrRzs7Ozs7SUFDbEcsNEVBQXVEOzs7OztJQUdyRCwwREFBeUM7Ozs7O0lBQ3pDLG1EQUF3Qzs7Ozs7SUFDeEMseURBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTWF0RGlhbG9nQ29uZmlnLCBEaWFsb2dQb3NpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBUaGVtZVBhbGV0dGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7XG4gIE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50LFxuICBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHMsXG59IGZyb20gJy4uL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGREaWFsb2dTZXJ2aWNlLCBJRHJhZ2dhYmxlUmVmcywgUmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUvZGlhbG9ncyc7XG5pbXBvcnQgeyBEcmFnUmVmLCBQb2ludCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AvZHJhZy1yZWYnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGggfSBmcm9tICcuLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb25maWcge1xuICBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuICBkaWFsb2dDb25maWc/OiBNYXREaWFsb2dDb25maWc7XG4gIGxhYmVscz86IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscztcbiAgdG9vbGJhckNvbG9yPzogVGhlbWVQYWxldHRlO1xuICBzdGFydEF0PzogSU1hcmtkb3duTmF2aWdhdG9ySXRlbTtcbiAgY29tcGFyZVdpdGg/OiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aDtcbn1cblxuY29uc3QgQ0RLX09WRVJMQVlfQ1VTVE9NX0NMQVNTOiBzdHJpbmcgPSAndGQtZHJhZ2dhYmxlLW1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctd3JhcHBlcic7XG5cbmNvbnN0IERFRkFVTFRfUE9TSVRJT046IERpYWxvZ1Bvc2l0aW9uID0geyBib3R0b206ICcwcHgnLCByaWdodDogJzBweCcgfTtcbmNvbnN0IERFRkFVTFRfV0lEVEg6IHN0cmluZyA9ICczNjBweCc7XG5jb25zdCBERUZBVUxUX0hFSUdIVDogc3RyaW5nID0gJzc1dmgnO1xuY29uc3QgTUlOX0hFSUdIVDogc3RyaW5nID0gJzU2cHgnO1xuY29uc3QgTUFYX1dJRFRIOiBzdHJpbmcgPSAnMTAwdncnO1xuXG5jb25zdCBERUZBVUxUX0RSQUdHQUJMRV9ESUFMT0dfQ09ORklHOiBNYXREaWFsb2dDb25maWcgPSB7XG4gIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgY2xvc2VPbk5hdmlnYXRpb246IHRydWUsXG4gIHBhbmVsQ2xhc3M6IENES19PVkVSTEFZX0NVU1RPTV9DTEFTUyxcbiAgcG9zaXRpb246IERFRkFVTFRfUE9TSVRJT04sXG4gIGhlaWdodDogREVGQVVMVF9IRUlHSFQsXG4gIHdpZHRoOiBERUZBVUxUX1dJRFRILFxuICBtYXhXaWR0aDogTUFYX1dJRFRILFxufTtcblxuaW50ZXJmYWNlIElEaWFsb2dEaW1lbnNpb25zIHtcbiAgd2lkdGg6IHN0cmluZztcbiAgaGVpZ2h0OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXJrZG93bk5hdmlnYXRvcldpbmRvd1NlcnZpY2Uge1xuICBwcml2YXRlIF9yZW5kZXJlcjI6IFJlbmRlcmVyMjtcbiAgcHJpdmF0ZSBkcmFnUmVmOiBEcmFnUmVmO1xuICBwcml2YXRlIHJlc2l6YWJsZURyYWdnYWJsZURpYWxvZzogUmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nO1xuICBwcml2YXRlIG1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nOiBNYXREaWFsb2dSZWY8TWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+ID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIG1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nc09wZW46IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfdGREaWFsb2dTZXJ2aWNlOiBUZERpYWxvZ1NlcnZpY2UsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgICBwcml2YXRlIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MixcbiAgKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIyID0gcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuKGNvbmZpZzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnKTogTWF0RGlhbG9nUmVmPE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50PiB7XG4gICAgdGhpcy5jbG9zZSgpO1xuXG4gICAgY29uc3QgZHJhZ2dhYmxlQ29uZmlnOiBNYXREaWFsb2dDb25maWcgPSB7XG4gICAgICAuLi5ERUZBVUxUX0RSQUdHQUJMRV9ESUFMT0dfQ09ORklHLFxuICAgICAgLi4uY29uZmlnLmRpYWxvZ0NvbmZpZyxcbiAgICB9O1xuICAgIGNvbnN0IHtcbiAgICAgIG1hdERpYWxvZ1JlZixcbiAgICAgIGRyYWdSZWZTdWJqZWN0LFxuICAgIH06IElEcmFnZ2FibGVSZWZzPE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50PiA9IHRoaXMuX3RkRGlhbG9nU2VydmljZS5vcGVuRHJhZ2dhYmxlKHtcbiAgICAgIGNvbXBvbmVudDogTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQsXG4gICAgICBjb25maWc6IGRyYWdnYWJsZUNvbmZpZyxcbiAgICAgIGRyYWdIYW5kbGVTZWxlY3RvcnM6IFsnLnRkLW1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctdG9vbGJhciddLFxuICAgICAgZHJhZ2dhYmxlQ2xhc3M6ICd0ZC1kcmFnZ2FibGUtbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdycsXG4gICAgfSk7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZyA9IG1hdERpYWxvZ1JlZjtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLml0ZW1zID0gY29uZmlnLml0ZW1zO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UubGFiZWxzID0gY29uZmlnLmxhYmVscztcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLnN0YXJ0QXQgPSBjb25maWcuc3RhcnRBdDtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbXBhcmVXaXRoID0gY29uZmlnLmNvbXBhcmVXaXRoO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UudG9vbGJhckNvbG9yID1cbiAgICAgICd0b29sYmFyQ29sb3InIGluIGNvbmZpZyA/IGNvbmZpZy50b29sYmFyQ29sb3IgOiAncHJpbWFyeSc7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuKys7XG4gICAgZHJhZ1JlZlN1YmplY3Quc3Vic2NyaWJlKChkcmFnUmY6IERyYWdSZWYpID0+IHtcbiAgICAgIHRoaXMuZHJhZ1JlZiA9IGRyYWdSZjtcbiAgICAgIHRoaXMucmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nID0gbmV3IFJlc2l6YWJsZURyYWdnYWJsZURpYWxvZyhcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQsXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyMixcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZyxcbiAgICAgICAgdGhpcy5kcmFnUmVmLFxuICAgICAgKTtcbiAgICB9KTtcbiAgICB0aGlzLl9oYW5kbGVFdmVudHMoKTtcbiAgICByZXR1cm4gdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZztcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZykge1xuICAgICAgaWYgKHRoaXMucmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nKSB7XG4gICAgICAgIHRoaXMucmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nLmRldGFjaCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nc09wZW4gPiAwO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlRXZlbnRzKCk6IHZvaWQge1xuICAgIGxldCBwb3NpdGlvbjogUG9pbnQ7XG4gICAgbGV0IGRpbWVuc2lvbnM6IElEaWFsb2dEaW1lbnNpb25zO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY2xvc2VkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuZG9ja1RvZ2dsZWQuc3Vic2NyaWJlKChkb2NrZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmIChkb2NrZWQpIHtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5kb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy51cGRhdGVTaXplKGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy51cGRhdGVQb3NpdGlvbih7IHRvcDogJzBweCcsIHJpZ2h0OiAnMHB4JywgYm90dG9tOiAnMHB4JywgbGVmdDogJzBweCcgfSk7XG4gICAgICAgIHRoaXMuZHJhZ1JlZi5zZXRGcmVlRHJhZ1Bvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5kcmFnUmVmLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nLmF0dGFjaCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGltZW5zaW9ucyA9IHRoaXMuX2dldERpYWxvZ1NpemUodGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZyk7XG4gICAgICAgIHBvc2l0aW9uID0gdGhpcy5kcmFnUmVmLmdldEZyZWVEcmFnUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5kb2NrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLnVwZGF0ZVNpemUoREVGQVVMVF9XSURUSCwgTUlOX0hFSUdIVCk7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cudXBkYXRlUG9zaXRpb24oREVGQVVMVF9QT1NJVElPTik7XG4gICAgICAgIHRoaXMuZHJhZ1JlZi5yZXNldCgpO1xuICAgICAgICB0aGlzLmRyYWdSZWYuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc2l6YWJsZURyYWdnYWJsZURpYWxvZy5kZXRhY2goKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nXG4gICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3Blbi0tO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXREaWFsb2dTaXplKGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50Pik6IElEaWFsb2dEaW1lbnNpb25zIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGdldENvbXB1dGVkU3R5bGUoXG4gICAgICAoPEhUTUxFbGVtZW50PnRoaXMuX2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRpYWxvZ1JlZi5pZCkpLnBhcmVudEVsZW1lbnQsXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgfTtcbiAgfVxufVxuIl19