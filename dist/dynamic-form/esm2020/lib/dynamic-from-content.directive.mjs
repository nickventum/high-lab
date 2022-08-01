import { Directive, Input, ɵstringify, } from '@angular/core';
import * as i0 from "@angular/core";
export class DynamicFormContentDirective {
    constructor(viewContainer, componentFactoryResolver, renderer2, templateRef) {
        this.viewContainer = viewContainer;
        this.componentFactoryResolver = componentFactoryResolver;
        this.renderer2 = renderer2;
        this.templateRef = templateRef;
        this.context = new DfContentContext();
        this.thenTemplateRef = null;
        this.thenViewRef = null;
        this.customViewRef = null;
        this.thenTemplateRef = templateRef;
    }
    ngOnChanges(changes) {
        if (this.context.$implicit.hasTemplateRef && !this.customViewRef) {
            this.clearViewExclude(this.customViewRef);
            this.customViewRef = this.viewContainer.createEmbeddedView(this.context.$implicit.templateRef, { component: this.context.$implicit, formTemplate: this.thenTemplateRef });
        }
        else if (this.thenTemplateRef && !this.thenViewRef) {
            this.clearViewExclude(this.thenTemplateRef);
            this.thenViewRef = this.viewContainer.createEmbeddedView(this.thenTemplateRef, this.context);
        }
    }
    set dynamicFormContent(condition) {
        this.context.$implicit = condition;
    }
    set dynamicFormContentThen(templateRef) {
        assertTemplate('dynamicFormContentThen', templateRef);
        this.thenTemplateRef = templateRef;
        this.thenViewRef = null; // clear previous view if any.
    }
    clearViewExclude(excludeView) {
        this.viewContainer.clear();
        if (excludeView !== this.thenViewRef) {
            this.thenViewRef = null;
        }
        if (excludeView !== this.customViewRef) {
            this.customViewRef = null;
        }
    }
}
DynamicFormContentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicFormContentDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }, { token: i0.Renderer2 }, { token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
DynamicFormContentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: DynamicFormContentDirective, selector: "[dynamicFormContent]", inputs: { dynamicFormContent: "dynamicFormContent", dynamicFormContentThen: "dynamicFormContentThen" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicFormContentDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[dynamicFormContent]' }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }, { type: i0.Renderer2 }, { type: i0.TemplateRef }]; }, propDecorators: { dynamicFormContent: [{
                type: Input
            }], dynamicFormContentThen: [{
                type: Input
            }] } });
