/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input } from '@angular/core';
/**
 * @record
 */
export function IMarkdownNavigatorWindowLabels() { }
if (false) {
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowLabels.prototype.title;
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowLabels.prototype.close;
}
/** @type {?} */
export var DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS = {
    title: 'Help',
    close: 'Close',
};
var MarkdownNavigatorWindowComponent = /** @class */ (function () {
    function MarkdownNavigatorWindowComponent() {
        this.toolbarColor = 'primary';
        this.toolbarHeight = 56;
        this.closed = new EventEmitter();
    }
    Object.defineProperty(MarkdownNavigatorWindowComponent.prototype, "markdownNavigatorLabels", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.labels) {
                var _a = this.labels, goHome = _a.goHome, goBack = _a.goBack, emptyState = _a.emptyState;
                return {
                    goHome: goHome,
                    goBack: goBack,
                    emptyState: emptyState,
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownNavigatorWindowComponent.prototype, "titleLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.labels && this.labels.title) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownNavigatorWindowComponent.prototype, "closeLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.labels && this.labels.close) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.close;
        },
        enumerable: true,
        configurable: true
    });
    MarkdownNavigatorWindowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'td-markdown-navigator-window',
                    template: "<mat-toolbar [color]=\"toolbarColor\" class=\"td-markdown-navigator-window-toolbar\" [style.min-height.px]=\"toolbarHeight\">\n  <mat-toolbar-row [style.height.px]=\"toolbarHeight\" [style.padding-right.px]=\"0\">\n    <div layout=\"row\" layout-align=\"start center\" flex>\n      <span class=\"mat-title td-markdown-navigator-window-title\" flex>\n        {{ titleLabel }}\n      </span>\n      <!-- TODO: Resizing a drag-and-drop element was not working so removed minimize/maximize for now-->\n      <button\n        mat-icon-button\n        [matTooltip]=\"closeLabel\"\n        (click)=\"closed.emit()\"\n        class=\"td-markdown-navigator-window-close\"\n      >\n        <mat-icon [attr.aria-label]=\"closeLabel\">\n          close\n        </mat-icon>\n      </button>\n    </div>\n  </mat-toolbar-row>\n</mat-toolbar>\n\n<td-markdown-navigator [items]=\"items\" [labels]=\"markdownNavigatorLabels\"></td-markdown-navigator>\n",
                    styles: [":host{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host.td-draggable-markdown-navigator-window .td-markdown-navigator-window-toolbar{cursor:move}.td-markdown-navigator-window-title{margin-bottom:0}::ng-deep .td-draggable-markdown-navigator-window-wrapper>.mat-dialog-container{padding:0}"]
                }] }
    ];
    MarkdownNavigatorWindowComponent.propDecorators = {
        items: [{ type: Input }],
        labels: [{ type: Input }],
        toolbarColor: [{ type: Input }],
        closed: [{ type: Output }]
    };
    return MarkdownNavigatorWindowComponent;
}());
export { MarkdownNavigatorWindowComponent };
if (false) {
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.items;
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.labels;
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.toolbarColor;
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.toolbarHeight;
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.closed;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvbWFya2Rvd24tbmF2aWdhdG9yLyIsInNvdXJjZXMiOlsibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUl2RSxvREFHQzs7O0lBRkMsK0NBQWU7O0lBQ2YsK0NBQWU7OztBQUVqQixNQUFNLEtBQU8sd0NBQXdDLEdBQW1DO0lBQ3RGLEtBQUssRUFBRSxNQUFNO0lBQ2IsS0FBSyxFQUFFLE9BQU87Q0FDZjtBQUVEO0lBQUE7UUFRVyxpQkFBWSxHQUFpQixTQUFTLENBQUM7UUFDaEQsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFFakIsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBbUI1RCxDQUFDO0lBakJDLHNCQUFJLHFFQUF1Qjs7OztRQUEzQjtZQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxJQUFBLGdCQUE0RSxFQUExRSxrQkFBTSxFQUFFLGtCQUFNLEVBQUUsMEJBQTBEO2dCQUNsRixPQUFPO29CQUNMLE1BQU0sUUFBQTtvQkFDTixNQUFNLFFBQUE7b0JBQ04sVUFBVSxZQUFBO2lCQUNYLENBQUM7YUFDSDtRQUNILENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksd0RBQVU7Ozs7UUFBZDtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksd0NBQXdDLENBQUMsS0FBSyxDQUFDO1FBQzlGLENBQUM7OztPQUFBO0lBRUQsc0JBQUksd0RBQVU7Ozs7UUFBZDtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksd0NBQXdDLENBQUMsS0FBSyxDQUFDO1FBQzlGLENBQUM7OztPQUFBOztnQkE3QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLHE3QkFBeUQ7O2lCQUUxRDs7O3dCQUVFLEtBQUs7eUJBQ0wsS0FBSzsrQkFDTCxLQUFLO3lCQUdMLE1BQU07O0lBbUJULHVDQUFDO0NBQUEsQUE5QkQsSUE4QkM7U0F6QlksZ0NBQWdDOzs7SUFDM0MsaURBQXlDOztJQUN6QyxrREFBZ0Q7O0lBQ2hELHdEQUFnRDs7SUFDaEQseURBQTJCOztJQUUzQixrREFBMEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLCBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMgfSBmcm9tICcuLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHMgZXh0ZW5kcyBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMge1xuICB0aXRsZT86IHN0cmluZztcbiAgY2xvc2U/OiBzdHJpbmc7XG59XG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzID0ge1xuICB0aXRsZTogJ0hlbHAnLFxuICBjbG9zZTogJ0Nsb3NlJyxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RkLW1hcmtkb3duLW5hdmlnYXRvci13aW5kb3cnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQge1xuICBASW5wdXQoKSBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuICBASW5wdXQoKSBsYWJlbHM6IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscztcbiAgQElucHV0KCkgdG9vbGJhckNvbG9yOiBUaGVtZVBhbGV0dGUgPSAncHJpbWFyeSc7XG4gIHRvb2xiYXJIZWlnaHQ6IG51bWJlciA9IDU2O1xuXG4gIEBPdXRwdXQoKSBjbG9zZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBnZXQgbWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMoKTogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzIHtcbiAgICBpZiAodGhpcy5sYWJlbHMpIHtcbiAgICAgIGNvbnN0IHsgZ29Ib21lLCBnb0JhY2ssIGVtcHR5U3RhdGUgfTogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzID0gdGhpcy5sYWJlbHM7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnb0hvbWUsXG4gICAgICAgIGdvQmFjayxcbiAgICAgICAgZW1wdHlTdGF0ZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGdldCB0aXRsZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy50aXRsZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy50aXRsZTtcbiAgfVxuXG4gIGdldCBjbG9zZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5jbG9zZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy5jbG9zZTtcbiAgfVxufVxuIl19