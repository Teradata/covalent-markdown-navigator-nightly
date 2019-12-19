/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input } from '@angular/core';
import { TdMarkdownNavigatorWindowService, } from '../markdown-navigator-window-service/markdown-navigator-window.service';
var TdMarkdownNavigatorWindowDirective = /** @class */ (function () {
    function TdMarkdownNavigatorWindowDirective(_markdownNavigatorWindowService) {
        this._markdownNavigatorWindowService = _markdownNavigatorWindowService;
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    TdMarkdownNavigatorWindowDirective.prototype.click = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this._markdownNavigatorWindowService.open(this.config);
        }
    };
    TdMarkdownNavigatorWindowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[tdMarkdownNavigatorWindow]',
                },] }
    ];
    /** @nocollapse */
    TdMarkdownNavigatorWindowDirective.ctorParameters = function () { return [
        { type: TdMarkdownNavigatorWindowService }
    ]; };
    TdMarkdownNavigatorWindowDirective.propDecorators = {
        config: [{ type: Input, args: ['tdMarkdownNavigatorWindow',] }],
        disabled: [{ type: Input }],
        click: [{ type: HostListener, args: ['click',] }]
    };
    return TdMarkdownNavigatorWindowDirective;
}());
export { TdMarkdownNavigatorWindowDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvbWFya2Rvd24tbmF2aWdhdG9yLyIsInNvdXJjZXMiOlsibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy1kaXJlY3RpdmUvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQ0wsZ0NBQWdDLEdBRWpDLE1BQU0sd0VBQXdFLENBQUM7QUFFaEY7SUFNRSw0Q0FBb0IsK0JBQWlFO1FBQWpFLG9DQUErQixHQUEvQiwrQkFBK0IsQ0FBa0M7UUFENUUsYUFBUSxHQUFZLEtBQUssQ0FBQztJQUNxRCxDQUFDOzs7O0lBRWxFLGtEQUFLOzs7SUFBNUI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7O2dCQVpGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2lCQUN4Qzs7OztnQkFOQyxnQ0FBZ0M7Ozt5QkFRL0IsS0FBSyxTQUFDLDJCQUEyQjsyQkFDakMsS0FBSzt3QkFHTCxZQUFZLFNBQUMsT0FBTzs7SUFLdkIseUNBQUM7Q0FBQSxBQWJELElBYUM7U0FWWSxrQ0FBa0M7OztJQUM3QyxvREFBMkU7O0lBQzNFLHNEQUFtQzs7Ozs7SUFDdkIsNkVBQXlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93U2VydmljZSxcbiAgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnLFxufSBmcm9tICcuLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LXNlcnZpY2UvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3RkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3ddJyxcbn0pXG5leHBvcnQgY2xhc3MgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpcmVjdGl2ZSB7XG4gIEBJbnB1dCgndGRNYXJrZG93bk5hdmlnYXRvcldpbmRvdycpIGNvbmZpZzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXJrZG93bk5hdmlnYXRvcldpbmRvd1NlcnZpY2U6IFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgY2xpY2soKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9tYXJrZG93bk5hdmlnYXRvcldpbmRvd1NlcnZpY2Uub3Blbih0aGlzLmNvbmZpZyk7XG4gICAgfVxuICB9XG59XG4iXX0=