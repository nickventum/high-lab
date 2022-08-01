import { Component, HostBinding, Input, TemplateRef } from '@angular/core';
import { SubscriptionHelper } from '@high-lab/core';
import * as i0 from "@angular/core";
export class DataTableCellComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2R5bmFtaWMtdGFibGUvc3JjL2xpYi9kYXRhLXRhYmxlLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsV0FBVyxFQUFFLEtBQUssRUFBZ0MsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQU9wRCxNQUFNLE9BQU8sc0JBQXNCO0lBc0JsQyxZQUE2QixVQUFzQixFQUMvQixTQUFvQjtRQURYLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDL0IsY0FBUyxHQUFULFNBQVMsQ0FBVztRQXRCdkIsdUJBQWtCLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO0lBdUIvRCxDQUFDO0lBWkQsSUFDVyxTQUFTO1FBQ25CLE9BQU8sUUFBUSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUUsQ0FBQTtJQUM3QyxDQUFDO0lBQUEsQ0FBQztJQUVGLElBQ1csdUJBQXVCO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQztJQUNoRCxDQUFDO0lBTU0sUUFBUTtRQUNkLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBRTtZQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDbEcsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFBO1lBRUYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3RHLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQTtZQUVGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNyRyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUE7U0FDRjtJQUNGLENBQUM7SUFFTSxXQUFXO1FBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBVyxZQUFZO1FBQ3RCLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDaEQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkM7UUFFRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBVyxjQUFjO1FBQ3hCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSxXQUFXLENBQUE7SUFDL0QsQ0FBQztJQUVELElBQVcsV0FBVztRQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRLFlBQVksV0FBVyxFQUFFO1lBQ3pDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNyQjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQzs7b0hBaEVXLHNCQUFzQjt3R0FBdEIsc0JBQXNCLGlQQUZ4QixFQUFFOzRGQUVBLHNCQUFzQjtrQkFIbEMsU0FBUzttQkFBQztvQkFDVixRQUFRLEVBQUUsRUFBRTtpQkFDWjt5SEFLTyxVQUFVO3NCQURoQixLQUFLO2dCQUlDLEdBQUc7c0JBRFQsS0FBSztnQkFJQyxRQUFRO3NCQURkLEtBQUs7Z0JBSUssU0FBUztzQkFEbkIsV0FBVzt1QkFBQyxPQUFPO2dCQU1ULHVCQUF1QjtzQkFEakMsV0FBVzt1QkFBQyw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uSGVscGVyIH0gZnJvbSAnQGhpZ2gtbGFiL2NvcmUnO1xyXG5pbXBvcnQgeyBUYWJsZUNlbGwgfSBmcm9tICcuL3RhYmxlLWNlbGwnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHRlbXBsYXRlOiAnJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUNlbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblx0cHJpdmF0ZSByZWFkb25seSBzdWJzY3JpcHRpb25IZWxwZXIgPSBuZXcgU3Vic2NyaXB0aW9uSGVscGVyKCk7XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIGNlbGxDb25maWc6IFRhYmxlQ2VsbDtcclxuXHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgcm93ITogYW55O1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyB0ZW1wbGF0ZSE6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG5cdEBIb3N0QmluZGluZygnY2xhc3MnKVxyXG5cdHB1YmxpYyBnZXQgY2VsbENsYXNzKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gYGNlbGwgJHt0aGlzLmNlbGxDb25maWcuY2xhc3MgfHwgJyd9YFxyXG5cdH07XHJcblxyXG5cdEBIb3N0QmluZGluZygnYXR0ci5zdG9wUm93RXZlbnRQcm9wYWdhdGlvbicpXHJcblx0cHVibGljIGdldCBzdG9wUm93RXZlbnRQcm9wYWdhdGlvbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLmNlbGxDb25maWcuc3RvcFJvd0V2ZW50UHJvcGFnYXRpb247XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcblx0XHRcdFx0cHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjI6IFJlbmRlcmVyMikge1xyXG5cdH1cclxuXHJcblx0cHVibGljIG5nT25Jbml0KCkge1xyXG5cdFx0aWYgKHRoaXMuY2VsbENvbmZpZy5zdG9wUm93RXZlbnRQcm9wYWdhdGlvbikge1xyXG5cdFx0XHR0aGlzLnN1YnNjcmlwdGlvbkhlbHBlci5uZXh0ID0gdGhpcy5yZW5kZXJlcjIubGlzdGVuKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnY2xpY2snLCBldnQgPT4ge1xyXG5cdFx0XHRcdGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdHRoaXMuc3Vic2NyaXB0aW9uSGVscGVyLm5leHQgPSB0aGlzLnJlbmRlcmVyMi5saXN0ZW4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtb3VzZW92ZXInLCBldnQgPT4ge1xyXG5cdFx0XHRcdGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdHRoaXMuc3Vic2NyaXB0aW9uSGVscGVyLm5leHQgPSB0aGlzLnJlbmRlcmVyMi5saXN0ZW4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtb3VzZW91dCcsIGV2dCA9PiB7XHJcblx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIG5nT25EZXN0cm95KCkge1xyXG5cdFx0dGhpcy5zdWJzY3JpcHRpb25IZWxwZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgZGlzcGxheVZhbHVlKCk6IHN0cmluZyB7XHJcblx0XHRpZiAodHlwZW9mIHRoaXMuY2VsbENvbmZpZy52YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5jZWxsQ29uZmlnLnZhbHVlKHRoaXMucm93KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5yb3dbdGhpcy5jZWxsQ29uZmlnLmtleV07XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IGhhc1RlbXBsYXRlUmVmKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuICEhdGhpcy50ZW1wbGF0ZSAmJiB0aGlzLnRlbXBsYXRlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWZcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgdGVtcGxhdGVSZWYoKTogVGVtcGxhdGVSZWY8YW55PiB8IG51bGwge1xyXG5cdFx0aWYgKHRoaXMudGVtcGxhdGUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy50ZW1wbGF0ZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcbn1cclxuIl19