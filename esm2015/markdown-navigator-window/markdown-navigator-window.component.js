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
export class TdMarkdownNavigatorWindowComponent {
    constructor() {
        this.toolbarColor = 'primary';
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
TdMarkdownNavigatorWindowComponent.decorators = [
    { type: Component, args: [{
                selector: 'td-markdown-navigator-window',
                template: "<td-window-dialog\n  [toolbarColor]=\"toolbarColor\"\n  [docked]=\"docked\"\n  [title]=\"titleLabel\"\n  [toggleDockedStateLabel]=\"toggleDockedStateLabel\"\n  [closeLabel]=\"closeLabel\"\n  (dockToggled)=\"toggleDockedState()\"\n  (closed)=\"closed.emit()\"\n>\n  <td-markdown-navigator\n    [items]=\"items\"\n    [labels]=\"markdownNavigatorLabels\"\n    [style.display]=\"docked ? 'none' : 'inherit'\"\n    [startAt]=\"startAt\"\n    [compareWith]=\"compareWith\"\n  ></td-markdown-navigator>\n</td-window-dialog>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}td-markdown-navigator{height:calc(100% - 56px)}"]
            }] }
];
TdMarkdownNavigatorWindowComponent.propDecorators = {
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
    TdMarkdownNavigatorWindowComponent.prototype.items;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.labels;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.toolbarColor;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.startAt;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.compareWith;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.docked;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.closed;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.dockToggled;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvbWFya2Rvd24tbmF2aWdhdG9yLyIsInNvdXJjZXMiOlsibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQVFoRyxvREFLQzs7O0lBSkMsK0NBQWU7O0lBQ2YsK0NBQWU7O0lBQ2YsOENBQWM7O0lBQ2QsZ0RBQWdCOzs7QUFFbEIsTUFBTSxPQUFPLHdDQUF3QyxHQUFtQztJQUN0RixLQUFLLEVBQUUsTUFBTTtJQUNiLEtBQUssRUFBRSxPQUFPO0lBQ2QsSUFBSSxFQUFFLE1BQU07SUFDWixNQUFNLEVBQUUsUUFBUTtDQUNqQjtBQVFELE1BQU0sT0FBTyxrQ0FBa0M7SUFOL0M7UUFTVyxpQkFBWSxHQUFpQixTQUFTLENBQUM7UUFHdkMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUV2QixXQUFNLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsZ0JBQVcsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQStCcEUsQ0FBQzs7OztJQTdCQyxJQUFJLHVCQUF1QjtRQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7a0JBQ1QsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFtQyxJQUFJLENBQUMsTUFBTTtZQUNsRixPQUFPO2dCQUNMLE1BQU07Z0JBQ04sTUFBTTtnQkFDTixVQUFVO2FBQ1gsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7OztJQUNELElBQUksVUFBVTtRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksd0NBQXdDLENBQUMsS0FBSyxDQUFDO0lBQzlGLENBQUM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLEtBQUssQ0FBQztJQUM5RixDQUFDOzs7O0lBRUQsSUFBSSxzQkFBc0I7UUFDeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSx3Q0FBd0MsQ0FBQyxNQUFNLENBQUM7U0FDL0Y7YUFBTTtZQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksd0NBQXdDLENBQUMsSUFBSSxDQUFDO1NBQzNGO0lBQ0gsQ0FBQzs7OztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7WUE3Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLG1oQkFBeUQ7Z0JBRXpELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O29CQUVFLEtBQUs7cUJBQ0wsS0FBSzsyQkFDTCxLQUFLO3NCQUNMLEtBQUs7MEJBQ0wsS0FBSztxQkFDTCxLQUFLO3FCQUVMLE1BQU07MEJBQ04sTUFBTTs7OztJQVJQLG1EQUF5Qzs7SUFDekMsb0RBQWdEOztJQUNoRCwwREFBZ0Q7O0lBQ2hELHFEQUF5Qzs7SUFDekMseURBQW9EOztJQUNwRCxvREFBaUM7O0lBRWpDLG9EQUEwRDs7SUFDMUQseURBQWtFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaGVtZVBhbGV0dGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7XG4gIElNYXJrZG93bk5hdmlnYXRvckl0ZW0sXG4gIElNYXJrZG93bk5hdmlnYXRvckxhYmVscyxcbiAgSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGgsXG59IGZyb20gJy4uL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscyBleHRlbmRzIElNYXJrZG93bk5hdmlnYXRvckxhYmVscyB7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBjbG9zZT86IHN0cmluZztcbiAgZG9jaz86IHN0cmluZztcbiAgdW5Eb2NrPzogc3RyaW5nO1xufVxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUFSS0RPV05fTkFWSUdBVE9SX1dJTkRPV19MQUJFTFM6IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscyA9IHtcbiAgdGl0bGU6ICdIZWxwJyxcbiAgY2xvc2U6ICdDbG9zZScsXG4gIGRvY2s6ICdEb2NrJyxcbiAgdW5Eb2NrOiAnVW5kb2NrJyxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RkLW1hcmtkb3duLW5hdmlnYXRvci13aW5kb3cnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQge1xuICBASW5wdXQoKSBpdGVtczogSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuICBASW5wdXQoKSBsYWJlbHM6IElNYXJrZG93bk5hdmlnYXRvcldpbmRvd0xhYmVscztcbiAgQElucHV0KCkgdG9vbGJhckNvbG9yOiBUaGVtZVBhbGV0dGUgPSAncHJpbWFyeSc7XG4gIEBJbnB1dCgpIHN0YXJ0QXQ6IElNYXJrZG93bk5hdmlnYXRvckl0ZW07XG4gIEBJbnB1dCgpIGNvbXBhcmVXaXRoOiBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aDtcbiAgQElucHV0KCkgZG9ja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGNsb3NlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZG9ja1RvZ2dsZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBnZXQgbWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMoKTogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzIHtcbiAgICBpZiAodGhpcy5sYWJlbHMpIHtcbiAgICAgIGNvbnN0IHsgZ29Ib21lLCBnb0JhY2ssIGVtcHR5U3RhdGUgfTogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzID0gdGhpcy5sYWJlbHM7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnb0hvbWUsXG4gICAgICAgIGdvQmFjayxcbiAgICAgICAgZW1wdHlTdGF0ZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGdldCB0aXRsZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy50aXRsZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy50aXRsZTtcbiAgfVxuXG4gIGdldCBjbG9zZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5jbG9zZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy5jbG9zZTtcbiAgfVxuXG4gIGdldCB0b2dnbGVEb2NrZWRTdGF0ZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuZG9ja2VkKSB7XG4gICAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLnVuRG9jaykgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy51bkRvY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZG9jaykgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy5kb2NrO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZURvY2tlZFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuZG9ja1RvZ2dsZWQuZW1pdCh0aGlzLmRvY2tlZCk7XG4gIH1cbn1cbiJdfQ==