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
    IMarkdownNavigatorWindowConfig.prototype.copyCodeToClipboard;
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowConfig.prototype.copyCodeTooltips;
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
        this.markdownNavigatorWindowDialog.componentInstance.copyCodeToClipboard = config.copyCodeToClipboard;
        this.markdownNavigatorWindowDialog.componentInstance.copyCodeTooltips = config.copyCodeTooltips;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvdmFsZW50L21hcmtkb3duLW5hdmlnYXRvci8iLCJzb3VyY2VzIjpbIm1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctc2VydmljZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFtQixNQUFNLGVBQWUsQ0FBQztBQUd0RixPQUFPLEVBQ0wsa0NBQWtDLEdBRW5DLE1BQU0sa0VBQWtFLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBa0Isd0JBQXdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFJM0Msb0RBVUM7OztJQVRDLCtDQUFnQzs7SUFDaEMsc0RBQStCOztJQUMvQixnREFBd0M7O0lBQ3hDLHNEQUE0Qjs7SUFDNUIsaURBQTREOztJQUM1RCxxREFBNEM7O0lBQzVDLDZEQUE4Qjs7SUFDOUIsMERBQXFDOztJQUNyQyxnREFBbUI7OztNQUdmLHdCQUF3QixHQUFXLGtCQUFrQjs7TUFFckQsZ0JBQWdCLEdBQW1CLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFOztNQUNsRSxhQUFhLEdBQVcsT0FBTzs7TUFDL0IsY0FBYyxHQUFXLE1BQU07O01BQy9CLFVBQVUsR0FBVyxNQUFNOztNQUMzQixTQUFTLEdBQVcsT0FBTzs7TUFFM0IsK0JBQStCLEdBQW9CO0lBQ3ZELFdBQVcsRUFBRSxLQUFLO0lBQ2xCLGlCQUFpQixFQUFFLElBQUk7SUFDdkIsVUFBVSxFQUFFLENBQUMsd0JBQXdCLENBQUM7SUFDdEMsUUFBUSxFQUFFLGdCQUFnQjtJQUMxQixNQUFNLEVBQUUsY0FBYztJQUN0QixLQUFL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QyxDQUFDLG1CQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBQSxDQUFDLENBQUMsYUFBYSxDQUN6RTtRQUNELE9BQU87WUFDTCxLQUFLO1lBQ0wsTUFBTTtTQUNQLENBQUM7SUFDSixDQUFDOzs7WUFySEYsVUFBVTs7OztZQXpDRixlQUFlOzRDQW1EbkIsTUFBTSxTQUFDLFFBQVE7WUExRFMsZ0JBQWdCOzs7Ozs7O0lBa0QzQyxzREFBOEI7Ozs7O0lBQzlCLG1EQUF5Qjs7Ozs7SUFDekIsb0VBQTJEOzs7OztJQUMzRCx5RUFBb0c7Ozs7O0lBQ3BHLDhFQUF1RDs7Ozs7SUFHckQsNERBQXlDOzs7OztJQUN6QyxxREFBd0M7Ozs7O0lBQ3hDLDJEQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXIyLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1hdERpYWxvZ0NvbmZpZywgRGlhbG9nUG9zaXRpb24gfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1xuICBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50LFxuICBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHMsXG59IGZyb20gJy4uL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGREaWFsb2dTZXJ2aWNlLCBJRHJhZ2dhYmxlUmVmcywgUmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUvZGlhbG9ncyc7XG5pbXBvcnQgeyBEcmFnUmVmLCBQb2ludCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AvZHJhZy1yZWYnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGggfSBmcm9tICcuLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IElDb3B5Q29kZVRvb2x0aXBzIH0gZnJvbSAnQGNvdmFsZW50L2hpZ2hsaWdodCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnIHtcbiAgaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcbiAgZGlhbG9nQ29uZmlnPzogTWF0RGlhbG9nQ29uZmlnO1xuICBsYWJlbHM/OiBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHM7XG4gIHRvb2xiYXJDb2xvcj86IFRoZW1lUGFsZXR0ZTtcbiAgc3RhcnRBdD86IElNYXJrZG93bk5hdmlnYXRvckl0ZW0gfCBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG4gIGNvbXBhcmVXaXRoPzogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGg7XG4gIGNvcHlDb2RlVG9DbGlwYm9hcmQ/OiBib29sZWFuO1xuICBjb3B5Q29kZVRvb2x0aXBzPzogSUNvcHlDb2RlVG9vbHRpcHM7XG4gIGZvb3Rlcj86IFR5cGU8YW55Pjtcbn1cblxuY29uc3QgQ0RLX09WRVJMQVlfQ1VTVE9NX0NMQVNTOiBzdHJpbmcgPSAndGQtd2luZG93LWRpYWxvZyc7XG5cbmNvbnN0IERFRkFVTFRfUE9TSVRJT046IERpYWxvZ1Bvc2l0aW9uID0geyBib3R0b206ICcwcHgnLCByaWdodDogJzBweCcgfTtcbmNvbnN0IERFRkFVTFRfV0lEVEg6IHN0cmluZyA9ICczNjBweCc7XG5jb25zdCBERUZBVUxUX0hFSUdIVDogc3RyaW5nID0gJzc1dmgnO1xuY29uc3QgTUlOX0hFSUdIVDogc3RyaW5nID0gJzU2cHgnO1xuY29uc3QgTUFYX1dJRFRIOiBzdHJpbmcgPSAnMTAwdncnO1xuXG5jb25zdCBERUZBVUxUX0RSQUdHQUJMRV9ESUFMT0dfQ09ORklHOiBNYXREaWFsb2dDb25maWcgPSB7XG4gIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgY2xvc2VPbk5hdmlnYXRpb246IHRydWUsXG4gIHBhbmVsQ2xhc3M6IFtDREtfT1ZFUkxBWV9DVVNUT01fQ0xBU1NdLFxuICBwb3NpdGlvbjogREVGQVVMVF9QT1NJVElPTixcbiAgaGVpZ2h0OiBERUZBVUxUX0hFSUdIVCxcbiAgd2lkdGg6IERFRkFVTFRfV0lEVEgsXG4gIG1heFdpZHRoOiBNQVhfV0lEVEgsXG59O1xuXG5pbnRlcmZhY2UgSURpYWxvZ0RpbWVuc2lvbnMge1xuICB3aWR0aDogc3RyaW5nO1xuICBoZWlnaHQ6IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfcmVuZGVyZXIyOiBSZW5kZXJlcjI7XG4gIHByaXZhdGUgZHJhZ1JlZjogRHJhZ1JlZjtcbiAgcHJpdmF0ZSByZXNpemFibGVEcmFnZ2FibGVEaWFsb2c6IFJlc2l6YWJsZURyYWdnYWJsZURpYWxvZztcbiAgcHJpdmF0ZSBtYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZzogTWF0RGlhbG9nUmVmPFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+ID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIG1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nc09wZW46IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfdGREaWFsb2dTZXJ2aWNlOiBUZERpYWxvZ1NlcnZpY2UsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgICBwcml2YXRlIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MixcbiAgKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIyID0gcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuKGNvbmZpZzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnKTogTWF0RGlhbG9nUmVmPFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+IHtcbiAgICB0aGlzLmNsb3NlKCk7XG5cbiAgICBsZXQgcGFuZWxDbGFzczogc3RyaW5nW10gPSBbLi4uREVGQVVMVF9EUkFHR0FCTEVfRElBTE9HX0NPTkZJRy5wYW5lbENsYXNzXTtcbiAgICBpZiAoY29uZmlnLmRpYWxvZ0NvbmZpZyAmJiBjb25maWcuZGlhbG9nQ29uZmlnLnBhbmVsQ2xhc3MpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZy5kaWFsb2dDb25maWcucGFuZWxDbGFzcykpIHtcbiAgICAgICAgcGFuZWxDbGFzcyA9IFsuLi5jb25maWcuZGlhbG9nQ29uZmlnLnBhbmVsQ2xhc3NdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFuZWxDbGFzcyA9IFtjb25maWcuZGlhbG9nQ29uZmlnLnBhbmVsQ2xhc3NdO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBkcmFnZ2FibGVDb25maWc6IE1hdERpYWxvZ0NvbmZpZyA9IHtcbiAgICAgIC4uLkRFRkFVTFRfRFJBR0dBQkxFX0RJQUxPR19DT05GSUcsXG4gICAgICAuLi5jb25maWcuZGlhbG9nQ29uZmlnLFxuICAgICAgcGFuZWxDbGFzcyxcbiAgICB9O1xuICAgIGNvbnN0IHtcbiAgICAgIG1hdERpYWxvZ1JlZixcbiAgICAgIGRyYWdSZWZTdWJqZWN0LFxuICAgIH06IElEcmFnZ2FibGVSZWZzPFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+ID0gdGhpcy5fdGREaWFsb2dTZXJ2aWNlLm9wZW5EcmFnZ2FibGUoe1xuICAgICAgY29tcG9uZW50OiBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50LFxuICAgICAgY29uZmlnOiBkcmFnZ2FibGVDb25maWcsXG4gICAgICBkcmFnSGFuZGxlU2VsZWN0b3JzOiBbJy50ZC13aW5kb3ctZGlhbG9nLXRvb2xiYXInXSxcbiAgICAgIGRyYWdnYWJsZUNsYXNzOiAndGQtZHJhZ2dhYmxlLW1hcmtkb3duLW5hdmlnYXRvci13aW5kb3cnLFxuICAgIH0pO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cgPSBtYXREaWFsb2dSZWY7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5pdGVtcyA9IGNvbmZpZy5pdGVtcztcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmxhYmVscyA9IGNvbmZpZy5sYWJlbHM7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5zdGFydEF0ID0gY29uZmlnLnN0YXJ0QXQ7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb3B5Q29kZVRvQ2xpcGJvYXJkID0gY29uZmlnLmNvcHlDb2RlVG9DbGlwYm9hcmQ7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb3B5Q29kZVRvb2x0aXBzID0gY29uZmlnLmNvcHlDb2RlVG9vbHRpcHM7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb21wYXJlV2l0aCA9IGNvbmZpZy5jb21wYXJlV2l0aDtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLnRvb2xiYXJDb2xvciA9XG4gICAgICAndG9vbGJhckNvbG9yJyBpbiBjb25maWcgPyBjb25maWcudG9vbGJhckNvbG9yIDogJ3ByaW1hcnknO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3BlbisrO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuZm9vdGVyID0gY29uZmlnLmZvb3RlcjtcbiAgICBkcmFnUmVmU3ViamVjdC5zdWJzY3JpYmUoKGRyYWdSZjogRHJhZ1JlZikgPT4ge1xuICAgICAgdGhpcy5kcmFnUmVmID0gZHJhZ1JmO1xuICAgICAgdGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cgPSBuZXcgUmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nKFxuICAgICAgICB0aGlzLl9kb2N1bWVudCxcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIyLFxuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLFxuICAgICAgICB0aGlzLmRyYWdSZWYsXG4gICAgICApO1xuICAgIH0pO1xuICAgIHRoaXMuX2hhbmRsZUV2ZW50cygpO1xuICAgIHJldHVybiB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nO1xuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nKSB7XG4gICAgICBpZiAodGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cpIHtcbiAgICAgICAgdGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cuZGV0YWNoKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3BlbiA+IDA7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVFdmVudHMoKTogdm9pZCB7XG4gICAgbGV0IHBvc2l0aW9uOiBQb2ludDtcbiAgICBsZXQgZGltZW5zaW9uczogSURpYWxvZ0RpbWVuc2lvbnM7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jbG9zZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5kb2NrVG9nZ2xlZC5zdWJzY3JpYmUoKGRvY2tlZDogYm9vbGVhbikgPT4ge1xuICAgICAgaWYgKGRvY2tlZCkge1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmRvY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLnVwZGF0ZVNpemUoZGltZW5zaW9ucy53aWR0aCwgZGltZW5zaW9ucy5oZWlnaHQpO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLnVwZGF0ZVBvc2l0aW9uKHsgdG9wOiAnMHB4JywgcmlnaHQ6ICcwcHgnLCBib3R0b206ICcwcHgnLCBsZWZ0OiAnMHB4JyB9KTtcbiAgICAgICAgdGhpcy5kcmFnUmVmLnNldEZyZWVEcmFnUG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgICB0aGlzLmRyYWdSZWYuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cuYXR0YWNoKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaW1lbnNpb25zID0gdGhpcy5fZ2V0RGlhbG9nU2l6ZSh0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nKTtcbiAgICAgICAgcG9zaXRpb24gPSB0aGlzLmRyYWdSZWYuZ2V0RnJlZURyYWdQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmRvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cudXBkYXRlU2l6ZShERUZBVUxUX1dJRFRILCBNSU5fSEVJR0hUKTtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy51cGRhdGVQb3NpdGlvbihERUZBVUxUX1BPU0lUSU9OKTtcbiAgICAgICAgdGhpcy5kcmFnUmVmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuZHJhZ1JlZi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nLmRldGFjaCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dcbiAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuLS07XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldERpYWxvZ1NpemUoZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudD4pOiBJRGlhbG9nRGltZW5zaW9ucyB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBnZXRDb21wdXRlZFN0eWxlKFxuICAgICAgKDxIVE1MRWxlbWVudD50aGlzLl9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaWFsb2dSZWYuaWQpKS5wYXJlbnRFbGVtZW50LFxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgIH07XG4gIH1cbn1cbiJdfQ==