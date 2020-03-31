/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, Type } from '@angular/core';
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
                template: "<td-window-dialog\n  [toolbarColor]=\"toolbarColor\"\n  [docked]=\"docked\"\n  [title]=\"titleLabel\"\n  [toggleDockedStateLabel]=\"toggleDockedStateLabel\"\n  [closeLabel]=\"closeLabel\"\n  (dockToggled)=\"toggleDockedState()\"\n  (closed)=\"closed.emit()\"\n>\n  <td-markdown-navigator\n    [items]=\"items\"\n    [labels]=\"markdownNavigatorLabels\"\n    [style.display]=\"docked ? 'none' : 'inherit'\"\n    [startAt]=\"startAt\"\n    [compareWith]=\"compareWith\"\n    [footer]=\"footer\"\n  ></td-markdown-navigator>\n</td-window-dialog>\n",
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
    footer: [{ type: Input }],
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
    TdMarkdownNavigatorWindowComponent.prototype.footer;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.closed;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.dockToggled;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvbWFya2Rvd24tbmF2aWdhdG9yLyIsInNvdXJjZXMiOlsibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFRdEcsb0RBS0M7OztJQUpDLCtDQUFlOztJQUNmLCtDQUFlOztJQUNmLDhDQUFjOztJQUNkLGdEQUFnQjs7O0FBRWxCLE1BQU0sT0FBTyx3Q0FBd0MsR0FBbUM7SUFDdEYsS0FBSyxFQUFFLE1BQU07SUFDYixLQUFLLEVBQUUsT0FBTztJQUNkLElBQUksRUFBRSxNQUFNO0lBQ1osTUFBTSxFQUFFLFFBQVE7Q0FDakI7QUFRRCxNQUFNLE9BQU8sa0NBQWtDO0lBTi9DO1FBU1csaUJBQVksR0FBaUIsU0FBUyxDQUFDO1FBR3ZDLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFHdkIsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELGdCQUFXLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7SUErQnBFLENBQUM7Ozs7SUE3QkMsSUFBSSx1QkFBdUI7UUFDekIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2tCQUNULEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBbUMsSUFBSSxDQUFDLE1BQU07WUFDbEYsT0FBTztnQkFDTCxNQUFNO2dCQUNOLE1BQU07Z0JBQ04sVUFBVTthQUNYLENBQUM7U0FDSDtJQUNILENBQUM7Ozs7SUFDRCxJQUFJLFVBQVU7UUFDWixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLEtBQUssQ0FBQztJQUM5RixDQUFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSx3Q0FBd0MsQ0FBQyxLQUFLLENBQUM7SUFDOUYsQ0FBQzs7OztJQUVELElBQUksc0JBQXNCO1FBQ3hCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksd0NBQXdDLENBQUMsTUFBTSxDQUFDO1NBQy9GO2FBQU07WUFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLElBQUksQ0FBQztTQUMzRjtJQUNILENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7O1lBOUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsOEJBQThCO2dCQUN4Qyw0aUJBQXlEO2dCQUV6RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7OztvQkFFRSxLQUFLO3FCQUNMLEtBQUs7MkJBQ0wsS0FBSztzQkFDTCxLQUFLOzBCQUNMLEtBQUs7cUJBQ0wsS0FBSztxQkFDTCxLQUFLO3FCQUVMLE1BQU07MEJBQ04sTUFBTTs7OztJQVRQLG1EQUF5Qzs7SUFDekMsb0RBQWdEOztJQUNoRCwwREFBZ0Q7O0lBQ2hELHFEQUF5Qzs7SUFDekMseURBQW9EOztJQUNwRCxvREFBaUM7O0lBQ2pDLG9EQUEyQjs7SUFFM0Isb0RBQTBEOztJQUMxRCx5REFBa0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtcbiAgSU1hcmtkb3duTmF2aWdhdG9ySXRlbSxcbiAgSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzLFxuICBJTWFya2Rvd25OYXZpZ2F0b3JDb21wYXJlV2l0aCxcbn0gZnJvbSAnLi4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzIGV4dGVuZHMgSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzIHtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIGNsb3NlPzogc3RyaW5nO1xuICBkb2NrPzogc3RyaW5nO1xuICB1bkRvY2s/OiBzdHJpbmc7XG59XG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzID0ge1xuICB0aXRsZTogJ0hlbHAnLFxuICBjbG9zZTogJ0Nsb3NlJyxcbiAgZG9jazogJ0RvY2snLFxuICB1bkRvY2s6ICdVbmRvY2snLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGQtbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdycsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG4gIEBJbnB1dCgpIGxhYmVsczogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzO1xuICBASW5wdXQoKSB0b29sYmFyQ29sb3I6IFRoZW1lUGFsZXR0ZSA9ICdwcmltYXJ5JztcbiAgQElucHV0KCkgc3RhcnRBdDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbTtcbiAgQElucHV0KCkgY29tcGFyZVdpdGg6IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoO1xuICBASW5wdXQoKSBkb2NrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZm9vdGVyOiBUeXBlPGFueT47XG5cbiAgQE91dHB1dCgpIGNsb3NlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZG9ja1RvZ2dsZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBnZXQgbWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMoKTogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzIHtcbiAgICBpZiAodGhpcy5sYWJlbHMpIHtcbiAgICAgIGNvbnN0IHsgZ29Ib21lLCBnb0JhY2ssIGVtcHR5U3RhdGUgfTogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzID0gdGhpcy5sYWJlbHM7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnb0hvbWUsXG4gICAgICAgIGdvQmFjayxcbiAgICAgICAgZW1wdHlTdGF0ZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGdldCB0aXRsZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy50aXRsZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy50aXRsZTtcbiAgfVxuXG4gIGdldCBjbG9zZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5jbG9zZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy5jbG9zZTtcbiAgfVxuXG4gIGdldCB0b2dnbGVEb2NrZWRTdGF0ZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuZG9ja2VkKSB7XG4gICAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLnVuRG9jaykgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy51bkRvY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZG9jaykgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy5kb2NrO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZURvY2tlZFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuZG9ja1RvZ2dsZWQuZW1pdCh0aGlzLmRvY2tlZCk7XG4gIH1cbn1cbiJdfQ==