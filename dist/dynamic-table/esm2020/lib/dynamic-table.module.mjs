import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataTableCellDirective } from './data-table-cell.directive';
import { DATA_TABLE_CONFIG, DATA_TABLE_CONFIG_MAP } from './injectors';
import { DynamicTableComponent } from './dynamic-table.component';
import * as i0 from "@angular/core";
export class DynamicTableModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy10YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9keW5hbWljLXRhYmxlL3NyYy9saWIvZHluYW1pYy10YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBZWxFLE1BQU0sT0FBTyxrQkFBa0I7SUFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FDbkIsZUFBZ0M7UUFFaEMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXhGLE9BQU87WUFDTixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRTtnQkFDVixFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFO2dCQUN6RCxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUU7YUFDaEU7U0FDRCxDQUFDO0lBQ0gsQ0FBQzs7Z0hBYlcsa0JBQWtCO2lIQUFsQixrQkFBa0IsaUJBVjdCLHFCQUFxQjtRQUNyQixzQkFBc0IsYUFHdEIsWUFBWTtRQUNaLGFBQWE7UUFDYixvQkFBb0IsYUFFWCxxQkFBcUI7aUhBRW5CLGtCQUFrQixZQVByQjtZQUNSLFlBQVk7WUFDWixhQUFhO1lBQ2Isb0JBQW9CO1NBQ3BCOzRGQUdXLGtCQUFrQjtrQkFaOUIsUUFBUTttQkFBQztvQkFDVCxZQUFZLEVBQUU7d0JBQ2IscUJBQXFCO3dCQUNyQixzQkFBc0I7cUJBQ3RCO29CQUNELE9BQU8sRUFBRTt3QkFDUixZQUFZO3dCQUNaLGFBQWE7d0JBQ2Isb0JBQW9CO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztpQkFDaEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XHJcbmltcG9ydCB7IE1hdFByb2dyZXNzQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3MtYmFyJztcclxuaW1wb3J0IHsgRGF0YVRhYmxlQ2VsbERpcmVjdGl2ZSB9IGZyb20gJy4vZGF0YS10YWJsZS1jZWxsLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUNvbmZpZyB9IGZyb20gJy4vZGF0YS10YWJsZS5jb25maWcnO1xyXG5pbXBvcnQgeyBEQVRBX1RBQkxFX0NPTkZJRywgREFUQV9UQUJMRV9DT05GSUdfTUFQIH0gZnJvbSAnLi9pbmplY3RvcnMnO1xyXG5pbXBvcnQgeyBEeW5hbWljVGFibGVDb21wb25lbnQgfSBmcm9tICcuL2R5bmFtaWMtdGFibGUuY29tcG9uZW50JztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG5cdGRlY2xhcmF0aW9uczogW1xyXG5cdFx0RHluYW1pY1RhYmxlQ29tcG9uZW50LFxyXG5cdFx0RGF0YVRhYmxlQ2VsbERpcmVjdGl2ZSxcclxuXHRdLFxyXG5cdGltcG9ydHM6IFtcclxuXHRcdENvbW1vbk1vZHVsZSxcclxuXHRcdE1hdEljb25Nb2R1bGUsXHJcblx0XHRNYXRQcm9ncmVzc0Jhck1vZHVsZVxyXG5cdF0sXHJcblx0ZXhwb3J0czogW0R5bmFtaWNUYWJsZUNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNUYWJsZU1vZHVsZSB7XHJcblx0cHVibGljIHN0YXRpYyBjb25maWcoXHJcblx0XHRkYXRhVGFibGVDb25maWc6IERhdGFUYWJsZUNvbmZpZyxcclxuXHQpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPER5bmFtaWNUYWJsZU1vZHVsZT4ge1xyXG5cdFx0Y29uc3QgZGF0YVRhYmxlQ29uZmlnTWFwID0gbmV3IE1hcChkYXRhVGFibGVDb25maWcubWFwKHYgPT4gKFt2LmNvbmZpZywgdi5jb21wb25lbnRdKSkpO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG5nTW9kdWxlOiBEeW5hbWljVGFibGVNb2R1bGUsXHJcblx0XHRcdHByb3ZpZGVyczogW1xyXG5cdFx0XHRcdHsgcHJvdmlkZTogREFUQV9UQUJMRV9DT05GSUcsIHVzZVZhbHVlOiBkYXRhVGFibGVDb25maWcgfSxcclxuXHRcdFx0XHR7IHByb3ZpZGU6IERBVEFfVEFCTEVfQ09ORklHX01BUCwgdXNlVmFsdWU6IGRhdGFUYWJsZUNvbmZpZ01hcCB9LFxyXG5cdFx0XHRdXHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG4iXX0=