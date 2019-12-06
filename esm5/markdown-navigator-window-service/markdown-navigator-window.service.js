/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign } from "tslib";
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
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowConfig.prototype.startAt;
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowConfig.prototype.compareWith;
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
        this.markdownNavigatorWindowDialog.componentInstance.startAt = config.startAt;
        this.markdownNavigatorWindowDialog.componentInstance.compareWith = config.compareWith;
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
export { MarkdownNavigatorWindowService };
if (false) {
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvdmFsZW50L21hcmtkb3duLW5hdmlnYXRvci8iLCJzb3VyY2VzIjpbIm1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctc2VydmljZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFDTCxnQ0FBZ0MsR0FFakMsTUFBTSxrRUFBa0UsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFHekQsb0RBT0M7OztJQU5DLCtDQUFnQzs7SUFDaEMsc0RBQStCOztJQUMvQixnREFBd0M7O0lBQ3hDLHNEQUE0Qjs7SUFDNUIsaURBQWlDOztJQUNqQyxxREFBNEM7OztJQUd4Qyx3QkFBd0IsR0FBVyxnREFBZ0Q7O0lBRW5GLCtCQUErQixHQUFvQjtJQUN2RCxXQUFXLEVBQUUsS0FBSztJQUNsQixpQkFBaUIsRUFBRSxJQUFJO0lBQ3ZCLFVBQVUsRUFBRSx3QkFBd0I7SUFDcEMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3pDLE1BQU0sRUFBRSxPQUFPO0lBQ2YsS0FBSyxFQUFFLE9BQU87Q0FDZjtBQUNEO0lBS0Usd0NBQW9CLGdCQUFpQztRQUFqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBSDdDLGtDQUE2QixHQUFtRCxTQUFTLENBQUM7UUFDMUYsdUNBQWtDLEdBQVcsQ0FBQyxDQUFDO0lBRUMsQ0FBQzs7Ozs7SUFFbEQsNkNBQUk7Ozs7SUFBWCxVQUFZLE1BQXNDO1FBQWxELGlCQTZCQztRQTVCQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFYixJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztZQUN2RSxTQUFTLEVBQUUsZ0NBQWdDO1lBQzNDLE1BQU0sd0JBQ0QsK0JBQStCLEdBQy9CLE1BQU0sQ0FBQyxZQUFZLENBQ3ZCO1lBQ0QsbUJBQW1CLEVBQUUsQ0FBQyx1Q0FBdUMsQ0FBQztZQUM5RCxjQUFjLEVBQUUsd0NBQXdDO1NBQ3pELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO1FBRTFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMxRSxJQUFJLENBQUMsNkJBQTZCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUUsSUFBSSxDQUFDLDZCQUE2QixDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN0RixJQUFJLENBQUMsNkJBQTZCLENBQUMsaUJBQWlCLENBQUMsWUFBWTtZQUMvRCxjQUFjLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDN0QsSUFBSSxDQUFDLDZCQUE2QixDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7UUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLEtBQUssRUFBRSxFQUFaLENBQVksRUFBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyw2QkFBNkI7YUFDL0IsV0FBVyxFQUFFO2FBQ2IsU0FBUyxFQUFFO2FBQ1gsSUFBSTs7O1FBQUM7WUFDSixLQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztRQUM1QyxDQUFDLEVBQUMsQ0FBQztRQUVMLE9BQU8sSUFBSSxDQUFDLDZCQUE2QixDQUFDO0lBQzVDLENBQUM7Ozs7SUFFTSw4Q0FBSzs7O0lBQVo7UUFDRSxJQUFJLElBQUksQ0FBQyw2QkFBNkIsRUFBRTtZQUN0QyxJQUFJLENBQUMsNkJBQTZCLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRUQsc0JBQVcsa0RBQU07Ozs7UUFBakI7WUFDRSxPQUFPLElBQUksQ0FBQyxrQ0FBa0MsR0FBRyxDQUFDLENBQUM7UUFDckQsQ0FBQzs7O09BQUE7O2dCQTlDRixVQUFVOzs7O2dCQXRCRixlQUFlOztJQXFFeEIscUNBQUM7Q0FBQSxBQS9DRCxJQStDQztTQTlDWSw4QkFBOEI7Ozs7OztJQUN6Qyx1RUFBa0c7Ozs7O0lBQ2xHLDRFQUF1RDs7Ozs7SUFFM0MsMERBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNYXREaWFsb2dDb25maWcgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1xuICBNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCxcbiAgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzLFxufSBmcm9tICcuLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93L21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuY29tcG9uZW50JztcbmltcG9ydCB7IFRkRGlhbG9nU2VydmljZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlL2RpYWxvZ3MnO1xuaW1wb3J0IHsgSU1hcmtkb3duTmF2aWdhdG9ySXRlbSwgSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGggfSBmcm9tICcuLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb25maWcge1xuICBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuICBkaWFsb2dDb25maWc/OiBNYXREaWFsb2dDb25maWc7XG4gIGxhYmVscz86IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscztcbiAgdG9vbGJhckNvbG9yPzogVGhlbWVQYWxldHRlO1xuICBzdGFydEF0PzogSU1hcmtkb3duTmF2aWdhdG9ySXRlbTtcbiAgY29tcGFyZVdpdGg/OiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aDtcbn1cblxuY29uc3QgQ0RLX09WRVJMQVlfQ1VTVE9NX0NMQVNTOiBzdHJpbmcgPSAndGQtZHJhZ2dhYmxlLW1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctd3JhcHBlcic7XG5cbmNvbnN0IERFRkFVTFRfRFJBR0dBQkxFX0RJQUxPR19DT05GSUc6IE1hdERpYWxvZ0NvbmZpZyA9IHtcbiAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICBjbG9zZU9uTmF2aWdhdGlvbjogdHJ1ZSxcbiAgcGFuZWxDbGFzczogQ0RLX09WRVJMQVlfQ1VTVE9NX0NMQVNTLFxuICBwb3NpdGlvbjogeyBib3R0b206ICcwcHgnLCByaWdodDogJzBweCcgfSxcbiAgaGVpZ2h0OiAnNDc1cHgnLFxuICB3aWR0aDogJzM2MHB4Jyxcbn07XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBtYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZzogTWF0RGlhbG9nUmVmPE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50PiA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBtYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3RkRGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBvcGVuKGNvbmZpZzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnKTogTWF0RGlhbG9nUmVmPE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50PiB7XG4gICAgdGhpcy5jbG9zZSgpO1xuXG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZyA9IHRoaXMuX3RkRGlhbG9nU2VydmljZS5vcGVuRHJhZ2dhYmxlKHtcbiAgICAgIGNvbXBvbmVudDogTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQsXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgLi4uREVGQVVMVF9EUkFHR0FCTEVfRElBTE9HX0NPTkZJRyxcbiAgICAgICAgLi4uY29uZmlnLmRpYWxvZ0NvbmZpZyxcbiAgICAgIH0sXG4gICAgICBkcmFnSGFuZGxlU2VsZWN0b3JzOiBbJy50ZC1tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LXRvb2xiYXInXSxcbiAgICAgIGRyYWdnYWJsZUNsYXNzOiAndGQtZHJhZ2dhYmxlLW1hcmtkb3duLW5hdmlnYXRvci13aW5kb3cnLFxuICAgIH0pO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3BlbisrO1xuXG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5pdGVtcyA9IGNvbmZpZy5pdGVtcztcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmxhYmVscyA9IGNvbmZpZy5sYWJlbHM7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5zdGFydEF0ID0gY29uZmlnLnN0YXJ0QXQ7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb21wYXJlV2l0aCA9IGNvbmZpZy5jb21wYXJlV2l0aDtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLnRvb2xiYXJDb2xvciA9XG4gICAgICAndG9vbGJhckNvbG9yJyBpbiBjb25maWcgPyBjb25maWcudG9vbGJhckNvbG9yIDogJ3ByaW1hcnknO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY2xvc2VkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dcbiAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuLS07XG4gICAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nO1xuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nKSB7XG4gICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3BlbiA+IDA7XG4gIH1cbn1cbiJdfQ==