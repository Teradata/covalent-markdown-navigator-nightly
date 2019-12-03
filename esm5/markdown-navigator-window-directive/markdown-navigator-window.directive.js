/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input } from '@angular/core';
import { MarkdownNavigatorWindowService, } from '../markdown-navigator-window-service/markdown-navigator-window.service';
var MarkdownNavigatorWindowDirective = /** @class */ (function () {
    function MarkdownNavigatorWindowDirective(_markdownNavigatorWindowService) {
        this._markdownNavigatorWindowService = _markdownNavigatorWindowService;
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    MarkdownNavigatorWindowDirective.prototype.click = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this._markdownNavigatorWindowService.open(this.config);
        }
    };
    MarkdownNavigatorWindowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[tdMarkdownNavigatorWindow]',
                },] }
    ];
    /** @nocollapse */
    MarkdownNavigatorWindowDirective.ctorParameters = function () { return [
        { type: MarkdownNavigatorWindowService }
    ]; };
    MarkdownNavigatorWindowDirective.propDecorators = {
        config: [{ type: Input, args: ['tdMarkdownNavigatorWindow',] }],
        disabled: [{ type: Input }],
        click: [{ type: HostListener, args: ['click',] }]
    };
    return MarkdownNavigatorWindowDirective;
}());
export { MarkdownNavigatorWindowDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvbWFya2Rvd24tbmF2aWdhdG9yLyIsInNvdXJjZXMiOlsibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy1kaXJlY3RpdmUvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQ0wsOEJBQThCLEdBRS9CLE1BQU0sd0VBQXdFLENBQUM7QUFFaEY7SUFNRSwwQ0FBb0IsK0JBQStEO1FBQS9ELG9DQUErQixHQUEvQiwrQkFBK0IsQ0FBZ0M7UUFEMUUsYUFBUSxHQUFZLEtBQUssQ0FBQztJQUNtRCxDQUFDOzs7O0lBRWhFLGdEQUFLOzs7SUFBNUI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7O2dCQVpGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2lCQUN4Qzs7OztnQkFOQyw4QkFBOEI7Ozt5QkFRN0IsS0FBSyxTQUFDLDJCQUEyQjsyQkFDakMsS0FBSzt3QkFHTCxZQUFZLFNBQUMsT0FBTzs7SUFLdkIsdUNBQUM7Q0FBQSxBQWJELElBYUM7U0FWWSxnQ0FBZ0M7OztJQUMzQyxrREFBMkU7O0lBQzNFLG9EQUFtQzs7Ozs7SUFDdkIsMkVBQXVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNYXJrZG93bk5hdmlnYXRvcldpbmRvd1NlcnZpY2UsXG4gIElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbmZpZyxcbn0gZnJvbSAnLi4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy1zZXJ2aWNlL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0ZE1hcmtkb3duTmF2aWdhdG9yV2luZG93XScsXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlyZWN0aXZlIHtcbiAgQElucHV0KCd0ZE1hcmtkb3duTmF2aWdhdG9yV2luZG93JykgY29uZmlnOiBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb25maWc7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcmtkb3duTmF2aWdhdG9yV2luZG93U2VydmljZTogTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgY2xpY2soKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9tYXJrZG93bk5hdmlnYXRvcldpbmRvd1NlcnZpY2Uub3Blbih0aGlzLmNvbmZpZyk7XG4gICAgfVxuICB9XG59XG4iXX0=