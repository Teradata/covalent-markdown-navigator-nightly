/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const CDK_OVERLAY_CUSTOM_CLASS = 'td-window-dialog';
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
export class TdMarkdownNavigatorWindowService {
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
        let panelClass = [...DEFAULT_DRAGGABLE_DIALOG_CONFIG.panelClass];
        if (config.dialogConfig && config.dialogConfig.panelClass) {
            if (Array.isArray(config.dialogConfig.panelClass)) {
                panelClass = [...config.dialogConfig.panelClass];
            }
            else {
                panelClass = [config.dialogConfig.panelClass];
            }
        }
        /** @type {?} */
        const draggableConfig = Object.assign(Object.assign(Object.assign({}, DEFAULT_DRAGGABLE_DIALOG_CONFIG), config.dialogConfig), { panelClass });
        const { matDialogRef, dragRefSubject, } = this._tdDialogService.openDraggable({
            component: TdMarkdownNavigatorWindowComponent,
            config: draggableConfig,
            dragHandleSelectors: ['.td-window-dialog-toolbar'],
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
        this.markdownNavigatorWindowDialog.componentInstance.footer = config.footer;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvdmFsZW50L21hcmtkb3duLW5hdmlnYXRvci8iLCJzb3VyY2VzIjpbIm1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctc2VydmljZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFtQixNQUFNLGVBQWUsQ0FBQztBQUd0RixPQUFPLEVBQ0wsa0NBQWtDLEdBRW5DLE1BQU0sa0VBQWtFLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBa0Isd0JBQXdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFHM0Msb0RBUUM7OztJQVBDLCtDQUFnQzs7SUFDaEMsc0RBQStCOztJQUMvQixnREFBd0M7O0lBQ3hDLHNEQUE0Qjs7SUFDNUIsaURBQWlDOztJQUNqQyxxREFBNEM7O0lBQzVDLGdEQUFtQjs7O01BR2Ysd0JBQXdCLEdBQVcsa0JBQWtCOztNQUVyRCxnQkFBZ0IsR0FBbUIsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7O01BQ2xFLGFBQWEsR0FBVyxPQUFPOztNQUMvQixjQUFjLEdBQVcsTUFBTTs7TUFDL0IsVUFBVSxHQUFXLE1BQU07O01BQzNCLFNBQVMsR0FBVyxPQUFPOztNQUUzQiwrQkFBK0IsR0FBb0I7SUFDdkQsV0FBVyxFQUFFLEtBQUs7SUFDbEIsaUJBQWlCLEVBQUUsSUFBSTtJQUN2QixVQUFVLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztJQUN0QyxRQUFRLEVBQUUsZ0JBQWdCO0lBQzFCLE1BQU0sRUFBRSxjQUFjO0lBQ3RCLEtBQUssRUFBRSxhQUFhO0lBQ3BCLFFBQVEsRUFBRSxT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QU0sU0FBQyxRQUFRO1lBdkRTLGdCQUFnQjs7Ozs7OztJQStDM0Msc0RBQThCOzs7OztJQUM5QixtREFBeUI7Ozs7O0lBQ3pCLG9FQUEyRDs7Ozs7SUFDM0QseUVBQW9HOzs7OztJQUNwRyw4RUFBdUQ7Ozs7O0lBR3JELDREQUF5Qzs7Ozs7SUFDekMscURBQXdDOzs7OztJQUN4QywyREFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyMiwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNYXREaWFsb2dDb25maWcsIERpYWxvZ1Bvc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtcbiAgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCxcbiAgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzLFxufSBmcm9tICcuLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93L21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuY29tcG9uZW50JztcbmltcG9ydCB7IFRkRGlhbG9nU2VydmljZSwgSURyYWdnYWJsZVJlZnMsIFJlc2l6YWJsZURyYWdnYWJsZURpYWxvZyB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlL2RpYWxvZ3MnO1xuaW1wb3J0IHsgRHJhZ1JlZiwgUG9pbnQgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wL2RyYWctcmVmJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IElNYXJrZG93bk5hdmlnYXRvckl0ZW0sIElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoIH0gZnJvbSAnLi4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnIHtcbiAgaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcbiAgZGlhbG9nQ29uZmlnPzogTWF0RGlhbG9nQ29uZmlnO1xuICBsYWJlbHM/OiBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHM7XG4gIHRvb2xiYXJDb2xvcj86IFRoZW1lUGFsZXR0ZTtcbiAgc3RhcnRBdD86IElNYXJrZG93bk5hdmlnYXRvckl0ZW07XG4gIGNvbXBhcmVXaXRoPzogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGg7XG4gIGZvb3Rlcj86IFR5cGU8YW55Pjtcbn1cblxuY29uc3QgQ0RLX09WRVJMQVlfQ1VTVE9NX0NMQVNTOiBzdHJpbmcgPSAndGQtd2luZG93LWRpYWxvZyc7XG5cbmNvbnN0IERFRkFVTFRfUE9TSVRJT046IERpYWxvZ1Bvc2l0aW9uID0geyBib3R0b206ICcwcHgnLCByaWdodDogJzBweCcgfTtcbmNvbnN0IERFRkFVTFRfV0lEVEg6IHN0cmluZyA9ICczNjBweCc7XG5jb25zdCBERUZBVUxUX0hFSUdIVDogc3RyaW5nID0gJzc1dmgnO1xuY29uc3QgTUlOX0hFSUdIVDogc3RyaW5nID0gJzU2cHgnO1xuY29uc3QgTUFYX1dJRFRIOiBzdHJpbmcgPSAnMTAwdncnO1xuXG5jb25zdCBERUZBVUxUX0RSQUdHQUJMRV9ESUFMT0dfQ09ORklHOiBNYXREaWFsb2dDb25maWcgPSB7XG4gIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgY2xvc2VPbk5hdmlnYXRpb246IHRydWUsXG4gIHBhbmVsQ2xhc3M6IFtDREtfT1ZFUkxBWV9DVVNUT01fQ0xBU1NdLFxuICBwb3NpdGlvbjogREVGQVVMVF9QT1NJVElPTixcbiAgaGVpZ2h0OiBERUZBVUxUX0hFSUdIVCxcbiAgd2lkdGg6IERFRkFVTFRfV0lEVEgsXG4gIG1heFdpZHRoOiBNQVhfV0lEVEgsXG59O1xuXG5pbnRlcmZhY2UgSURpYWxvZ0RpbWVuc2lvbnMge1xuICB3aWR0aDogc3RyaW5nO1xuICBoZWlnaHQ6IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfcmVuZGVyZXIyOiBSZW5kZXJlcjI7XG4gIHByaXZhdGUgZHJhZ1JlZjogRHJhZ1JlZjtcbiAgcHJpdmF0ZSByZXNpemFibGVEcmFnZ2FibGVEaWFsb2c6IFJlc2l6YWJsZURyYWdnYWJsZURpYWxvZztcbiAgcHJpdmF0ZSBtYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZzogTWF0RGlhbG9nUmVmPFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+ID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIG1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nc09wZW46IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfdGREaWFsb2dTZXJ2aWNlOiBUZERpYWxvZ1NlcnZpY2UsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgICBwcml2YXRlIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MixcbiAgKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIyID0gcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuKGNvbmZpZzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnKTogTWF0RGlhbG9nUmVmPFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+IHtcbiAgICB0aGlzLmNsb3NlKCk7XG5cbiAgICBsZXQgcGFuZWxDbGFzczogc3RyaW5nW10gPSBbLi4uREVGQVVMVF9EUkFHR0FCTEVfRElBTE9HX0NPTkZJRy5wYW5lbENsYXNzXTtcbiAgICBpZiAoY29uZmlnLmRpYWxvZ0NvbmZpZyAmJiBjb25maWcuZGlhbG9nQ29uZmlnLnBhbmVsQ2xhc3MpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZy5kaWFsb2dDb25maWcucGFuZWxDbGFzcykpIHtcbiAgICAgICAgcGFuZWxDbGFzcyA9IFsuLi5jb25maWcuZGlhbG9nQ29uZmlnLnBhbmVsQ2xhc3NdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFuZWxDbGFzcyA9IFtjb25maWcuZGlhbG9nQ29uZmlnLnBhbmVsQ2xhc3NdO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBkcmFnZ2FibGVDb25maWc6IE1hdERpYWxvZ0NvbmZpZyA9IHtcbiAgICAgIC4uLkRFRkFVTFRfRFJBR0dBQkxFX0RJQUxPR19DT05GSUcsXG4gICAgICAuLi5jb25maWcuZGlhbG9nQ29uZmlnLFxuICAgICAgcGFuZWxDbGFzcyxcbiAgICB9O1xuICAgIGNvbnN0IHtcbiAgICAgIG1hdERpYWxvZ1JlZixcbiAgICAgIGRyYWdSZWZTdWJqZWN0LFxuICAgIH06IElEcmFnZ2FibGVSZWZzPFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+ID0gdGhpcy5fdGREaWFsb2dTZXJ2aWNlLm9wZW5EcmFnZ2FibGUoe1xuICAgICAgY29tcG9uZW50OiBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50LFxuICAgICAgY29uZmlnOiBkcmFnZ2FibGVDb25maWcsXG4gICAgICBkcmFnSGFuZGxlU2VsZWN0b3JzOiBbJy50ZC13aW5kb3ctZGlhbG9nLXRvb2xiYXInXSxcbiAgICAgIGRyYWdnYWJsZUNsYXNzOiAndGQtZHJhZ2dhYmxlLW1hcmtkb3duLW5hdmlnYXRvci13aW5kb3cnLFxuICAgIH0pO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cgPSBtYXREaWFsb2dSZWY7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5pdGVtcyA9IGNvbmZpZy5pdGVtcztcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmxhYmVscyA9IGNvbmZpZy5sYWJlbHM7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5zdGFydEF0ID0gY29uZmlnLnN0YXJ0QXQ7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb21wYXJlV2l0aCA9IGNvbmZpZy5jb21wYXJlV2l0aDtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLnRvb2xiYXJDb2xvciA9XG4gICAgICAndG9vbGJhckNvbG9yJyBpbiBjb25maWcgPyBjb25maWcudG9vbGJhckNvbG9yIDogJ3ByaW1hcnknO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3BlbisrO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuZm9vdGVyID0gY29uZmlnLmZvb3RlcjtcbiAgICBkcmFnUmVmU3ViamVjdC5zdWJzY3JpYmUoKGRyYWdSZjogRHJhZ1JlZikgPT4ge1xuICAgICAgdGhpcy5kcmFnUmVmID0gZHJhZ1JmO1xuICAgICAgdGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cgPSBuZXcgUmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nKFxuICAgICAgICB0aGlzLl9kb2N1bWVudCxcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIyLFxuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLFxuICAgICAgICB0aGlzLmRyYWdSZWYsXG4gICAgICApO1xuICAgIH0pO1xuICAgIHRoaXMuX2hhbmRsZUV2ZW50cygpO1xuICAgIHJldHVybiB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nO1xuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nKSB7XG4gICAgICBpZiAodGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cpIHtcbiAgICAgICAgdGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cuZGV0YWNoKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3BlbiA+IDA7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVFdmVudHMoKTogdm9pZCB7XG4gICAgbGV0IHBvc2l0aW9uOiBQb2ludDtcbiAgICBsZXQgZGltZW5zaW9uczogSURpYWxvZ0RpbWVuc2lvbnM7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jbG9zZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5kb2NrVG9nZ2xlZC5zdWJzY3JpYmUoKGRvY2tlZDogYm9vbGVhbikgPT4ge1xuICAgICAgaWYgKGRvY2tlZCkge1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmRvY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLnVwZGF0ZVNpemUoZGltZW5zaW9ucy53aWR0aCwgZGltZW5zaW9ucy5oZWlnaHQpO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLnVwZGF0ZVBvc2l0aW9uKHsgdG9wOiAnMHB4JywgcmlnaHQ6ICcwcHgnLCBib3R0b206ICcwcHgnLCBsZWZ0OiAnMHB4JyB9KTtcbiAgICAgICAgdGhpcy5kcmFnUmVmLnNldEZyZWVEcmFnUG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgICB0aGlzLmRyYWdSZWYuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cuYXR0YWNoKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaW1lbnNpb25zID0gdGhpcy5fZ2V0RGlhbG9nU2l6ZSh0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nKTtcbiAgICAgICAgcG9zaXRpb24gPSB0aGlzLmRyYWdSZWYuZ2V0RnJlZURyYWdQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmRvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cudXBkYXRlU2l6ZShERUZBVUxUX1dJRFRILCBNSU5fSEVJR0hUKTtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy51cGRhdGVQb3NpdGlvbihERUZBVUxUX1BPU0lUSU9OKTtcbiAgICAgICAgdGhpcy5kcmFnUmVmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuZHJhZ1JlZi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nLmRldGFjaCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dcbiAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuLS07XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldERpYWxvZ1NpemUoZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudD4pOiBJRGlhbG9nRGltZW5zaW9ucyB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBnZXRDb21wdXRlZFN0eWxlKFxuICAgICAgKDxIVE1MRWxlbWVudD50aGlzLl9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaWFsb2dSZWYuaWQpKS5wYXJlbnRFbGVtZW50LFxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgIH07XG4gIH1cbn1cbiJdfQ==