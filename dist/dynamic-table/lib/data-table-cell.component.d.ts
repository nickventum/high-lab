import { ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { TableCell } from './table-cell';
import * as i0 from "@angular/core";
export declare class DataTableCellComponent implements OnInit, OnDestroy {
    private readonly elementRef;
    private readonly renderer2;
    private readonly subscriptionHelper;
    cellConfig: TableCell;
    row: any;
    template: TemplateRef<any>;
    get cellClass(): string;
    get stopRowEventPropagation(): boolean;
    constructor(elementRef: ElementRef, renderer2: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    get displayValue(): string;
    get hasTemplateRef(): boolean;
    get templateRef(): TemplateRef<any> | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTableCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataTableCellComponent, "ng-component", never, { "cellConfig": "cellConfig"; "row": "row"; "template": "template"; }, {}, never, never>;
}
