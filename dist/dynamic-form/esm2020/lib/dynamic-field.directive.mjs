import { Directive, Inject, Input } from '@angular/core';
import { DYNAMIC_FORM_CONFIG_MAP } from './injectors';
import * as i0 from "@angular/core";
export class DynamicFieldDirective {
    constructor(viewContainerRef, componentFactoryResolver, componentsByConfig) {
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.componentsByConfig = componentsByConfig;
    }
    ngOnChanges(changes) {
        if (changes.fieldConfig && changes.fieldConfig.currentValue) {
            const constructor = this.fieldConfig.constructor;
            if (!this.componentsByConfig.get(constructor)) {
                throw new Error(`Trying to use an unsupported type (${constructor}).`);
            }
            const component = this.componentFactoryResolver.resolveComponentFactory(this.componentsByConfig.get(constructor));
            this.component = this.viewContainerRef.createComponent(component);
            this.setComponentProps();
        }
    }
    setComponentProps() {
        this.component.instance.fieldConfig = this.fieldConfig;
        this.component.instance.formGroup = this.formGroup;
        this.component.instance.template = this.template;
        this.component.instance.rowIndex = this.rowIndex;
    }
}
DynamicFieldDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicFieldDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }, { token: DYNAMIC_FORM_CONFIG_MAP }], target: i0.ɵɵFactoryTarget.Directive });
DynamicFieldDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: DynamicFieldDirective, selector: "[dynamicField]", inputs: { fieldConfig: "fieldConfig", formGroup: "formGroup", template: "template", rowIndex: "rowIndex" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicFieldDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[dynamicField]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }, { type: Map, decorators: [{
                    type: Inject,
                    args: [DYNAMIC_FORM_CONFIG_MAP]
                }] }]; }, propDecorators: { fieldConfig: [{
                type: Input
            }], formGroup: [{
                type: Input
            }], template: [{
                type: Input
            }], rowIndex: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1maWVsZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9keW5hbWljLWZvcm0vc3JjL2xpYi9keW5hbWljLWZpZWxkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsU0FBUyxFQUNULE1BQU0sRUFDTixLQUFLLEVBSU4sTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sYUFBYSxDQUFDOztBQU90RCxNQUFNLE9BQU8scUJBQXFCO0lBZWhDLFlBQTZCLGdCQUFrQyxFQUNsQyx3QkFBa0QsRUFFbEQsa0JBQTBDO1FBSDFDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUVsRCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXdCO0lBRXZFLENBQUM7SUFFTSxXQUFXLENBQUMsT0FBc0I7UUFDdkMsSUFBSSxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFO1lBQzNELE1BQU0sV0FBVyxHQUFJLElBQUksQ0FBQyxXQUFtQixDQUFDLFdBQVcsQ0FBQztZQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDN0MsTUFBTSxJQUFJLEtBQUssQ0FDYixzQ0FBc0MsV0FBVyxJQUFJLENBQ3RELENBQUM7YUFDSDtZQUVELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FDckUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQVEsQ0FDaEQsQ0FBQztZQUVGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFTSxpQkFBaUI7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkQsQ0FBQzs7bUhBN0NVLHFCQUFxQiwwRkFpQlosdUJBQXVCO3VHQWpCaEMscUJBQXFCOzRGQUFyQixxQkFBcUI7a0JBSGpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7Z0lBbUJrRCxHQUFHOzBCQUR2QyxNQUFNOzJCQUFDLHVCQUF1Qjs0Q0FicEMsV0FBVztzQkFEakIsS0FBSztnQkFJQyxTQUFTO3NCQURmLEtBQUs7Z0JBSUMsUUFBUTtzQkFEZCxLQUFLO2dCQUlDLFFBQVE7c0JBRGQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBEaXJlY3RpdmUsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZCB9IGZyb20gJy4vYmFzZS5maWVsZCc7XHJcbmltcG9ydCB7IE5ld0NvbXBvbmVudCB9IGZyb20gJy4vZHluYW1pYy1mb3JtLmNvbmZpZyc7XHJcbmltcG9ydCB7IEV4dGVuZGVkRm9ybUFycmF5LCBFeHRlbmRlZEZvcm1Hcm91cCB9IGZyb20gJy4vZm9ybS1jb250cm9scyc7XHJcbmltcG9ydCB7IERZTkFNSUNfRk9STV9DT05GSUdfTUFQIH0gZnJvbSAnLi9pbmplY3RvcnMnO1xyXG5pbXBvcnQgeyBEeW5hbWljRm9ybVRlbXBsYXRlIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcclxuXHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tkeW5hbWljRmllbGRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBwdWJsaWMgY29tcG9uZW50ITogQ29tcG9uZW50UmVmPGFueT47XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGZpZWxkQ29uZmlnITogQWJzdHJhY3RGaWVsZDtcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgZm9ybUdyb3VwITogRXh0ZW5kZWRGb3JtR3JvdXAgfCBFeHRlbmRlZEZvcm1BcnJheTtcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgdGVtcGxhdGUhOiBEeW5hbWljRm9ybVRlbXBsYXRlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyByb3dJbmRleCE6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICAgICAgICAgICAgQEluamVjdChEWU5BTUlDX0ZPUk1fQ09ORklHX01BUClcclxuICAgICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNvbXBvbmVudHNCeUNvbmZpZzogTWFwPGFueSwgTmV3Q29tcG9uZW50PixcclxuICApIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlcy5maWVsZENvbmZpZyAmJiBjaGFuZ2VzLmZpZWxkQ29uZmlnLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICBjb25zdCBjb25zdHJ1Y3RvciA9ICh0aGlzLmZpZWxkQ29uZmlnIGFzIGFueSkuY29uc3RydWN0b3I7XHJcbiAgICAgIGlmICghdGhpcy5jb21wb25lbnRzQnlDb25maWcuZ2V0KGNvbnN0cnVjdG9yKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgIGBUcnlpbmcgdG8gdXNlIGFuIHVuc3VwcG9ydGVkIHR5cGUgKCR7Y29uc3RydWN0b3J9KS5gXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRzQnlDb25maWcuZ2V0KGNvbnN0cnVjdG9yKSBhcyBhbnlcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnQpO1xyXG4gICAgICB0aGlzLnNldENvbXBvbmVudFByb3BzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0Q29tcG9uZW50UHJvcHMoKSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5maWVsZENvbmZpZyA9IHRoaXMuZmllbGRDb25maWc7XHJcbiAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5mb3JtR3JvdXAgPSB0aGlzLmZvcm1Hcm91cDtcclxuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcclxuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnJvd0luZGV4ID0gdGhpcy5yb3dJbmRleDtcclxuICB9XHJcbn1cclxuIl19