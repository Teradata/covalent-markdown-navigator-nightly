/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __read, __spread } from "tslib";
import { Injectable, Inject, RendererFactory2 } from '@angular/core';
import { TdMarkdownNavigatorWindowComponent, } from '../markdown-navigator-window/markdown-navigator-window.component';
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
export { TdMarkdownNavigatorWindowService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvdmFsZW50L21hcmtkb3duLW5hdmlnYXRvci8iLCJzb3VyY2VzIjpbIm1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctc2VydmljZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBbUIsTUFBTSxlQUFlLENBQUM7QUFHdEYsT0FBTyxFQUNMLGtDQUFrQyxHQUVuQyxNQUFNLGtFQUFrRSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQWtCLHdCQUF3QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbkcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBRzNDLG9EQVFDOzs7SUFQQywrQ0FBZ0M7O0lBQ2hDLHNEQUErQjs7SUFDL0IsZ0RBQXdDOztJQUN4QyxzREFBNEI7O0lBQzVCLGlEQUE0RDs7SUFDNUQscURBQTRDOztJQUM1QyxnREFBbUI7OztJQUdmLHdCQUF3QixHQUFXLGtCQUFrQjs7SUFFckQsZ0JBQWdCLEdBQW1CLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFOztJQUNsRSxhQUFhLEdBQVcsT0FBTzs7SUFDL0IsY0FBYyxHQUFXLE1BQU07O0lBQy9CLFVBQVUsR0FBVyxNQUFNOztJQUMzQixTQUFTLEdBQVcsT0FBTzs7SUFFM0IsK0JBQStCLEdBQW9CO0lBQ3ZELFdBQVcsRUFBRSxLQUFLO0lBQ2xCLGlCQUFpQixFQUFFLElBQUk7SUFDdkIsVUFBVSxFQUFFLENBQUMsd0JBQXdCLENBQUM7SUFDdEMsUUFBUSxFQUFFLGdCQUFnQjtJQUMxQixNQUFNLEVBQUUsY0FBYztJQUN0QixLQUFLLEVBQUUsYUFBYTtJQUNwQixRQUFRLEVBQUUs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QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXIyLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1hdERpYWxvZ0NvbmZpZywgRGlhbG9nUG9zaXRpb24gfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1xuICBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50LFxuICBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHMsXG59IGZyb20gJy4uL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGREaWFsb2dTZXJ2aWNlLCBJRHJhZ2dhYmxlUmVmcywgUmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUvZGlhbG9ncyc7XG5pbXBvcnQgeyBEcmFnUmVmLCBQb2ludCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AvZHJhZy1yZWYnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGggfSBmcm9tICcuLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb25maWcge1xuICBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuICBkaWFsb2dDb25maWc/OiBNYXREaWFsb2dDb25maWc7XG4gIGxhYmVscz86IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscztcbiAgdG9vbGJhckNvbG9yPzogVGhlbWVQYWxldHRlO1xuICBzdGFydEF0PzogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSB8IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcbiAgY29tcGFyZVdpdGg/OiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aDtcbiAgZm9vdGVyPzogVHlwZTxhbnk+O1xufVxuXG5jb25zdCBDREtfT1ZFUkxBWV9DVVNUT01fQ0xBU1M6IHN0cmluZyA9ICd0ZC13aW5kb3ctZGlhbG9nJztcblxuY29uc3QgREVGQVVMVF9QT1NJVElPTjogRGlhbG9nUG9zaXRpb24gPSB7IGJvdHRvbTogJzBweCcsIHJpZ2h0OiAnMHB4JyB9O1xuY29uc3QgREVGQVVMVF9XSURUSDogc3RyaW5nID0gJzM2MHB4JztcbmNvbnN0IERFRkFVTFRfSEVJR0hUOiBzdHJpbmcgPSAnNzV2aCc7XG5jb25zdCBNSU5fSEVJR0hUOiBzdHJpbmcgPSAnNTZweCc7XG5jb25zdCBNQVhfV0lEVEg6IHN0cmluZyA9ICcxMDB2dyc7XG5cbmNvbnN0IERFRkFVTFRfRFJBR0dBQkxFX0RJQUxPR19DT05GSUc6IE1hdERpYWxvZ0NvbmZpZyA9IHtcbiAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICBjbG9zZU9uTmF2aWdhdGlvbjogdHJ1ZSxcbiAgcGFuZWxDbGFzczogW0NES19PVkVSTEFZX0NVU1RPTV9DTEFTU10sXG4gIHBvc2l0aW9uOiBERUZBVUxUX1BPU0lUSU9OLFxuICBoZWlnaHQ6IERFRkFVTFRfSEVJR0hULFxuICB3aWR0aDogREVGQVVMVF9XSURUSCxcbiAgbWF4V2lkdGg6IE1BWF9XSURUSCxcbn07XG5cbmludGVyZmFjZSBJRGlhbG9nRGltZW5zaW9ucyB7XG4gIHdpZHRoOiBzdHJpbmc7XG4gIGhlaWdodDogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd1NlcnZpY2Uge1xuICBwcml2YXRlIF9yZW5kZXJlcjI6IFJlbmRlcmVyMjtcbiAgcHJpdmF0ZSBkcmFnUmVmOiBEcmFnUmVmO1xuICBwcml2YXRlIHJlc2l6YWJsZURyYWdnYWJsZURpYWxvZzogUmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nO1xuICBwcml2YXRlIG1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nOiBNYXREaWFsb2dSZWY8VGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudD4gPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgbWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3BlbjogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF90ZERpYWxvZ1NlcnZpY2U6IFRkRGlhbG9nU2VydmljZSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuICAgIHByaXZhdGUgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxuICApIHtcbiAgICB0aGlzLl9yZW5kZXJlcjIgPSByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIodW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuICB9XG5cbiAgcHVibGljIG9wZW4oY29uZmlnOiBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb25maWcpOiBNYXREaWFsb2dSZWY8VGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudD4ge1xuICAgIHRoaXMuY2xvc2UoKTtcblxuICAgIGxldCBwYW5lbENsYXNzOiBzdHJpbmdbXSA9IFsuLi5ERUZBVUxUX0RSQUdHQUJMRV9ESUFMT0dfQ09ORklHLnBhbmVsQ2xhc3NdO1xuICAgIGlmIChjb25maWcuZGlhbG9nQ29uZmlnICYmIGNvbmZpZy5kaWFsb2dDb25maWcucGFuZWxDbGFzcykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLmRpYWxvZ0NvbmZpZy5wYW5lbENsYXNzKSkge1xuICAgICAgICBwYW5lbENsYXNzID0gWy4uLmNvbmZpZy5kaWFsb2dDb25maWcucGFuZWxDbGFzc107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYW5lbENsYXNzID0gW2NvbmZpZy5kaWFsb2dDb25maWcucGFuZWxDbGFzc107XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGRyYWdnYWJsZUNvbmZpZzogTWF0RGlhbG9nQ29uZmlnID0ge1xuICAgICAgLi4uREVGQVVMVF9EUkFHR0FCTEVfRElBTE9HX0NPTkZJRyxcbiAgICAgIC4uLmNvbmZpZy5kaWFsb2dDb25maWcsXG4gICAgICBwYW5lbENsYXNzLFxuICAgIH07XG4gICAgY29uc3Qge1xuICAgICAgbWF0RGlhbG9nUmVmLFxuICAgICAgZHJhZ1JlZlN1YmplY3QsXG4gICAgfTogSURyYWdnYWJsZVJlZnM8VGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudD4gPSB0aGlzLl90ZERpYWxvZ1NlcnZpY2Uub3BlbkRyYWdnYWJsZSh7XG4gICAgICBjb21wb25lbnQ6IFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQsXG4gICAgICBjb25maWc6IGRyYWdnYWJsZUNvbmZpZyxcbiAgICAgIGRyYWdIYW5kbGVTZWxlY3RvcnM6IFsnLnRkLXdpbmRvdy1kaWFsb2ctdG9vbGJhciddLFxuICAgICAgZHJhZ2dhYmxlQ2xhc3M6ICd0ZC1kcmFnZ2FibGUtbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdycsXG4gICAgfSk7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZyA9IG1hdERpYWxvZ1JlZjtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLml0ZW1zID0gY29uZmlnLml0ZW1zO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UubGFiZWxzID0gY29uZmlnLmxhYmVscztcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLnN0YXJ0QXQgPSBjb25maWcuc3RhcnRBdDtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbXBhcmVXaXRoID0gY29uZmlnLmNvbXBhcmVXaXRoO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UudG9vbGJhckNvbG9yID1cbiAgICAgICd0b29sYmFyQ29sb3InIGluIGNvbmZpZyA/IGNvbmZpZy50b29sYmFyQ29sb3IgOiAncHJpbWFyeSc7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuKys7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5mb290ZXIgPSBjb25maWcuZm9vdGVyO1xuICAgIGRyYWdSZWZTdWJqZWN0LnN1YnNjcmliZSgoZHJhZ1JmOiBEcmFnUmVmKSA9PiB7XG4gICAgICB0aGlzLmRyYWdSZWYgPSBkcmFnUmY7XG4gICAgICB0aGlzLnJlc2l6YWJsZURyYWdnYWJsZURpYWxvZyA9IG5ldyBSZXNpemFibGVEcmFnZ2FibGVEaWFsb2coXG4gICAgICAgIHRoaXMuX2RvY3VtZW50LFxuICAgICAgICB0aGlzLl9yZW5kZXJlcjIsXG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2csXG4gICAgICAgIHRoaXMuZHJhZ1JlZixcbiAgICAgICk7XG4gICAgfSk7XG4gICAgdGhpcy5faGFuZGxlRXZlbnRzKCk7XG4gICAgcmV0dXJuIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2c7XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cpIHtcbiAgICAgIGlmICh0aGlzLnJlc2l6YWJsZURyYWdnYWJsZURpYWxvZykge1xuICAgICAgICB0aGlzLnJlc2l6YWJsZURyYWdnYWJsZURpYWxvZy5kZXRhY2goKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuID4gMDtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUV2ZW50cygpOiB2b2lkIHtcbiAgICBsZXQgcG9zaXRpb246IFBvaW50O1xuICAgIGxldCBkaW1lbnNpb25zOiBJRGlhbG9nRGltZW5zaW9ucztcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNsb3NlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmRvY2tUb2dnbGVkLnN1YnNjcmliZSgoZG9ja2VkOiBib29sZWFuKSA9PiB7XG4gICAgICBpZiAoZG9ja2VkKSB7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuZG9ja2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cudXBkYXRlU2l6ZShkaW1lbnNpb25zLndpZHRoLCBkaW1lbnNpb25zLmhlaWdodCk7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cudXBkYXRlUG9zaXRpb24oeyB0b3A6ICcwcHgnLCByaWdodDogJzBweCcsIGJvdHRvbTogJzBweCcsIGxlZnQ6ICcwcHgnIH0pO1xuICAgICAgICB0aGlzLmRyYWdSZWYuc2V0RnJlZURyYWdQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgIHRoaXMuZHJhZ1JlZi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlc2l6YWJsZURyYWdnYWJsZURpYWxvZy5hdHRhY2goKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpbWVuc2lvbnMgPSB0aGlzLl9nZXREaWFsb2dTaXplKHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cpO1xuICAgICAgICBwb3NpdGlvbiA9IHRoaXMuZHJhZ1JlZi5nZXRGcmVlRHJhZ1Bvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuZG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy51cGRhdGVTaXplKERFRkFVTFRfV0lEVEgsIE1JTl9IRUlHSFQpO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLnVwZGF0ZVBvc2l0aW9uKERFRkFVTFRfUE9TSVRJT04pO1xuICAgICAgICB0aGlzLmRyYWdSZWYucmVzZXQoKTtcbiAgICAgICAgdGhpcy5kcmFnUmVmLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cuZGV0YWNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ1xuICAgICAgLmFmdGVyQ2xvc2VkKClcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nc09wZW4tLTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0RGlhbG9nU2l6ZShkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50Pik6IElEaWFsb2dEaW1lbnNpb25zIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGdldENvbXB1dGVkU3R5bGUoXG4gICAgICAoPEhUTUxFbGVtZW50PnRoaXMuX2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRpYWxvZ1JlZi5pZCkpLnBhcmVudEVsZW1lbnQsXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgfTtcbiAgfVxufVxuIl19