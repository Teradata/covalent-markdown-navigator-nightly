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
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowConfig.prototype.startAt;
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowConfig.prototype.compareWith;
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
        this.markdownNavigatorWindowDialog.componentInstance.startAt = config.startAt;
        this.markdownNavigatorWindowDialog.componentInstance.compareWith = config.compareWith;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvdmFsZW50L21hcmtkb3duLW5hdmlnYXRvci8iLCJzb3VyY2VzIjpbIm1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctc2VydmljZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUNMLGdDQUFnQyxHQUVqQyxNQUFNLGtFQUFrRSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQUd6RCxvREFPQzs7O0lBTkMsK0NBQWdDOztJQUNoQyxzREFBK0I7O0lBQy9CLGdEQUF3Qzs7SUFDeEMsc0RBQTRCOztJQUM1QixpREFBaUM7O0lBQ2pDLHFEQUE0Qzs7O01BR3hDLHdCQUF3QixHQUFXLGdEQUFnRDs7TUFFbkYsK0JBQStCLEdBQW9CO0lBQ3ZELFdBQVcsRUFBRSxLQUFLO0lBQ2xCLGlCQUFpQixFQUFFLElBQUk7SUFDdkIsVUFBVSxFQUFFLHdCQUF3QjtJQUNwQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDekMsTUFBTSxFQUFFLE9BQU87SUFDZixLQUFLLEVBQUUsT0FBTztDQUNmO0FBRUQsTUFBTSxPQUFPLDhCQUE4Qjs7OztJQUl6QyxZQUFvQixnQkFBaUM7UUFBakMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUg3QyxrQ0FBNkIsR0FBbUQsU0FBUyxDQUFDO1FBQzFGLHVDQUFrQyxHQUFXLENBQUMsQ0FBQztJQUVDLENBQUM7Ozs7O0lBRWxELElBQUksQ0FBQyxNQUFzQztRQUNoRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFYixJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztZQUN2RSxTQUFTLEVBQUUsZ0NBQWdDO1lBQzNDLE1BQU0sa0NBQ0QsK0JBQStCLEdBQy9CLE1BQU0sQ0FBQyxZQUFZLENBQ3ZCO1lBQ0QsbUJBQW1CLEVBQUUsQ0FBQyx1Q0FBdUMsQ0FBQztZQUM5RCxjQUFjLEVBQUUsd0NBQXdDO1NBQ3pELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO1FBRTFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMxRSxJQUFJLENBQUMsNkJBQTZCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUUsSUFBSSxDQUFDLDZCQUE2QixDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN0RixJQUFJLENBQUMsNkJBQTZCLENBQUMsaUJBQWlCLENBQUMsWUFBWTtZQUMvRCxjQUFjLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDN0QsSUFBSSxDQUFDLDZCQUE2QixDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsNkJBQTZCO2FBQy9CLFdBQVcsRUFBRTthQUNiLFNBQVMsRUFBRTthQUNYLElBQUk7OztRQUFDLEdBQUcsRUFBRTtZQUNULElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO1FBQzVDLENBQUMsRUFBQyxDQUFDO1FBRUwsT0FBTyxJQUFJLENBQUMsNkJBQTZCLENBQUM7SUFDNUMsQ0FBQzs7OztJQUVNLEtBQUs7UUFDVixJQUFJLElBQUksQ0FBQyw2QkFBNkIsRUFBRTtZQUN0QyxJQUFJLENBQUMsNkJBQTZCLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDNUM7SUFDSCxDQUFDOzs7O0lBRUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsa0NBQWtDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7OztZQTlDRixVQUFVOzs7O1lBdEJGLGVBQWU7Ozs7Ozs7SUF3QnRCLHVFQUFrRzs7Ozs7SUFDbEcsNEVBQXVEOzs7OztJQUUzQywwREFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1hdERpYWxvZ0NvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBUaGVtZVBhbGV0dGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7XG4gIE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50LFxuICBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHMsXG59IGZyb20gJy4uL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGREaWFsb2dTZXJ2aWNlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUvZGlhbG9ncyc7XG5pbXBvcnQgeyBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLCBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aCB9IGZyb20gJy4uL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbmZpZyB7XG4gIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG4gIGRpYWxvZ0NvbmZpZz86IE1hdERpYWxvZ0NvbmZpZztcbiAgbGFiZWxzPzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzO1xuICB0b29sYmFyQ29sb3I/OiBUaGVtZVBhbGV0dGU7XG4gIHN0YXJ0QXQ/OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtO1xuICBjb21wYXJlV2l0aD86IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoO1xufVxuXG5jb25zdCBDREtfT1ZFUkxBWV9DVVNUT01fQ0xBU1M6IHN0cmluZyA9ICd0ZC1kcmFnZ2FibGUtbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy13cmFwcGVyJztcblxuY29uc3QgREVGQVVMVF9EUkFHR0FCTEVfRElBTE9HX0NPTkZJRzogTWF0RGlhbG9nQ29uZmlnID0ge1xuICBoYXNCYWNrZHJvcDogZmFsc2UsXG4gIGNsb3NlT25OYXZpZ2F0aW9uOiB0cnVlLFxuICBwYW5lbENsYXNzOiBDREtfT1ZFUkxBWV9DVVNUT01fQ0xBU1MsXG4gIHBvc2l0aW9uOiB7IGJvdHRvbTogJzBweCcsIHJpZ2h0OiAnMHB4JyB9LFxuICBoZWlnaHQ6ICc0NzVweCcsXG4gIHdpZHRoOiAnMzYwcHgnLFxufTtcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXJrZG93bk5hdmlnYXRvcldpbmRvd1NlcnZpY2Uge1xuICBwcml2YXRlIG1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nOiBNYXREaWFsb2dSZWY8TWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+ID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIG1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nc09wZW46IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdGREaWFsb2dTZXJ2aWNlOiBUZERpYWxvZ1NlcnZpY2UpIHt9XG5cbiAgcHVibGljIG9wZW4oY29uZmlnOiBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb25maWcpOiBNYXREaWFsb2dSZWY8TWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQ+IHtcbiAgICB0aGlzLmNsb3NlKCk7XG5cbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nID0gdGhpcy5fdGREaWFsb2dTZXJ2aWNlLm9wZW5EcmFnZ2FibGUoe1xuICAgICAgY29tcG9uZW50OiBNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCxcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICAuLi5ERUZBVUxUX0RSQUdHQUJMRV9ESUFMT0dfQ09ORklHLFxuICAgICAgICAuLi5jb25maWcuZGlhbG9nQ29uZmlnLFxuICAgICAgfSxcbiAgICAgIGRyYWdIYW5kbGVTZWxlY3RvcnM6IFsnLnRkLW1hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctdG9vbGJhciddLFxuICAgICAgZHJhZ2dhYmxlQ2xhc3M6ICd0ZC1kcmFnZ2FibGUtbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdycsXG4gICAgfSk7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuKys7XG5cbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLml0ZW1zID0gY29uZmlnLml0ZW1zO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UubGFiZWxzID0gY29uZmlnLmxhYmVscztcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLnN0YXJ0QXQgPSBjb25maWcuc3RhcnRBdDtcbiAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbXBhcmVXaXRoID0gY29uZmlnLmNvbXBhcmVXaXRoO1xuICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY29tcG9uZW50SW5zdGFuY2UudG9vbGJhckNvbG9yID1cbiAgICAgICd0b29sYmFyQ29sb3InIGluIGNvbmZpZyA/IGNvbmZpZy50b29sYmFyQ29sb3IgOiAncHJpbWFyeSc7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jbG9zZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ1xuICAgICAgLmFmdGVyQ2xvc2VkKClcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLm1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlhbG9nc09wZW4tLTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2c7XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cpIHtcbiAgICAgIHRoaXMubWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaWFsb2cuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpYWxvZ3NPcGVuID4gMDtcbiAgfVxufVxuIl19