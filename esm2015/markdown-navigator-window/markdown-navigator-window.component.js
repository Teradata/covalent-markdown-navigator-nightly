/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
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
                template: "<mat-toolbar [color]=\"toolbarColor\" class=\"td-markdown-navigator-window-toolbar\" [style.min-height.px]=\"toolbarHeight\">\n  <mat-toolbar-row [style.height.px]=\"toolbarHeight\" [style.padding-right.px]=\"0\">\n    <div layout=\"row\" layout-align=\"start center\" flex>\n      <span class=\"mat-title td-markdown-navigator-window-title\" flex>\n        {{ titleLabel }}\n      </span>\n      <!-- TODO: Resizing a drag-and-drop element was not working so removed minimize/maximize for now-->\n      <button\n        mat-icon-button\n        [matTooltip]=\"closeLabel\"\n        (click)=\"closed.emit()\"\n        class=\"td-markdown-navigator-window-close\"\n        [attr.data-test]=\"'close-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"closeLabel\">\n          close\n        </mat-icon>\n      </button>\n    </div>\n  </mat-toolbar-row>\n</mat-toolbar>\n\n<td-markdown-navigator\n  [items]=\"items\"\n  [labels]=\"markdownNavigatorLabels\"\n  [startAt]=\"startAt\"\n  [compareWith]=\"compareWith\"\n></td-markdown-navigator>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host.td-draggable-markdown-navigator-window .td-markdown-navigator-window-toolbar{cursor:move}.td-markdown-navigator-window-title{margin-bottom:0}::ng-deep .td-draggable-markdown-navigator-window-wrapper>.mat-dialog-container{padding:0}"]
            }] }
];
MarkdownNavigatorWindowComponent.propDecorators = {
    items: [{ type: Input }],
    labels: [{ type: Input }],
    toolbarColor: [{ type: Input }],
    startAt: [{ type: Input }],
    compareWith: [{ type: Input }],
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
    MarkdownNavigatorWindowComponent.prototype.startAt;
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.compareWith;
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.toolbarHeight;
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.closed;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvbWFya2Rvd24tbmF2aWdhdG9yLyIsInNvdXJjZXMiOlsibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQVFoRyxvREFHQzs7O0lBRkMsK0NBQWU7O0lBQ2YsK0NBQWU7OztBQUVqQixNQUFNLE9BQU8sd0NBQXdDLEdBQW1DO0lBQ3RGLEtBQUssRUFBRSxNQUFNO0lBQ2IsS0FBSyxFQUFFLE9BQU87Q0FDZjtBQVFELE1BQU0sT0FBTyxnQ0FBZ0M7SUFON0M7UUFTVyxpQkFBWSxHQUFpQixTQUFTLENBQUM7UUFHaEQsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFFakIsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBbUI1RCxDQUFDOzs7O0lBakJDLElBQUksdUJBQXVCO1FBQ3pCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtrQkFDVCxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQW1DLElBQUksQ0FBQyxNQUFNO1lBQ2xGLE9BQU87Z0JBQ0wsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFVBQVU7YUFDWCxDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7O0lBQ0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSx3Q0FBd0MsQ0FBQyxLQUFLLENBQUM7SUFDOUYsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksd0NBQXdDLENBQUMsS0FBSyxDQUFDO0lBQzlGLENBQUM7OztZQWhDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsb2lDQUF5RDtnQkFFekQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7b0JBRUUsS0FBSztxQkFDTCxLQUFLOzJCQUNMLEtBQUs7c0JBQ0wsS0FBSzswQkFDTCxLQUFLO3FCQUdMLE1BQU07Ozs7SUFQUCxpREFBeUM7O0lBQ3pDLGtEQUFnRDs7SUFDaEQsd0RBQWdEOztJQUNoRCxtREFBeUM7O0lBQ3pDLHVEQUFvRDs7SUFDcEQseURBQTJCOztJQUUzQixrREFBMEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtcbiAgSU1hcmtkb3duTmF2aWdhdG9ySXRlbSxcbiAgSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzLFxuICBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aCxcbn0gZnJvbSAnLi4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzIGV4dGVuZHMgSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzIHtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIGNsb3NlPzogc3RyaW5nO1xufVxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX1dJTkRPV19MQUJFTFM6IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscyA9IHtcbiAgdGl0bGU6ICdIZWxwJyxcbiAgY2xvc2U6ICdDbG9zZScsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ZC1tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG4gIEBJbnB1dCgpIGxhYmVsczogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzO1xuICBASW5wdXQoKSB0b29sYmFyQ29sb3I6IFRoZW1lUGFsZXR0ZSA9ICdwcmltYXJ5JztcbiAgQElucHV0KCkgc3RhcnRBdDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbTtcbiAgQElucHV0KCkgY29tcGFyZVdpdGg6IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoO1xuICB0b29sYmFySGVpZ2h0OiBudW1iZXIgPSA1NjtcblxuICBAT3V0cHV0KCkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZ2V0IG1hcmtkb3duTmF2aWdhdG9yTGFiZWxzKCk6IElNYXJrZG93bk5hdmlnYXRvckxhYmVscyB7XG4gICAgaWYgKHRoaXMubGFiZWxzKSB7XG4gICAgICBjb25zdCB7IGdvSG9tZSwgZ29CYWNrLCBlbXB0eVN0YXRlIH06IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscyA9IHRoaXMubGFiZWxzO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ29Ib21lLFxuICAgICAgICBnb0JhY2ssXG4gICAgICAgIGVtcHR5U3RhdGUsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBnZXQgdGl0bGVMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMudGl0bGUpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX1dJTkRPV19MQUJFTFMudGl0bGU7XG4gIH1cblxuICBnZXQgY2xvc2VMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuY2xvc2UpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX1dJTkRPV19MQUJFTFMuY2xvc2U7XG4gIH1cbn1cbiJdfQ==