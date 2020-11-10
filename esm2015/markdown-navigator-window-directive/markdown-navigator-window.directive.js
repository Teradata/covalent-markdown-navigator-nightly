/**
 * @fileoverview added by tsickle
 * Generated from: markdown-navigator-window-directive/markdown-navigator-window.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcGxhdGZvcm0vbWFya2Rvd24tbmF2aWdhdG9yL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctZGlyZWN0aXZlL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFDTCxnQ0FBZ0MsR0FFakMsTUFBTSx3RUFBd0UsQ0FBQztBQUtoRixNQUFNLE9BQU8sa0NBQWtDOzs7O0lBRzdDLFlBQW9CLCtCQUFpRTtRQUFqRSxvQ0FBK0IsR0FBL0IsK0JBQStCLENBQWtDO1FBRDVFLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFDcUQsQ0FBQzs7OztJQUVsRSxLQUFLO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQzs7O1lBWkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7YUFDeEM7Ozs7WUFOQyxnQ0FBZ0M7OztxQkFRL0IsS0FBSyxTQUFDLDJCQUEyQjt1QkFDakMsS0FBSztvQkFHTCxZQUFZLFNBQUMsT0FBTzs7OztJQUpyQixvREFBMkU7O0lBQzNFLHNEQUFtQzs7Ozs7SUFDdkIsNkVBQXlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93U2VydmljZSxcbiAgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnLFxufSBmcm9tICcuLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LXNlcnZpY2UvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3RkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3ddJyxcbn0pXG5leHBvcnQgY2xhc3MgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpcmVjdGl2ZSB7XG4gIEBJbnB1dCgndGRNYXJrZG93bk5hdmlnYXRvcldpbmRvdycpIGNvbmZpZzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29uZmlnO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXJrZG93bk5hdmlnYXRvcldpbmRvd1NlcnZpY2U6IFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgY2xpY2soKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9tYXJrZG93bk5hdmlnYXRvcldpbmRvd1NlcnZpY2Uub3Blbih0aGlzLmNvbmZpZyk7XG4gICAgfVxuICB9XG59XG4iXX0=