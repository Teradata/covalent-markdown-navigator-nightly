import { TdMarkdownNavigatorWindowService, IMarkdownNavigatorWindowConfig } from '../markdown-navigator-window-service/markdown-navigator-window.service';
export declare class TdMarkdownNavigatorWindowDirective {
    private _markdownNavigatorWindowService;
    config: IMarkdownNavigatorWindowConfig;
    disabled: boolean;
    constructor(_markdownNavigatorWindowService: TdMarkdownNavigatorWindowService);
    click(): void;
}
