import { ComponentFactoryResolver, ComponentRef, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataTableCellComponent } from './data-table-cell.component';
import { TableCell } from './table-cell';
import * as i0 from "@angular/core";
export declare class DataTableCellDirective implements OnChanges {
    private readonly viewContainerRef;
    private readonly componentFactoryResolver;
    private readonly componentsByConfig;
    component: ComponentRef<any>;
    cellConfig: TableCell;
    row: any;
    template: TemplateRef<any>;
    constructor(viewContainerRef: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver, componentsByConfig: Map<any, DataTableCellComponent>);
    ngOnChanges(changes: SimpleChanges): void;
    setComponentProps(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTableCellDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DataTableCellDirective, "[cell]", never, { "cellConfig": "cellConfig"; "row": "row"; "template": "template"; }, {}, never>;
}
