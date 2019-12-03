import { MarkdownNavigatorWindowService, IMarkdownNavigatorWindowConfig } from '../markdown-navigator-window-service/markdown-navigator-window.service';
export declare class MarkdownNavigatorWindowDirective {
    private _markdownNavigatorWindowService;
    config: IMarkdownNavigatorWindowConfig;
    disabled: boolean;
    constructor(_markdownNavigatorWindowService: MarkdownNavigatorWindowService);
    click(): void;
}
