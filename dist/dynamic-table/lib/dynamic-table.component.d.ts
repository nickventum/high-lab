import { ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingProgress, Pagination, SubscriptionHelper } from '@high-lab/core';
import { DataTableCellComponent } from './data-table-cell.component';
import { DynamicTableQueryParamsModel } from './dynamic-table-query-params.model';
import { DataTableQueryParamsMapping } from './interfaces';
import { PaginationStateHelper } from './pagination-state.helper';
import { SortStateHelper } from './sort-state.helper';
import { TableCell } from './table-cell';
import * as i0 from "@angular/core";
export declare class DynamicTableComponent<T> implements OnChanges, OnInit, OnDestroy {
    private readonly elementRef;
    private readonly changeDetectorRef;
    private readonly router;
    private readonly selfActivatedRoute;
    private readonly componentsByConfig;
    protected readonly subscriptionHelper: SubscriptionHelper;
    protected innerActivatedRoute: ActivatedRoute;
    protected preventEmitEvent: boolean;
    queryParamsModel: DynamicTableQueryParamsModel;
    lastRenderedSizes: number[];
    paginationState: PaginationStateHelper;
    sortState: SortStateHelper;
    firstInit: boolean;
    hoverIndex: number;
    emptyRows: number[];
    dataSource: LoadingProgress<Pagination<T>>;
    table: TableCell[];
    templates: {
        [key: string]: TemplateRef<{
            row: any;
        }>;
    };
    fillEmpty: boolean;
    fixSizeByLoading: boolean;
    rowHeight: number;
    noDataMessage: string;
    queryParamsMapping: DataTableQueryParamsMapping;
    set activatedRoute(value: ActivatedRoute);
    get activatedRoute(): ActivatedRoute;
    trackBy: (index: number, row: any) => any;
    requestPageData: EventEmitter<DynamicTableQueryParamsModel>;
    rowClick: EventEmitter<T>;
    thRef: QueryList<ElementRef<HTMLTableHeaderCellElement>>;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, router: Router, selfActivatedRoute: ActivatedRoute, componentsByConfig: Map<any, DataTableCellComponent>);
    ngOnInit(): Promise<void>;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    get countOfRows(): number;
    get tableHeight(): string;
    get skeletonRows(): number[];
    trackPaginationBy: (index: any, item: any) => any;
    getWidth(index: any): string;
    onClick(event: MouseEvent, row: any): void;
    onMouseOver(evt: MouseEvent, rowIndex: number): void;
    onMouseOut(): void;
    onPaginationChange(nextPage: number): void;
    onSortChange(cell: TableCell): void;
    private getQueryParamsModel;
    private getDefaultQueryParams;
    private updateRouterQueryParams;
    private updateLastRenderedSizes;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicTableComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DynamicTableComponent<any>, "dynamic-table", never, { "dataSource": "dataSource"; "table": "table"; "templates": "templates"; "fillEmpty": "fillEmpty"; "fixSizeByLoading": "fixSizeByLoading"; "rowHeight": "rowHeight"; "noDataMessage": "noDataMessage"; "queryParamsMapping": "queryParamsMapping"; "activatedRoute": "activatedRoute"; "trackBy": "trackBy"; }, { "requestPageData": "requestPageData"; "rowClick": "rowClick"; }, never, never>;
}