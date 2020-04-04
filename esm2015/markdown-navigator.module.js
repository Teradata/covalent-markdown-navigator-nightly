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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxpRUFBaUUsQ0FBQztBQUNySCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSwyRUFBMkUsQ0FBQztBQUMvSCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1RUFBdUUsQ0FBQztBQW9CekgsTUFBTSxPQUFPLCtCQUErQjs7O1lBbEIzQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBRVosV0FBVztvQkFDWCxlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixhQUFhO29CQUNiLG9CQUFvQjtvQkFDcEIscUJBQXFCO29CQUNyQiw4QkFBOEI7b0JBQzlCLHFCQUFxQjtpQkFDdEI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsNEJBQTRCLEVBQUUsa0NBQWtDLEVBQUUsa0NBQWtDLENBQUM7Z0JBQ3BILE9BQU8sRUFBRSxDQUFDLDRCQUE0QixFQUFFLGtDQUFrQyxFQUFFLGtDQUFrQyxDQUFDO2dCQUMvRyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQzthQUM5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVGRNYXJrZG93bk5hdmlnYXRvckNvbXBvbmVudCB9IGZyb20gJy4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50IH0gZnJvbSAnLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93L21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdCc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRQcm9ncmVzc0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLWJhcic7XG5pbXBvcnQgeyBDb3ZhbGVudEZsYXZvcmVkTWFya2Rvd25Nb2R1bGUgfSBmcm9tICdAY292YWxlbnQvZmxhdm9yZWQtbWFya2Rvd24nO1xuaW1wb3J0IHsgQ292YWxlbnREaWFsb2dzTW9kdWxlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUvZGlhbG9ncyc7XG5pbXBvcnQgeyBDb3ZhbGVudE1lc3NhZ2VNb2R1bGUgfSBmcm9tICdAY292YWxlbnQvY29yZS9tZXNzYWdlJztcbmltcG9ydCB7IFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaXJlY3RpdmUgfSBmcm9tICcuL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3ctZGlyZWN0aXZlL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlIH0gZnJvbSAnLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LXNlcnZpY2UvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcblxuICAgIC8vIG1hdGVyaWFsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIENvdmFsZW50TWVzc2FnZU1vZHVsZSxcbiAgICBDb3ZhbGVudEZsYXZvcmVkTWFya2Rvd25Nb2R1bGUsXG4gICAgQ292YWxlbnREaWFsb2dzTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtUZE1hcmtkb3duTmF2aWdhdG9yQ29tcG9uZW50LCBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50LCBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW1RkTWFya2Rvd25OYXZpZ2F0b3JDb21wb25lbnQsIFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQsIFRkTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaXJlY3RpdmVdLFxuICBwcm92aWRlcnM6IFtUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93U2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENvdmFsZW50TWFya2Rvd25OYXZpZ2F0b3JNb2R1bGUge31cbiJdfQ==