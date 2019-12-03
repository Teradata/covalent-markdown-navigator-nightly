/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { MarkdownNavigatorWindowComponent, } from '../markdown-navigator-window/markdown-navigator-window.component';
import { TdDialogService } from '@covalent/core/dialogs';
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
}
/** @type {?} */
const CDK_OVERLAY_CUSTOM_CLASS = 'td-draggable-markdown-navigator-window-wrapper';
/** @type {?} */
const DEFAULT_DRAGGABLE_DIALOG_CONFIG = {
    hasBackdrop: false,
    closeOnNavigation: true,
    panelClass: CDK_OVERLAY_CUSTOM_CLASS,
    position: { bottom: '0px', right: '0px' },
    height: '475px',
    width: '360px',
};
export class MarkdownNavigatorWindowService {
    /**
     * @param {?} _tdDialogService
     */
    constructor(_tdDialogService) {
        this._tdDialogService = _tdDialogService;
        this.markdownNavigatorWindowDialog = undefined;
        this.markdownNavigatorWindowDialogsOpen = 0;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    open(config) {
        this.close();
        this.markdownNavigatorWindowDialog = this._tdDialogService.openDraggable({
            component: MarkdownNavigatorWindowComponent,
            config: Object.assign(Object.assign({}, DEFAULT_DRAGGABLE_DIALOG_CONFIG), config.dialogConfig),
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
        () => this.close()));
        this.markdownNavigatorWindowDialog
            .afterClosed()
            .toPromise()
            .then((/**
         * @return {?}
         */
        () => {
            this.markdownNavigatorWindowDialogsOpen--;
        }));
        return this.markdownNavigatorWindowDialog;
    }
    /**
     * @return {?}
     */
    close() {
        if (this.markdownNavigatorWindowDialog) {
            this.markdownNavigatorWindowDialog.close();
        }
    }
    /**
     * @return {?}
     */
    get isOpen() {
        return this.markdownNavigatorWindowDialogsOpen > 0;
    }
}
MarkdownNavigatorWindowService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MarkdownNavigatorWindowService.ctorParameters = () => [
    { type: TdDialogService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvdmFsZW50L21hcmtkb3duLW5hdmlnYXRvci8iLCJzb3VyY2VzIjpbIm1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctc2VydmljZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUNMLGdDQUFnQyxHQUVqQyxNQUFNLGtFQUFrRSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQUd6RCxvREFLQzs7O0lBSkMsK0NBQWdDOztJQUNoQyxzREFBK0I7O0lBQy9CLGdEQUF3Qzs7SUFDeEMsc0RBQTRCOzs7TUFHeEIsd0JBQXdCLEdBQVcsZ0RBQWdEOztNQUVuRiwrQkFBK0IsR0FBb0I7SUFDdkQsV0FBVyxFQUFFLEtBQUs7SUFDbEIsaUJBQWlCLEVBQUUsSUFBSTtJQUN2QixVQUFVLEVBQUUsd0JBQXdCO0lBQ3BDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN6QyxNQUFNLEVBQUUsT0FBTztJQUNmLEtBQUssRUFBRSxPQUFPO0NBQ2Y7QUFFRCxNQUFNLE9BQU8sOEJBQThCOzs7O0lBSXpDLFlBQW9CLGdCQUFpQztRQUFqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBSHJELGtDQUE2QixHQUFtRCxTQUFTLENBQUM7UUFDMUYsdUNBQWtDLEdBQVcsQ0FBQyxDQUFDO0lBRVMsQ0FBQzs7Ozs7SUFFbEQsSUFBSSxDQUFDLE1BQXNDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUViLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO1lBQ3ZFLFNBQVMsRUFBRSxnQ0FBZ0M7WUFDM0MsTUFBTSxrQ0FDRCwrQkFBK0IsR0FDL0IsTUFBTSxDQUFDLFlBQVksQ0FDdkI7WUFDRCxtQkFBbUIsRUFBRSxDQUFDLHVDQUF1QyxDQUFDO1lBQzlELGNBQWMsRUFBRSx3Q0FBd0M7U0FDekQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUM7UUFFMUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM1RSxJQUFJLENBQUMsNkJBQTZCLENBQUMsaUJBQWlCLENBQUMsWUFBWTtZQUMvRCxjQUFjLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDN0QsSUFBSSxDQUFDLDZCQUE2QixDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsNkJBQTZCO2FBQy9CLFdBQVcsRUFBRTthQUNiLFNBQVMsRUFBRTthQUNYLElBQUk7OztRQUFDLEdBQUcsRUFBRTtZQUNULElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO1FBQzVDLENBQUMsRUFBQyxDQUFDO1FBRUwsT0FBTyxJQUFJLENBQUMsNkJBQTZCLENBQUM7SUFDNUMsQ0FBQzs7OztJQUVNLEtBQUs7UUFDVixJQUFJLElBQUksQ0FBQyw2QkFBNkIsRUFBRTtZQUN0QyxJQUFJLENBQUMsNkJBQTZCLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDNUM7SUFDSCxDQUFDOzs7O0lBRUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsa0NBQWtDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7OztZQTVDRixVQUFVOzs7O1lBcEJGLGVBQWU7Ozs7SUFzQnRCLHVFQUEwRjs7SUFDMUYsNEVBQStDOzs7OztJQUVuQywwREFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1hdERpYWxvZ0NvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBUaGVtZVBhbGV0dGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7XG4gIE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50LFxuICBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHMsXG59IGZyb20gJy4uL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGREaWFsb2dTZXJ2aWNlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUvZGlhbG9ncyc7XG5pbXBvcnQgeyBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtIH0gZnJvbSAnLi4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnIHtcbiAgaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcbiAgZGlhbG9nQ29uZmlnPzogTWF0RGlhbG9nQ29uZmlnO1xuICBsYWJlbHM/OiBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHM7XG4gIHRvb2xiYXJDb2xvcj86IFRoZW1lUGFsZXR0ZTtcbn1cblxuY29uc3QgQ0RLX09WRVJMQVlfQ1VTVE9NX0NMQVNTOiBzdHJpbmcgPSAndGQtZHJhZ2dhYmxlLW1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctd3JhcHBlcic7XG5cbmNvbnN0IERFRkFVTFRfRFJBR0dBQkxFX0RJQUxPR19DT05GSUc6IE1hdERpYWxvZ0NvbmZpZyA9IHtcbiAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICBjbG9zZU9uTmF2aWdhdGlvbjogdHJ1ZSxcbiAgcGFuZWxDbGFzczogQ0RLX09WRVJMQVlfQ1VTVE9NX0NMQVNTLFxuICBwb3NpdGlvbjogeyBib3R0b206ICcwcHgnLCByaWdodDogJzBweCcgfSxcbiAgaGVpZ2h0OiAnNDc1cHgnLFxuICB3aWR0aDogJzM2MHB4Jyxcbn07XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlIHtcbiAgbWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2c6IE1hdERpYWxvZ1JlZjxNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudD4gPSB1bmRlZmluZWQ7XG4gIG1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nc09wZW46IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdGREaWFsb2dTZXJ2aWNlOiBUZERpYWxvZ1NlcnZpY2UpIHt9XG5cbiAgcHVibGljIG9wZW4oY29uZmlnOiBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb25maWcpOiBNYXREaWFsb2dSZWY8TWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+IHtcbiAgICB0aGlzLmNsb3NlKCk7XG5cbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nID0gdGhpcy5fdGREaWFsb2dTZXJ2aWNlLm9wZW5EcmFnZ2FibGUoe1xuICAgICAgY29tcG9uZW50OiBNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCxcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICAuLi5ERUZBVUxUX0RSQUdHQUJMRV9ESUFMT0dfQ09ORklHLFxuICAgICAgICAuLi5jb25maWcuZGlhbG9nQ29uZmlnLFxuICAgICAgfSxcbiAgICAgIGRyYWdIYW5kbGVTZWxlY3RvcnM6IFsnLnRkLW1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctdG9vbGJhciddLFxuICAgICAgZHJhZ2dhYmxlQ2xhc3M6ICd0ZC1kcmFnZ2FibGUtbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdycsXG4gICAgfSk7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuKys7XG5cbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLml0ZW1zID0gY29uZmlnLml0ZW1zO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UubGFiZWxzID0gY29uZmlnLmxhYmVscztcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLnRvb2xiYXJDb2xvciA9XG4gICAgICAndG9vbGJhckNvbG9yJyBpbiBjb25maWcgPyBjb25maWcudG9vbGJhckNvbG9yIDogJ3ByaW1hcnknO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY2xvc2VkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dcbiAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuLS07XG4gICAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nO1xuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nKSB7XG4gICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3BlbiA+IDA7XG4gIH1cbn1cbiJdfQ==