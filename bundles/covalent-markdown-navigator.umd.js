(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@covalent/markdown'), require('@angular/platform-browser'), require('@angular/common/http'), require('@angular/material/button'), require('@angular/material/tooltip'), require('@angular/material/list'), require('@angular/material/icon'), require('@angular/material/progress-bar'), require('@covalent/flavored-markdown'), require('@covalent/core/dialogs'), require('@covalent/core/message')) :
    typeof define === 'function' && define.amd ? define('@covalent/markdown-navigator', ['exports', '@angular/core', '@angular/common', '@covalent/markdown', '@angular/platform-browser', '@angular/common/http', '@angular/material/button', '@angular/material/tooltip', '@angular/material/list', '@angular/material/icon', '@angular/material/progress-bar', '@covalent/flavored-markdown', '@covalent/core/dialogs', '@covalent/core/message'], factory) :
    (global = global || self, factory((global.covalent = global.covalent || {}, global.covalent['markdown-navigator'] = {}), global.ng.core, global.ng.common, global.covalent.markdown, global.ng.platformBrowser, global.ng.common.http, global.ng.material.button, global.ng.material.tooltip, global.ng.material.list, global.ng.material.icon, global.ng.material.progressBar, global.flavoredMarkdown, global.covalent.core.dialogs, global.covalent.core.message));
}(this, (function (exports, core, common, markdown, platformBrowser, http, button, tooltip, list, icon, progressBar, flavoredMarkdown, dialogs, message) { 'use strict';

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
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
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
        IMarkdownNavigatorItem.prototype.id;
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
        /** @type {?|undefined} */
        IMarkdownNavigatorItem.prototype.childrenUrl;
        /** @type {?|undefined} */
        IMarkdownNavigatorItem.prototype.description;
        /** @type {?|undefined} */
        IMarkdownNavigatorItem.prototype.icon;
        /** @type {?|undefined} */
        IMarkdownNavigatorItem.prototype.footer;
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
        if (o1.id && o2.id) {
            return o1.id === o2.id;
        }
        return o1 === o2;
    }
    var TdMarkdownNavigatorComponent = /** @class */ (function () {
        function TdMarkdownNavigatorComponent(_markdownUrlLoaderService, _changeDetectorRef, _sanitizer, _http) {
            this._markdownUrlLoaderService = _markdownUrlLoaderService;
            this._changeDetectorRef = _changeDetectorRef;
            this._sanitizer = _sanitizer;
            this._http = _http;
            /**
             * copyCodeToClipboard?: boolean
             *
             * Display copy button on code snippets to copy code to clipboard.
             *
             */
            this.copyCodeToClipboard = false;
            /**
             * copyCodeTooltips?: ICopyCodeTooltips
             *
             * Tooltips for copy button to copy and upon copying.
             */
            this.copyCodeTooltips = {};
            this.buttonClicked = new core.EventEmitter();
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
        TdMarkdownNavigatorComponent.prototype.clickListener = /**
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
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "showGoBackButton", {
            get: /**
             * @return {?}
             */
            function () {
                return this.historyStack.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "showHomeButton", {
            get: /**
             * @return {?}
             */
            function () {
                return this.historyStack.length > 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "showHeader", {
            get: /**
             * @return {?}
             */
            function () {
                return this.showHomeButton || this.showGoBackButton || !!this.currentItemTitle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "showMenu", {
            get: /**
             * @return {?}
             */
            function () {
                return this.currentMenuItems && this.currentMenuItems.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "showTdMarkdownLoader", {
            get: /**
             * @return {?}
             */
            function () {
                return !!this.currentMarkdownItem && !!this.currentMarkdownItem.url && !this.showTdMarkdown;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "showTdMarkdown", {
            get: /**
             * @return {?}
             */
            function () {
                return !!this.currentMarkdownItem && !!this.currentMarkdownItem.markdownString;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "url", {
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
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "footerComponent", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.currentMarkdownItem && this.currentMarkdownItem.footer) {
                    return this.currentMarkdownItem.footer;
                }
                return this.footer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "httpOptions", {
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
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "markdownString", {
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
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "anchor", {
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
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "showEmptyState", {
            get: /**
             * @return {?}
             */
            function () {
                return !this.items || this.items.length < 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "goHomeLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return (this.labels && this.labels.goHome) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.goHome;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "goBackLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return (this.labels && this.labels.goBack) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.goBack;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "emptyStateLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return (this.labels && this.labels.emptyState) || DEFAULT_MARKDOWN_NAVIGATOR_LABELS.emptyState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdMarkdownNavigatorComponent.prototype, "currentItemTitle", {
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
        TdMarkdownNavigatorComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (changes.items) {
                        this.reset();
                    }
                    if (changes.startAt && this.items && this.startAt) {
                        this._jumpTo(this.startAt);
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * @param {?} item
         * @return {?}
         */
        TdMarkdownNavigatorComponent.prototype.hasChildrenOrChildrenUrl = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            return (item.children && item.children.length > 0) || !!item.childrenUrl;
        };
        /**
         * @return {?}
         */
        TdMarkdownNavigatorComponent.prototype.clearErrors = /**
         * @return {?}
         */
        function () {
            this.markdownLoaderError = undefined;
            this.childrenUrlError = undefined;
        };
        /**
         * @return {?}
         */
        TdMarkdownNavigatorComponent.prototype.reset = /**
         * @return {?}
         */
        function () {
            this.loading = false;
            this.clearErrors();
            // if single item and no children
            if (this.items && this.items.length === 1 && !this.hasChildrenOrChildrenUrl(this.items[0])) {
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
        TdMarkdownNavigatorComponent.prototype.goBack = /**
         * @return {?}
         */
        function () {
            this.loading = false;
            this.clearErrors();
            if (this.historyStack.length > 1) {
                /** @type {?} */
                var parent_1 = this.historyStack[this.historyStack.length - 2];
                this.currentMarkdownItem = parent_1;
                this.historyStack = this.historyStack.slice(0, -1);
                this.setChildrenAsCurrentMenuItems(parent_1);
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
        TdMarkdownNavigatorComponent.prototype.handleItemSelected = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            this.clearErrors();
            this.currentMarkdownItem = item;
            this.historyStack = __spread(this.historyStack, [item]);
            this.setChildrenAsCurrentMenuItems(item);
            this._changeDetectorRef.markForCheck();
        };
        /**
         * @param {?} item
         * @return {?}
         */
        TdMarkdownNavigatorComponent.prototype.setChildrenAsCurrentMenuItems = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            return __awaiter(this, void 0, void 0, function () {
                var stackSnapshot, children, newStackSnapshot;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.currentMenuItems = [];
                            this.loading = true;
                            this._changeDetectorRef.markForCheck();
                            stackSnapshot = this.historyStack;
                            children = [];
                            if (!item.children) return [3 /*break*/, 1];
                            children = item.children;
                            return [3 /*break*/, 3];
                        case 1:
                            if (!item.childrenUrl) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.loadChildrenUrl(item)];
                        case 2:
                            children = _a.sent();
                            _a.label = 3;
                        case 3:
                            newStackSnapshot = this.historyStack;
                            if (stackSnapshot.length === newStackSnapshot.length &&
                                stackSnapshot.every((/**
                                 * @param {?} stackItem
                                 * @param {?} index
                                 * @return {?}
                                 */
                                function (stackItem, index) { return stackItem === newStackSnapshot[index]; }))) {
                                this.currentMenuItems = children;
                            }
                            this.loading = false;
                            this._changeDetectorRef.markForCheck();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} item
         * @return {?}
         */
        TdMarkdownNavigatorComponent.prototype.loadChildrenUrl = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            return __awaiter(this, void 0, void 0, function () {
                var sanitizedUrl, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sanitizedUrl = this._sanitizer.sanitize(core.SecurityContext.URL, item.childrenUrl);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this._http
                                    .get(sanitizedUrl, __assign({}, item.httpOptions))
                                    .toPromise()];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_1 = _a.sent();
                            this.handleChildrenUrlError(error_1);
                            return [2 /*return*/, []];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} item
         * @return {?}
         */
        TdMarkdownNavigatorComponent.prototype.getTitle = /**
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
         * @param {?} item
         * @return {?}
         */
        TdMarkdownNavigatorComponent.prototype.getIcon = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item) {
                return item.icon || 'subject';
            }
        };
        /**
         * @param {?} error
         * @return {?}
         */
        TdMarkdownNavigatorComponent.prototype.handleChildrenUrlError = /**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            this.childrenUrlError = error.message;
            this._changeDetectorRef.markForCheck();
        };
        /**
         * @param {?} error
         * @return {?}
         */
        TdMarkdownNavigatorComponent.prototype.handleMarkdownLoaderError = /**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            this.markdownLoaderError = error.message;
            this._changeDetectorRef.markForCheck();
        };
        /**
         * @private
         * @param {?} itemOrPath
         * @return {?}
         */
        TdMarkdownNavigatorComponent.prototype._jumpTo = /**
         * @private
         * @param {?} itemOrPath
         * @return {?}
         */
        function (itemOrPath) {
            return __awaiter(this, void 0, void 0, function () {
                var path;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.reset();
                            if (!(this.items && this.items.length > 0)) return [3 /*break*/, 4];
                            path = [];
                            if (!Array.isArray(itemOrPath)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.followPath(this.items, itemOrPath)];
                        case 1:
                            path = _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            path = this.findPath(this.items, itemOrPath);
                            _a.label = 3;
                        case 3:
                            (path || []).forEach((/**
                             * @param {?} pathItem
                             * @return {?}
                             */
                            function (pathItem) { return _this.handleItemSelected(pathItem); }));
                            _a.label = 4;
                        case 4:
                            this._changeDetectorRef.markForCheck();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @private
         * @param {?} items
         * @param {?} path
         * @return {?}
         */
        TdMarkdownNavigatorComponent.prototype.followPath = /**
         * @private
         * @param {?} items
         * @param {?} path
         * @return {?}
         */
        function (items, path) {
            return __awaiter(this, void 0, void 0, function () {
                var pathItems, currentLevel, compareWith, _loop_1, this_1, path_1, path_1_1, pathItem, state_1, e_1_1;
                var e_1, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            pathItems = [];
                            currentLevel = items;
                            compareWith = this.compareWith || defaultCompareWith;
                            _loop_1 = function (pathItem) {
                                var foundItem;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            foundItem = currentLevel.find((/**
                                             * @param {?} item
                                             * @return {?}
                                             */
                                            function (item) {
                                                return compareWith(pathItem, item);
                                            }));
                                            if (!foundItem) return [3 /*break*/, 4];
                                            pathItems = __spread(pathItems, [foundItem]);
                                            if (!foundItem.children) return [3 /*break*/, 1];
                                            currentLevel = foundItem.children;
                                            return [3 /*break*/, 3];
                                        case 1:
                                            if (!foundItem.childrenUrl) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this_1.loadChildrenUrl(foundItem)];
                                        case 2:
                                            currentLevel = _a.sent();
                                            _a.label = 3;
                                        case 3: return [3 /*break*/, 5];
                                        case 4: return [2 /*return*/, "break"];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 8]);
                            path_1 = __values(path), path_1_1 = path_1.next();
                            _b.label = 2;
                        case 2:
                            if (!!path_1_1.done) return [3 /*break*/, 5];
                            pathItem = path_1_1.value;
                            return [5 /*yield**/, _loop_1(pathItem)];
                        case 3:
                            state_1 = _b.sent();
                            if (state_1 === "break")
                                return [3 /*break*/, 5];
                            _b.label = 4;
                        case 4:
                            path_1_1 = path_1.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_1_1 = _b.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (path_1_1 && !path_1_1.done && (_a = path_1.return)) _a.call(path_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 8:
                            if (pathItems.length !== path.length) {
                                pathItems = [];
                            }
                            return [2 /*return*/, pathItems];
                    }
                });
            });
        };
        /**
         * @private
         * @param {?} items
         * @param {?} item
         * @return {?}
         */
        TdMarkdownNavigatorComponent.prototype.findPath = /**
         * @private
         * @param {?} items
         * @param {?} item
         * @return {?}
         */
        function (items, item) {
            var e_2, _a;
            /** @type {?} */
            var compareWith = this.compareWith || defaultCompareWith;
            if (items) {
                try {
                    for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                        var child = items_1_1.value;
                        if (compareWith(child, item)) {
                            return [child];
                        }
                        /** @type {?} */
                        var ancestors = this.findPath(child.children, item);
                        if (ancestors) {
                            return __spread([child], ancestors);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            return undefined;
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        TdMarkdownNavigatorComponent.prototype.handleLinkClick = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var link, url, markdownString, error_2, win;
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
                            error_2 = _a.sent();
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
        TdMarkdownNavigatorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'td-markdown-navigator',
                        template: "<ng-container *ngIf=\"!showEmptyState\">\n  <mat-progress-bar *ngIf=\"loading\" mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n\n  <ng-container *ngIf=\"showHeader\">\n    <div [style.display]=\"'flex'\">\n      <button\n        id=\"td-markdown-navigator-home-button\"\n        *ngIf=\"showHomeButton\"\n        mat-icon-button\n        [matTooltip]=\"goHomeLabel\"\n        (click)=\"reset()\"\n        [attr.data-test]=\"'home-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goHomeLabel\">home</mat-icon>\n      </button>\n\n      <button\n        id=\"td-markdown-navigator-back-button\"\n        *ngIf=\"showGoBackButton\"\n        mat-icon-button\n        [matTooltip]=\"goBackLabel\"\n        (click)=\"goBack()\"\n        [attr.data-test]=\"'back-button'\"\n      >\n        <mat-icon [attr.aria-label]=\"goBackLabel\">arrow_back</mat-icon>\n      </button>\n      <span flex *ngIf=\"currentItemTitle\" class=\"mat-body-2 title truncate\" [attr.data-test]=\"'title'\">\n        {{ currentItemTitle }}\n      </span>\n    </div>\n\n    <mat-divider [style.position]=\"'relative'\"></mat-divider>\n  </ng-container>\n\n  <div class=\"scroll-area\" id=\"td-markdown-navigator-content\">\n    <td-message\n      *ngIf=\"childrenUrlError\"\n      [sublabel]=\"childrenUrlError\"\n      color=\"warn\"\n      icon=\"error\"\n      [attr.data-test]=\"'children-url-error'\"\n    ></td-message>\n    <div *ngIf=\"showMenu\" class=\"td-markdown-list\">\n      <mat-action-list>\n        <button\n          *ngFor=\"let item of currentMenuItems; index as index\"\n          [id]=\"'td-markdown-navigator-list-item-' + (item.id ? item.id : index)\"\n          (click)=\"handleItemSelected(item)\"\n          mat-list-item\n          [matTooltip]=\"getTitle(item)\"\n          matTooltipPosition=\"before\"\n          matTooltipShowDelay=\"500\"\n        >\n          <mat-icon matListIcon>\n            {{ getIcon(item) }}\n          </mat-icon>\n          <span matLine class=\"truncate\">\n            {{ getTitle(item) }}\n          </span>\n          <span matLine class=\"truncate\">{{ item.description }}</span>\n          <mat-divider></mat-divider>\n        </button>\n      </mat-action-list>\n    </div>\n\n    <div *ngIf=\"showTdMarkdownLoader || showTdMarkdown\" class=\"markdown-wrapper\" #markdownWrapper>\n      <td-message\n        *ngIf=\"markdownLoaderError\"\n        [sublabel]=\"markdownLoaderError\"\n        color=\"warn\"\n        icon=\"error\"\n        [attr.data-test]=\"'markdown-loader-error'\"\n      ></td-message>\n      <td-flavored-markdown-loader\n        *ngIf=\"showTdMarkdownLoader\"\n        [url]=\"url\"\n        [httpOptions]=\"httpOptions\"\n        [anchor]=\"anchor\"\n        [copyCodeToClipboard]=\"copyCodeToClipboard\"\n        [copyCodeTooltips]=\"copyCodeTooltips\"\n        (loadFailed)=\"handleMarkdownLoaderError($event)\"\n      ></td-flavored-markdown-loader>\n      <td-flavored-markdown\n        *ngIf=\"showTdMarkdown\"\n        [content]=\"markdownString\"\n        [hostedUrl]=\"url\"\n        [anchor]=\"anchor\"\n        [copyCodeToClipboard]=\"copyCodeToClipboard\"\n        [copyCodeTooltips]=\"copyCodeTooltips\"\n        (buttonClicked)=\"buttonClicked.emit($event)\"\n      ></td-flavored-markdown>\n    </div>\n    <ng-container *ngComponentOutlet=\"footerComponent\"></ng-container>\n  </div>\n</ng-container>\n\n<div *ngIf=\"showEmptyState\" layout=\"column\" layout-align=\"center center\" class=\"empty-state\">\n  <mat-icon matListAvatar>subject</mat-icon>\n  <h2>{{ emptyStateLabel }}</h2>\n</div>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [":host{position:relative;height:100%;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}:host .scroll-area{min-height:1px;overflow-y:auto;-ms-flex:1;flex:1;box-sizing:border-box}:host .markdown-wrapper{padding:16px 16px 0}:host .td-markdown-list>.mat-list{padding-top:0}:host td-flavored-markdown-loader ::ng-deep .mat-progress-bar{top:0;left:0;right:0;position:absolute}:host .title{display:inline-block;vertical-align:middle;margin:8px 0;padding-left:16px}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.empty-state{padding:32px}.empty-state mat-icon{font-size:4em}"]
                    }] }
        ];
        /** @nocollapse */
        TdMarkdownNavigatorComponent.ctorParameters = function () { return [
            { type: markdown.TdMarkdownLoaderService },
            { type: core.ChangeDetectorRef },
            { type: platformBrowser.DomSanitizer },
            { type: http.HttpClient }
        ]; };
        TdMarkdownNavigatorComponent.propDecorators = {
            items: [{ type: core.Input }],
            labels: [{ type: core.Input }],
            startAt: [{ type: core.Input }],
            copyCodeToClipboard: [{ type: core.Input }],
            copyCodeTooltips: [{ type: core.Input }],
            footer: [{ type: core.Input }],
            compareWith: [{ type: core.Input }],
            buttonClicked: [{ type: core.Output }],
            markdownWrapper: [{ type: core.ViewChild, args: ['markdownWrapper',] }],
            clickListener: [{ type: core.HostListener, args: ['click', ['$event'],] }]
        };
        return TdMarkdownNavigatorComponent;
    }());
    if (false) {
        /**
         * items: IMarkdownNavigatorItem[]
         *
         * List of IMarkdownNavigatorItems to be rendered
         * @type {?}
         */
        TdMarkdownNavigatorComponent.prototype.items;
        /**
         * labels?: IMarkdownNavigatorLabels
         *
         * Translated labels
         * @type {?}
         */
        TdMarkdownNavigatorComponent.prototype.labels;
        /**
         * startAt?: IMarkdownNavigatorItem | IMarkdownNavigatorItem[];
         *
         * Item or path to start at
         * @type {?}
         */
        TdMarkdownNavigatorComponent.prototype.startAt;
        /**
         * copyCodeToClipboard?: boolean
         *
         * Display copy button on code snippets to copy code to clipboard.
         *
         * @type {?}
         */
        TdMarkdownNavigatorComponent.prototype.copyCodeToClipboard;
        /**
         * copyCodeTooltips?: ICopyCodeTooltips
         *
         * Tooltips for copy button to copy and upon copying.
         * @type {?}
         */
        TdMarkdownNavigatorComponent.prototype.copyCodeTooltips;
        /**
         * footer?: Type<any>
         *
         * Component to be displayed in footer
         * @type {?}
         */
        TdMarkdownNavigatorComponent.prototype.footer;
        /**
         * compareWith?: IMarkdownNavigatorCompareWith
         *
         * Function used to find startAt item
         * Defaults to comparison by strict equality (===)
         * @type {?}
         */
        TdMarkdownNavigatorComponent.prototype.compareWith;
        /** @type {?} */
        TdMarkdownNavigatorComponent.prototype.buttonClicked;
        /** @type {?} */
        TdMarkdownNavigatorComponent.prototype.markdownWrapper;
        /** @type {?} */
        TdMarkdownNavigatorComponent.prototype.historyStack;
        /** @type {?} */
        TdMarkdownNavigatorComponent.prototype.currentMarkdownItem;
        /** @type {?} */
        TdMarkdownNavigatorComponent.prototype.currentMenuItems;
        /** @type {?} */
        TdMarkdownNavigatorComponent.prototype.loading;
        /** @type {?} */
        TdMarkdownNavigatorComponent.prototype.markdownLoaderError;
        /** @type {?} */
        TdMarkdownNavigatorComponent.prototype.childrenUrlError;
        /**
         * @type {?}
         * @private
         */
        TdMarkdownNavigatorComponent.prototype._markdownUrlLoaderService;
        /**
         * @type {?}
         * @private
         */
        TdMarkdownNavigatorComponent.prototype._changeDetectorRef;
        /**
         * @type {?}
         * @private
         */
        TdMarkdownNavigatorComponent.prototype._sanitizer;
        /**
         * @type {?}
         * @private
         */
        TdMarkdownNavigatorComponent.prototype._http;
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
        /** @type {?|undefined} */
        IMarkdownNavigatorWindowLabels.prototype.dock;
        /** @type {?|undefined} */
        IMarkdownNavigatorWindowLabels.prototype.unDock;
    }
    /** @type {?} */
    var DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS = {
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
            this.closed = new core.EventEmitter();
            this.dockToggled = new core.EventEmitter();
            this.buttonClicked = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'td-markdown-navigator-window',
                        template: "<td-window-dialog\n  [toolbarColor]=\"toolbarColor\"\n  [docked]=\"docked\"\n  [title]=\"titleLabel\"\n  [toggleDockedStateLabel]=\"toggleDockedStateLabel\"\n  [closeLabel]=\"closeLabel\"\n  (dockToggled)=\"toggleDockedState()\"\n  (closed)=\"closed.emit()\"\n>\n  <td-markdown-navigator\n    [items]=\"items\"\n    [labels]=\"markdownNavigatorLabels\"\n    [style.display]=\"docked ? 'none' : 'inherit'\"\n    [startAt]=\"startAt\"\n    [compareWith]=\"compareWith\"\n    [footer]=\"footer\"\n    [copyCodeToClipboard]=\"copyCodeToClipboard\"\n    [copyCodeTooltips]=\"copyCodeTooltips\"\n    (buttonClicked)=\"buttonClicked.emit($event)\"\n  ></td-markdown-navigator>\n</td-window-dialog>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [":host{height:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}td-markdown-navigator{height:calc(100% - 56px)}"]
                    }] }
        ];
        TdMarkdownNavigatorWindowComponent.propDecorators = {
            items: [{ type: core.Input }],
            labels: [{ type: core.Input }],
            toolbarColor: [{ type: core.Input }],
            startAt: [{ type: core.Input }],
            compareWith: [{ type: core.Input }],
            docked: [{ type: core.Input }],
            copyCodeToClipboard: [{ type: core.Input }],
            copyCodeTooltips: [{ type: core.Input }],
            footer: [{ type: core.Input }],
            closed: [{ type: core.Output }],
            dockToggled: [{ type: core.Output }],
            buttonClicked: [{ type: core.Output }]
        };
        return TdMarkdownNavigatorWindowComponent;
    }());
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
        /** @type {?|undefined} */
        IMarkdownNavigatorWindowConfig.prototype.copyCodeToClipboard;
        /** @type {?|undefined} */
        IMarkdownNavigatorWindowConfig.prototype.copyCodeTooltips;
        /** @type {?|undefined} */
        IMarkdownNavigatorWindowConfig.prototype.footer;
    }
    /** @type {?} */
    var CDK_OVERLAY_CUSTOM_CLASS = 'td-window-dialog';
    /** @type {?} */
    var DEFAULT_POSITION = { bottom: '0px', right: '0px' };
    /** @type {?} */
    var DEFAULT_WIDTH = '360px';
    /** @type {?} */
    var DEFAULT_HEIGHT = '75vh';
    /** @type {?} */
    var MIN_HEIGHT = '56px';
    /** @type {?} */
    var MAX_WIDTH = '100vw';
    /** @type {?} */
    var DEFAULT_DRAGGABLE_DIALOG_CONFIG = {
        hasBackdrop: false,
        closeOnNavigation: true,
        panelClass: [CDK_OVERLAY_CUSTOM_CLASS],
        position: DEFAULT_POSITION,
        height: DEFAULT_HEIGHT,
        width: DEFAULT_WIDTH,
        maxWidth: MAX_WIDTH,
    };
    /**
     * @record
     */
    function IDialogDimensions() { }
    if (false) {
        /** @type {?} */
        IDialogDimensions.prototype.width;
        /** @type {?} */
        IDialogDimensions.prototype.height;
    }
    var TdMarkdownNavigatorWindowService = /** @class */ (function () {
        function TdMarkdownNavigatorWindowService(_tdDialogService, _document, rendererFactory) {
            this._tdDialogService = _tdDialogService;
            this._document = _document;
            this.rendererFactory = rendererFactory;
            this.markdownNavigatorWindowDialog = undefined;
            this.markdownNavigatorWindowDialogsOpen = 0;
            this._renderer2 = rendererFactory.createRenderer(undefined, undefined);
        }
        /**
         * @param {?} config
         * @return {?}
         */
        TdMarkdownNavigatorWindowService.prototype.open = /**
         * @param {?} config
         * @return {?}
         */
        function (config) {
            var _this = this;
            this.close();
            /** @type {?} */
            var panelClass = __spread(DEFAULT_DRAGGABLE_DIALOG_CONFIG.panelClass);
            if (config.dialogConfig && config.dialogConfig.panelClass) {
                if (Array.isArray(config.dialogConfig.panelClass)) {
                    panelClass = __spread(config.dialogConfig.panelClass);
                }
                else {
                    panelClass = [config.dialogConfig.panelClass];
                }
            }
            /** @type {?} */
            var draggableConfig = __assign(__assign(__assign({}, DEFAULT_DRAGGABLE_DIALOG_CONFIG), config.dialogConfig), { panelClass: panelClass });
            var _a = this._tdDialogService.openDraggable({
                component: TdMarkdownNavigatorWindowComponent,
                config: draggableConfig,
                dragHandleSelectors: ['.td-window-dialog-toolbar'],
                draggableClass: 'td-draggable-markdown-navigator-window',
            }), matDialogRef = _a.matDialogRef, dragRefSubject = _a.dragRefSubject;
            this.markdownNavigatorWindowDialog = matDialogRef;
            this.markdownNavigatorWindowDialog.componentInstance.items = config.items;
            this.markdownNavigatorWindowDialog.componentInstance.labels = config.labels;
            this.markdownNavigatorWindowDialog.componentInstance.startAt = config.startAt;
            this.markdownNavigatorWindowDialog.componentInstance.copyCodeToClipboard = config.copyCodeToClipboard;
            this.markdownNavigatorWindowDialog.componentInstance.copyCodeTooltips = config.copyCodeTooltips;
            this.markdownNavigatorWindowDialog.componentInstance.compareWith = config.compareWith;
            this.markdownNavigatorWindowDialog.componentInstance.toolbarColor =
                'toolbarColor' in config ? config.toolbarColor : 'primary';
            this.markdownNavigatorWindowDialogsOpen++;
            this.markdownNavigatorWindowDialog.componentInstance.footer = config.footer;
            dragRefSubject.subscribe((/**
             * @param {?} dragRf
             * @return {?}
             */
            function (dragRf) {
                _this.dragRef = dragRf;
                _this.resizableDraggableDialog = new dialogs.ResizableDraggableDialog(_this._document, _this._renderer2, _this.markdownNavigatorWindowDialog, _this.dragRef);
            }));
            this._handleEvents();
            return this.markdownNavigatorWindowDialog;
        };
        /**
         * @return {?}
         */
        TdMarkdownNavigatorWindowService.prototype.close = /**
         * @return {?}
         */
        function () {
            if (this.markdownNavigatorWindowDialog) {
                if (this.resizableDraggableDialog) {
                    this.resizableDraggableDialog.detach();
                }
                this.markdownNavigatorWindowDialog.close();
            }
        };
        Object.defineProperty(TdMarkdownNavigatorWindowService.prototype, "isOpen", {
            get: /**
             * @return {?}
             */
            function () {
                return this.markdownNavigatorWindowDialogsOpen > 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @return {?}
         */
        TdMarkdownNavigatorWindowService.prototype._handleEvents = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var position;
            /** @type {?} */
            var dimensions;
            this.markdownNavigatorWindowDialog.componentInstance.closed.subscribe((/**
             * @return {?}
             */
            function () { return _this.close(); }));
            this.markdownNavigatorWindowDialog.componentInstance.dockToggled.subscribe((/**
             * @param {?} docked
             * @return {?}
             */
            function (docked) {
                if (docked) {
                    _this.markdownNavigatorWindowDialog.componentInstance.docked = false;
                    _this.markdownNavigatorWindowDialog.updateSize(dimensions.width, dimensions.height);
                    _this.markdownNavigatorWindowDialog.updatePosition({ top: '0px', right: '0px', bottom: '0px', left: '0px' });
                    _this.dragRef.setFreeDragPosition(position);
                    _this.dragRef.disabled = false;
                    _this.resizableDraggableDialog.attach();
                }
                else {
                    dimensions = _this._getDialogSize(_this.markdownNavigatorWindowDialog);
                    position = _this.dragRef.getFreeDragPosition();
                    _this.markdownNavigatorWindowDialog.componentInstance.docked = true;
                    _this.markdownNavigatorWindowDialog.updateSize(DEFAULT_WIDTH, MIN_HEIGHT);
                    _this.markdownNavigatorWindowDialog.updatePosition(DEFAULT_POSITION);
                    _this.dragRef.reset();
                    _this.dragRef.disabled = true;
                    _this.resizableDraggableDialog.detach();
                }
            }));
            this.markdownNavigatorWindowDialog
                .afterClosed()
                .toPromise()
                .then((/**
             * @return {?}
             */
            function () {
                _this.markdownNavigatorWindowDialogsOpen--;
            }));
        };
        /**
         * @private
         * @param {?} dialogRef
         * @return {?}
         */
        TdMarkdownNavigatorWindowService.prototype._getDialogSize = /**
         * @private
         * @param {?} dialogRef
         * @return {?}
         */
        function (dialogRef) {
            var _a = getComputedStyle(((/** @type {?} */ (this._document.getElementById(dialogRef.id)))).parentElement), width = _a.width, height = _a.height;
            return {
                width: width,
                height: height,
            };
        };
        TdMarkdownNavigatorWindowService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        TdMarkdownNavigatorWindowService.ctorParameters = function () { return [
            { type: dialogs.TdDialogService },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.RendererFactory2 }
        ]; };
        return TdMarkdownNavigatorWindowService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        TdMarkdownNavigatorWindowService.prototype._renderer2;
        /**
         * @type {?}
         * @private
         */
        TdMarkdownNavigatorWindowService.prototype.dragRef;
        /**
         * @type {?}
         * @private
         */
        TdMarkdownNavigatorWindowService.prototype.resizableDraggableDialog;
        /**
         * @type {?}
         * @private
         */
        TdMarkdownNavigatorWindowService.prototype.markdownNavigatorWindowDialog;
        /**
         * @type {?}
         * @private
         */
        TdMarkdownNavigatorWindowService.prototype.markdownNavigatorWindowDialogsOpen;
        /**
         * @type {?}
         * @private
         */
        TdMarkdownNavigatorWindowService.prototype._tdDialogService;
        /**
         * @type {?}
         * @private
         */
        TdMarkdownNavigatorWindowService.prototype._document;
        /**
         * @type {?}
         * @private
         */
        TdMarkdownNavigatorWindowService.prototype.rendererFactory;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TdMarkdownNavigatorWindowDirective = /** @class */ (function () {
        function TdMarkdownNavigatorWindowDirective(_markdownNavigatorWindowService) {
            this._markdownNavigatorWindowService = _markdownNavigatorWindowService;
            this.disabled = false;
        }
        /**
         * @return {?}
         */
        TdMarkdownNavigatorWindowDirective.prototype.click = /**
         * @return {?}
         */
        function () {
            if (!this.disabled) {
                this._markdownNavigatorWindowService.open(this.config);
            }
        };
        TdMarkdownNavigatorWindowDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[tdMarkdownNavigatorWindow]',
                    },] }
        ];
        /** @nocollapse */
        TdMarkdownNavigatorWindowDirective.ctorParameters = function () { return [
            { type: TdMarkdownNavigatorWindowService }
        ]; };
        TdMarkdownNavigatorWindowDirective.propDecorators = {
            config: [{ type: core.Input, args: ['tdMarkdownNavigatorWindow',] }],
            disabled: [{ type: core.Input }],
            click: [{ type: core.HostListener, args: ['click',] }]
        };
        return TdMarkdownNavigatorWindowDirective;
    }());
    if (false) {
        /** @type {?} */
        TdMarkdownNavigatorWindowDirective.prototype.config;
        /** @type {?} */
        TdMarkdownNavigatorWindowDirective.prototype.disabled;
        /**
         * @type {?}
         * @private
         */
        TdMarkdownNavigatorWindowDirective.prototype._markdownNavigatorWindowService;
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
                            message.CovalentMessageModule,
                            flavoredMarkdown.CovalentFlavoredMarkdownModule,
                            dialogs.CovalentDialogsModule,
                        ],
                        declarations: [TdMarkdownNavigatorComponent, TdMarkdownNavigatorWindowComponent, TdMarkdownNavigatorWindowDirective],
                        exports: [TdMarkdownNavigatorComponent, TdMarkdownNavigatorWindowComponent, TdMarkdownNavigatorWindowDirective],
                        providers: [TdMarkdownNavigatorWindowService],
                    },] }
        ];
        return CovalentMarkdownNavigatorModule;
    }());

    exports.CovalentMarkdownNavigatorModule = CovalentMarkdownNavigatorModule;
    exports.DEFAULT_MARKDOWN_NAVIGATOR_LABELS = DEFAULT_MARKDOWN_NAVIGATOR_LABELS;
    exports.DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS = DEFAULT_MARKDOWN_NAVIGATOR_WINDOW_LABELS;
    exports.TdMarkdownNavigatorComponent = TdMarkdownNavigatorComponent;
    exports.TdMarkdownNavigatorWindowComponent = TdMarkdownNavigatorWindowComponent;
    exports.TdMarkdownNavigatorWindowService = TdMarkdownNavigatorWindowService;
    exports.ɵa = TdMarkdownNavigatorWindowDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=covalent-markdown-navigator.umd.js.map
