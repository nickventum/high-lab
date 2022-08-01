import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { InjectionToken, Directive, Inject, Input, EventEmitter, Component, ChangeDetectionStrategy, Output, ViewChildren, NgModule, TemplateRef, HostBinding } from '@angular/core';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i2 from '@angular/material/progress-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SubscriptionHelper } from '@high-lab/core';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { __decorate } from 'tslib';
import { StrictModel, StrictProperty } from '@high-lab/strict-model';
import * as i1 from '@angular/router';

const DATA_TABLE_CONFIG = new InjectionToken('dynamicTableConfig');
const DATA_TABLE_CONFIG_MAP = new InjectionToken('dynamicTableConfigMap');

class DataTableCellDirective {
    constructor(viewContainerRef, componentFactoryResolver, componentsByConfig) {
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.componentsByConfig = componentsByConfig;
    }
    ngOnChanges(changes) {
        if (changes.cellConfig && changes.cellConfig.currentValue) {
            const constructor = this.cellConfig.constructor;
            if (!this.componentsByConfig.get(constructor)) {
                throw new Error(`Trying to use an unsupported type (${constructor}).`);
            }
            const component = this.componentFactoryResolver.resolveComponentFactory(this.componentsByConfig.get(constructor));
            this.component = this.viewContainerRef.createComponent(component);
            this.setComponentProps();
        }
    }
    setComponentProps() {
        this.component.instance.cellConfig = this.cellConfig;
        this.component.instance.row = this.row;
        this.component.instance.template = this.template;
    }
}
DataTableCellDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableCellDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }, { token: DATA_TABLE_CONFIG_MAP }], target: i0.ɵɵFactoryTarget.Directive });
DataTableCellDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: DataTableCellDirective, selector: "[cell]", inputs: { cellConfig: "cellConfig", row: "row", template: "template" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cell]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }, { type: Map, decorators: [{
                    type: Inject,
                    args: [DATA_TABLE_CONFIG_MAP]
                }] }]; }, propDecorators: { cellConfig: [{
                type: Input
            }], row: [{
                type: Input
            }], template: [{
                type: Input
            }] } });

function paginationFadeInAnimation(timings = '0.12s ease-in-out') {
    return trigger('paginationFadeIn', [
        transition(`void => *`, [
            animate(timings, keyframes([
                style({ width: 0, offset: 0 }),
                style({ width: 32, offset: 1 })
            ])),
        ]),
    ]);
}
function paginationFadeOutAnimation(timings = '0.12s ease-in-out') {
    return trigger('paginationFadeOut', [
        transition('* => void', [
            animate(timings, keyframes([
                style({ width: 32, offset: 0 }),
                style({ width: 0, offset: 1 })
            ])),
        ]),
    ]);
}

class DynamicTableQueryParamsModel extends StrictModel {
    constructor(options, mapping, defaultValues) {
        super({
            page: options[mapping.page] ?? defaultValues.page,
            pageSize: options[mapping.pageSize] ?? defaultValues.pageSize,
            sort: options[mapping.sort] ?? defaultValues.sort,
        }, false);
        this.mapping = mapping;
        this.defaultValues = defaultValues;
    }
    toString(questionMark) {
        let str = `${this.mapping.page}=${this.page}&` +
            `${this.mapping.pageSize}=${this.pageSize}&` +
            `${this.mapping.sort}=${this.sort}`;
        return (questionMark ? '?' : '') + str;
    }
    toJSON() {
        return Object.entries(super.toJSON()).reduce((acc, [key, value]) => {
            if (value !== '' && value !== null) {
                acc[this.mapping[key]] = value;
            }
            return acc;
        }, {});
    }
}
__decorate([
    StrictProperty(Number)
], DynamicTableQueryParamsModel.prototype, "page", void 0);
__decorate([
    StrictProperty(Number)
], DynamicTableQueryParamsModel.prototype, "pageSize", void 0);
__decorate([
    StrictProperty(String)
], DynamicTableQueryParamsModel.prototype, "sort", void 0);

