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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvdmFsZW50L21hcmtkb3duLW5hdmlnYXRvci8iLCJzb3VyY2VzIjpbIm1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctc2VydmljZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFhLE1BQU0sZUFBZSxDQUFDO0FBR2hGLE9BQU8sRUFDTCxrQ0FBa0MsR0FFbkMsTUFBTSxrRUFBa0UsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFrQix3QkFBd0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRW5HLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUczQyxvREFPQzs7O0lBTkMsK0NBQWdDOztJQUNoQyxzREFBK0I7O0lBQy9CLGdEQUF3Qzs7SUFDeEMsc0RBQTRCOztJQUM1QixpREFBaUM7O0lBQ2pDLHFEQUE0Qzs7O01BR3hDLHdCQUF3QixHQUFXLGtCQUFrQjs7TUFFckQsZ0JBQWdCLEdBQW1CLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFOztNQUNsRSxhQUFhLEdBQVcsT0FBTzs7TUFDL0IsY0FBYyxHQUFXLE1BQU07O01BQy9CLFVBQVUsR0FBVyxNQUFNOztNQUMzQixTQUFTLEdBQVcsT0FBTzs7TUFFM0IsK0JBQStCLEdBQW9CO0lBQ3ZELFdBQVcsRUFBRSxLQUFLO0lBQ2xCLGlCQUFpQixFQUFFLElBQUk7SUFDdkIsVUFBVSxFQUFFLENBQUMsd0JBQXdCLENBQUM7SUFDdEMsUUFBUSxFQUFFLGdCQUFnQjtJQUMxQixNQUFNLEVBQUUsY0FBYztJQUN0QixLQUFLLEVBQUUsYUFBYTtJQUNwQixRQUFRLEVBQUUsU0FBUztDQUNwQjs7OztB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SUFDM0QseUVBQW9HOzs7OztJQUNwRyw4RUFBdUQ7Ozs7O0lBR3JELDREQUF5Qzs7Ozs7SUFDekMscURBQXdDOzs7OztJQUN4QywyREFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNYXREaWFsb2dDb25maWcsIERpYWxvZ1Bvc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtcbiAgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCxcbiAgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzLFxufSBmcm9tICcuLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93L21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuY29tcG9uZW50JztcbmltcG9ydCB7IFRkRGlhbG9nU2VydmljZSwgSURyYWdnYWJsZVJlZnMsIFJlc2l6YWJsZURyYWdnYWJsZURpYWxvZyB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlL2RpYWxvZ3MnO1xuaW1wb3J0IHsgRHJhZ1JlZiwgUG9pbnQgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wL2RyYWctcmVmJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IElNYXJrZG93bk5hdmlnYXRvckl0ZW0sIElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoIH0gZnJvbSAnLi4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnIHtcbiAgaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcbiAgZGlhbG9nQ29uZmlnPzogTWF0RGlhbG9nQ29uZmlnO1xuICBsYWJlbHM/OiBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHM7XG4gIHRvb2xiYXJDb2xvcj86IFRoZW1lUGFsZXR0ZTtcbiAgc3RhcnRBdD86IElNYXJrZG93bk5hdmlnYXRvckl0ZW07XG4gIGNvbXBhcmVXaXRoPzogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGg7XG59XG5cbmNvbnN0IENES19PVkVSTEFZX0NVU1RPTV9DTEFTUzogc3RyaW5nID0gJ3RkLXdpbmRvdy1kaWFsb2cnO1xuXG5jb25zdCBERUZBVUxUX1BPU0lUSU9OOiBEaWFsb2dQb3NpdGlvbiA9IHsgYm90dG9tOiAnMHB4JywgcmlnaHQ6ICcwcHgnIH07XG5jb25zdCBERUZBVUxUX1dJRFRIOiBzdHJpbmcgPSAnMzYwcHgnO1xuY29uc3QgREVGQVVMVF9IRUlHSFQ6IHN0cmluZyA9ICc3NXZoJztcbmNvbnN0IE1JTl9IRUlHSFQ6IHN0cmluZyA9ICc1NnB4JztcbmNvbnN0IE1BWF9XSURUSDogc3RyaW5nID0gJzEwMHZ3JztcblxuY29uc3QgREVGQVVMVF9EUkFHR0FCTEVfRElBTE9HX0NPTkZJRzogTWF0RGlhbG9nQ29uZmlnID0ge1xuICBoYXNCYWNrZHJvcDogZmFsc2UsXG4gIGNsb3NlT25OYXZpZ2F0aW9uOiB0cnVlLFxuICBwYW5lbENsYXNzOiBbQ0RLX09WRVJMQVlfQ1VTVE9NX0NMQVNTXSxcbiAgcG9zaXRpb246IERFRkFVTFRfUE9TSVRJT04sXG4gIGhlaWdodDogREVGQVVMVF9IRUlHSFQsXG4gIHdpZHRoOiBERUZBVUxUX1dJRFRILFxuICBtYXhXaWR0aDogTUFYX1dJRFRILFxufTtcblxuaW50ZXJmYWNlIElEaWFsb2dEaW1lbnNpb25zIHtcbiAgd2lkdGg6IHN0cmluZztcbiAgaGVpZ2h0OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93U2VydmljZSB7XG4gIHByaXZhdGUgX3JlbmRlcmVyMjogUmVuZGVyZXIyO1xuICBwcml2YXRlIGRyYWdSZWY6IERyYWdSZWY7XG4gIHByaXZhdGUgcmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nOiBSZXNpemFibGVEcmFnZ2FibGVEaWFsb2c7XG4gIHByaXZhdGUgbWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2c6IE1hdERpYWxvZ1JlZjxUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50PiA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBtYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3RkRGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG4gICAgcHJpdmF0ZSByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICkge1xuICAgIHRoaXMuX3JlbmRlcmVyMiA9IHJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcih1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG4gIH1cblxuICBwdWJsaWMgb3Blbihjb25maWc6IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbmZpZyk6IE1hdERpYWxvZ1JlZjxUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50PiB7XG4gICAgdGhpcy5jbG9zZSgpO1xuXG4gICAgbGV0IHBhbmVsQ2xhc3M6IHN0cmluZ1tdID0gWy4uLkRFRkFVTFRfRFJBR0dBQkxFX0RJQUxPR19DT05GSUcucGFuZWxDbGFzc107XG4gICAgaWYgKGNvbmZpZy5kaWFsb2dDb25maWcgJiYgY29uZmlnLmRpYWxvZ0NvbmZpZy5wYW5lbENsYXNzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcuZGlhbG9nQ29uZmlnLnBhbmVsQ2xhc3MpKSB7XG4gICAgICAgIHBhbmVsQ2xhc3MgPSBbLi4uY29uZmlnLmRpYWxvZ0NvbmZpZy5wYW5lbENsYXNzXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhbmVsQ2xhc3MgPSBbY29uZmlnLmRpYWxvZ0NvbmZpZy5wYW5lbENsYXNzXTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgZHJhZ2dhYmxlQ29uZmlnOiBNYXREaWFsb2dDb25maWcgPSB7XG4gICAgICAuLi5ERUZBVUxUX0RSQUdHQUJMRV9ESUFMT0dfQ09ORklHLFxuICAgICAgLi4uY29uZmlnLmRpYWxvZ0NvbmZpZyxcbiAgICAgIHBhbmVsQ2xhc3MsXG4gICAgfTtcbiAgICBjb25zdCB7XG4gICAgICBtYXREaWFsb2dSZWYsXG4gICAgICBkcmFnUmVmU3ViamVjdCxcbiAgICB9OiBJRHJhZ2dhYmxlUmVmczxUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50PiA9IHRoaXMuX3RkRGlhbG9nU2VydmljZS5vcGVuRHJhZ2dhYmxlKHtcbiAgICAgIGNvbXBvbmVudDogVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCxcbiAgICAgIGNvbmZpZzogZHJhZ2dhYmxlQ29uZmlnLFxuICAgICAgZHJhZ0hhbmRsZVNlbGVjdG9yczogWycudGQtd2luZG93LWRpYWxvZy10b29sYmFyJ10sXG4gICAgICBkcmFnZ2FibGVDbGFzczogJ3RkLWRyYWdnYWJsZS1tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93JyxcbiAgICB9KTtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nID0gbWF0RGlhbG9nUmVmO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuaXRlbXMgPSBjb25maWcuaXRlbXM7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5sYWJlbHMgPSBjb25maWcubGFiZWxzO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2Uuc3RhcnRBdCA9IGNvbmZpZy5zdGFydEF0O1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29tcGFyZVdpdGggPSBjb25maWcuY29tcGFyZVdpdGg7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS50b29sYmFyQ29sb3IgPVxuICAgICAgJ3Rvb2xiYXJDb2xvcicgaW4gY29uZmlnID8gY29uZmlnLnRvb2xiYXJDb2xvciA6ICdwcmltYXJ5JztcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nc09wZW4rKztcbiAgICBkcmFnUmVmU3ViamVjdC5zdWJzY3JpYmUoKGRyYWdSZjogRHJhZ1JlZikgPT4ge1xuICAgICAgdGhpcy5kcmFnUmVmID0gZHJhZ1JmO1xuICAgICAgdGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cgPSBuZXcgUmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nKFxuICAgICAgICB0aGlzLl9kb2N1bWVudCxcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIyLFxuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLFxuICAgICAgICB0aGlzLmRyYWdSZWYsXG4gICAgICApO1xuICAgIH0pO1xuICAgIHRoaXMuX2hhbmRsZUV2ZW50cygpO1xuICAgIHJldHVybiB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nO1xuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nKSB7XG4gICAgICBpZiAodGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cpIHtcbiAgICAgICAgdGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cuZGV0YWNoKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3BlbiA+IDA7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVFdmVudHMoKTogdm9pZCB7XG4gICAgbGV0IHBvc2l0aW9uOiBQb2ludDtcbiAgICBsZXQgZGltZW5zaW9uczogSURpYWxvZ0RpbWVuc2lvbnM7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jbG9zZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5kb2NrVG9nZ2xlZC5zdWJzY3JpYmUoKGRvY2tlZDogYm9vbGVhbikgPT4ge1xuICAgICAgaWYgKGRvY2tlZCkge1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmRvY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLnVwZGF0ZVNpemUoZGltZW5zaW9ucy53aWR0aCwgZGltZW5zaW9ucy5oZWlnaHQpO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLnVwZGF0ZVBvc2l0aW9uKHsgdG9wOiAnMHB4JywgcmlnaHQ6ICcwcHgnLCBib3R0b206ICcwcHgnLCBsZWZ0OiAnMHB4JyB9KTtcbiAgICAgICAgdGhpcy5kcmFnUmVmLnNldEZyZWVEcmFnUG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgICB0aGlzLmRyYWdSZWYuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cuYXR0YWNoKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaW1lbnNpb25zID0gdGhpcy5fZ2V0RGlhbG9nU2l6ZSh0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nKTtcbiAgICAgICAgcG9zaXRpb24gPSB0aGlzLmRyYWdSZWYuZ2V0RnJlZURyYWdQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmRvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cudXBkYXRlU2l6ZShERUZBVUxUX1dJRFRILCBNSU5fSEVJR0hUKTtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy51cGRhdGVQb3NpdGlvbihERUZBVUxUX1BPU0lUSU9OKTtcbiAgICAgICAgdGhpcy5kcmFnUmVmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuZHJhZ1JlZi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nLmRldGFjaCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dcbiAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuLS07XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldERpYWxvZ1NpemUoZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudD4pOiBJRGlhbG9nRGltZW5zaW9ucyB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBnZXRDb21wdXRlZFN0eWxlKFxuICAgICAgKDxIVE1MRWxlbWVudD50aGlzLl9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaWFsb2dSZWYuaWQpKS5wYXJlbnRFbGVtZW50LFxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgIH07XG4gIH1cbn1cbiJdfQ==