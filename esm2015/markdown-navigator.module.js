/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
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
                    MatToolbarModule,
                    CovalentFlavoredMarkdownModule,
                    CovalentDialogsModule,
                ],
                declarations: [TdMarkdownNavigatorComponent, TdMarkdownNavigatorWindowComponent, TdMarkdownNavigatorWindowDirective],
                exports: [TdMarkdownNavigatorComponent, TdMarkdownNavigatorWindowComponent, TdMarkdownNavigatorWindowDirective],
                entryComponents: [TdMarkdownNavigatorWindowComponent],
                providers: [TdMarkdownNavigatorWindowService],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxpRUFBaUUsQ0FBQztBQUNySCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSwyRUFBMkUsQ0FBQztBQUMvSCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1RUFBdUUsQ0FBQztBQXNCekgsTUFBTSxPQUFPLCtCQUErQjs7O1lBcEIzQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBRVosV0FBVztvQkFDWCxlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixhQUFhO29CQUNiLG9CQUFvQjtvQkFDcEIsZ0JBQWdCO29CQUVoQiw4QkFBOEI7b0JBQzlCLHFCQUFxQjtpQkFDdEI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsNEJBQTRCLEVBQUUsa0NBQWtDLEVBQUUsa0NBQWtDLENBQUM7Z0JBQ3BILE9BQU8sRUFBRSxDQUFDLDRCQUE0QixFQUFFLGtDQUFrQyxFQUFFLGtDQUFrQyxDQUFDO2dCQUMvRyxlQUFlLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztnQkFDckQsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7YUFDOUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRkTWFya2Rvd25OYXZpZ2F0b3JDb21wb25lbnQgfSBmcm9tICcuL21hcmtkb3duLW5hdmlnYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCB9IGZyb20gJy4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTWF0TGlzdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xpc3QnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1iYXInO1xuaW1wb3J0IHsgQ292YWxlbnRGbGF2b3JlZE1hcmtkb3duTW9kdWxlIH0gZnJvbSAnQGNvdmFsZW50L2ZsYXZvcmVkLW1hcmtkb3duJztcbmltcG9ydCB7IE1hdFRvb2xiYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sYmFyJztcbmltcG9ydCB7IENvdmFsZW50RGlhbG9nc01vZHVsZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlL2RpYWxvZ3MnO1xuaW1wb3J0IHsgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpcmVjdGl2ZSB9IGZyb20gJy4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy1kaXJlY3RpdmUvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd1NlcnZpY2UgfSBmcm9tICcuL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctc2VydmljZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuXG4gICAgLy8gbWF0ZXJpYWxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcblxuICAgIENvdmFsZW50Rmxhdm9yZWRNYXJrZG93bk1vZHVsZSxcbiAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1RkTWFya2Rvd25OYXZpZ2F0b3JDb21wb25lbnQsIFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQsIFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbVGRNYXJrZG93bk5hdmlnYXRvckNvbXBvbmVudCwgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCwgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpcmVjdGl2ZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW1RkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93U2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENvdmFsZW50TWFya2Rvd25OYXZpZ2F0b3JNb2R1bGUge31cbiJdfQ==