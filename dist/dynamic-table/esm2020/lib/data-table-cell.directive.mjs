import { Directive, Inject, Input } from '@angular/core';
import { DATA_TABLE_CONFIG_MAP } from './injectors';
import * as i0 from "@angular/core";
export class DataTableCellDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jZWxsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2R5bmFtaWMtdGFibGUvc3JjL2xpYi9kYXRhLXRhYmxlLWNlbGwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLEtBQUssRUFJTixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBTXBELE1BQU0sT0FBTyxzQkFBc0I7SUFZakMsWUFBNkIsZ0JBQWtDLEVBQ2xDLHdCQUFrRCxFQUVsRCxrQkFBb0Q7UUFIcEQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBRWxELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBa0M7SUFFakYsQ0FBQztJQUVNLFdBQVcsQ0FBQyxPQUFzQjtRQUN2QyxJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUU7WUFDekQsTUFBTSxXQUFXLEdBQUksSUFBSSxDQUFDLFVBQWtCLENBQUMsV0FBVyxDQUFDO1lBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUM3QyxNQUFNLElBQUksS0FBSyxDQUNiLHNDQUFzQyxXQUFXLElBQUksQ0FDdEQsQ0FBQzthQUNIO1lBRUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUNyRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBUSxDQUNoRCxDQUFDO1lBRUYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVNLGlCQUFpQjtRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNuRCxDQUFDOztvSEF6Q1Usc0JBQXNCLDBGQWNiLHFCQUFxQjt3R0FkOUIsc0JBQXNCOzRGQUF0QixzQkFBc0I7a0JBSGxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFFBQVE7aUJBQ25CO2dJQWdCa0QsR0FBRzswQkFEdkMsTUFBTTsyQkFBQyxxQkFBcUI7NENBVmxDLFVBQVU7c0JBRGhCLEtBQUs7Z0JBSUMsR0FBRztzQkFEVCxLQUFLO2dCQUlDLFFBQVE7c0JBRGQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBEaXJlY3RpdmUsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUNlbGxDb21wb25lbnQgfSBmcm9tICcuL2RhdGEtdGFibGUtY2VsbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUYWJsZUNlbGwgfSBmcm9tICcuL3RhYmxlLWNlbGwnO1xyXG5pbXBvcnQgeyBEQVRBX1RBQkxFX0NPTkZJR19NQVAgfSBmcm9tICcuL2luamVjdG9ycyc7XHJcblxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbY2VsbF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVDZWxsRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBwdWJsaWMgY29tcG9uZW50ITogQ29tcG9uZW50UmVmPGFueT47XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGNlbGxDb25maWchOiBUYWJsZUNlbGw7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHJvdyE6IGFueTtcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgdGVtcGxhdGUhOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgICAgICAgICAgICBASW5qZWN0KERBVEFfVEFCTEVfQ09ORklHX01BUClcclxuICAgICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNvbXBvbmVudHNCeUNvbmZpZzogTWFwPGFueSwgRGF0YVRhYmxlQ2VsbENvbXBvbmVudD4sXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKGNoYW5nZXMuY2VsbENvbmZpZyAmJiBjaGFuZ2VzLmNlbGxDb25maWcuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IGNvbnN0cnVjdG9yID0gKHRoaXMuY2VsbENvbmZpZyBhcyBhbnkpLmNvbnN0cnVjdG9yO1xyXG4gICAgICBpZiAoIXRoaXMuY29tcG9uZW50c0J5Q29uZmlnLmdldChjb25zdHJ1Y3RvcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICBgVHJ5aW5nIHRvIHVzZSBhbiB1bnN1cHBvcnRlZCB0eXBlICgke2NvbnN0cnVjdG9yfSkuYFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50c0J5Q29uZmlnLmdldChjb25zdHJ1Y3RvcikgYXMgYW55XHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50KTtcclxuICAgICAgdGhpcy5zZXRDb21wb25lbnRQcm9wcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldENvbXBvbmVudFByb3BzKCkge1xyXG4gICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuY2VsbENvbmZpZyA9IHRoaXMuY2VsbENvbmZpZztcclxuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnJvdyA9IHRoaXMucm93O1xyXG4gICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UudGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xyXG4gIH1cclxufVxyXG4iXX0=