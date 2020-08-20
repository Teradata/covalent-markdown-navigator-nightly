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
export var DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS = {
    title: 'Help',
    close: 'Close',
    dock: 'Dock',
    unDock: 'Undock',
};
var TdMarkdownNavigatorWindowComponent = /** @class */ (function () {
    function TdMarkdownNavigatorWindowComponent() {
        this.toolbarColor = 'primary';
        this.docked = false;
        this.copyCodeToClipboard = false;
        this.copyCodeTooltips = {};
        this.closed = new EventEmitter();
        this.dockToggled = new EventEmitter();
        this.buttonClicked = new EventEmitter();
    }
    Object.defineProperty(TdMarkdownNavigatorWindowComponent.prototype, "markdownNavigatorLabels", {
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
    Object.defineProperty(TdMarkdownNavigatorWindowComponent.prototype, "titleLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.labels && this.labels.title) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorWindowComponent.prototype, "closeLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.labels && this.labels.close) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.close;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdMarkdownNavigatorWindowComponent.prototype, "toggleDockedStateLabel", {
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
    TdMarkdownNavigatorWindowComponent.prototype.toggleDockedState = /**
     * @return {?}
     */
    function () {
        this.dockToggled.emit(this.docked);
    };
    TdMarkdownNavigatorWindowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'td-markdown-navigator-window',
                    template: "<td-window-dialog\n  [toolbarColor]=\"toolbarColor\"\n  [docked]=\"docked\"\n  [title]=\"titleLabel\"\n  [toggleDockedStateLabel]=\"toggleDockedStateLabel\"\n  [closeLabel]=\"closeLabel\"\n  (dockToggled)=\"toggleDockedState()\"\n  (closed)=\"closed.emit()\"\n>\n  <td-markdown-navigator\n    [items]=\"items\"\n    [labels]=\"markdownNavigatorLabels\"\n    [style.display]=\"docked ? 'none' : 'inherit'\"\n    [startAt]=\"startAt\"\n    [compareWith]=\"compareWith\"\n    [footer]=\"footer\"\n    [copyCodeToClipboard]=\"copyCodeToClipboard\"\n    [copyCodeTooltips]=\"copyCodeTooltips\"\n    (buttonClicked)=\"buttonClicked.emit($event)\"\n  ></td-markdown-navigator>\n</td-window-dialog>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{height:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}td-markdown-navigator{height:calc(100% - 56px)}"]
                }] }
    ];
    TdMarkdownNavigatorWindowComponent.propDecorators = {
        items: [{ type: Input }],
        labels: [{ type: Input }],
        toolbarColor: [{ type: Input }],
        startAt: [{ type: Input }],
        compareWith: [{ type: Input }],
        docked: [{ type: Input }],
        copyCodeToClipboard: [{ type: Input }],
        copyCodeTooltips: [{ type: Input }],
        footer: [{ type: Input }],
        closed: [{ type: Output }],
        dockToggled: [{ type: Output }],
        buttonClicked: [{ type: Output }]
    };
    return TdMarkdownNavigatorWindowComponent;
}());
export { TdMarkdownNavigatorWindowComponent };
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
    TdMarkdownNavigatorWindowComponent.prototype.copyCodeToClipboard;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.copyCodeTooltips;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.footer;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.closed;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.dockToggled;
    /** @type {?} */
    TdMarkdownNavigatorWindowComponent.prototype.buttonClicked;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY292YWxlbnQvbWFya2Rvd24tbmF2aWdhdG9yLyIsInNvdXJjZXMiOlsibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFVdEcsb0RBS0M7OztJQUpDLCtDQUFlOztJQUNmLCtDQUFlOztJQUNmLDhDQUFjOztJQUNkLGdEQUFnQjs7O0FBRWxCLE1BQU0sS0FBTyx3Q0FBd0MsR0FBbUM7SUFDdEYsS0FBSyxFQUFFLE1BQU07SUFDYixLQUFLLEVBQUUsT0FBTztJQUNkLElBQUksRUFBRSxNQUFNO0lBQ1osTUFBTSxFQUFFLFFBQVE7Q0FDakI7QUFFRDtJQUFBO1FBU1csaUJBQVksR0FBaUIsU0FBUyxDQUFDO1FBR3ZDLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLHFCQUFnQixHQUFzQixFQUFFLENBQUM7UUFHeEMsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELGdCQUFXLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEQsa0JBQWEsR0FBc0QsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQStCbEcsQ0FBQztJQTdCQyxzQkFBSSx1RUFBdUI7Ozs7UUFBM0I7WUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsSUFBQSxnQkFBNEUsRUFBMUUsa0JBQU0sRUFBRSxrQkFBTSxFQUFFLDBCQUEwRDtnQkFDbEYsT0FBTztvQkFDTCxNQUFNLFFBQUE7b0JBQ04sTUFBTSxRQUFBO29CQUNOLFVBQVUsWUFBQTtpQkFDWCxDQUFDO2FBQ0g7UUFDSCxDQUFDOzs7T0FBQTtJQUNELHNCQUFJLDBEQUFVOzs7O1FBQWQ7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLEtBQUssQ0FBQztRQUM5RixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDBEQUFVOzs7O1FBQWQ7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLEtBQUssQ0FBQztRQUM5RixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHNFQUFzQjs7OztRQUExQjtZQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLE1BQU0sQ0FBQzthQUMvRjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLElBQUksQ0FBQzthQUMzRjtRQUNILENBQUM7OztPQUFBOzs7O0lBRUQsOERBQWlCOzs7SUFBakI7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Z0JBakRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsOEJBQThCO29CQUN4Qyxnc0JBQXlEO29CQUV6RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7d0JBRUUsS0FBSzt5QkFDTCxLQUFLOytCQUNMLEtBQUs7MEJBQ0wsS0FBSzs4QkFDTCxLQUFLO3lCQUNMLEtBQUs7c0NBQ0wsS0FBSzttQ0FDTCxLQUFLO3lCQUNMLEtBQUs7eUJBRUwsTUFBTTs4QkFDTixNQUFNO2dDQUNOLE1BQU07O0lBK0JULHlDQUFDO0NBQUEsQUFsREQsSUFrREM7U0E1Q1ksa0NBQWtDOzs7SUFDN0MsbURBQXlDOztJQUN6QyxvREFBZ0Q7O0lBQ2hELDBEQUFnRDs7SUFDaEQscURBQW9FOztJQUNwRSx5REFBb0Q7O0lBQ3BELG9EQUFpQzs7SUFDakMsaUVBQThDOztJQUM5Qyw4REFBa0Q7O0lBQ2xELG9EQUEyQjs7SUFFM0Isb0RBQTBEOztJQUMxRCx5REFBa0U7O0lBQ2xFLDJEQUFnRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1xuICBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtLFxuICBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMsXG4gIElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoLFxufSBmcm9tICcuLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IElUZEZsYXZvcmVkTWFya2Rvd25CdXR0b25DbGlja0V2ZW50IH0gZnJvbSAnQGNvdmFsZW50L2ZsYXZvcmVkLW1hcmtkb3duJztcbmltcG9ydCB7IElDb3B5Q29kZVRvb2x0aXBzIH0gZnJvbSAnQGNvdmFsZW50L2hpZ2hsaWdodCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzIGV4dGVuZHMgSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzIHtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIGNsb3NlPzogc3RyaW5nO1xuICBkb2NrPzogc3RyaW5nO1xuICB1bkRvY2s/OiBzdHJpbmc7XG59XG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUzogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzID0ge1xuICB0aXRsZTogJ0hlbHAnLFxuICBjbG9zZTogJ0Nsb3NlJyxcbiAgZG9jazogJ0RvY2snLFxuICB1bkRvY2s6ICdVbmRvY2snLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGQtbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdycsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGl0ZW1zOiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtW107XG4gIEBJbnB1dCgpIGxhYmVsczogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzO1xuICBASW5wdXQoKSB0b29sYmFyQ29sb3I6IFRoZW1lUGFsZXR0ZSA9ICdwcmltYXJ5JztcbiAgQElucHV0KCkgc3RhcnRBdDogSU1hcmtkb3duTmF2aWdhdG9ySXRlbSB8IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcbiAgQElucHV0KCkgY29tcGFyZVdpdGg6IElNYXJrZG93bk5hdmlnYXRvckNvbXBhcmVXaXRoO1xuICBASW5wdXQoKSBkb2NrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY29weUNvZGVUb0NsaXBib2FyZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBjb3B5Q29kZVRvb2x0aXBzOiBJQ29weUNvZGVUb29sdGlwcyA9IHt9O1xuICBASW5wdXQoKSBmb290ZXI6IFR5cGU8YW55PjtcblxuICBAT3V0cHV0KCkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkb2NrVG9nZ2xlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPElUZEZsYXZvcmVkTWFya2Rvd25CdXR0b25DbGlja0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBnZXQgbWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMoKTogSU1hcmtkb3duTmF2aWdhdG9yTGFiZWxzIHtcbiAgICBpZiAodGhpcy5sYWJlbHMpIHtcbiAgICAgIGNvbnN0IHsgZ29Ib21lLCBnb0JhY2ssIGVtcHR5U3RhdGUgfTogSU1hcmtkb3duTmF2aWdhdG9yV2luZG93TGFiZWxzID0gdGhpcy5sYWJlbHM7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnb0hvbWUsXG4gICAgICAgIGdvQmFjayxcbiAgICAgICAgZW1wdHlTdGF0ZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGdldCB0aXRsZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy50aXRsZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy50aXRsZTtcbiAgfVxuXG4gIGdldCBjbG9zZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5jbG9zZSkgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy5jbG9zZTtcbiAgfVxuXG4gIGdldCB0b2dnbGVEb2NrZWRTdGF0ZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuZG9ja2VkKSB7XG4gICAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLnVuRG9jaykgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy51bkRvY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMuZG9jaykgfHwgREVGQVVMVF9NQVJLRE9XTl9OQVZJR0FUT1JfV0lORE9XX0xBQkVMUy5kb2NrO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZURvY2tlZFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuZG9ja1RvZ2dsZWQuZW1pdCh0aGlzLmRvY2tlZCk7XG4gIH1cbn1cbiJdfQ==