/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input } from '@angular/core';
import { MarkdownNavigatorWindowService, } from '../markdown-navigator-window-service/markdown-navigator-window.service';
export class MarkdownNavigatorWindowDirective {
    /**
     * @param {?} _markdownNavigatorWindowService
     */
    constructor(_markdownNavigatorWindowService) {
        this._markdownNavigatorWindowService = _markdownNavigatorWindowService;
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    click() {
        if (!this.disabled) {
            this._markdownNavigatorWindowService.open(this.config);
        }
    }
}
MarkdownNavigatorWindowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[tdMarkdownNavigatorWindow]',
            },] }
];
/** @nocollapse */
MarkdownNavigatorWindowDirective.ctorParameters = () => [
    { type: MarkdownNavigatorWindowService }
];
MarkdownNavigatorWindowDirective.propDecorators = {
    config: [{ type: Input, args: ['tdMarkdownNavigatorWindow',] }],
    disabled: [{ type: Input }],
    click: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /** @type {?} */
    MarkdownNavigatorWindowDirective.prototype.config;
    /** @type {?} */
    MarkdownNavigatorWindowDirective.prototype.disabled;
    /**
     * @type {?}
     * @private
     */
    MarkdownNavigatorWindowDirective.prototype._markdownNavigatorWindowService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvbWFya2Rvd24tbmF2aWdhdG9yLyIsInNvdXJjZXMiOlsibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy1kaXJlY3RpdmUvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQ0wsOEJBQThCLEdBRS9CLE1BQU0sd0VBQXdFLENBQUM7QUFLaEYsTUFBTSxPQUFPLGdDQUFnQzs7OztJQUczQyxZQUFvQiwrQkFBK0Q7UUFBL0Qsb0NBQStCLEdBQS9CLCtCQUErQixDQUFnQztRQUQxRSxhQUFRLEdBQVksS0FBSyxDQUFDO0lBQ21ELENBQUM7Ozs7SUFFaEUsS0FBSztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7OztZQVpGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2FBQ3hDOzs7O1lBTkMsOEJBQThCOzs7cUJBUTdCLEtBQUssU0FBQywyQkFBMkI7dUJBQ2pDLEtBQUs7b0JBR0wsWUFBWSxTQUFDLE9BQU87Ozs7SUFKckIsa0RBQTJFOztJQUMzRSxvREFBbUM7Ozs7O0lBQ3ZCLDJFQUF1RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlLFxuICBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb25maWcsXG59IGZyb20gJy4uL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctc2VydmljZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd10nLFxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpcmVjdGl2ZSB7XG4gIEBJbnB1dCgndGRNYXJrZG93bk5hdmlnYXRvcldpbmRvdycpIGNvbmZpZzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXJrZG93bk5hdmlnYXRvcldpbmRvd1NlcnZpY2U6IE1hcmtkb3duTmF2aWdhdG9yV2luZG93U2VydmljZSkge31cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpIGNsaWNrKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fbWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlLm9wZW4odGhpcy5jb25maWcpO1xuICAgIH1cbiAgfVxufVxuIl19