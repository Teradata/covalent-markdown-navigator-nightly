/**
 * @fileoverview added by tsickle
 * Generated from: markdown-navigator.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TdMarkdownNavigatorComponent } from './markdown-navigator.component';
import { TdMarkdownNavigatorWindowComponent } from './markdown-navigator-window/markdown-navigator-window.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CovalentFlavoredMarkdownModule } from '@covalent/flavored-markdown';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentMessageModule } from '@covalent/core/message';
import { TdMarkdownNavigatorWindowDirective } from './markdown-navigator-window-directive/markdown-navigator-window.directive';
import { TdMarkdownNavigatorWindowService } from './markdown-navigator-window-service/markdown-navigator-window.service';
export class CovalentMarkdownNavigatorModule {
}
CovalentMarkdownNavigatorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    // material
                    MatButtonModule,
                    MatTooltipModule,
                    MatListModule,
                    MatIconModule,
                    MatProgressBarModule,
                    CovalentMessageModule,
                    CovalentFlavoredMarkdownModule,
                    CovalentDialogsModule,
                ],
                declarations: [TdMarkdownNavigatorComponent, TdMarkdownNavigatorWindowComponent, TdMarkdownNavigatorWindowDirective],
                exports: [TdMarkdownNavigatorComponent, TdMarkdownNavigatorWindowComponent, TdMarkdownNavigatorWindowDirective],
                providers: [TdMarkdownNavigatorWindowService],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9zcmMvcGxhdGZvcm0vbWFya2Rvd24tbmF2aWdhdG9yLyIsInNvdXJjZXMiOlsibWFya2Rvd24tbmF2aWdhdG9yLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQ3JILE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLDJFQUEyRSxDQUFDO0FBQy9ILE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHVFQUF1RSxDQUFDO0FBb0J6SCxNQUFNLE9BQU8sK0JBQStCOzs7WUFsQjNDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFFWixXQUFXO29CQUNYLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLGFBQWE7b0JBQ2Isb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLDhCQUE4QjtvQkFDOUIscUJBQXFCO2lCQUN0QjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxrQ0FBa0MsRUFBRSxrQ0FBa0MsQ0FBQztnQkFDcEgsT0FBTyxFQUFFLENBQUMsNEJBQTRCLEVBQUUsa0NBQWtDLEVBQUUsa0NBQWtDLENBQUM7Z0JBQy9HLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO2FBQzlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUZE1hcmtkb3duTmF2aWdhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQgfSBmcm9tICcuL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9saXN0JztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdFByb2dyZXNzQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3MtYmFyJztcbmltcG9ydCB7IENvdmFsZW50Rmxhdm9yZWRNYXJrZG93bk1vZHVsZSB9IGZyb20gJ0Bjb3ZhbGVudC9mbGF2b3JlZC1tYXJrZG93bic7XG5pbXBvcnQgeyBDb3ZhbGVudERpYWxvZ3NNb2R1bGUgfSBmcm9tICdAY292YWxlbnQvY29yZS9kaWFsb2dzJztcbmltcG9ydCB7IENvdmFsZW50TWVzc2FnZU1vZHVsZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlL21lc3NhZ2UnO1xuaW1wb3J0IHsgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpcmVjdGl2ZSB9IGZyb20gJy4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy1kaXJlY3RpdmUvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd1NlcnZpY2UgfSBmcm9tICcuL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctc2VydmljZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuXG4gICAgLy8gbWF0ZXJpYWxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgQ292YWxlbnRNZXNzYWdlTW9kdWxlLFxuICAgIENvdmFsZW50Rmxhdm9yZWRNYXJrZG93bk1vZHVsZSxcbiAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1RkTWFya2Rvd25OYXZpZ2F0b3JDb21wb25lbnQsIFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQsIFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbVGRNYXJrZG93bk5hdmlnYXRvckNvbXBvbmVudCwgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCwgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpcmVjdGl2ZV0sXG4gIHByb3ZpZGVyczogW1RkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ292YWxlbnRNYXJrZG93bk5hdmlnYXRvck1vZHVsZSB7fVxuIl19