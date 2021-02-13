/**
 * @fileoverview added by tsickle
 * Generated from: markdown-navigator-window/markdown-navigator-window.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.copyCodeToClipboard = false;
        this.copyCodeTooltips = {};
        this.closed = new EventEmitter();
        this.dockToggled = new EventEmitter();
        this.buttonClicked = new EventEmitter();
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
                template: "<td-window-dialog\n  [toolbarColor]=\"toolbarColor\"\n  [docked]=\"docked\"\n  [title]=\"titleLabel\"\n  [toggleDockedStateLabel]=\"toggleDockedStateLabel\"\n  [closeLabel]=\"closeLabel\"\n  (dockToggled)=\"toggleDockedState()\"\n  (closed)=\"closed.emit()\"\n>\n  <td-markdown-navigator\n    [items]=\"items\"\n    [labels]=\"markdownNavigatorLabels\"\n    [style.display]=\"docked ? 'none' : 'inherit'\"\n    [startAt]=\"startAt\"\n    [compareWith]=\"compareWith\"\n    [footer]=\"footer\"\n    [copyCodeToClipboard]=\"copyCodeToClipboard\"\n    [copyCodeTooltips]=\"copyCodeTooltips\"\n    (buttonClicked)=\"buttonClicked.emit($event)\"\n  ></td-markdown-navigator>\n</td-window-dialog>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{-ms-flex-direction:column;display:-ms-flexbox;display:flex;flex-direction:column;height:100%}td-markdown-navigator{height:calc(100% - 56px)}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vc3JjL3BsYXRmb3JtL21hcmtkb3duLW5hdmlnYXRvci8iLCJzb3VyY2VzIjpbIm1hcmtkb3duLW5hdmlnYXRvci13aW5kb3cvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQVV0RyxvREFLQzs7O0lBSkMsK0NBQWU7O0lBQ2YsK0NBQWU7O0lBQ2YsOENBQWM7O0lBQ2QsZ0RBQWdCOzs7QUFFbEIsTUFBTSxPQUFPLHdDQUF3QyxHQUFtQztJQUN0RixLQUFLLEVBQUUsTUFBTTtJQUNiLEtBQUssRUFBRSxPQUFPO0lBQ2QsSUFBSSxFQUFFLE1BQU07SUFDWixNQUFNLEVBQUUsUUFBUTtDQUNqQjtBQVFELE1BQU0sT0FBTyxrQ0FBa0M7SUFOL0M7UUFTVyxpQkFBWSxHQUFpQixTQUFTLENBQUM7UUFHdkMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN4Qix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMscUJBQWdCLEdBQXNCLEVBQUUsQ0FBQztRQUd4QyxXQUFNLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsZ0JBQVcsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4RCxrQkFBYSxHQUFzRCxJQUFJLFlBQVksRUFBRSxDQUFDO0lBK0JsRyxDQUFDOzs7O0lBN0JDLElBQUksdUJBQXVCO1FBQ3pCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtrQkFDVCxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQW1DLElBQUksQ0FBQyxNQUFNO1lBQ2xGLE9BQU87Z0JBQ0wsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFVBQVU7YUFDWCxDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7O0lBQ0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSx3Q0FBd0MsQ0FBQyxLQUFLLENBQUM7SUFDOUYsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksd0NBQXdDLENBQUMsS0FBSyxDQUFDO0lBQzlGLENBQUM7Ozs7SUFFRCxJQUFJLHNCQUFzQjtRQUN4QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLE1BQU0sQ0FBQztTQUMvRjthQUFNO1lBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSx3Q0FBd0MsQ0FBQyxJQUFJLENBQUM7U0FDM0Y7SUFDSCxDQUFDOzs7O0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7OztZQWpERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsZ3NCQUF5RDtnQkFFekQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7b0JBRUUsS0FBSztxQkFDTCxLQUFLOzJCQUNMLEtBQUs7c0JBQ0wsS0FBSzswQkFDTCxLQUFLO3FCQUNMLEtBQUs7a0NBQ0wsS0FBSzsrQkFDTCxLQUFLO3FCQUNMLEtBQUs7cUJBRUwsTUFBTTswQkFDTixNQUFNOzRCQUNOLE1BQU07Ozs7SUFaUCxtREFBeUM7O0lBQ3pDLG9EQUFnRDs7SUFDaEQsMERBQWdEOztJQUNoRCxxREFBb0U7O0lBQ3BFLHlEQUFvRDs7SUFDcEQsb0RBQWlDOztJQUNqQyxpRUFBOEM7O0lBQzlDLDhEQUFrRDs7SUFDbEQsb0RBQTJCOztJQUUzQixvREFBMEQ7O0lBQzFELHlEQUFrRTs7SUFDbEUsMkRBQWdHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaGVtZVBhbGV0dGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7XG4gIElNYXJrZG93bk5hdmlnYXRvckl0ZW0sXG4gIElNYXJrZG93bk5hdmlnYXRvckxhYmVscyxcbiAgSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGgsXG59IGZyb20gJy4uL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSVRkRmxhdm9yZWRNYXJrZG93bkJ1dHRvbkNsaWNrRXZlbnQgfSBmcm9tICdAY292YWxlbnQvZmxhdm9yZWQtbWFya2Rvd24nO1xuaW1wb3J0IHsgSUNvcHlDb2RlVG9vbHRpcHMgfSBmcm9tICdAY292YWxlbnQvaGlnaGxpZ2h0JztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHMgZXh0ZW5kcyBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMge1xuICB0aXRsZT86IHN0cmluZztcbiAgY2xvc2U/OiBzdHJpbmc7XG4gIGRvY2s/OiBzdHJpbmc7XG4gIHVuRG9jaz86IHN0cmluZztcbn1cbmV4cG9ydCBjb25zdCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9XSU5ET1dfTEFCRUxTOiBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHMgPSB7XG4gIHRpdGxlOiAnSGVscCcsXG4gIGNsb3NlOiAnQ2xvc2UnLFxuICBkb2NrOiAnRG9jaycsXG4gIHVuRG9jazogJ1VuZG9jaycsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ZC1tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50IHtcbiAgQElucHV0KCkgaXRlbXM6IElNYXJrZG93bk5hdmlnYXRvckl0ZW1bXTtcbiAgQElucHV0KCkgbGFiZWxzOiBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHM7XG4gIEBJbnB1dCgpIHRvb2xiYXJDb2xvcjogVGhlbWVQYWxldHRlID0gJ3ByaW1hcnknO1xuICBASW5wdXQoKSBzdGFydEF0OiBJTWFya2Rvd25OYXZpZ2F0b3JJdGVtIHwgSU1hcmtkb3duTmF2aWdhdG9ySXRlbVtdO1xuICBASW5wdXQoKSBjb21wYXJlV2l0aDogSU1hcmtkb3duTmF2aWdhdG9yQ29tcGFyZVdpdGg7XG4gIEBJbnB1dCgpIGRvY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBjb3B5Q29kZVRvQ2xpcGJvYXJkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGNvcHlDb2RlVG9vbHRpcHM6IElDb3B5Q29kZVRvb2x0aXBzID0ge307XG4gIEBJbnB1dCgpIGZvb3RlcjogVHlwZTxhbnk+O1xuXG4gIEBPdXRwdXQoKSBjbG9zZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRvY2tUb2dnbGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBidXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8SVRkRmxhdm9yZWRNYXJrZG93bkJ1dHRvbkNsaWNrRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGdldCBtYXJrZG93bk5hdmlnYXRvckxhYmVscygpOiBJTWFya2Rvd25OYXZpZ2F0b3JMYWJlbHMge1xuICAgIGlmICh0aGlzLmxhYmVscykge1xuICAgICAgY29uc3QgeyBnb0hvbWUsIGdvQmFjaywgZW1wdHlTdGF0ZSB9OiBJTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dMYWJlbHMgPSB0aGlzLmxhYmVscztcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdvSG9tZSxcbiAgICAgICAgZ29CYWNrLFxuICAgICAgICBlbXB0eVN0YXRlLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgZ2V0IHRpdGxlTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLnRpdGxlKSB8fCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9XSU5ET1dfTEFCRUxTLnRpdGxlO1xuICB9XG5cbiAgZ2V0IGNsb3NlTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMubGFiZWxzICYmIHRoaXMubGFiZWxzLmNsb3NlKSB8fCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9XSU5ET1dfTEFCRUxTLmNsb3NlO1xuICB9XG5cbiAgZ2V0IHRvZ2dsZURvY2tlZFN0YXRlTGFiZWwoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5kb2NrZWQpIHtcbiAgICAgIHJldHVybiAodGhpcy5sYWJlbHMgJiYgdGhpcy5sYWJlbHMudW5Eb2NrKSB8fCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9XSU5ET1dfTEFCRUxTLnVuRG9jaztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICh0aGlzLmxhYmVscyAmJiB0aGlzLmxhYmVscy5kb2NrKSB8fCBERUZBVUxUX01BUktET1dOX05BVklHQVRPUl9XSU5ET1dfTEFCRUxTLmRvY2s7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlRG9ja2VkU3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5kb2NrVG9nZ2xlZC5lbWl0KHRoaXMuZG9ja2VkKTtcbiAgfVxufVxuIl19