export function assertTemplate(property, templateRef) {
    const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
    if (!isTemplateRefOrNull) {
        throw new Error(`${property} must be a TemplateRef, but received '${ɵstringify(templateRef)}'.`);
    }
}
export class DfContentContext {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mcm9tLWNvbnRlbnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZHluYW1pYy1mb3JtL3NyYy9saWIvZHluYW1pYy1mcm9tLWNvbnRlbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFSCxTQUFTLEVBRVQsS0FBSyxFQU1MLFVBQVUsR0FDYixNQUFNLGVBQWUsQ0FBQzs7QUFJdkIsTUFBTSxPQUFPLDJCQUEyQjtJQU1wQyxZQUE2QixhQUErQixFQUMvQix3QkFBa0QsRUFDbEQsU0FBb0IsRUFDcEIsV0FBMEM7UUFIMUMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQy9CLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixnQkFBVyxHQUFYLFdBQVcsQ0FBK0I7UUFSL0QsWUFBTyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxvQkFBZSxHQUF5QyxJQUFJLENBQUM7UUFDN0QsZ0JBQVcsR0FBZ0MsSUFBSSxDQUFDO1FBQ2hELGtCQUFhLEdBQWdDLElBQUksQ0FBQztRQU90RCxJQUFJLENBQUMsZUFBZSxHQUFHLFdBQVcsQ0FBQztJQUN2QyxDQUFDO0lBRU0sV0FBVyxDQUFDLE9BQXNCO1FBQ3JDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUM5RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBa0IsRUFDekMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FDNUUsQ0FBQztTQUNMO2FBQU0sSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoRztJQUNMLENBQUM7SUFFRCxJQUNXLGtCQUFrQixDQUFDLFNBQTZCO1FBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFDVyxzQkFBc0IsQ0FBQyxXQUFpRDtRQUMvRSxjQUFjLENBQUMsd0JBQXdCLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUM7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyw4QkFBOEI7SUFDM0QsQ0FBQztJQUVPLGdCQUFnQixDQUFDLFdBQWdCO1FBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFM0IsSUFBSSxXQUFXLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUMzQjtRQUVELElBQUksV0FBVyxLQUFLLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDN0I7SUFDTCxDQUFDOzt5SEFqRFEsMkJBQTJCOzZHQUEzQiwyQkFBMkI7NEZBQTNCLDJCQUEyQjtrQkFEdkMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTtnTUE2QmhDLGtCQUFrQjtzQkFENUIsS0FBSztnQkFNSyxzQkFBc0I7c0JBRGhDLEtBQUs7O0FBcUJWLE1BQU0sVUFBVSxjQUFjLENBQUMsUUFBZ0IsRUFBRSxXQUFvQztJQUNqRixNQUFNLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQy9FLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtRQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsUUFBUSx5Q0FBeUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwRztBQUNMLENBQUM7QUFFRCxNQUFNLE9BQU8sZ0JBQWdCO0NBRTVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIERpcmVjdGl2ZSxcclxuICAgIEVtYmVkZGVkVmlld1JlZixcclxuICAgIElucHV0LFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgUmVuZGVyZXIyLFxyXG4gICAgU2ltcGxlQ2hhbmdlcyxcclxuICAgIFRlbXBsYXRlUmVmLFxyXG4gICAgVmlld0NvbnRhaW5lclJlZixcclxuICAgIMm1c3RyaW5naWZ5LFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCYXNlRmllbGRDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tkeW5hbWljRm9ybUNvbnRlbnRdJyB9KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1Db250ZW50RGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICAgIHByaXZhdGUgY29udGV4dCA9IG5ldyBEZkNvbnRlbnRDb250ZXh0KCk7XHJcbiAgICBwcml2YXRlIHRoZW5UZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8RGZDb250ZW50Q29udGV4dD4gfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgdGhlblZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+IHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIGN1c3RvbVZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXIyOiBSZW5kZXJlcjIsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxEZkNvbnRlbnRDb250ZXh0PlxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy50aGVuVGVtcGxhdGVSZWYgPSB0ZW1wbGF0ZVJlZjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRleHQuJGltcGxpY2l0Lmhhc1RlbXBsYXRlUmVmICYmICF0aGlzLmN1c3RvbVZpZXdSZWYpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclZpZXdFeGNsdWRlKHRoaXMuY3VzdG9tVmlld1JlZik7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tVmlld1JlZiA9IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuJGltcGxpY2l0LnRlbXBsYXRlUmVmIGFzIGFueSxcclxuICAgICAgICAgICAgICAgIHsgY29tcG9uZW50OiB0aGlzLmNvbnRleHQuJGltcGxpY2l0LCBmb3JtVGVtcGxhdGU6IHRoaXMudGhlblRlbXBsYXRlUmVmIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGhlblRlbXBsYXRlUmVmICYmICF0aGlzLnRoZW5WaWV3UmVmKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJWaWV3RXhjbHVkZSh0aGlzLnRoZW5UZW1wbGF0ZVJlZik7XHJcbiAgICAgICAgICAgIHRoaXMudGhlblZpZXdSZWYgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGhlblRlbXBsYXRlUmVmLCB0aGlzLmNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIHNldCBkeW5hbWljRm9ybUNvbnRlbnQoY29uZGl0aW9uOiBCYXNlRmllbGRDb21wb25lbnQpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuJGltcGxpY2l0ID0gY29uZGl0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgc2V0IGR5bmFtaWNGb3JtQ29udGVudFRoZW4odGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPERmQ29udGVudENvbnRleHQ+IHwgbnVsbCkge1xyXG4gICAgICAgIGFzc2VydFRlbXBsYXRlKCdkeW5hbWljRm9ybUNvbnRlbnRUaGVuJywgdGVtcGxhdGVSZWYpO1xyXG4gICAgICAgIHRoaXMudGhlblRlbXBsYXRlUmVmID0gdGVtcGxhdGVSZWY7XHJcbiAgICAgICAgdGhpcy50aGVuVmlld1JlZiA9IG51bGw7IC8vIGNsZWFyIHByZXZpb3VzIHZpZXcgaWYgYW55LlxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xlYXJWaWV3RXhjbHVkZShleGNsdWRlVmlldzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIGlmIChleGNsdWRlVmlldyAhPT0gdGhpcy50aGVuVmlld1JlZikge1xyXG4gICAgICAgICAgICB0aGlzLnRoZW5WaWV3UmVmID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChleGNsdWRlVmlldyAhPT0gdGhpcy5jdXN0b21WaWV3UmVmKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tVmlld1JlZiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFRlbXBsYXRlKHByb3BlcnR5OiBzdHJpbmcsIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCk6IHZvaWQge1xyXG4gICAgY29uc3QgaXNUZW1wbGF0ZVJlZk9yTnVsbCA9ICEhKCF0ZW1wbGF0ZVJlZiB8fCB0ZW1wbGF0ZVJlZi5jcmVhdGVFbWJlZGRlZFZpZXcpO1xyXG4gICAgaWYgKCFpc1RlbXBsYXRlUmVmT3JOdWxsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3Byb3BlcnR5fSBtdXN0IGJlIGEgVGVtcGxhdGVSZWYsIGJ1dCByZWNlaXZlZCAnJHvJtXN0cmluZ2lmeSh0ZW1wbGF0ZVJlZil9Jy5gKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERmQ29udGVudENvbnRleHQge1xyXG4gICAgcHVibGljICRpbXBsaWNpdCE6IEJhc2VGaWVsZENvbXBvbmVudDtcclxufVxyXG4iXX0=