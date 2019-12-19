/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input } from '@angular/core';
import { TdMarkdownNavigatorWindowService, } from '../markdown-navigator-window-service/markdown-navigator-window.service';
export class TdMarkdownNavigatorWindowDirective {
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
TdMarkdownNavigatorWindowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[tdMarkdownNavigatorWindow]',
            },] }
];
/** @nocollapse */
TdMarkdownNavigatorWindowDirective.ctorParameters = () => [
    { type: TdMarkdownNavigatorWindowService }
];
TdMarkdownNavigatorWindowDirective.propDecorators = {
    config: [{ type: Input, args: ['tdMarkdownNavigatorWindow',] }],
    disabled: [{ type: Input }],
    click: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /** @type {?} */
    TdMarkdownNavigatorWindowDirective.prototype.config;
    /** @type {?} */
    TdMarkdownNavigatorWindowDirective.prototype.disabled;
    /**
     * @type {?}
     * @private
     */
    TdMarkdownNavigatorWindowDirective.prototype._markdownNavigatorWindowService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvbWFya2Rvd24tbmF2aWdhdG9yLyIsInNvdXJjZXMiOlsibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy1kaXJlY3RpdmUvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQ0wsZ0NBQWdDLEdBRWpDLE1BQU0sd0VBQXdFLENBQUM7QUFLaEYsTUFBTSxPQUFPLGtDQUFrQzs7OztJQUc3QyxZQUFvQiwrQkFBaUU7UUFBakUsb0NBQStCLEdBQS9CLCtCQUErQixDQUFrQztRQUQ1RSxhQUFRLEdBQVksS0FBSyxDQUFDO0lBQ3FELENBQUM7Ozs7SUFFbEUsS0FBSztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7OztZQVpGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2FBQ3hDOzs7O1lBTkMsZ0NBQWdDOzs7cUJBUS9CLEtBQUssU0FBQywyQkFBMkI7dUJBQ2pDLEtBQUs7b0JBR0wsWUFBWSxTQUFDLE9BQU87Ozs7SUFKckIsb0RBQTJFOztJQUMzRSxzREFBbUM7Ozs7O0lBQ3ZCLDZFQUF5RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd1NlcnZpY2UsXG4gIElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbmZpZyxcbn0gZnJvbSAnLi4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy1zZXJ2aWNlL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0ZE1hcmtkb3duTmF2aWdhdG9yV2luZG93XScsXG59KVxuZXhwb3J0IGNsYXNzIFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaXJlY3RpdmUge1xuICBASW5wdXQoJ3RkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3cnKSBjb25maWc6IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbmZpZztcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlOiBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93U2VydmljZSkge31cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpIGNsaWNrKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fbWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlLm9wZW4odGhpcy5jb25maWcpO1xuICAgIH1cbiAgfVxufVxuIl19