class PaginationStateHelper {
    constructor(range) {
        this.range = range;
        this.pageArray = [];
    }
    get isFirstPage() {
        return this.page === 1;
    }
    ;
    get isLastPage() {
        return this.page === this.pageCount;
    }
    ;
    setPage(value) {
        if (value < 1) {
            this.page = 1;
        }
        else if (value > this.pageCount) {
            this.page = this.pageCount;
        }
        else {
            this.page = value;
        }
        this.updateState();
        return this.page;
    }
    setPageCount(value) {
        if (value < 1) {
            this.pageCount = 1;
        }
        else {
            this.pageCount = value;
        }
        if (this.page > this.pageCount) {
            this.page = this.pageCount;
        }
        this.updateState();
    }
    prevPage() {
        if (!this.isFirstPage) {
            this.page--;
            this.updateState();
        }
        return this.page;
    }
    nextPage() {
        if (!this.isLastPage) {
            this.page++;
            this.updateState();
        }
        return this.page;
    }
    updateState() {
        this.pageArray = [];
        if (this.pageCount < this.range * 2 + 3) {
            for (let i = 1; i <= this.pageCount; i++) {
                this.pageArray.push({ isNumber: true, value: i });
            }
        }
        else if (this.page < this.range * 2 - 1) {
            for (let i = 1; i <= this.range * 2 + 1; i++) {
                this.pageArray.push({ isNumber: true, value: i });
            }
            this.pageArray.push({ isNumber: false, value: null });
            this.pageArray.push({ isNumber: true, value: this.pageCount });
        }
        else if (this.page > this.pageCount - this.range - 2) {
            this.pageArray.push({ isNumber: true, value: 1 });
            this.pageArray.push({ isNumber: false, value: null });
            for (let i = this.pageCount - this.range * 2; i <= this.pageCount; i++) {
                this.pageArray.push({ isNumber: true, value: i });
            }
        }
        else {
            this.pageArray.push({ isNumber: true, value: 1 });
            this.pageArray.push({ isNumber: false, value: null });
            for (let i = this.page - this.range + 1; i < this.page + this.range; i++) {
                this.pageArray.push({ isNumber: true, value: i });
            }
            this.pageArray.push({ isNumber: false, value: null });
            this.pageArray.push({ isNumber: true, value: this.pageCount });
        }
    }
}

class SortStateHelper {
    fromString(value) {
        const newValue = value ? value.split(',') : [];
        this.active = newValue[0];
        this.direction = newValue[1] === 'asc' ? 'asc' : 'desc';
    }
    toString() {
        if (!this.active || !this.direction) {
            return '';
        }
        return `${this.active},${this.direction}`;
    }
    update(active) {
        if (active === this.active) {
            this.nextDirection();
        }
        else {
            this.active = active;
            this.direction = 'asc';
        }
    }
    nextDirection() {
        // if (this.direction === 'asc') {
        // 	this.direction = 'desc';
        // } else if (this.direction === 'desc') {
        // 	this.direction = null;
        // 	this.active = null;
        // } else {
        // 	this.direction = 'asc';
        // }
        if (this.direction === 'asc') {
            this.direction = 'desc';
        }
        else {
            this.direction = 'asc';
        }
    }
}

