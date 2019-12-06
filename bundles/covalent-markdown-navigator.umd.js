(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@covalent/markdown'), require('@angular/material/button'), require('@angular/material/tooltip'), require('@angular/material/list'), require('@angular/material/icon'), require('@angular/material/progress-bar'), require('@covalent/flavored-markdown'), require('@angular/material/toolbar'), require('@covalent/core/dialogs')) :
    typeof define === 'function' && define.amd ? define('@covalent/markdown-navigator', ['exports', '@angular/core', '@angular/common', '@covalent/markdown', '@angular/material/button', '@angular/material/tooltip', '@angular/material/list', '@angular/material/icon', '@angular/material/progress-bar', '@covalent/flavored-markdown', '@angular/material/toolbar', '@covalent/core/dialogs'], factory) :
    (global = global || self, factory((global.covalent = global.covalent || {}, global.covalent['markdown-navigator'] = {}), global.ng.core, global.ng.common, global.covalent.markdown, global.ng.material.button, global.ng.material.tooltip, global.ng.material.list, global.ng.material.icon, global.ng.material['progress-bar'], global.flavoredMarkdown, global.ng.material.toolbar, global.covalent.core.dialogs));
}(this, (function (exports, core, common, markdown, button, tooltip, list, icon, progressBar, flavoredMarkdown, toolbar, dialogs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function IMarkdownNavigatorItem() { }
    if (false) {
        /** @type {?|undefined} */
        IMarkdownNavigatorItem.prototype.title;
        /** @type {?|undefined} */
        IMarkdownNavigatorItem.prototype.url;
        /** @type {?|undefined} */
        IMarkdownNavigatorItem.prototype.httpOptions;
        /** @type {?|undefined} */
        IMarkdownNavigatorItem.prototype.markdownString;
        /** @type {?|undefined} */
        IMarkdownNavigatorItem.prototype.anchor;
        /** @type {?|undefined} */
        IMarkdownNavigatorItem.prototype.children;
    }
    /**
     * @record
     */
    function IMarkdownNavigatorLabels() { }
    if (false) {
        /** @type {?|undefined} */
        IMarkdownNavigatorLabels.prototype.goHome;
        /** @type {?|undefined} */
        IMarkdownNavigatorLabels.prototype.goBack;
        /** @type {?|undefined} */
        IMarkdownNavigatorLabels.prototype.emptyState;
    }
    /** @type {?} */
    var DEFAULT_MARKDOWN_NAVIGATOR_LABELS = {
        goHome: 'Go home',
        goBack: 'Go back',
        emptyState: 'No item(s) to display',
    };
    /**
     * @param {?} url
     * @return {?}
     */
    function getTitleFromUrl(url) {
        if (url) {
            /** @type {?} */
            var temp = new URL(url);
            if (temp.hash) {
                return markdown.removeLeadingHash(temp.hash);
            }
            else {
                /** @type {?} */
                var path = temp.pathname.split('/');
                /** @type {?} */
                var fileName = path[path.length - 1];
                return fileName.replace(/\.[^/.]+$/, ''); // remove .md
            }
        }
        return undefined;
    }
    /**
     * @param {?} markdownString
     * @return {?}
     */
    function getTitleFromMarkdownString(markdownString) {
        if (markdownString) {
            /** @type {?} */
            var firstLine = markdownString.split(/[\r\n]+/).find((/**
             * @param {?} line
             * @return {?}
             */
            function (line) { return !!line; }));
            return markdown.removeLeadingHash(firstLine).trim();
        }
        return undefined;
    }
    /**
     * @param {?} anchor
     * @return {?}
     */
    function isMarkdownHref(anchor) {
        return !markdown.isAnchorLink(anchor) && anchor.pathname.endsWith('.md');
    }
    /**
     * @param {?} o1
     * @param {?} o2
     * @return {?}
     */
    function defaultCompareWith(o1, o2) {
        return o1 === o2;
    }
    /**
     * @param {?} items
     * @param {?} item
     * @param {?} compareWith
     * @return {?}
     */
    function getAncestors(items, item, compareWith) {
        var e_1, _a;
        if (items) {
            try {
                for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                    var child = items_1_1.value;
                    if (compareWith(child, item)) {
                        return [child];
                    }
                    /** @type {?} */
                    var ancestors = getAncestors(child.children, item, compareWith);
                    if (ancestors) {
                        return __spread([child], ancestors);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return undefined;
    }
    var MarkdownNavigatorComponent = /** @class */ (function () {
        function MarkdownNavigatorComponent(_markdownUrlLoaderService, _changeDetectorRef) {
            this._markdownUrlLoaderService = _markdownUrlLoaderService;
            this._changeDetectorRef = _changeDetectorRef;
            this.historyStack = []; // history
            // currently rendered
            this.currentMenuItems = []; // current menu items
            // current menu items
            this.loading = false;
        }
        /**
         * @param {?} event
         * @return {?}
         */
        MarkdownNavigatorComponent.prototype.clickListener = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var element = (/** @type {?} */ (event.srcElement));
            if (element.matches('a[href]') && isMarkdownHref((/** @type {?} */ (element)))) {
                this.handleLinkClick(event);
            }
        };
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "showGoBackButton", {
            get: /**
             * @return {?}
             */
            function () {
                return this.historyStack.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "showHomeButton", {
            get: /**
             * @return {?}
             */
            function () {
                return this.historyStack.length > 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "showHeader", {
            get: /**
             * @return {?}
             */
            function () {
                return this.showHomeButton || this.showGoBackButton || !!this.currentItemTitle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "showMenu", {
            get: /**
             * @return {?}
             */
            function () {
                return this.currentMenuItems && this.currentMenuItems.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "showTdMarkdownLoader", {
            get: /**
             * @return {?}
             */
            function () {
                return !!this.currentMarkdownItem && !!this.currentMarkdownItem.url && !this.showTdMarkdown;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "showTdMarkdown", {
            get: /**
             * @return {?}
             */
            function () {
                return !!this.currentMarkdownItem && !!this.currentMarkdownItem.markdownString;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "url", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.currentMarkdownItem) {
                    return this.currentMarkdownItem.url;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "httpOptions", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.currentMarkdownItem) {
                    return this.currentMarkdownItem.httpOptions;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "markdownString", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.currentMarkdownItem) {
                    return this.currentMarkdownItem.markdownString;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "anchor", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.currentMarkdownItem) {
                    return this.currentMarkdownItem.anchor;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "showEmptyState", {
            get: /**
             * @return {?}
             */
            function () {
                return !this.items || this.items.length < 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "goHomeLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return (this.labels && this.labels.goHome) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.goHome;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "goBackLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return (this.labels && this.labels.goBack) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.goBack;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "emptyStateLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return (this.labels && this.labels.emptyState) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.emptyState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorComponent.prototype, "currentItemTitle", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.historyStack.length < 1) {
                    return '';
                }
                else if (this.currentMarkdownItem) {
                    return this.getTitle(this.currentMarkdownItem);
                }
                else if (this.historyStack.length > 0) {
                    return this.getTitle(this.historyStack[this.historyStack.length - 1]);
                }
                return '';
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} changes
         * @return {?}
         */
        MarkdownNavigatorComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.items) {
                this.reset();
                if (this.items && this.startAt) {
                    this._jumpTo(this.startAt);
                }
            }
        };
        /**
         * @return {?}
         */
        MarkdownNavigatorComponent.prototype.reset = /**
         * @return {?}
         */
        function () {
            // if single item and no children
            if (this.items && this.items.length === 1 && (!this.items[0].children || this.items[0].children.length === 0)) {
                this.currentMenuItems = [];
                this.currentMarkdownItem = this.items[0];
            }
            else {
                this.currentMenuItems = this.items;
                this.currentMarkdownItem = undefined;
            }
            this.historyStack = [];
            this._changeDetectorRef.markForCheck();
        };
        /**
         * @return {?}
         */
        MarkdownNavigatorComponent.prototype.goBack = /**
         * @return {?}
         */
        function () {
            if (this.historyStack.length > 1) {
                /** @type {?} */
                var parent_1 = this.historyStack[this.historyStack.length - 2];
                if (parent_1.children && parent_1.children.length > 0) {
                    // if parent has children, show menu
                    this.currentMenuItems = parent_1.children;
                    this.currentMarkdownItem = undefined;
                }
                else {
                    // else just render markdown
                    this.currentMenuItems = [];
                    this.currentMarkdownItem = parent_1;
                }
                this.historyStack = this.historyStack.slice(0, -1);
            }
            else {
                // one level down just go to root
                this.reset();
            }
            this._changeDetectorRef.markForCheck();
        };
        /**
         * @param {?} item
         * @return {?}
         */
        MarkdownNavigatorComponent.prototype.handleItemSelected = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            this.historyStack = __spread(this.historyStack, [item]);
            if (item.children &&
                item.children.length === 1 &&
                (!item.children[0].children || item.children[0].children.length === 0)) {
                // clicked on item with one child that has no children
                // don't show menu
                this.currentMenuItems = [];
                // render markdown
                this.currentMarkdownItem = item.children[0];
            }
            else if (item.children && item.children.length > 0) {
                // has children, go inside
                this.currentMenuItems = item.children;
            }
            else {
                // don't show menu
                this.currentMenuItems = [];
                // render markdown
                this.currentMarkdownItem = item;
            }
            this._changeDetectorRef.markForCheck();
        };
        /**
         * @param {?} item
         * @return {?}
         */
        MarkdownNavigatorComponent.prototype.getTitle = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item) {
                return (markdown.removeLeadingHash(item.anchor) ||
                    item.title ||
                    getTitleFromUrl(item.url) ||
                    getTitleFromMarkdownString(item.markdownString) ||
                    '').trim();
            }
        };
        /**
         * @private
         * @param {?} item
         * @return {?}
         */
        MarkdownNavigatorComponent.prototype._jumpTo = /**
         * @private
         * @param {?} item
         * @return {?}
         */
        function (item) {
            var _this = this;
            this.reset();
            if (this.items && this.items.length > 0) {
                /** @type {?} */
                var ancestors = getAncestors(this.items, item, this.compareWith || defaultCompareWith);
                (ancestors || []).forEach((/**
                 * @param {?} ancestor
                 * @return {?}
                 */
                function (ancestor) { return _this.handleItemSelected(ancestor); }));
            }
            this._changeDetectorRef.markForCheck();
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        MarkdownNavigatorComponent.prototype.handleLinkClick = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var link, url, markdownString, error_1, win;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            event.preventDefault();
                            link = (/** @type {?} */ (event.target));
                            url = new URL(link.href);
                            this.loading = true;
                            this._changeDetectorRef.markForCheck();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, this._markdownUrlLoaderService.load(url.href)];
                        case 2:
                            markdownString = _a.sent();
                            // pass in url to be able to use currentMarkdownItem.url later on
                            this.handleItemSelected({ markdownString: markdownString, url: url.href });
                            this.markdownWrapper.nativeElement.scrollTop = 0;
                            return [3 /*break*/, 5];
                        case 3:
                            error_1 = _a.sent();
                            win = window.open(url.href, '_blank');
                            win.focus();
                            return [3 /*break*/, 5];
                        case 4:
                            this.loading = false;
                            return [7 /*endfinally*/];
                        case 5:
                            this._changeDetectorRef.markForCheck();
                            return [2 /*return*/];
                    }
                });
            });
        };
        MarkdownNavigatorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'td-markdown-navigator',
                        template: "<ng-container *ngIf=\"!showEmptyState\">\n  <mat-progress-bar *ngIf=\"loading\" mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n\n  <ng-container *ngIf=\"showHeader\">\n    <div [style.display]=\"'flex'\">\n      <button\n        *ngIf=\"showHomeButton\"\n        mat-icon-button\n        [matTooltip]=\"goHomeLabel\"\n        (click)=\"reset()\"\n        [attr.data-test]=\"'home-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goHomeLabel\">\n          home\n        </mat-icon>\n      </button>\n\n      <button\n        *ngIf=\"showGoBackButton\"\n        mat-icon-button\n        [matTooltip]=\"goBackLabel\"\n        (click)=\"goBack()\"\n        [attr.data-test]=\"'back-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goBackLabel\">\n          arrow_back\n        </mat-icon>\n      </button>\n      <span flex *ngIf=\"currentItemTitle\" class=\"mat-body-2 title truncate\" [attr.data-test]=\"'title'\">\n        {{ currentItemTitle }}\n      </span>\n    </div>\n\n    <mat-divider [style.position]=\"'relative'\"></mat-divider>\n  </ng-container>\n\n  <div *ngIf=\"showMenu\" class=\"td-markdown-list\">\n    <mat-action-list>\n      <button\n        *ngFor=\"let item of currentMenuItems\"\n        (click)=\"handleItemSelected(item)\"\n        mat-list-item\n        [matTooltip]=\"getTitle(item)\"\n        matTooltipPosition=\"before\"\n        matTooltipShowDelay=\"500\"\n      >\n        <mat-icon matListIcon>\n          subject\n        </mat-icon>\n        <span matLine class=\"truncate\">\n          {{ getTitle(item) }}\n        </span>\n        <mat-divider></mat-divider>\n      </button>\n    </mat-action-list>\n  </div>\n\n  <div *ngIf=\"showTdMarkdownLoader || showTdMarkdown\" class=\"markdown-wrapper\" #markdownWrapper>\n    <td-flavored-markdown-loader\n      *ngIf=\"showTdMarkdownLoader\"\n      [url]=\"url\"\n      [httpOptions]=\"httpOptions\"\n      [anchor]=\"anchor\"\n    ></td-flavored-markdown-loader>\n\n    <td-flavored-markdown\n      *ngIf=\"showTdMarkdown\"\n      [content]=\"markdownString\"\n      [hostedUrl]=\"url\"\n      [anchor]=\"anchor\"\n    ></td-flavored-markdown>\n  </div>\n</ng-container>\n\n<div *ngIf=\"showEmptyState\" layout=\"column\" layout-align=\"center center\" class=\" empty-state\">\n  <mat-icon matListAvatar>subject</mat-icon>\n  <h2>{{ emptyStateLabel }}</h2>\n</div>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [":host{position:relative;height:100%;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host .markdown-wrapper,:host .td-markdown-list{min-height:1px;overflow-y:auto;-webkit-box-flex:1;-ms-flex:1;flex:1;box-sizing:border-box}:host .markdown-wrapper{padding:16px 16px 0}:host .td-markdown-list>.mat-list{padding-top:0}:host td-flavored-markdown-loader ::ng-deep .mat-progress-bar{top:0;left:0;right:0;position:absolute}:host .title{display:inline-block;vertical-align:middle;margin:8px 0;padding-left:16px}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.empty-state{padding:32px}.empty-state mat-icon{font-size:4em}"]
                    }] }
        ];
        /** @nocollapse */
        MarkdownNavigatorComponent.ctorParameters = function () { return [
            { type: markdown.MarkdownLoaderService },
            { type: core.ChangeDetectorRef }
        ]; };
        MarkdownNavigatorComponent.propDecorators = {
            items: [{ type: core.Input }],
            labels: [{ type: core.Input }],
            startAt: [{ type: core.Input }],
            compareWith: [{ type: core.Input }],
            markdownWrapper: [{ type: core.ViewChild, args: ['markdownWrapper', { static: false },] }],
            clickListener: [{ type: core.HostListener, args: ['click', ['$event'],] }]
        };
        return MarkdownNavigatorComponent;
    }());
    if (false) {
        /**
         * items: IMarkdownNavigatorItem[]
         *
         * List of IMarkdownNavigatorItems to be rendered
         * @type {?}
         */
        MarkdownNavigatorComponent.prototype.items;
        /**
         * labels?: IMarkdownNavigatorLabels
         *
         * Translated labels
         * @type {?}
         */
        MarkdownNavigatorComponent.prototype.labels;
        /**
         * startAt?: IMarkdownNavigatorItem
         *
         * Item to start to
         * @type {?}
         */
        MarkdownNavigatorComponent.prototype.startAt;
        /**
         * compareWith?: IMarkdownNavigatorCompareWith
         *
         * Function used to find startAt item
         * Defaults to comparison by strict equality (===)
         * @type {?}
         */
        MarkdownNavigatorComponent.prototype.compareWith;
        /** @type {?} */
        MarkdownNavigatorComponent.prototype.markdownWrapper;
        /** @type {?} */
        MarkdownNavigatorComponent.prototype.historyStack;
        /** @type {?} */
        MarkdownNavigatorComponent.prototype.currentMarkdownItem;
        /** @type {?} */
        MarkdownNavigatorComponent.prototype.currentMenuItems;
        /** @type {?} */
        MarkdownNavigatorComponent.prototype.loading;
        /**
         * @type {?}
         * @private
         */
        MarkdownNavigatorComponent.prototype._markdownUrlLoaderService;
        /**
         * @type {?}
         * @private
         */
        MarkdownNavigatorComponent.prototype._changeDetectorRef;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function IMarkdownNavigatorWindowLabels() { }
    if (false) {
        /** @type {?|undefined} */
        IMarkdownNavigatorWindowLabels.prototype.title;
        /** @type {?|undefined} */
        IMarkdownNavigatorWindowLabels.prototype.close;
    }
    /** @type {?} */
    var DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS = {
        title: 'Help',
        close: 'Close',
    };
    var MarkdownNavigatorWindowComponent = /** @class */ (function () {
        function MarkdownNavigatorWindowComponent() {
            this.toolbarColor = 'primary';
            this.toolbarHeight = 56;
            this.closed = new core.EventEmitter();
        }
        Object.defineProperty(MarkdownNavigatorWindowComponent.prototype, "markdownNavigatorLabels", {
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
        Object.defineProperty(MarkdownNavigatorWindowComponent.prototype, "titleLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return (this.labels && this.labels.title) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.title;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MarkdownNavigatorWindowComponent.prototype, "closeLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return (this.labels && this.labels.close) || DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS.close;
            },
            enumerable: true,
            configurable: true
        });
        MarkdownNavigatorWindowComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'td-markdown-navigator-window',
                        template: "<mat-toolbar [color]=\"toolbarColor\" class=\"td-markdown-navigator-window-toolbar\" [style.min-height.px]=\"toolbarHeight\">\n  <mat-toolbar-row [style.height.px]=\"toolbarHeight\" [style.padding-right.px]=\"0\">\n    <div layout=\"row\" layout-align=\"start center\" flex>\n      <span class=\"mat-title td-markdown-navigator-window-title\" flex>\n        {{ titleLabel }}\n      </span>\n      <!-- TODO: Resizing a drag-and-drop element was not working so removed minimize/maximize for now-->\n      <button\n        mat-icon-button\n        [matTooltip]=\"closeLabel\"\n        (click)=\"closed.emit()\"\n        class=\"td-markdown-navigator-window-close\"\n        [attr.data-test]=\"'close-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"closeLabel\">\n          close\n        </mat-icon>\n      </button>\n    </div>\n  </mat-toolbar-row>\n</mat-toolbar>\n\n<td-markdown-navigator\n  [items]=\"items\"\n  [labels]=\"markdownNavigatorLabels\"\n  [startAt]=\"startAt\"\n  [compareWith]=\"compareWith\"\n></td-markdown-navigator>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [":host{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host.td-draggable-markdown-navigator-window .td-markdown-navigator-window-toolbar{cursor:move}.td-markdown-navigator-window-title{margin-bottom:0}::ng-deep .td-draggable-markdown-navigator-window-wrapper>.mat-dialog-container{padding:0}"]
                    }] }
        ];
        MarkdownNavigatorWindowComponent.propDecorators = {
            items: [{ type: core.Input }],
            labels: [{ type: core.Input }],
            toolbarColor: [{ type: core.Input }],
            startAt: [{ type: core.Input }],
            compareWith: [{ type: core.Input }],
            closed: [{ type: core.Output }]
        };
        return MarkdownNavigatorWindowComponent;
    }());
    if (false) {
        /** @type {?} */
        MarkdownNavigatorWindowComponent.prototype.items;
        /** @type {?} */
        MarkdownNavigatorWindowComponent.prototype.labels;
        /** @type {?} */
        MarkdownNavigatorWindowComponent.prototype.toolbarColor;
        /** @type {?} */
        MarkdownNavigatorWindowComponent.prototype.startAt;
        /** @type {?} */
        MarkdownNavigatorWindowComponent.prototype.compareWith;
        /** @type {?} */
        MarkdownNavigatorWindowComponent.prototype.toolbarHeight;
        /** @type {?} */
        MarkdownNavigatorWindowComponent.prototype.closed;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function IMarkdownNavigatorWindowConfig() { }
    if (false) {
        /** @type {?} */
        IMarkdownNavigatorWindowConfig.prototype.items;
        /** @type {?|undefined} */
        IMarkdownNavigatorWindowConfig.prototype.dialogConfig;
        /** @type {?|undefined} */
        IMarkdownNavigatorWindowConfig.prototype.labels;
        /** @type {?|undefined} */
        IMarkdownNavigatorWindowConfig.prototype.toolbarColor;
        /** @type {?|undefined} */
        IMarkdownNavigatorWindowConfig.prototype.startAt;
        /** @type {?|undefined} */
        IMarkdownNavigatorWindowConfig.prototype.compareWith;
    }
    /** @type {?} */
    var CDK_OVERLAY_CUSTOM_CLASS = 'td-draggable-markdown-navigator-window-wrapper';
    /** @type {?} */
    var DEFAULT_DRAGGABLE_DIALOG_CONFIG = {
        hasBackdrop: false,
        closeOnNavigation: true,
        panelClass: CDK_OVERLAY_CUSTOM_CLASS,
        position: { bottom: '0px', right: '0px' },
        height: '475px',
        width: '360px',
    };
    var MarkdownNavigatorWindowService = /** @class */ (function () {
        function MarkdownNavigatorWindowService(_tdDialogService) {
            this._tdDialogService = _tdDialogService;
            this.markdownNavigatorWindowDialog = undefined;
            this.markdownNavigatorWindowDialogsOpen = 0;
        }
        /**
         * @param {?} config
         * @return {?}
         */
        MarkdownNavigatorWindowService.prototype.open = /**
         * @param {?} config
         * @return {?}
         */
        function (config) {
            var _this = this;
            this.close();
            this.markdownNavigatorWindowDialog = this._tdDialogService.openDraggable({
                component: MarkdownNavigatorWindowComponent,
                config: __assign(__assign({}, DEFAULT_DRAGGABLE_DIALOG_CONFIG), config.dialogConfig),
                dragHandleSelectors: ['.td-markdown-navigator-window-toolbar'],
                draggableClass: 'td-draggable-markdown-navigator-window',
            });
            this.markdownNavigatorWindowDialogsOpen++;
            this.markdownNavigatorWindowDialog.componentInstance.items = config.items;
            this.markdownNavigatorWindowDialog.componentInstance.labels = config.labels;
            this.markdownNavigatorWindowDialog.componentInstance.startAt = config.startAt;
            this.markdownNavigatorWindowDialog.componentInstance.compareWith = config.compareWith;
            this.markdownNavigatorWindowDialog.componentInstance.toolbarColor =
                'toolbarColor' in config ? config.toolbarColor : 'primary';
            this.markdownNavigatorWindowDialog.componentInstance.closed.subscribe((/**
             * @return {?}
             */
            function () { return _this.close(); }));
            this.markdownNavigatorWindowDialog
                .afterClosed()
                .toPromise()
                .then((/**
             * @return {?}
             */
            function () {
                _this.markdownNavigatorWindowDialogsOpen--;
            }));
            return this.markdownNavigatorWindowDialog;
        };
        /**
         * @return {?}
         */
        MarkdownNavigatorWindowService.prototype.close = /**
         * @return {?}
         */
        function () {
            if (this.markdownNavigatorWindowDialog) {
                this.markdownNavigatorWindowDialog.close();
            }
        };
        Object.defineProperty(MarkdownNavigatorWindowService.prototype, "isOpen", {
            get: /**
             * @return {?}
             */
            function () {
                return this.markdownNavigatorWindowDialogsOpen > 0;
            },
            enumerable: true,
            configurable: true
        });
        MarkdownNavigatorWindowService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        MarkdownNavigatorWindowService.ctorParameters = function () { return [
            { type: dialogs.TdDialogService }
        ]; };
        return MarkdownNavigatorWindowService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        MarkdownNavigatorWindowService.prototype.markdownNavigatorWindowDialog;
        /**
         * @type {?}
         * @private
         */
        MarkdownNavigatorWindowService.prototype.markdownNavigatorWindowDialogsOpen;
        /**
         * @type {?}
         * @private
         */
        MarkdownNavigatorWindowService.prototype._tdDialogService;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MarkdownNavigatorWindowDirective = /** @class */ (function () {
        function MarkdownNavigatorWindowDirective(_markdownNavigatorWindowService) {
            this._markdownNavigatorWindowService = _markdownNavigatorWindowService;
            this.disabled = false;
        }
        /**
         * @return {?}
         */
        MarkdownNavigatorWindowDirective.prototype.click = /**
         * @return {?}
         */
        function () {
            if (!this.disabled) {
                this._markdownNavigatorWindowService.open(this.config);
            }
        };
        MarkdownNavigatorWindowDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[tdMarkdownNavigatorWindow]',
                    },] }
        ];
        /** @nocollapse */
        MarkdownNavigatorWindowDirective.ctorParameters = function () { return [
            { type: MarkdownNavigatorWindowService }
        ]; };
        MarkdownNavigatorWindowDirective.propDecorators = {
            config: [{ type: core.Input, args: ['tdMarkdownNavigatorWindow',] }],
            disabled: [{ type: core.Input }],
            click: [{ type: core.HostListener, args: ['click',] }]
        };
        return MarkdownNavigatorWindowDirective;
    }());
    if (false) {
        /** @type {?} */
        MarkdownNavigatorWindowDirective.prototype.config;
        /** @type {?} */
        MarkdownNavigatorWindowDirective.prototype.disabled;
        /**
         * @type {?}
         * @private
         */
        MarkdownNavigatorWindowDirective.prototype._markdownNavigatorWindowService;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CovalentMarkdownNavigatorModule = /** @class */ (function () {
        function CovalentMarkdownNavigatorModule() {
        }
        CovalentMarkdownNavigatorModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            // material
                            button.MatButtonModule,
                            tooltip.MatTooltipModule,
                            list.MatListModule,
                            icon.MatIconModule,
                            progressBar.MatProgressBarModule,
                            toolbar.MatToolbarModule,
                            flavoredMarkdown.CovalentFlavoredMarkdownModule,
                            dialogs.CovalentDialogsModule,
                        ],
                        declarations: [MarkdownNavigatorComponent, MarkdownNavigatorWindowComponent, MarkdownNavigatorWindowDirective],
                        exports: [MarkdownNavigatorComponent, MarkdownNavigatorWindowComponent, MarkdownNavigatorWindowDirective],
                        entryComponents: [MarkdownNavigatorWindowComponent],
                        providers: [MarkdownNavigatorWindowService],
                    },] }
        ];
        return CovalentMarkdownNavigatorModule;
    }());

    exports.CovalentMarkdownNavigatorModule = CovalentMarkdownNavigatorModule;
    exports.DEFAULT_MARKDOWN_NAVIGATOR_LABELS = DEFAULT_MARKDOWN_NAVIGATOR_LABELS;
    exports.DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS = DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS;
    exports.MarkdownNavigatorComponent = MarkdownNavigatorComponent;
    exports.MarkdownNavigatorWindowComponent = MarkdownNavigatorWindowComponent;
    exports.MarkdownNavigatorWindowService = MarkdownNavigatorWindowService;
    exports.ɵa = MarkdownNavigatorWindowDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=covalent-markdown-navigator.umd.js.map
