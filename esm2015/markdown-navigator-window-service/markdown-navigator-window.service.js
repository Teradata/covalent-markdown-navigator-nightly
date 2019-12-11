/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class MarkdownNavigatorWindowService {
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
            component: MarkdownNavigatorWindowComponent,
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
MarkdownNavigatorWindowService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MarkdownNavigatorWindowService.ctorParameters = () => [
    { type: TdDialogService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: RendererFactory2 }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvdmFsZW50L21hcmtkb3duLW5hdmlnYXRvci8iLCJzb3VyY2VzIjpbIm1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctc2VydmljZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFhLE1BQU0sZUFBZSxDQUFDO0FBR2hGLE9BQU8sRUFDTCxnQ0FBZ0MsR0FFakMsTUFBTSxrRUFBa0UsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFrQix3QkFBd0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRW5HLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUczQyxvREFPQzs7O0lBTkMsK0NBQWdDOztJQUNoQyxzREFBK0I7O0lBQy9CLGdEQUF3Qzs7SUFDeEMsc0RBQTRCOztJQUM1QixpREFBaUM7O0lBQ2pDLHFEQUE0Qzs7O01BR3hDLHdCQUF3QixHQUFXLGdEQUFnRDs7TUFFbkYsZ0JBQWdCLEdBQW1CLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFOztNQUNsRSxhQUFhLEdBQVcsT0FBTzs7TUFDL0IsY0FBYyxHQUFXLE1BQU07O01BQy9CLFVBQVUsR0FBVyxNQUFNOztNQUMzQixTQUFTLEdBQVcsT0FBTzs7TUFFM0IsK0JBQStCLEdBQW9CO0lBQ3ZELFdBQVcsRUFBRSxLQUFLO0lBQ2xCLGlCQUFpQixFQUFFLElBQUk7SUFDdkIsVUFBVSxFQUFFLHdCQUF3QjtJQUNwQyxRQUFRLEVBQUUsZ0JBQWdCO0lBQzFCLE1BQU0sRUFBRSxjQUFjO0lBQ3RCLEtBQUssRUFBRSxhQUFhO0lBQ3BCLFFBQVEsRUFBRSxTQUFTO0NBQ3BCOzs7O0FBRUQsZ0NBR0M7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QVEsR0FBRyxJQUFJLENBQUM7Z0JBQzdCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUN4QztRQUNILENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLDZCQUE2QjthQUMvQixXQUFXLEVBQUU7YUFDYixTQUFTLEVBQUU7YUFDWCxJQUFJOzs7UUFBQyxHQUFHLEVBQUU7WUFDVCxJQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztRQUM1QyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVPLGNBQWMsQ0FBQyxTQUF5RDtjQUN4RSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxnQkFBZ0IsQ0FDeEMsQ0FBQyxtQkFBYSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUEsQ0FBQyxDQUFDLGFBQWEsQ0FDekU7UUFDRCxPQUFPO1lBQ0wsS0FBSztZQUNMLE1BQU07U0FDUCxDQUFDO0lBQ0osQ0FBQzs7O1lBekdGLFVBQVU7Ozs7WUFyQ0YsZUFBZTs0Q0ErQ25CLE1BQU0sU0FBQyxRQUFRO1lBdERTLGdCQUFnQjs7Ozs7OztJQThDM0Msb0RBQThCOzs7OztJQUM5QixpREFBeUI7Ozs7O0lBQ3pCLGtFQUEyRDs7Ozs7SUFDM0QsdUVBQWtHOzs7OztJQUNsRyw0RUFBdUQ7Ozs7O0lBR3JELDBEQUF5Qzs7Ozs7SUFDekMsbURBQXdDOzs7OztJQUN4Qyx5REFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNYXREaWFsb2dDb25maWcsIERpYWxvZ1Bvc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQsXG4gIElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscyxcbn0gZnJvbSAnLi4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZERpYWxvZ1NlcnZpY2UsIElEcmFnZ2FibGVSZWZzLCBSZXNpemFibGVEcmFnZ2FibGVEaWFsb2cgfSBmcm9tICdAY292YWxlbnQvY29yZS9kaWFsb2dzJztcbmltcG9ydCB7IERyYWdSZWYsIFBvaW50IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcC9kcmFnLXJlZic7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLCBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aCB9IGZyb20gJy4uL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbmZpZyB7XG4gIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG4gIGRpYWxvZ0NvbmZpZz86IE1hdERpYWxvZ0NvbmZpZztcbiAgbGFiZWxzPzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzO1xuICB0b29sYmFyQ29sb3I/OiBUaGVtZVBhbGV0dGU7XG4gIHN0YXJ0QXQ/OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtO1xuICBjb21wYXJlV2l0aD86IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoO1xufVxuXG5jb25zdCBDREtfT1ZFUkxBWV9DVVNUT01fQ0xBU1M6IHN0cmluZyA9ICd0ZC1kcmFnZ2FibGUtbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy13cmFwcGVyJztcblxuY29uc3QgREVGQVVMVF9QT1NJVElPTjogRGlhbG9nUG9zaXRpb24gPSB7IGJvdHRvbTogJzBweCcsIHJpZ2h0OiAnMHB4JyB9O1xuY29uc3QgREVGQVVMVF9XSURUSDogc3RyaW5nID0gJzM2MHB4JztcbmNvbnN0IERFRkFVTFRfSEVJR0hUOiBzdHJpbmcgPSAnNzV2aCc7XG5jb25zdCBNSU5fSEVJR0hUOiBzdHJpbmcgPSAnNTZweCc7XG5jb25zdCBNQVhfV0lEVEg6IHN0cmluZyA9ICcxMDB2dyc7XG5cbmNvbnN0IERFRkFVTFRfRFJBR0dBQkxFX0RJQUxPR19DT05GSUc6IE1hdERpYWxvZ0NvbmZpZyA9IHtcbiAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICBjbG9zZU9uTmF2aWdhdGlvbjogdHJ1ZSxcbiAgcGFuZWxDbGFzczogQ0RLX09WRVJMQVlfQ1VTVE9NX0NMQVNTLFxuICBwb3NpdGlvbjogREVGQVVMVF9QT1NJVElPTixcbiAgaGVpZ2h0OiBERUZBVUxUX0hFSUdIVCxcbiAgd2lkdGg6IERFRkFVTFRfV0lEVEgsXG4gIG1heFdpZHRoOiBNQVhfV0lEVEgsXG59O1xuXG5pbnRlcmZhY2UgSURpYWxvZ0RpbWVuc2lvbnMge1xuICB3aWR0aDogc3RyaW5nO1xuICBoZWlnaHQ6IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcmtkb3duTmF2aWdhdG9yV2luZG93U2VydmljZSB7XG4gIHByaXZhdGUgX3JlbmRlcmVyMjogUmVuZGVyZXIyO1xuICBwcml2YXRlIGRyYWdSZWY6IERyYWdSZWY7XG4gIHByaXZhdGUgcmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nOiBSZXNpemFibGVEcmFnZ2FibGVEaWFsb2c7XG4gIHByaXZhdGUgbWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2c6IE1hdERpYWxvZ1JlZjxNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudD4gPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgbWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3BlbjogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF90ZERpYWxvZ1NlcnZpY2U6IFRkRGlhbG9nU2VydmljZSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuICAgIHByaXZhdGUgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxuICApIHtcbiAgICB0aGlzLl9yZW5kZXJlcjIgPSByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIodW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuICB9XG5cbiAgcHVibGljIG9wZW4oY29uZmlnOiBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb25maWcpOiBNYXREaWFsb2dSZWY8TWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+IHtcbiAgICB0aGlzLmNsb3NlKCk7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVDb25maWc6IE1hdERpYWxvZ0NvbmZpZyA9IHtcbiAgICAgIC4uLkRFRkFVTFRfRFJBR0dBQkxFX0RJQUxPR19DT05GSUcsXG4gICAgICAuLi5jb25maWcuZGlhbG9nQ29uZmlnLFxuICAgIH07XG4gICAgY29uc3Qge1xuICAgICAgbWF0RGlhbG9nUmVmLFxuICAgICAgZHJhZ1JlZlN1YmplY3QsXG4gICAgfTogSURyYWdnYWJsZVJlZnM8TWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+ID0gdGhpcy5fdGREaWFsb2dTZXJ2aWNlLm9wZW5EcmFnZ2FibGUoe1xuICAgICAgY29tcG9uZW50OiBNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCxcbiAgICAgIGNvbmZpZzogZHJhZ2dhYmxlQ29uZmlnLFxuICAgICAgZHJhZ0hhbmRsZVNlbGVjdG9yczogWycudGQtbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy10b29sYmFyJ10sXG4gICAgICBkcmFnZ2FibGVDbGFzczogJ3RkLWRyYWdnYWJsZS1tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93JyxcbiAgICB9KTtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nID0gbWF0RGlhbG9nUmVmO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuaXRlbXMgPSBjb25maWcuaXRlbXM7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5sYWJlbHMgPSBjb25maWcubGFiZWxzO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2Uuc3RhcnRBdCA9IGNvbmZpZy5zdGFydEF0O1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29tcGFyZVdpdGggPSBjb25maWcuY29tcGFyZVdpdGg7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS50b29sYmFyQ29sb3IgPVxuICAgICAgJ3Rvb2xiYXJDb2xvcicgaW4gY29uZmlnID8gY29uZmlnLnRvb2xiYXJDb2xvciA6ICdwcmltYXJ5JztcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nc09wZW4rKztcbiAgICBkcmFnUmVmU3ViamVjdC5zdWJzY3JpYmUoKGRyYWdSZjogRHJhZ1JlZikgPT4ge1xuICAgICAgdGhpcy5kcmFnUmVmID0gZHJhZ1JmO1xuICAgICAgdGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cgPSBuZXcgUmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nKFxuICAgICAgICB0aGlzLl9kb2N1bWVudCxcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIyLFxuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLFxuICAgICAgICB0aGlzLmRyYWdSZWYsXG4gICAgICApO1xuICAgIH0pO1xuICAgIHRoaXMuX2hhbmRsZUV2ZW50cygpO1xuICAgIHJldHVybiB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nO1xuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nKSB7XG4gICAgICBpZiAodGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cpIHtcbiAgICAgICAgdGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cuZGV0YWNoKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3BlbiA+IDA7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVFdmVudHMoKTogdm9pZCB7XG4gICAgbGV0IHBvc2l0aW9uOiBQb2ludDtcbiAgICBsZXQgZGltZW5zaW9uczogSURpYWxvZ0RpbWVuc2lvbnM7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jbG9zZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5kb2NrVG9nZ2xlZC5zdWJzY3JpYmUoKGRvY2tlZDogYm9vbGVhbikgPT4ge1xuICAgICAgaWYgKGRvY2tlZCkge1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmRvY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLnVwZGF0ZVNpemUoZGltZW5zaW9ucy53aWR0aCwgZGltZW5zaW9ucy5oZWlnaHQpO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLnVwZGF0ZVBvc2l0aW9uKHsgdG9wOiAnMHB4JywgcmlnaHQ6ICcwcHgnLCBib3R0b206ICcwcHgnLCBsZWZ0OiAnMHB4JyB9KTtcbiAgICAgICAgdGhpcy5kcmFnUmVmLnNldEZyZWVEcmFnUG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgICB0aGlzLmRyYWdSZWYuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXNpemFibGVEcmFnZ2FibGVEaWFsb2cuYXR0YWNoKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaW1lbnNpb25zID0gdGhpcy5fZ2V0RGlhbG9nU2l6ZSh0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nKTtcbiAgICAgICAgcG9zaXRpb24gPSB0aGlzLmRyYWdSZWYuZ2V0RnJlZURyYWdQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmRvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cudXBkYXRlU2l6ZShERUZBVUxUX1dJRFRILCBNSU5fSEVJR0hUKTtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy51cGRhdGVQb3NpdGlvbihERUZBVUxUX1BPU0lUSU9OKTtcbiAgICAgICAgdGhpcy5kcmFnUmVmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuZHJhZ1JlZi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzaXphYmxlRHJhZ2dhYmxlRGlhbG9nLmRldGFjaCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dcbiAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuLS07XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldERpYWxvZ1NpemUoZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8TWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+KTogSURpYWxvZ0RpbWVuc2lvbnMge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gZ2V0Q29tcHV0ZWRTdHlsZShcbiAgICAgICg8SFRNTEVsZW1lbnQ+dGhpcy5fZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGlhbG9nUmVmLmlkKSkucGFyZW50RWxlbWVudCxcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICB9O1xuICB9XG59XG4iXX0=