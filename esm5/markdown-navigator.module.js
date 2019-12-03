/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownNavigatorComponent } from './markdown-navigator.component';
import { MarkdownNavigatorWindowComponent } from './markdown-navigator-window/markdown-navigator-window.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CovalentFlavoredMarkdownModule } from '@covalent/flavored-markdown';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { MarkdownNavigatorWindowDirective } from './markdown-navigator-window-directive/markdown-navigator-window.directive';
import { MarkdownNavigatorWindowService } from './markdown-navigator-window-service/markdown-navigator-window.service';
var CovalentMarkdownNavigatorModule = /** @class */ (function () {
    function CovalentMarkdownNavigatorModule() {
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
                    declarations: [MarkdownNavigatorComponent, MarkdownNavigatorWindowComponent, MarkdownNavigatorWindowDirective],
                    exports: [MarkdownNavigatorComponent, MarkdownNavigatorWindowComponent, MarkdownNavigatorWindowDirective],
                    entryComponents: [MarkdownNavigatorWindowComponent],
                    providers: [MarkdownNavigatorWindowService],
                },] }
    ];
    return CovalentMarkdownNavigatorModule;
}());
export { CovalentMarkdownNavigatorModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxpRUFBaUUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwyRUFBMkUsQ0FBQztBQUM3SCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSx1RUFBdUUsQ0FBQztBQUV2SDtJQUFBO0lBb0I4QyxDQUFDOztnQkFwQjlDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFFWixXQUFXO3dCQUNYLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLGFBQWE7d0JBQ2Isb0JBQW9CO3dCQUNwQixnQkFBZ0I7d0JBRWhCLDhCQUE4Qjt3QkFDOUIscUJBQXFCO3FCQUN0QjtvQkFDRCxZQUFZLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxnQ0FBZ0MsRUFBRSxnQ0FBZ0MsQ0FBQztvQkFDOUcsT0FBTyxFQUFFLENBQUMsMEJBQTBCLEVBQUUsZ0NBQWdDLEVBQUUsZ0NBQWdDLENBQUM7b0JBQ3pHLGVBQWUsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO29CQUNuRCxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztpQkFDNUM7O0lBQzZDLHNDQUFDO0NBQUEsQUFwQi9DLElBb0IrQztTQUFsQywrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hcmtkb3duTmF2aWdhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9tYXJrZG93bi1uYXZpZ2F0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50IH0gZnJvbSAnLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93L21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdCc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRQcm9ncmVzc0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLWJhcic7XG5pbXBvcnQgeyBDb3ZhbGVudEZsYXZvcmVkTWFya2Rvd25Nb2R1bGUgfSBmcm9tICdAY292YWxlbnQvZmxhdm9yZWQtbWFya2Rvd24nO1xuaW1wb3J0IHsgTWF0VG9vbGJhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2xiYXInO1xuaW1wb3J0IHsgQ292YWxlbnREaWFsb2dzTW9kdWxlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUvZGlhbG9ncyc7XG5pbXBvcnQgeyBNYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpcmVjdGl2ZSB9IGZyb20gJy4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy1kaXJlY3RpdmUvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dTZXJ2aWNlIH0gZnJvbSAnLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LXNlcnZpY2UvbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcblxuICAgIC8vIG1hdGVyaWFsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG5cbiAgICBDb3ZhbGVudEZsYXZvcmVkTWFya2Rvd25Nb2R1bGUsXG4gICAgQ292YWxlbnREaWFsb2dzTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXJrZG93bk5hdmlnYXRvckNvbXBvbmVudCwgTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dDb21wb25lbnQsIE1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW01hcmtkb3duTmF2aWdhdG9yQ29tcG9uZW50LCBNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCwgTWFya2Rvd25OYXZpZ2F0b3JXaW5kb3dEaXJlY3RpdmVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW01hcmtkb3duTmF2aWdhdG9yV2luZG93U2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENvdmFsZW50TWFya2Rvd25OYXZpZ2F0b3JNb2R1bGUge31cbiJdfQ==