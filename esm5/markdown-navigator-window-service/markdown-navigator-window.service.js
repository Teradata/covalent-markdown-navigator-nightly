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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvdmFsZW50L21hcmtkb3duLW5hdmlnYXRvci8iLCJzb3VyY2VzIjpbIm1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctc2VydmljZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFDTCxnQ0FBZ0MsR0FFakMsTUFBTSxrRUFBa0UsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFHekQsb0RBS0M7OztJQUpDLCtDQUFnQzs7SUFDaEMsc0RBQStCOztJQUMvQixnREFBd0M7O0lBQ3hDLHNEQUE0Qjs7O0lBR3hCLHdCQUF3QixHQUFXLGdEQUFnRDs7SUFFbkYsK0JBQStCLEdBQW9CO0lBQ3ZELFdBQVcsRUFBRSxLQUFLO0lBQ2xCLGlCQUFpQixFQUFFLElBQUk7SUFDdkIsVUFBVSxFQUFFLHdCQUF3QjtJQUNwQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDekMsTUFBTSxFQUFFLE9BQU87SUFDZixLQUFLLEVBQUUsT0FBTztDQUNmO0FBQ0Q7SUFLRSx3Q0FBb0IsZ0JBQWlDO1FBQWpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFIckQsa0NBQTZCLEdBQW1ELFNBQVMsQ0FBQztRQUMxRix1Q0FBa0MsR0FBVyxDQUFDLENBQUM7SUFFUyxDQUFDOzs7OztJQUVsRCw2Q0FBSTs7OztJQUFYLFVBQVksTUFBc0M7UUFBbEQsaUJBMkJDO1FBMUJDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUViLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO1lBQ3ZFLFNBQVMsRUFBRSxnQ0FBZ0M7WUFDM0MsTUFBTSx3QkFDRCwrQkFBK0IsR0FDL0IsTUFBTSxDQUFDLFlBQVksQ0FDdkI7WUFDRCxtQkFBbUIsRUFBRSxDQUFDLHVDQUF1QyxDQUFDO1lBQzlELGNBQWMsRUFBRSx3Q0FBd0M7U0FDekQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUM7UUFFMUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM1RSxJQUFJLENBQUMsNkJBQTZCLENBQUMsaUJBQWlCLENBQUMsWUFBWTtZQUMvRCxjQUFjLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDN0QsSUFBSSxDQUFDLDZCQUE2QixDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7UUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLEtBQUssRUFBRSxFQUFaLENBQVksRUFBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyw2QkFBNkI7YUFDL0IsV0FBVyxFQUFFO2FBQ2IsU0FBUyxFQUFFO2FBQ1gsSUFBSTs7O1FBQUM7WUFDSixLQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztRQUM1QyxDQUFDLEVBQUMsQ0FBQztRQUVMLE9BQU8sSUFBSSxDQUFDLDZCQUE2QixDQUFDO0lBQzVDLENBQUM7Ozs7SUFFTSw4Q0FBSzs7O0lBQVo7UUFDRSxJQUFJLElBQUksQ0FBQyw2QkFBNkIsRUFBRTtZQUN0QyxJQUFJLENBQUMsNkJBQTZCLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRUQsc0JBQVcsa0RBQU07Ozs7UUFBakI7WUFDRSxPQUFPLElBQUksQ0FBQyxrQ0FBa0MsR0FBRyxDQUFDLENBQUM7UUFDckQsQ0FBQzs7O09BQUE7O2dCQTVDRixVQUFVOzs7O2dCQXBCRixlQUFlOztJQWlFeEIscUNBQUM7Q0FBQSxBQTdDRCxJQTZDQztTQTVDWSw4QkFBOEI7OztJQUN6Qyx1RUFBMEY7O0lBQzFGLDRFQUErQzs7Ozs7SUFFbkMsMERBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNYXREaWFsb2dDb25maWcgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1xuICBNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCxcbiAgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzLFxufSBmcm9tICcuLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93L21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuY29tcG9uZW50JztcbmltcG9ydCB7IFRkRGlhbG9nU2VydmljZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlL2RpYWxvZ3MnO1xuaW1wb3J0IHsgSU1hcmtkb3duTmF2aWdhdG9ySXRlbSB9IGZyb20gJy4uL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbmZpZyB7XG4gIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG4gIGRpYWxvZ0NvbmZpZz86IE1hdERpYWxvZ0NvbmZpZztcbiAgbGFiZWxzPzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzO1xuICB0b29sYmFyQ29sb3I/OiBUaGVtZVBhbGV0dGU7XG59XG5cbmNvbnN0IENES19PVkVSTEFZX0NVU1RPTV9DTEFTUzogc3RyaW5nID0gJ3RkLWRyYWdnYWJsZS1tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LXdyYXBwZXInO1xuXG5jb25zdCBERUZBVUxUX0RSQUdHQUJMRV9ESUFMT0dfQ09ORklHOiBNYXREaWFsb2dDb25maWcgPSB7XG4gIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgY2xvc2VPbk5hdmlnYXRpb246IHRydWUsXG4gIHBhbmVsQ2xhc3M6IENES19PVkVSTEFZX0NVU1RPTV9DTEFTUyxcbiAgcG9zaXRpb246IHsgYm90dG9tOiAnMHB4JywgcmlnaHQ6ICcwcHgnIH0sXG4gIGhlaWdodDogJzQ3NXB4JyxcbiAgd2lkdGg6ICczNjBweCcsXG59O1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcmtkb3duTmF2aWdhdG9yV2luZG93U2VydmljZSB7XG4gIG1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nOiBNYXREaWFsb2dSZWY8TWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+ID0gdW5kZWZpbmVkO1xuICBtYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3RkRGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBvcGVuKGNvbmZpZzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnKTogTWF0RGlhbG9nUmVmPE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50PiB7XG4gICAgdGhpcy5jbG9zZSgpO1xuXG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZyA9IHRoaXMuX3RkRGlhbG9nU2VydmljZS5vcGVuRHJhZ2dhYmxlKHtcbiAgICAgIGNvbXBvbmVudDogTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQsXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgLi4uREVGQVVMVF9EUkFHR0FCTEVfRElBTE9HX0NPTkZJRyxcbiAgICAgICAgLi4uY29uZmlnLmRpYWxvZ0NvbmZpZyxcbiAgICAgIH0sXG4gICAgICBkcmFnSGFuZGxlU2VsZWN0b3JzOiBbJy50ZC1tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LXRvb2xiYXInXSxcbiAgICAgIGRyYWdnYWJsZUNsYXNzOiAndGQtZHJhZ2dhYmxlLW1hcmtkb3duLW5hdmlnYXRvci13aW5kb3cnLFxuICAgIH0pO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3BlbisrO1xuXG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5pdGVtcyA9IGNvbmZpZy5pdGVtcztcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmxhYmVscyA9IGNvbmZpZy5sYWJlbHM7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS50b29sYmFyQ29sb3IgPVxuICAgICAgJ3Rvb2xiYXJDb2xvcicgaW4gY29uZmlnID8gY29uZmlnLnRvb2xiYXJDb2xvciA6ICdwcmltYXJ5JztcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNsb3NlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nXG4gICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2dzT3Blbi0tO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZztcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZykge1xuICAgICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nc09wZW4gPiAwO1xuICB9XG59XG4iXX0=