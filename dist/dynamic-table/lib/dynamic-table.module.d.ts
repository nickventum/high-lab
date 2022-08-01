import { ModuleWithProviders } from '@angular/core';
import { DataTableConfig } from './data-table.config';
import * as i0 from "@angular/core";
import * as i1 from "./dynamic-table.component";
import * as i2 from "./data-table-cell.directive";
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/icon";
import * as i5 from "@angular/material/progress-bar";
export declare class DynamicTableModule {
    static config(dataTableConfig: DataTableConfig): ModuleWithProviders<DynamicTableModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicTableModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DynamicTableModule, [typeof i1.DynamicTableComponent, typeof i2.DataTableCellDirective], [typeof i3.CommonModule, typeof i4.MatIconModule, typeof i5.MatProgressBarModule], [typeof i1.DynamicTableComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DynamicTableModule>;
}
