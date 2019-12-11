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
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowLabels.prototype.dock;
    /** @type {?|undefined} */
    IMarkdownNavigatorWindowLabels.prototype.unDock;
}
/** @type {?} */
export const DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS = {
    title: 'Help',
    close: 'Close',
    dock: 'Dock',
    unDock: 'Undock',
};
export class MarkdownNavigatorWindowComponent {
    constructor() {
        this.toolbarColor = 'primary';
        this.toolbarHeight = 56;
        this.docked = false;
        this.closed = new EventEmitter();
        this.dockToggled = new EventEmitter();
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
    /**
     * @return {?}
     */
    get toggleDockedStateLabel() {
        if (this.docked) {
            return (this.labels && this.labels.unDock) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.unDock;
        }
        else {
            return (this.labels && this.labels.dock) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.dock;
        }
    }
    /**
     * @return {?}
     */
    toggleDockedState() {
        this.dockToggled.emit(this.docked);
    }
}
MarkdownNavigatorWindowComponent.decorators = [
    { type: Component, args: [{
                selector: 'td-markdown-navigator-window',
                template: "<mat-toolbar\n  [color]=\"toolbarColor\"\n  class=\"td-markdown-navigator-window-toolbar\"\n  [style.min-height.px]=\"toolbarHeight\"\n  [style.cursor]=\"docked ? 'inherit' : 'move'\"\n>\n  <mat-toolbar-row [style.height.px]=\"toolbarHeight\" [style.padding-right.px]=\"0\">\n    <div layout=\"row\" layout-align=\"start center\" flex>\n      <span class=\"mat-title td-markdown-navigator-window-title\" flex>\n        {{ titleLabel }}\n      </span>\n      <!-- TODO: Resizing a drag-and-drop element was not working so removed docking/undocking for now-->\n      <!--\n      <button mat-icon-button [matTooltip]=\"toggleDockedStateLabel\" (click)=\"toggleDockedState()\">\n        <mat-icon [attr.aria-label]=\"toggleDockedStateLabel\">\n          {{ docked ? 'unfold_more' : 'unfold_less' }}\n        </mat-icon>\n      </button>\n      -->\n      <button\n        mat-icon-button\n        [matTooltip]=\"closeLabel\"\n        (click)=\"closed.emit()\"\n        class=\"td-markdown-navigator-window-close\"\n        [attr.data-test]=\"'close-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"closeLabel\">\n          close\n        </mat-icon>\n      </button>\n    </div>\n  </mat-toolbar-row>\n</mat-toolbar>\n\n<td-markdown-navigator\n  [items]=\"items\"\n  [labels]=\"markdownNavigatorLabels\"\n  [style.display]=\"docked ? 'none' : 'inherit'\"\n  [startAt]=\"startAt\"\n  [compareWith]=\"compareWith\"\n></td-markdown-navigator>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.td-markdown-navigator-window-title{margin-bottom:0}::ng-deep .td-draggable-markdown-navigator-window-wrapper>.mat-dialog-container{padding:0}"]
            }] }
];
MarkdownNavigatorWindowComponent.propDecorators = {
    items: [{ type: Input }],
    labels: [{ type: Input }],
    toolbarColor: [{ type: Input }],
    startAt: [{ type: Input }],
    compareWith: [{ type: Input }],
    docked: [{ type: Input }],
    closed: [{ type: Output }],
    dockToggled: [{ type: Output }]
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
    MarkdownNavigatorWindowComponent.prototype.docked;
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.closed;
    /** @type {?} */
    MarkdownNavigatorWindowComponent.prototype.dockToggled;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvbWFya2Rvd24tbmF2aWdhdG9yLyIsInNvdXJjZXMiOlsibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQVFoRyxvREFLQzs7O0lBSkMsK0NBQWU7O0lBQ2YsK0NBQWU7O0lBQ2YsOENBQWM7O0lBQ2QsZ0RBQWdCOzs7QUFFbEIsTUFBTSxPQUFPLHdDQUF3QyxHQUFtQztJQUN0RixLQUFLLEVBQUUsTUFBTTtJQUNiLEtBQUssRUFBRSxPQUFPO0lBQ2QsSUFBSSxFQUFFLE1BQU07SUFDWixNQUFNLEVBQUUsUUFBUTtDQUNqQjtBQVFELE1BQU0sT0FBTyxnQ0FBZ0M7SUFON0M7UUFTVyxpQkFBWSxHQUFpQixTQUFTLENBQUM7UUFHaEQsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFDbEIsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUV2QixXQUFNLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsZ0JBQVcsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQStCcEUsQ0FBQzs7OztJQTdCQyxJQUFJLHVCQUF1QjtRQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7a0JBQ1QsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFtQyxJQUFJLENBQUMsTUFBTTtZQUNsRixPQUFPO2dCQUNMLE1BQU07Z0JBQ04sTUFBTTtnQkFDTixVQUFVO2FBQ1gsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7OztJQUNELElBQUksVUFBVTtRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksd0NBQXdDLENBQUMsS0FBSyxDQUFDO0lBQzlGLENBQUM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLEtBQUssQ0FBQztJQUM5RixDQUFDOzs7O0lBRUQsSUFBSSxzQkFBc0I7UUFDeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSx3Q0FBd0MsQ0FBQyxNQUFNLENBQUM7U0FDL0Y7YUFBTTtZQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksd0NBQXdDLENBQUMsSUFBSSxDQUFDO1NBQzNGO0lBQ0gsQ0FBQzs7OztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7WUE5Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLGs3Q0FBeUQ7Z0JBRXpELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O29CQUVFLEtBQUs7cUJBQ0wsS0FBSzsyQkFDTCxLQUFLO3NCQUNMLEtBQUs7MEJBQ0wsS0FBSztxQkFFTCxLQUFLO3FCQUVMLE1BQU07MEJBQ04sTUFBTTs7OztJQVRQLGlEQUF5Qzs7SUFDekMsa0RBQWdEOztJQUNoRCx3REFBZ0Q7O0lBQ2hELG1EQUF5Qzs7SUFDekMsdURBQW9EOztJQUNwRCx5REFBMkI7O0lBQzNCLGtEQUFpQzs7SUFFakMsa0RBQTBEOztJQUMxRCx1REFBa0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtcbiAgSU1hcmtkb3duTmF2aWdhdG9ySXRlbSxcbiAgSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzLFxuICBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aCxcbn0gZnJvbSAnLi4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzIGV4dGVuZHMgSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzIHtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIGNsb3NlPzogc3RyaW5nO1xuICBkb2NrPzogc3RyaW5nO1xuICB1bkRvY2s/OiBzdHJpbmc7XG59XG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzID0ge1xuICB0aXRsZTogJ0hlbHAnLFxuICBjbG9zZTogJ0Nsb3NlJyxcbiAgZG9jazogJ0RvY2snLFxuICB1bkRvY2s6ICdVbmRvY2snLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGQtbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdycsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQge1xuICBASW5wdXQoKSBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuICBASW5wdXQoKSBsYWJlbHM6IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscztcbiAgQElucHV0KCkgdG9vbGJhckNvbG9yOiBUaGVtZVBhbGV0dGUgPSAncHJpbWFyeSc7XG4gIEBJbnB1dCgpIHN0YXJ0QXQ6IElNYXJrZG93bk5hdmlnYXRvckl0ZW07XG4gIEBJbnB1dCgpIGNvbXBhcmVXaXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aDtcbiAgdG9vbGJhckhlaWdodDogbnVtYmVyID0gNTY7XG4gIEBJbnB1dCgpIGRvY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBjbG9zZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRvY2tUb2dnbGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZ2V0IG1hcmtkb3duTmF2aWdhdG9yTGFiZWxzKCk6IElNYXJrZG93bk5hdmlnYXRvckxhYmVscyB7XG4gICAgaWYgKHRoaXMubGFiZWxzKSB7XG4gICAgICBjb25zdCB7IGdvSG9tZSwgZ29CYWNrLCBlbXB0eVN0YXRlIH06IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscyA9IHRoaXMubGFiZWxzO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ29Ib21lLFxuICAgICAgICBnb0JhY2ssXG4gICAgICAgIGVtcHR5U3RhdGUsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBnZXQgdGl0bGVMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMudGl0bGUpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX1dJTkRPV19MQUJFTFMudGl0bGU7XG4gIH1cblxuICBnZXQgY2xvc2VMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuY2xvc2UpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX1dJTkRPV19MQUJFTFMuY2xvc2U7XG4gIH1cblxuICBnZXQgdG9nZ2xlRG9ja2VkU3RhdGVMYWJlbCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmRvY2tlZCkge1xuICAgICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy51bkRvY2spIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX1dJTkRPV19MQUJFTFMudW5Eb2NrO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmRvY2spIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX1dJTkRPV19MQUJFTFMuZG9jaztcbiAgICB9XG4gIH1cblxuICB0b2dnbGVEb2NrZWRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRvY2tUb2dnbGVkLmVtaXQodGhpcy5kb2NrZWQpO1xuICB9XG59XG4iXX0=