class DynamicTableComponent {
    constructor(elementRef, changeDetectorRef, router, selfActivatedRoute, componentsByConfig) {
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.router = router;
        this.selfActivatedRoute = selfActivatedRoute;
        this.componentsByConfig = componentsByConfig;
        this.subscriptionHelper = new SubscriptionHelper();
        this.lastRenderedSizes = [];
        this.sortState = new SortStateHelper();
        this.firstInit = true;
        this.emptyRows = null;
        this.rowHeight = 56;
        this.queryParamsMapping = {
            page: 'page',
            pageSize: 'pageSize',
            sort: 'sort'
        };
        this.trackBy = (index, row) => {
            return row;
        };
        this.requestPageData = new EventEmitter();
        this.rowClick = new EventEmitter();
        this.trackPaginationBy = (index, item) => {
            return item.value;
        };
    }
    set activatedRoute(value) {
        this.innerActivatedRoute = value;
    }
    get activatedRoute() {
        return this.innerActivatedRoute || this.selfActivatedRoute;
    }
    async ngOnInit() {
        this.queryParamsModel = this.getQueryParamsModel();
        await this.updateRouterQueryParams(true, true);
        this.subscriptionHelper.next = this.activatedRoute.queryParams.subscribe(() => {
            const newQueryParamsModel = this.getQueryParamsModel();
            if (this.queryParamsModel.toString() !== newQueryParamsModel.toString()) {
                this.queryParamsModel = newQueryParamsModel;
                this.requestPageData.emit(this.queryParamsModel);
                if (this.paginationState) {
                    this.paginationState.page = this.queryParamsModel.page;
                }
                this.sortState.fromString(this.queryParamsModel.sort);
            }
        });
    }
    ngOnChanges(changes) {
        if (changes.dataSource && changes.dataSource.currentValue && this.dataSource.isSuccess) {
            if (!this.paginationState) {
                this.paginationState = new PaginationStateHelper(4);
            }
            this.paginationState.setPageCount(this.dataSource.pagination.totalPages);
            this.paginationState.setPage(this.dataSource.pagination.page);
            this.sortState.fromString(this.dataSource.pagination.sort);
            if (this.fixSizeByLoading) {
                this.updateLastRenderedSizes();
            }
            if (this.fillEmpty) {
                this.emptyRows = new Array(this.dataSource.pagination.pageSize - this.dataSource.data.length).fill(null);
            }
            else {
                this.emptyRows = null;
            }
            let updateRouterQueryParams = false;
            if (this.sortState.toString() !== this.queryParamsModel.sort) {
                this.queryParamsModel.sort = this.sortState.toString();
                updateRouterQueryParams = true;
            }
            if (this.paginationState.page !== this.queryParamsModel.page) {
                this.queryParamsModel.page = this.paginationState.page;
                updateRouterQueryParams = true;
            }
            if (updateRouterQueryParams) {
                this.updateRouterQueryParams();
            }
            this.changeDetectorRef.detectChanges();
            this.firstInit = false;
        }
        if (changes.queryParamsMapping) {
            this.queryParamsModel = this.getQueryParamsModel();
        }
    }
    ngOnDestroy() {
        this.subscriptionHelper.unsubscribeAll();
    }
    get countOfRows() {
        const count = Math.floor(this.elementRef.nativeElement.getBoundingClientRect().height / this.rowHeight) - 2;
        if (count <= 0) {
            return 1;
        }
        return count;
    }
    get tableHeight() {
        if (this.dataSource.isLoading || this.dataSource.isEmptyData ||
            this.dataSource.isFailure || this.countOfRows === this.dataSource.data.length ||
            this.fillEmpty) {
            return '100%';
        }
        return 'auto';
    }
    get skeletonRows() {
        return new Array(this.countOfRows);
    }
    getWidth(index) {
        if (!this.fixSizeByLoading || !this.lastRenderedSizes[index] || this.dataSource.isLoaded) {
            return 'auto';
        }
        return `${this.lastRenderedSizes[index]}px`;
    }
    onClick(event, row) {
        this.rowClick.next(row);
    }
    onMouseOver(evt, rowIndex) {
        if (this.hoverIndex !== rowIndex) {
            this.hoverIndex = rowIndex;
            this.changeDetectorRef.detectChanges();
        }
    }
    onMouseOut() {
        if (this.hoverIndex !== null) {
            this.hoverIndex = null;
            this.changeDetectorRef.detectChanges();
        }
    }
    onPaginationChange(nextPage) {
        this.queryParamsModel.page = nextPage;
        this.updateRouterQueryParams(false);
    }
    onSortChange(cell) {
        if (!cell.sort) {
            return;
        }
        this.sortState.update(cell.key);
        this.queryParamsModel.sort = this.sortState.toString();
        this.updateRouterQueryParams(false);
    }
    getQueryParamsModel() {
        return new DynamicTableQueryParamsModel(this.activatedRoute.snapshot.queryParams, this.queryParamsMapping, this.getDefaultQueryParams());
    }
    getDefaultQueryParams() {
        const defaultSort = this.table.find(v => v.defaultSort)?.key;
        const firstSort = this.table.find(v => v.sort)?.key;
        const sort = defaultSort || firstSort || '';
        return {
            page: 1,
            pageSize: this.countOfRows,
            sort: `${sort}${sort ? ',desc' : ''}`,
        };
    }
    updateRouterQueryParams(replaceUrl = true, emitEvent = false) {
        const allQueryParams = { ...this.activatedRoute.snapshot.queryParams };
        const newQueryParams = this.queryParamsModel.toJSON();
        if (!newQueryParams.hasOwnProperty(this.queryParamsMapping.sort)) {
            delete allQueryParams[this.queryParamsMapping.sort];
        }
        if (!replaceUrl || emitEvent) {
            this.requestPageData.emit(this.queryParamsModel);
        }
        return this.router.navigate(['./'], {
            replaceUrl,
            queryParams: { ...allQueryParams, ...newQueryParams },
            relativeTo: this.activatedRoute,
        });
    }
    updateLastRenderedSizes() {
        requestAnimationFrame(() => {
            this.lastRenderedSizes = [];
            this.thRef.forEach(item => this.lastRenderedSizes.push(item.nativeElement.getBoundingClientRect().width));
        });
    }
}
DynamicTableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicTableComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.Router }, { token: i1.ActivatedRoute }, { token: DATA_TABLE_CONFIG_MAP }], target: i0.ɵɵFactoryTarget.Component });
DynamicTableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: DynamicTableComponent, selector: "dynamic-table", inputs: { dataSource: "dataSource", table: "table", templates: "templates", fillEmpty: "fillEmpty", fixSizeByLoading: "fixSizeByLoading", rowHeight: "rowHeight", noDataMessage: "noDataMessage", queryParamsMapping: "queryParamsMapping", activatedRoute: "activatedRoute", trackBy: "trackBy" }, outputs: { requestPageData: "requestPageData", rowClick: "rowClick" }, viewQueries: [{ propertyName: "thRef", predicate: ["thRef"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<mat-progress-bar *ngIf=\"dataSource.isLoading\" mode=\"indeterminate\" [style.top.px]=\"rowHeight - 4\"></mat-progress-bar>\r\n\r\n<table [style.height]=\"tableHeight\"\r\n       [style.table-layout]=\"this.fixSizeByLoading && !this.dataSource.isLoaded ? 'fixed' : 'auto'\"\r\n>\r\n    <thead>\r\n        <tr [style.height.px]=\"rowHeight\">\r\n            <th [class.with-sort]=\"item.sort\"\r\n                [style.width]=\"getWidth(index)\"\r\n                #thRef\r\n                *ngFor=\"let item of table; let index = index\"\r\n                (click)=\"onSortChange(item)\"\r\n            >\r\n               <div class=\"d-fx ai-c\">\r\n                   {{item.label}}\r\n\r\n                   <div *ngIf=\"item.sort\" class=\"sort\">\r\n                       <mat-icon [class.active]=\"sortState.active === item.key && sortState.direction === 'asc'\">arrow_drop_up</mat-icon>\r\n                       <mat-icon [class.active]=\"sortState.active === item.key && sortState.direction === 'desc'\">arrow_drop_down</mat-icon>\r\n                   </div>\r\n               </div>\r\n            </th>\r\n<!--            <ng-container *ngTemplateOutlet=\"headComponent?.headRef;\"></ng-container>-->\r\n        </tr>\r\n    </thead>\r\n\r\n\r\n    <tbody [style.height.px]=\"rowHeight\">\r\n        <ng-container *ngIf=\"dataSource.isLoading\">\r\n            <tr *ngFor=\"let item of skeletonRows; let odd = odd\">\r\n                <td class=\"cell\" *ngFor=\"let x of table\">\r\n                    <div class=\"content-loader\"\r\n                         [class.content-loader--odd]=\"odd\"\r\n                    ></div>\r\n                </td>\r\n            </tr>\r\n        </ng-container>\r\n\r\n        <ng-container *ngIf=\"dataSource.isSuccess && !dataSource.isEmptyData\">\r\n            <tr *ngFor=\"let row of dataSource.data; trackBy: trackBy let index = index\"\r\n                [class.hover]=\"hoverIndex === index\"\r\n                (click)=\"onClick($event, row)\"\r\n                (mouseover)=\"onMouseOver($event, index)\"\r\n                (mouseout)=\"onMouseOut()\"\r\n            >\r\n<!--                [class.hover-enabled]=\"rowComponent.hover\"-->\r\n                <ng-container *ngFor=\"let cell of table\"\r\n                              cell\r\n                              [cellConfig]=\"cell\"\r\n                              [row]=\"row\"\r\n                              [template]=\"templates[cell.key]\"\r\n                ></ng-container>\r\n<!--                <ng-container *ngTemplateOutlet=\"rowComponent?.rowRef; context: {item}\"></ng-container>-->\r\n            </tr>\r\n\r\n            <tr *ngFor=\"let x of emptyRows\" class=\"empty-row\">\r\n                <td [attr.colSpan]=\"table.length\"></td>\r\n            </tr>\r\n        </ng-container>\r\n\r\n\r\n        <ng-container *ngIf=\"dataSource.isSuccess && dataSource.isEmptyData\">\r\n            <tr>\r\n                <td [attr.colSpan]=\"table.length\" class=\"ta-c\">\r\n                  {{noDataMessage || 'No Data'}}\r\n                </td>\r\n            </tr>\r\n        </ng-container>\r\n\r\n        <ng-container *ngIf=\"dataSource.isFailure\">\r\n            <tr>\r\n                <td [attr.colSpan]=\"table.length\" class=\"ta-c\">\r\n                    Oops! Something went wrong.<br/>\r\n                    Please try again later.\r\n                </td>\r\n            </tr>\r\n        </ng-container>\r\n    </tbody>\r\n\r\n\r\n    <tfoot>\r\n        <tr [style.height.px]=\"rowHeight\">\r\n            <td [attr.colSpan]=\"table.length\">\r\n\r\n                <div class=\"pagination\" *ngIf=\"dataSource.isSuccess || paginationState\">\r\n                    <mat-icon class=\"pagination__arrow\"\r\n                              [class.pagination__arrow--disabled]=\"paginationState.isFirstPage\"\r\n                              (click)=\"onPaginationChange(paginationState.prevPage())\"\r\n                    >chevron_left</mat-icon>\r\n\r\n                    <div class=\"d-fx ai-c\" [style.width.px]=\"paginationState.pageArray.length * 32\">\r\n                        <ng-container *ngFor=\"let item of paginationState.pageArray; trackBy: trackPaginationBy\">\r\n                            <div class=\"pagination__page\"\r\n                                 [class.pagination__page--active]=\"item.value === paginationState.page\"\r\n                                 *ngIf=\"item.isNumber\"\r\n                                 [@paginationFadeIn]=\"!firstInit ? 'enabled' : null\"\r\n                                 [@paginationFadeOut]=\"!firstInit ? 'enabled' : null\"\r\n                                 (click)=\"onPaginationChange(paginationState.setPage(item.value))\"\r\n                            >{{item.value}}</div>\r\n\r\n                            <div class=\"pagination__space\"\r\n                                 *ngIf=\"!item.isNumber\"\r\n                                 [@paginationFadeIn]=\"!firstInit ? 'enabled' : null\"\r\n                                 [@paginationFadeOut]=\"!firstInit ? 'enabled' : null\"\r\n                            >...</div>\r\n                        </ng-container>\r\n                    </div>\r\n\r\n                    <mat-icon class=\"pagination__arrow\"\r\n                              [class.pagination__arrow--disabled]=\"paginationState.isLastPage\"\r\n                              (click)=\"onPaginationChange(paginationState.nextPage())\"\r\n                    >chevron_right</mat-icon>\r\n                </div>\r\n\r\n                <div class=\"d-fx ai-c jc-c\" *ngIf=\"dataSource.isLoading && !paginationState\">\r\n                    <div class=\"content-loader mr-x\" *ngFor=\"let x of [0, 0, 0 ,0 ,0, 0, 0]\"></div>\r\n                </div>\r\n            </td>\r\n        </tr>\r\n    </tfoot>\r\n</table>\r\n", styles: [":host{display:block;height:100%;position:relative}:host mat-progress-bar{position:absolute;right:0;left:0}:host::ng-deep table{width:100%;height:100%;border-collapse:collapse;border-spacing:0;border-radius:10px;overflow:hidden}:host::ng-deep table th{padding:var(--size-x) 0 var(--size-x) var(--size-x3)}:host::ng-deep table th:first-child{padding-left:var(--size-x4)}:host::ng-deep table th:last-child{padding-right:var(--size-x4)}:host::ng-deep table thead th{font-size:11px;font-weight:700;text-transform:uppercase;text-align:left;box-sizing:border-box}:host::ng-deep table thead th.with-sort{cursor:pointer;-webkit-user-select:none;user-select:none}:host::ng-deep table thead th .sort{display:inline-flex;flex-direction:column;color:var(--text-color-tint)}:host::ng-deep table thead th .sort mat-icon{height:8px;line-height:6px;font-size:20px;width:15px;cursor:pointer;margin-left:2px}:host::ng-deep table thead th .sort mat-icon.active{color:var(--color-primary)}:host::ng-deep table tbody tr{height:inherit;pointer-events:none}:host::ng-deep table tbody tr:not(.empty-row):nth-child(odd){background:var(--plate-background-color)}:host::ng-deep table tbody tr:not(.empty-row):nth-child(even){background:var(--plate-nested-background-color)}:host::ng-deep table tbody tr.empty-row{pointer-events:none;background:var(--plate-background-color)}:host::ng-deep table tbody tr .cell{--table-row-hover-color: transparent;display:table-cell;vertical-align:inherit;pointer-events:auto;font-size:14px;padding:var(--size-x) 0 var(--size-x) var(--size-x3)}:host::ng-deep table tbody tr .cell:first-child{border-left:6px solid var(--table-row-hover-color);padding-left:calc(var(--size-x4) - 6px)}:host::ng-deep table tbody tr .cell:last-child{border-right:6px solid var(--table-row-hover-color);padding-right:calc(var(--size-x4) - 6px)}:host::ng-deep table tbody tr.hover{cursor:pointer}:host::ng-deep table tbody tr.hover .cell{--table-row-hover-color: var(--color-primary)}:host::ng-deep table tbody tr .content-loader{width:100%;height:18px;border-radius:4px;overflow:hidden}:host::ng-deep table tfoot{background:var(--plate-background-color)}:host::ng-deep table tfoot td{border-top:1px solid var(--divider-color)}:host::ng-deep table tfoot .content-loader{width:24px;height:24px;margin:8px;border-radius:4px}:host::ng-deep table tfoot .pagination{color:var(--text-color-tint);display:flex;align-items:center;justify-content:center;-webkit-user-select:none;user-select:none}:host::ng-deep table tfoot .pagination__arrow,:host::ng-deep table tfoot .pagination__page,:host::ng-deep table tfoot .pagination__space{width:32px;height:32px}:host::ng-deep table tfoot .pagination__arrow{border:1px solid var(--color-primary);border-radius:4px;margin:0 var(--size-x3);font-size:30px;cursor:pointer;color:var(--color-primary);transition:color .2s;box-sizing:border-box}:host::ng-deep table tfoot .pagination__arrow:hover:not(.pagination__arrow--disabled){color:var(--color-primary-tint);border-color:var(--color-primary-tint)}:host::ng-deep table tfoot .pagination__arrow--disabled{color:var(--text-color-tint);border-color:var(--divider-color);pointer-events:none}:host::ng-deep table tfoot .pagination__page{cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;transition:color .2s;will-change:width;overflow:hidden}:host::ng-deep table tfoot .pagination__page:hover{color:var(--color-primary-tint)}:host::ng-deep table tfoot .pagination__page--active{color:var(--color-primary)}:host::ng-deep table tfoot .pagination__space{display:flex;align-items:center;justify-content:center;will-change:width;overflow:hidden}\n"], components: [{ type: i2.MatProgressBar, selector: "mat-progress-bar", inputs: ["color", "mode", "value", "bufferValue"], outputs: ["animationEnd"], exportAs: ["matProgressBar"] }, { type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: DataTableCellDirective, selector: "[cell]", inputs: ["cellConfig", "row", "template"] }], animations: [paginationFadeInAnimation(), paginationFadeOutAnimation()], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dynamic-table', animations: [paginationFadeInAnimation(), paginationFadeOutAnimation()], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-progress-bar *ngIf=\"dataSource.isLoading\" mode=\"indeterminate\" [style.top.px]=\"rowHeight - 4\"></mat-progress-bar>\r\n\r\n<table [style.height]=\"tableHeight\"\r\n       [style.table-layout]=\"this.fixSizeByLoading && !this.dataSource.isLoaded ? 'fixed' : 'auto'\"\r\n>\r\n    <thead>\r\n        <tr [style.height.px]=\"rowHeight\">\r\n            <th [class.with-sort]=\"item.sort\"\r\n                [style.width]=\"getWidth(index)\"\r\n                #thRef\r\n                *ngFor=\"let item of table; let index = index\"\r\n                (click)=\"onSortChange(item)\"\r\n            >\r\n               <div class=\"d-fx ai-c\">\r\n                   {{item.label}}\r\n\r\n                   <div *ngIf=\"item.sort\" class=\"sort\">\r\n                       <mat-icon [class.active]=\"sortState.active === item.key && sortState.direction === 'asc'\">arrow_drop_up</mat-icon>\r\n                       <mat-icon [class.active]=\"sortState.active === item.key && sortState.direction === 'desc'\">arrow_drop_down</mat-icon>\r\n                   </div>\r\n               </div>\r\n            </th>\r\n<!--            <ng-container *ngTemplateOutlet=\"headComponent?.headRef;\"></ng-container>-->\r\n        </tr>\r\n    </thead>\r\n\r\n\r\n    <tbody [style.height.px]=\"rowHeight\">\r\n        <ng-container *ngIf=\"dataSource.isLoading\">\r\n            <tr *ngFor=\"let item of skeletonRows; let odd = odd\">\r\n                <td class=\"cell\" *ngFor=\"let x of table\">\r\n                    <div class=\"content-loader\"\r\n                         [class.content-loader--odd]=\"odd\"\r\n                    ></div>\r\n                </td>\r\n            </tr>\r\n        </ng-container>\r\n\r\n        <ng-container *ngIf=\"dataSource.isSuccess && !dataSource.isEmptyData\">\r\n            <tr *ngFor=\"let row of dataSource.data; trackBy: trackBy let index = index\"\r\n                [class.hover]=\"hoverIndex === index\"\r\n                (click)=\"onClick($event, row)\"\r\n                (mouseover)=\"onMouseOver($event, index)\"\r\n                (mouseout)=\"onMouseOut()\"\r\n            >\r\n<!--                [class.hover-enabled]=\"rowComponent.hover\"-->\r\n                <ng-container *ngFor=\"let cell of table\"\r\n                              cell\r\n                              [cellConfig]=\"cell\"\r\n                              [row]=\"row\"\r\n                              [template]=\"templates[cell.key]\"\r\n                ></ng-container>\r\n<!--                <ng-container *ngTemplateOutlet=\"rowComponent?.rowRef; context: {item}\"></ng-container>-->\r\n            </tr>\r\n\r\n            <tr *ngFor=\"let x of emptyRows\" class=\"empty-row\">\r\n                <td [attr.colSpan]=\"table.length\"></td>\r\n            </tr>\r\n        </ng-container>\r\n\r\n\r\n        <ng-container *ngIf=\"dataSource.isSuccess && dataSource.isEmptyData\">\r\n            <tr>\r\n                <td [attr.colSpan]=\"table.length\" class=\"ta-c\">\r\n                  {{noDataMessage || 'No Data'}}\r\n                </td>\r\n            </tr>\r\n        </ng-container>\r\n\r\n        <ng-container *ngIf=\"dataSource.isFailure\">\r\n            <tr>\r\n                <td [attr.colSpan]=\"table.length\" class=\"ta-c\">\r\n                    Oops! Something went wrong.<br/>\r\n                    Please try again later.\r\n                </td>\r\n            </tr>\r\n        </ng-container>\r\n    </tbody>\r\n\r\n\r\n    <tfoot>\r\n        <tr [style.height.px]=\"rowHeight\">\r\n            <td [attr.colSpan]=\"table.length\">\r\n\r\n                <div class=\"pagination\" *ngIf=\"dataSource.isSuccess || paginationState\">\r\n                    <mat-icon class=\"pagination__arrow\"\r\n                              [class.pagination__arrow--disabled]=\"paginationState.isFirstPage\"\r\n                              (click)=\"onPaginationChange(paginationState.prevPage())\"\r\n                    >chevron_left</mat-icon>\r\n\r\n                    <div class=\"d-fx ai-c\" [style.width.px]=\"paginationState.pageArray.length * 32\">\r\n                        <ng-container *ngFor=\"let item of paginationState.pageArray; trackBy: trackPaginationBy\">\r\n                            <div class=\"pagination__page\"\r\n                                 [class.pagination__page--active]=\"item.value === paginationState.page\"\r\n                                 *ngIf=\"item.isNumber\"\r\n                                 [@paginationFadeIn]=\"!firstInit ? 'enabled' : null\"\r\n                                 [@paginationFadeOut]=\"!firstInit ? 'enabled' : null\"\r\n                                 (click)=\"onPaginationChange(paginationState.setPage(item.value))\"\r\n                            >{{item.value}}</div>\r\n\r\n                            <div class=\"pagination__space\"\r\n                                 *ngIf=\"!item.isNumber\"\r\n                                 [@paginationFadeIn]=\"!firstInit ? 'enabled' : null\"\r\n                                 [@paginationFadeOut]=\"!firstInit ? 'enabled' : null\"\r\n                            >...</div>\r\n                        </ng-container>\r\n                    </div>\r\n\r\n                    <mat-icon class=\"pagination__arrow\"\r\n                              [class.pagination__arrow--disabled]=\"paginationState.isLastPage\"\r\n                              (click)=\"onPaginationChange(paginationState.nextPage())\"\r\n                    >chevron_right</mat-icon>\r\n                </div>\r\n\r\n                <div class=\"d-fx ai-c jc-c\" *ngIf=\"dataSource.isLoading && !paginationState\">\r\n                    <div class=\"content-loader mr-x\" *ngFor=\"let x of [0, 0, 0 ,0 ,0, 0, 0]\"></div>\r\n                </div>\r\n            </td>\r\n        </tr>\r\n    </tfoot>\r\n</table>\r\n", styles: [":host{display:block;height:100%;position:relative}:host mat-progress-bar{position:absolute;right:0;left:0}:host::ng-deep table{width:100%;height:100%;border-collapse:collapse;border-spacing:0;border-radius:10px;overflow:hidden}:host::ng-deep table th{padding:var(--size-x) 0 var(--size-x) var(--size-x3)}:host::ng-deep table th:first-child{padding-left:var(--size-x4)}:host::ng-deep table th:last-child{padding-right:var(--size-x4)}:host::ng-deep table thead th{font-size:11px;font-weight:700;text-transform:uppercase;text-align:left;box-sizing:border-box}:host::ng-deep table thead th.with-sort{cursor:pointer;-webkit-user-select:none;user-select:none}:host::ng-deep table thead th .sort{display:inline-flex;flex-direction:column;color:var(--text-color-tint)}:host::ng-deep table thead th .sort mat-icon{height:8px;line-height:6px;font-size:20px;width:15px;cursor:pointer;margin-left:2px}:host::ng-deep table thead th .sort mat-icon.active{color:var(--color-primary)}:host::ng-deep table tbody tr{height:inherit;pointer-events:none}:host::ng-deep table tbody tr:not(.empty-row):nth-child(odd){background:var(--plate-background-color)}:host::ng-deep table tbody tr:not(.empty-row):nth-child(even){background:var(--plate-nested-background-color)}:host::ng-deep table tbody tr.empty-row{pointer-events:none;background:var(--plate-background-color)}:host::ng-deep table tbody tr .cell{--table-row-hover-color: transparent;display:table-cell;vertical-align:inherit;pointer-events:auto;font-size:14px;padding:var(--size-x) 0 var(--size-x) var(--size-x3)}:host::ng-deep table tbody tr .cell:first-child{border-left:6px solid var(--table-row-hover-color);padding-left:calc(var(--size-x4) - 6px)}:host::ng-deep table tbody tr .cell:last-child{border-right:6px solid var(--table-row-hover-color);padding-right:calc(var(--size-x4) - 6px)}:host::ng-deep table tbody tr.hover{cursor:pointer}:host::ng-deep table tbody tr.hover .cell{--table-row-hover-color: var(--color-primary)}:host::ng-deep table tbody tr .content-loader{width:100%;height:18px;border-radius:4px;overflow:hidden}:host::ng-deep table tfoot{background:var(--plate-background-color)}:host::ng-deep table tfoot td{border-top:1px solid var(--divider-color)}:host::ng-deep table tfoot .content-loader{width:24px;height:24px;margin:8px;border-radius:4px}:host::ng-deep table tfoot .pagination{color:var(--text-color-tint);display:flex;align-items:center;justify-content:center;-webkit-user-select:none;user-select:none}:host::ng-deep table tfoot .pagination__arrow,:host::ng-deep table tfoot .pagination__page,:host::ng-deep table tfoot .pagination__space{width:32px;height:32px}:host::ng-deep table tfoot .pagination__arrow{border:1px solid var(--color-primary);border-radius:4px;margin:0 var(--size-x3);font-size:30px;cursor:pointer;color:var(--color-primary);transition:color .2s;box-sizing:border-box}:host::ng-deep table tfoot .pagination__arrow:hover:not(.pagination__arrow--disabled){color:var(--color-primary-tint);border-color:var(--color-primary-tint)}:host::ng-deep table tfoot .pagination__arrow--disabled{color:var(--text-color-tint);border-color:var(--divider-color);pointer-events:none}:host::ng-deep table tfoot .pagination__page{cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;transition:color .2s;will-change:width;overflow:hidden}:host::ng-deep table tfoot .pagination__page:hover{color:var(--color-primary-tint)}:host::ng-deep table tfoot .pagination__page--active{color:var(--color-primary)}:host::ng-deep table tfoot .pagination__space{display:flex;align-items:center;justify-content:center;will-change:width;overflow:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.Router }, { type: i1.ActivatedRoute }, { type: Map, decorators: [{
                    type: Inject,
                    args: [DATA_TABLE_CONFIG_MAP]
                }] }]; }, propDecorators: { dataSource: [{
                type: Input
            }], table: [{
                type: Input
            }], templates: [{
                type: Input
            }], fillEmpty: [{
                type: Input
            }], fixSizeByLoading: [{
                type: Input
            }], rowHeight: [{
                type: Input
            }], noDataMessage: [{
                type: Input
            }], queryParamsMapping: [{
                type: Input
            }], activatedRoute: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], requestPageData: [{
                type: Output
            }], rowClick: [{
                type: Output
            }], thRef: [{
                type: ViewChildren,
                args: ['thRef']
            }] } });

