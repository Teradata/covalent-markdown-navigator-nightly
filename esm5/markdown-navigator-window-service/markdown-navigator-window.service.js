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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvdmFsZW50L21hcmtkb3duLW5hdmlnYXRvci8iLCJzb3VyY2VzIjpbIm1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctc2VydmljZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUdoRixPQUFPLEVBQ0wsa0NBQWtDLEdBRW5DLE1BQU0sa0VBQWtFLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBa0Isd0JBQXdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFHM0Msb0RBT0M7OztJQU5DLCtDQUFnQzs7SUFDaEMsc0RBQStCOztJQUMvQixnREFBd0M7O0lBQ3hDLHNEQUE0Qjs7SUFDNUIsaURBQWlDOztJQUNqQyxxREFBNEM7OztJQUd4Qyx3QkFBd0IsR0FBVyxrQkFBa0I7O0lBRXJELGdCQUFnQixHQUFtQixFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTs7SUFDbEUsYUFBYSxHQUFXLE9BQU87O0lBQy9CLGNBQWMsR0FBVyxNQUFNOztJQUMvQixVQUFVLEdBQVcsTUFBTTs7SUFDM0IsU0FBUyxHQUFXLE9BQU87O0lBRTNCLCtCQUErQixHQUFvQjtJQUN2RCxXQUFXLEVBQUUsS0FBSztJQUNsQixpQkFBaUIsRUFBRSxJQUFJO0lBQ3ZCLFVBQVUsRUFBRSxDQUFDLHdCQUF3QixDQUFDO0lBQ3RDLFFBQVEsRUFBRSxnQkFBZ0I7SUFDMUIsTUFBTSxFQUFFLGNBQWM7SUFDdEIsS0FBSyxFQUFFLGFBQWE7SUFDcEIsUUFBUSxFQUFFLFNBQVM7Q0FDcEI7Ozs7QUFFRCxnQ0FHQzs7O0lBRkMsa0NBQWM7O0lBQ2QsbUNBQWU7O0FBR2pCO0lBUUUsMENBQ1UsZ0JBQWlDLEVBQ2YsU0FBYyxFQUNoQyxlQUFpQztRQUZqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2YsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFObkMsa0NBQTZCLEdBQXFELFNBQVMsQ0FBQztRQUM1Rix1Q0FBa0MsR0FBVyxDQUFDLENBQUM7UUFPckQsSUFBSSxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6RSxDQUFDOzs7OztJQUVNLCtDQUFJOzs7O0lBQVgsVUFBWSxNQUFzQztRQUFsRCxpQkE0Q0M7UUEzQ0MsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOztZQUVULFVBQVUsWUFBaUIsK0JBQStCLENBQUMsVUFBVSxDQUFDO1FBQzFFLElBQUksTUFBTSxDQUFDLFlBQVksSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRTtZQUN6RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDakQsVUFBVSxZQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbEQ7aUJBQU07Z0JBQ0wsVUFBVSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMvQztTQUNGOztZQUNLLGVBQWUsa0NBQ2hCLCtCQUErQixHQUMvQixNQUFNLENBQUMsWUFBWSxLQUN0QixVQUFVLFlBQUEsR0FDWDtRQUNLLElBQUE7Ozs7O1VBUUosRUFQQSw4QkFBWSxFQUNaLGtDQU1BO1FBQ0YsSUFBSSxDQUFDLDZCQUE2QixHQUFHLFlBQVksQ0FBQztRQUNsRCxJQUFJLENBQUMsNkJBQTZCLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUUsSUFBSSxDQUFDLDZCQUE2QixDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzVFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM5RSxJQUFJLENBQUMsNkJBQTZCLENBQUMsaUJBQWlCLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDdEYsSUFBSSxDQUFDLDZCQUE2QixDQUFDLGlCQUFpQixDQUFDLFlBQVk7WUFDL0QsY0FBYyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzdELElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO1FBQzFDLGNBQWMsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxNQUFlO1lBQ3ZDLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLHdCQUF3QixDQUMxRCxLQUFJLENBQUMsU0FBUyxFQUNkLEtBQUksQ0FBQyxVQUFVLEVBQ2YsS0FBSSxDQUFDLDZCQUE2QixFQUNsQyxLQUFJLENBQUMsT0FBTyxDQUNiLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQyw2QkFBNkIsQ0FBQztJQUM1QyxDQUFDOzs7O0lBRU0sZ0RBQUs7OztJQUFaO1FBQ0UsSUFBSSxJQUFJLENBQUMsNkJBQTZCLEVBQUU7WUFDdEMsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUN4QztZQUNELElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFRCxzQkFBVyxvREFBTTs7OztRQUFqQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGtDQUFrQyxHQUFHLENBQUMsQ0FBQztRQUNyRCxDQUFDOzs7T0FBQTs7Ozs7SUFFTyx3REFBYTs7OztJQUFyQjtRQUFBLGlCQTZCQzs7WUE1QkssUUFBZTs7WUFDZixVQUE2QjtRQUNqQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFNBQVM7OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsS0FBSyxFQUFFLEVBQVosQ0FBWSxFQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLDZCQUE2QixDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxNQUFlO1lBQ3pGLElBQUksTUFBTSxFQUFFO2dCQUNWLEtBQUksQ0FBQyw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwRSxLQUFJLENBQUMsNkJBQTZCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRixLQUFJLENBQUMsNkJBQTZCLENBQUMsY0FBYyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQzVHLEtBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzNDLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDOUIsS0FBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3hDO2lCQUFNO2dCQUNMLFVBQVUsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2dCQUNyRSxRQUFRLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUM5QyxLQUFJLENBQUMsNkJBQTZCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkUsS0FBSSxDQUFDLDZCQUE2QixDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3pFLEtBQUksQ0FBQyw2QkFBNkIsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDcEUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUM3QixLQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDeEM7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyw2QkFBNkI7YUFDL0IsV0FBVyxFQUFFO2FBQ2IsU0FBUyxFQUFFO2FBQ1gsSUFBSTs7O1FBQUM7WUFDSixLQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztRQUM1QyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVPLHlEQUFjOzs7OztJQUF0QixVQUF1QixTQUEyRDtRQUMxRSxJQUFBLHVHQUVMLEVBRk8sZ0JBQUssRUFBRSxrQkFFZDtRQUNELE9BQU87WUFDTCxLQUFLLE9BQUE7WUFDTCxNQUFNLFFBQUE7U0FDUCxDQUFDO0lBQ0osQ0FBQzs7Z0JBbEhGLFVBQVU7Ozs7Z0JBckNGLGVBQWU7Z0RBK0NuQixNQUFNLFNBQUMsUUFBUTtnQkF0RFMsZ0JBQWdCOztJQStKN0MsdUNBQUM7Q0FBQSxBQW5IRCxJQW1IQztTQWxIWSxnQ0FBZ0M7Ozs7OztJQUMzQyxzREFBOEI7Ozs7O0lBQzlCLG1EQUF5Qjs7Ozs7SUFDekIsb0VBQTJEOzs7OztJQUMzRCx5RUFBb0c7Ozs7O0lBQ3BHLDhFQUF1RDs7Ozs7SUFHckQsNERBQXlDOzs7OztJQUN6QyxxREFBd0M7Ozs7O0lBQ3hDLDJEQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1hdERpYWxvZ0NvbmZpZywgRGlhbG9nUG9zaXRpb24gfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1xuICBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50LFxuICBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHMsXG59IGZyb20gJy4uL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGREaWFsb2dTZXJ2aWNlLCBJRHJhZ2dhYmxlUmVmcywgUmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUvZGlhbG9ncyc7XG5pbXBvcnQgeyBEcmFnUmVmLCBQb2ludCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AvZHJhZy1yZWYnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGggfSBmcm9tICcuLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb25maWcge1xuICBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuICBkaWFsb2dDb25maWc/OiBNYXREaWFsb2dDb25maWc7XG4gIGxhYmVscz86IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscztcbiAgdG9vbGJhckNvbG9yPzogVGhlbWVQYWxldHRlO1xuICBzdGFydEF0PzogSU1hcmtkb3duTmF2aWdhdG9ySXRlbTtcbiAgY29tcGFyZVdpdGg/OiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aDtcbn1cblxuY29uc3QgQ0RLX09WRVJMQVlfQ1VTVE9NX0NMQVNTOiBzdHJpbmcgPSAndGQtd2luZG93LWRpYWxvZyc7XG5cbmNvbnN0IERFRkFVTFRfUE9TSVRJT046IERpYWxvZ1Bvc2l0aW9uID0geyBib3R0b206ICcwcHgnLCByaWdodDogJzBweCcgfTtcbmNvbnN0IERFRkFVTFRfV0lEVEg6IHN0cmluZyA9ICczNjBweCc7XG5jb25zdCBERUZBVUxUX0hFSUdIVDogc3RyaW5nID0gJzc1dmgnO1xuY29uc3QgTUlOX0hFSUdIVDogc3RyaW5nID0gJzU2cHgnO1xuY29uc3QgTUFYX1dJRFRIOiBzdHJpbmcgPSAnMTAwdncnO1xuXG5jb25zdCBERUZBVUxUX0RSQUdHQUJMRV9ESUFMT0dfQ09ORklHOiBNYXREaWFsb2dDb25maWcgPSB7XG4gIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgY2xvc2VPbk5hdmlnYXRpb246IHRydWUsXG4gIHBhbmVsQ2xhc3M6IFtDREtfT1ZFUkxBWV9DVVNUT01fQ0xBU1NdLFxuICBwb3NpdGlvbjogREVGQVVMVF9QT1NJVElPTixcbiAgaGVpZ2h0OiBERUZBVUxUX0hFSUdIVCxcbiAgd2lkdGg6IERFRkFVTFRfV0lEVEgsXG4gIG1heFdpZHRoOiBNQVhfV0lEVEgsXG59O1xuXG5pbnRlcmZhY2UgSURpYWxvZ0RpbWVuc2lvbnMge1xuICB3aWR0aDogc3RyaW5nO1xuICBoZWlnaHQ6IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfcmVuZGVyZXIyOiBSZW5kZXJlcjI7XG4gIHByaXZhdGUgZHJhZ1JlZjogRHJhZ1JlZjtcbiAgcHJpdmF0ZSByZXNpemFibGVEcmFnZ2FibGVEaWFsb2c6IFJlc2l6YWJsZURyYWdnYWJsZURpYWxvZztcbiAgcHJpdmF0ZSBtYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZzogTWF0RGlhbG9nUmVmPFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+ID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIG1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nc09wZW46IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfdGREaWFsb2dTZXJ2aWNlOiBUZERpYWxvZ1NlcnZpY2UsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgICBwcml2YXRlIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MixcbiAgKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIyID0gcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuKGNvbmZpZzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnKTogTWF0RGlhbG9nUmVmPFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+IHtcbiAgICB0aGlzLmNsb3NlKCk7XG5cbiAgICBsZXQgcGFuZWxDbGFzczogc3RyaW5nW10gPSBbLi4uREVGQVVMVF9EUkFHR0FCTEVfRElBTE9HX0NPTkZJRy5wYW5lbENsYXNzXTtcbiAgICBpZiAoY29uZmlnLmRpYWxvZ0NvbmZpZyAmJiBjb25maWcuZGlhbG9nQ29uZmlnLnBhbmVsQ2xhc3MpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZy5kaWFsb2dDb25maWcucGFuZWxDbGFzcykpIHtcbiAgICAgICAgcGFuZWxDbGFzcyA9IFsuLi5jb25maWcuZGlhbG9nQ29uZmlnLnBhbmVsQ2xhc3NdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFuZWxDbGFzcyA9IFtjb25maWcuZGlhbG9nQ29uZmlnLnBhbmVsQ2xhc3NdO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBkcmFnZ2FibGVDb25maWc6IE1hdERpYWxvZ0NvbmZpZyA9IHtcbiAgICAgIC4uLkRFRkFVTFRfRFJBR0dBQkxFX0RJQUxPR19DT05GSUcsXG4gICAgICAuLi5jb25maWcuZGlhbG9nQ29uZmlnLFxuICAgICAgcGFuZWxDbGFzcyxcbiAgICB9O1xuICAgIGNvbnN0IHtcbiAgICAgIG1hdERpYWxvZ1JlZixcbiAgICAgIGRyYWdSZWZTdWJqZWN0LFxuICAgIH06IElEcmFnZ2FibGVSZWZzPFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+ID0gdGhpcy5fdGREaWFsb2dTZXJ2aWNlLm9wZW5EcmFnZ2FibGUoe1xuICAgICAgY29tcG9uZW50OiBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50LFxuICAgICAgY29uZmlnOiBkcmFnZ2FibGVDb25maWcsXG4gICAgICBkcmFnSGFuZGxlU2VsZWN0b3JzOiBbJy50ZC13aW5kb3ctZGlhbG9nLXRvb2xiYXInXSxcbiAgICAgIGRyYWdnYWJsZUNsYXNzOiAndGQtZHJhZ2dhYmxlLW1hcmtkb3duLW5hdmlnYXRvci13aW5kb3cnLFxuICAgIH0pO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cgPSBtYXREaWFsb2dSZWY7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5pdGVtcyA9IGNvbmZpZy5pdGVtcztcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmxhYmVscyA9IGNvbmZpZy5sYWJlbHM7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5zdGFydEF0ID0gY29uZmlnLnN0YXJ0QXQ7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb21wYXJlV2l0aCA9IGNvbmZpZy5jb21wYXJlV2l0aDtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLnRvb2xiYXJDb2xvciA9XG4gICAgICAndG9vbGJhckNvbG9yJyBpbiBjb25maWcgPyBjb25maWcudG9vbGJhckNvbG9yIDogJ3ByaW1hcnknO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3BlbisrO1xuICAgIGRyYWdSZWZTdWJqZWN0LnN1YnNjcmliZSgoZHJhZ1JmOiBEcmFnUmVmKSA9PiB7XG4gICAgICB0aGlzLmRyYWdSZWYgPSBkcmFnUmY7XG4gICAgICB0aGlzLnJlc2l6YWJsZURyYWdnYWJsZURpYWxvZyA9IG5ldyBSZXNpemFibGVEcmFnZ2FibGVEaWFsb2coXG4gICAgICAgIHRoaXMuX2RvY3VtZW50LFxuICAgICAgICB0aGlzLl9yZW5kZXJlcjIsXG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2csXG4gICAgICAgIHRoaXMuZHJhZ1JlZixcbiAgICAgICk7XG4gICAgfSk7XG4gICAgdGhpcy5faGFuZGxlRXZlbnRzKCk7XG4gICAgcmV0dXJuIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2c7XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cpIHtcbiAgICAgIGlmICh0aGlzLnJlc2l6YWJsZURyYWdnYWJsZURpYWxvZykge1xuICAgICAgICB0aGlzLnJlc2l6YWJsZURyYWdnYWJsZURpYWxvZy5kZXRhY2goKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuID4gMDtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUV2ZW50cygpOiB2b2lkIHtcbiAgICBsZXQgcG9zaXRpb246IFBvaW50O1xuICAgIGxldCBkaW1lbnNpb25zOiBJRGlhbG9nRGltZW5zaW9ucztcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNsb3NlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmRvY2tUb2dnbGVkLnN1YnNjcmliZSgoZG9ja2VkOiBib29sZWFuKSA9PiB7XG4gICAgICBpZiAoZG9ja2VkKSB7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuZG9ja2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cudXBkYXRlU2l6ZShkaW1lbnNpb25zLndpZHRoLCBkaW1lbnNpb25zLmhlaWdodCk7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cudXBkYXRlUG9zaXRpb24oeyB0b3A6ICcwcHgnLCByaWdodDogJzBweCcsIGJvdHRvbTogJzBweCcsIGxlZnQ6ICcwcHgnIH0pO1xuICAgICAgICB0aGlzLmRyYWdSZWYuc2V0RnJlZURyYWdQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgIHRoaXMuZHJhZ1JlZi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlc2l6YWJsZURyYWdnYWJsZURpYWxvZy5hdHRhY2goKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpbWVuc2lvbnMgPSB0aGlzLl9nZXREaWFsb2dTaXplKHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cpO1xuICAgICAgICBwb3NpdGlvbiA9IHRoaXMuZHJhZ1JlZi5nZXRGcmVlRHJhZ1Bvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuZG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy51cGRhdGVTaXplKERFRkFVTFRfV0lEVEgsIE1JTl9IRUlHSFQpO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLnVwZGF0ZVBvc2l0aW9uKERFRkFVTFRfUE9TSVRJT04pO1xuICAgICAgICB0aGlzLmRyYWdSZWYucmVzZXQoKTtcbiAgICAgICAgdGhpcy5kcmFnUmVmLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cuZGV0YWNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ1xuICAgICAgLmFmdGVyQ2xvc2VkKClcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nc09wZW4tLTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0RGlhbG9nU2l6ZShkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50Pik6IElEaWFsb2dEaW1lbnNpb25zIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGdldENvbXB1dGVkU3R5bGUoXG4gICAgICAoPEhUTUxFbGVtZW50PnRoaXMuX2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRpYWxvZ1JlZi5pZCkpLnBhcmVudEVsZW1lbnQsXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgfTtcbiAgfVxufVxuIl19