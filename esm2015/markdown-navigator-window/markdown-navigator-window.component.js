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
export const DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS = {
    title: 'Help',
    close: 'Close',
};
export class MarkdownNavigatorWindowComponent {
    constructor() {
        this.toolbarColor = 'primary';
        this.toolbarHeight = 56;
        this.closed = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get markdownNavigatorLabels() {
        if (this.labels) {
            const { goHome, goBack, emptyState } = this.labels;
            return {
                goHome,
                goBack,
                emptyState,
            };
        }
    }
    /**
     * @return {?}
     */
    get titleLabel() {
        return (this.labels && this.labels.title) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.title;
    }
    /**
     * @return {?}
     */
    get closeLabel() {
        return (this.labels && this.labels.close) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.close;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvbWFya2Rvd24tbmF2aWdhdG9yLyIsInNvdXJjZXMiOlsibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUl2RSxvREFHQzs7O0lBRkMsK0NBQWU7O0lBQ2YsK0NBQWU7OztBQUVqQixNQUFNLE9BQU8sd0NBQXdDLEdBQW1DO0lBQ3RGLEtBQUssRUFBRSxNQUFNO0lBQ2IsS0FBSyxFQUFFLE9BQU87Q0FDZjtBQU9ELE1BQU0sT0FBTyxnQ0FBZ0M7SUFMN0M7UUFRVyxpQkFBWSxHQUFpQixTQUFTLENBQUM7UUFDaEQsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFFakIsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBbUI1RCxDQUFDOzs7O0lBakJDLElBQUksdUJBQXVCO1FBQ3pCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtrQkFDVCxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQW1DLElBQUksQ0FBQyxNQUFNO1lBQ2xGLE9BQU87Z0JBQ0wsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFVBQVU7YUFDWCxDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7O0lBQ0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSx3Q0FBd0MsQ0FBQyxLQUFLLENBQUM7SUFDOUYsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksd0NBQXdDLENBQUMsS0FBSyxDQUFDO0lBQzlGLENBQUM7OztZQTdCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMscTdCQUF5RDs7YUFFMUQ7OztvQkFFRSxLQUFLO3FCQUNMLEtBQUs7MkJBQ0wsS0FBSztxQkFHTCxNQUFNOzs7O0lBTFAsaURBQXlDOztJQUN6QyxrREFBZ0Q7O0lBQ2hELHdEQUFnRDs7SUFDaEQseURBQTJCOztJQUUzQixrREFBMEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLCBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMgfSBmcm9tICcuLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHMgZXh0ZW5kcyBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMge1xuICB0aXRsZT86IHN0cmluZztcbiAgY2xvc2U/OiBzdHJpbmc7XG59XG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzID0ge1xuICB0aXRsZTogJ0hlbHAnLFxuICBjbG9zZTogJ0Nsb3NlJyxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RkLW1hcmtkb3duLW5hdmlnYXRvci13aW5kb3cnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQge1xuICBASW5wdXQoKSBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuICBASW5wdXQoKSBsYWJlbHM6IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscztcbiAgQElucHV0KCkgdG9vbGJhckNvbG9yOiBUaGVtZVBhbGV0dGUgPSAncHJpbWFyeSc7XG4gIHRvb2xiYXJIZWlnaHQ6IG51bWJlciA9IDU2O1xuXG4gIEBPdXRwdXQoKSBjbG9zZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBnZXQgbWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMoKTogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzIHtcbiAgICBpZiAodGhpcy5sYWJlbHMpIHtcbiAgICAgIGNvbnN0IHsgZ29Ib21lLCBnb0JhY2ssIGVtcHR5U3RhdGUgfTogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzID0gdGhpcy5sYWJlbHM7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnb0hvbWUsXG4gICAgICAgIGdvQmFjayxcbiAgICAgICAgZW1wdHlTdGF0ZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGdldCB0aXRsZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy50aXRsZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy50aXRsZTtcbiAgfVxuXG4gIGdldCBjbG9zZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5jbG9zZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy5jbG9zZTtcbiAgfVxufVxuIl19