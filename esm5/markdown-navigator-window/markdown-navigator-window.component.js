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
export var DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS = {
    title: 'Help',
    close: 'Close',
    dock: 'Dock',
    unDock: 'Undock',
};
var MarkdownNavigatorWindowComponent = /** @class */ (function () {
    function MarkdownNavigatorWindowComponent() {
        this.toolbarColor = 'primary';
        this.toolbarHeight = 56;
        this.docked = false;
        this.closed = new EventEmitter();
        this.dockToggled = new EventEmitter();
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
    Object.defineProperty(MarkdownNavigatorWindowComponent.prototype, "toggleDockedStateLabel", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.docked) {
                return (this.labels && this.labels.unDock) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.unDock;
            }
            else {
                return (this.labels && this.labels.dock) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.dock;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MarkdownNavigatorWindowComponent.prototype.toggleDockedState = /**
     * @return {?}
     */
    function () {
        this.dockToggled.emit(this.docked);
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvbWFya2Rvd24tbmF2aWdhdG9yLyIsInNvdXJjZXMiOlsibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQVFoRyxvREFLQzs7O0lBSkMsK0NBQWU7O0lBQ2YsK0NBQWU7O0lBQ2YsOENBQWM7O0lBQ2QsZ0RBQWdCOzs7QUFFbEIsTUFBTSxLQUFPLHdDQUF3QyxHQUFtQztJQUN0RixLQUFLLEVBQUUsTUFBTTtJQUNiLEtBQUssRUFBRSxPQUFPO0lBQ2QsSUFBSSxFQUFFLE1BQU07SUFDWixNQUFNLEVBQUUsUUFBUTtDQUNqQjtBQUVEO0lBQUE7UUFTVyxpQkFBWSxHQUFpQixTQUFTLENBQUM7UUFHaEQsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFDbEIsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUV2QixXQUFNLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsZ0JBQVcsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQStCcEUsQ0FBQztJQTdCQyxzQkFBSSxxRUFBdUI7Ozs7UUFBM0I7WUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsSUFBQSxnQkFBNEUsRUFBMUUsa0JBQU0sRUFBRSxrQkFBTSxFQUFFLDBCQUEwRDtnQkFDbEYsT0FBTztvQkFDTCxNQUFNLFFBQUE7b0JBQ04sTUFBTSxRQUFBO29CQUNOLFVBQVUsWUFBQTtpQkFDWCxDQUFDO2FBQ0g7UUFDSCxDQUFDOzs7T0FBQTtJQUNELHNCQUFJLHdEQUFVOzs7O1FBQWQ7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLEtBQUssQ0FBQztRQUM5RixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHdEQUFVOzs7O1FBQWQ7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLEtBQUssQ0FBQztRQUM5RixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9FQUFzQjs7OztRQUExQjtZQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLE1BQU0sQ0FBQzthQUMvRjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLElBQUksQ0FBQzthQUMzRjtRQUNILENBQUM7OztPQUFBOzs7O0lBRUQsNERBQWlCOzs7SUFBakI7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Z0JBOUNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsOEJBQThCO29CQUN4QyxrN0NBQXlEO29CQUV6RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7d0JBRUUsS0FBSzt5QkFDTCxLQUFLOytCQUNMLEtBQUs7MEJBQ0wsS0FBSzs4QkFDTCxLQUFLO3lCQUVMLEtBQUs7eUJBRUwsTUFBTTs4QkFDTixNQUFNOztJQStCVCx1Q0FBQztDQUFBLEFBL0NELElBK0NDO1NBekNZLGdDQUFnQzs7O0lBQzNDLGlEQUF5Qzs7SUFDekMsa0RBQWdEOztJQUNoRCx3REFBZ0Q7O0lBQ2hELG1EQUF5Qzs7SUFDekMsdURBQW9EOztJQUNwRCx5REFBMkI7O0lBQzNCLGtEQUFpQzs7SUFFakMsa0RBQTBEOztJQUMxRCx1REFBa0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtcbiAgSU1hcmtkb3duTmF2aWdhdG9ySXRlbSxcbiAgSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzLFxuICBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aCxcbn0gZnJvbSAnLi4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzIGV4dGVuZHMgSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzIHtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIGNsb3NlPzogc3RyaW5nO1xuICBkb2NrPzogc3RyaW5nO1xuICB1bkRvY2s/OiBzdHJpbmc7XG59XG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzID0ge1xuICB0aXRsZTogJ0hlbHAnLFxuICBjbG9zZTogJ0Nsb3NlJyxcbiAgZG9jazogJ0RvY2snLFxuICB1bkRvY2s6ICdVbmRvY2snLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGQtbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdycsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQge1xuICBASW5wdXQoKSBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuICBASW5wdXQoKSBsYWJlbHM6IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscztcbiAgQElucHV0KCkgdG9vbGJhckNvbG9yOiBUaGVtZVBhbGV0dGUgPSAncHJpbWFyeSc7XG4gIEBJbnB1dCgpIHN0YXJ0QXQ6IElNYXJrZG93bk5hdmlnYXRvckl0ZW07XG4gIEBJbnB1dCgpIGNvbXBhcmVXaXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aDtcbiAgdG9vbGJhckhlaWdodDogbnVtYmVyID0gNTY7XG4gIEBJbnB1dCgpIGRvY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBjbG9zZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRvY2tUb2dnbGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZ2V0IG1hcmtkb3duTmF2aWdhdG9yTGFiZWxzKCk6IElNYXJrZG93bk5hdmlnYXRvckxhYmVscyB7XG4gICAgaWYgKHRoaXMubGFiZWxzKSB7XG4gICAgICBjb25zdCB7IGdvSG9tZSwgZ29CYWNrLCBlbXB0eVN0YXRlIH06IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscyA9IHRoaXMubGFiZWxzO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ29Ib21lLFxuICAgICAgICBnb0JhY2ssXG4gICAgICAgIGVtcHR5U3RhdGUsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBnZXQgdGl0bGVMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMudGl0bGUpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX1dJTkRPV19MQUJFTFMudGl0bGU7XG4gIH1cblxuICBnZXQgY2xvc2VMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuY2xvc2UpIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX1dJTkRPV19MQUJFTFMuY2xvc2U7XG4gIH1cblxuICBnZXQgdG9nZ2xlRG9ja2VkU3RhdGVMYWJlbCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmRvY2tlZCkge1xuICAgICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy51bkRvY2spIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX1dJTkRPV19MQUJFTFMudW5Eb2NrO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmRvY2spIHx8IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX1dJTkRPV19MQUJFTFMuZG9jaztcbiAgICB9XG4gIH1cblxuICB0b2dnbGVEb2NrZWRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRvY2tUb2dnbGVkLmVtaXQodGhpcy5kb2NrZWQpO1xuICB9XG59XG4iXX0=