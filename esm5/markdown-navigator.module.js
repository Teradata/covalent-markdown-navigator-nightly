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
                    declarations: [TdMarkdownNavigatorComponent, TdMarkdownNavigatorWindowComponent, TdMarkdownNavigatorWindowDirective],
                    exports: [TdMarkdownNavigatorComponent, TdMarkdownNavigatorWindowComponent, TdMarkdownNavigatorWindowDirective],
                    providers: [TdMarkdownNavigatorWindowService],
                },] }
    ];
    return CovalentMarkdownNavigatorModule;
}());
export { CovalentMarkdownNavigatorModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tbmF2aWdhdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb3ZhbGVudC9tYXJrZG93bi1uYXZpZ2F0b3IvIiwic291cmNlcyI6WyJtYXJrZG93bi1uYXZpZ2F0b3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxpRUFBaUUsQ0FBQztBQUNySCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSwyRUFBMkUsQ0FBQztBQUMvSCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1RUFBdUUsQ0FBQztBQUV6SDtJQUFBO0lBbUI4QyxDQUFDOztnQkFuQjlDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFFWixXQUFXO3dCQUNYLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLGFBQWE7d0JBQ2Isb0JBQW9CO3dCQUNwQixnQkFBZ0I7d0JBRWhCLDhCQUE4Qjt3QkFDOUIscUJBQXFCO3FCQUN0QjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxrQ0FBa0MsRUFBRSxrQ0FBa0MsQ0FBQztvQkFDcEgsT0FBTyxFQUFFLENBQUMsNEJBQTRCLEVBQUUsa0NBQWtDLEVBQUUsa0NBQWtDLENBQUM7b0JBQy9HLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO2lCQUM5Qzs7SUFDNkMsc0NBQUM7Q0FBQSxBQW5CL0MsSUFtQitDO1NBQWxDLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVGRNYXJrZG93bk5hdmlnYXRvckNvbXBvbmVudCB9IGZyb20gJy4vbWFya2Rvd24tbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50IH0gZnJvbSAnLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93L21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdCc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRQcm9ncmVzc0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLWJhcic7XG5pbXBvcnQgeyBDb3ZhbGVudEZsYXZvcmVkTWFya2Rvd25Nb2R1bGUgfSBmcm9tICdAY292YWxlbnQvZmxhdm9yZWQtbWFya2Rvd24nO1xuaW1wb3J0IHsgTWF0VG9vbGJhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2xiYXInO1xuaW1wb3J0IHsgQ292YWxlbnREaWFsb2dzTW9kdWxlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUvZGlhbG9ncyc7XG5pbXBvcnQgeyBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlyZWN0aXZlIH0gZnJvbSAnLi9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LWRpcmVjdGl2ZS9tYXJrZG93bi1uYXZpZ2F0b3Itd2luZG93LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93U2VydmljZSB9IGZyb20gJy4vbWFya2Rvd24tbmF2aWdhdG9yLXdpbmRvdy1zZXJ2aWNlL21hcmtkb3duLW5hdmlnYXRvci13aW5kb3cuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG5cbiAgICAvLyBtYXRlcmlhbFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuXG4gICAgQ292YWxlbnRGbGF2b3JlZE1hcmtkb3duTW9kdWxlLFxuICAgIENvdmFsZW50RGlhbG9nc01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbVGRNYXJrZG93bk5hdmlnYXRvckNvbXBvbmVudCwgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0NvbXBvbmVudCwgVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd0RpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtUZE1hcmtkb3duTmF2aWdhdG9yQ29tcG9uZW50LCBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93Q29tcG9uZW50LCBUZE1hcmtkb3duTmF2aWdhdG9yV2luZG93RGlyZWN0aXZlXSxcbiAgcHJvdmlkZXJzOiBbVGRNYXJrZG93bk5hdmlnYXRvcldpbmRvd1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBDb3ZhbGVudE1hcmtkb3duTmF2aWdhdG9yTW9kdWxlIHt9XG4iXX0=