class DynamicTableModule {
    static config(dataTableConfig) {
        const dataTableConfigMap = new Map(dataTableConfig.map(v => ([v.config, v.component])));
        return {
            ngModule: DynamicTableModule,
            providers: [
                { provide: DATA_TABLE_CONFIG, useValue: dataTableConfig },
                { provide: DATA_TABLE_CONFIG_MAP, useValue: dataTableConfigMap },
            ]
        };
    }
}
DynamicTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DynamicTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicTableModule, declarations: [DynamicTableComponent,
        DataTableCellDirective], imports: [CommonModule,
        MatIconModule,
        MatProgressBarModule], exports: [DynamicTableComponent] });
DynamicTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicTableModule, imports: [[
            CommonModule,
            MatIconModule,
            MatProgressBarModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicTableModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        DynamicTableComponent,
                        DataTableCellDirective,
                    ],
                    imports: [
                        CommonModule,
                        MatIconModule,
                        MatProgressBarModule
                    ],
                    exports: [DynamicTableComponent]
                }]
        }] });

class DataTableCellComponent {
    constructor(elementRef, renderer2) {
        this.elementRef = elementRef;
        this.renderer2 = renderer2;
        this.subscriptionHelper = new SubscriptionHelper();
    }
    get cellClass() {
        return `cell ${this.cellConfig.class || ''}`;
    }
    ;
    get stopRowEventPropagation() {
        return this.cellConfig.stopRowEventPropagation;
    }
    ngOnInit() {
        if (this.cellConfig.stopRowEventPropagation) {
            this.subscriptionHelper.next = this.renderer2.listen(this.elementRef.nativeElement, 'click', evt => {
                evt.stopPropagation();
            });
            this.subscriptionHelper.next = this.renderer2.listen(this.elementRef.nativeElement, 'mouseover', evt => {
                evt.stopPropagation();
            });
            this.subscriptionHelper.next = this.renderer2.listen(this.elementRef.nativeElement, 'mouseout', evt => {
                evt.stopPropagation();
            });
        }
    }
    ngOnDestroy() {
        this.subscriptionHelper.unsubscribeAll();
    }
    get displayValue() {
        if (typeof this.cellConfig.value === 'function') {
            return this.cellConfig.value(this.row);
        }
        return this.row[this.cellConfig.key];
    }
    get hasTemplateRef() {
        return !!this.template && this.template instanceof TemplateRef;
    }
    get templateRef() {
        if (this.template instanceof TemplateRef) {
            return this.template;
        }
        return null;
    }
}
DataTableCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableCellComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
DataTableCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: DataTableCellComponent, selector: "ng-component", inputs: { cellConfig: "cellConfig", row: "row", template: "template" }, host: { properties: { "class": "this.cellClass", "attr.stopRowEventPropagation": "this.stopRowEventPropagation" } }, ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableCellComponent, decorators: [{
            type: Component,
            args: [{
                    template: '',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { cellConfig: [{
                type: Input
            }], row: [{
                type: Input
            }], template: [{
                type: Input
            }], cellClass: [{
                type: HostBinding,
                args: ['class']
            }], stopRowEventPropagation: [{
                type: HostBinding,
                args: ['attr.stopRowEventPropagation']
            }] } });

class TableCell {
    constructor(options) {
        this.key = options.key;
        this.label = options.label;
        this.sort = options.sort;
        this.defaultSort = options.defaultSort;
        this.value = options.value;
        this.class = options.class;
        this.stopRowEventPropagation = options.stopRowEventPropagation;
    }
}

/*
 * Public API Surface of dynamic-table
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DATA_TABLE_CONFIG, DATA_TABLE_CONFIG_MAP, DataTableCellComponent, DynamicTableComponent, DynamicTableModule, DynamicTableQueryParamsModel, TableCell };
//# sourceMappingURL=high-lab-dynamic-table.mjs.map
