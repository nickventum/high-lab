import { Component, Directive, ElementRef, HostBinding, Input, TemplateRef, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
export class EditableFieldDirective {
}
EditableFieldDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EditableFieldDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
EditableFieldDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: EditableFieldDirective, selector: "[editableField]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EditableFieldDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[editableField]'
                }]
        }] });
export class BaseFieldComponent {
    constructor(elementRef, changeDetectorRef) {
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.self = this;
        this.template = {};
    }
    get classList() {
        return this.fieldConfig.class || '';
    }
    ngOnInit() {
        this.control.htmlInstance = this.elementRef.nativeElement;
    }
    ngAfterViewInit() {
        if (this.fieldConfig.autofocus && this.editableField instanceof ElementRef) {
            this.editableField.nativeElement.focus();
            this.changeDetectorRef.detectChanges();
        }
    }
    get control() {
        return this.formGroup.controls[this.fieldConfig.key];
    }
    get required() {
        return this.hasValidator('required');
    }
    hasValidator(key) {
        const control = this.control;
        if (control.validator) {
            const validators = control.validator('');
            return !!(validators && validators.hasOwnProperty(key));
        }
        return false;
    }
    get disabled() {
        return this.control.disabled;
    }
    get label() {
        // @ts-ignore
        return this.fieldConfig.label(this.formGroup);
    }
    get hasTemplateRef() {
        return !!this.template && (this.template instanceof TemplateRef || this.template?.ref instanceof TemplateRef);
    }
    get templateRef() {
        if (this.template instanceof TemplateRef) {
            return this.template;
        }
        else if (this.template?.ref instanceof TemplateRef) {
            return this.template?.ref;
        }
        return null;
    }
    getChildTemplate(key) {
        if (!this.template) {
            return null;
        }
        if (this.template instanceof TemplateRef) {
            return null;
        }
        if (this.template[key]) {
            return this.template[key];
        }
        return this.template.children[key];
    }
}
BaseFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BaseFieldComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
BaseFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: BaseFieldComponent, selector: "ng-component", inputs: { fieldConfig: "fieldConfig", formGroup: "formGroup", template: "template" }, host: { properties: { "class": "this.classList" } }, viewQueries: [{ propertyName: "editableField", first: true, predicate: EditableFieldDirective, descendants: true, read: ElementRef }], ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BaseFieldComponent, decorators: [{
            type: Component,
            args: [{
                    template: '',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { fieldConfig: [{
                type: Input
            }], formGroup: [{
                type: Input
            }], template: [{
                type: Input
            }], classList: [{
                type: HostBinding,
                args: ['class']
            }], editableField: [{
                type: ViewChild,
                args: [EditableFieldDirective, { read: ElementRef, static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9keW5hbWljLWZvcm0vc3JjL2xpYi9iYXNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFFTCxXQUFXLEVBQ1gsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDOztBQVN2QixNQUFNLE9BQU8sc0JBQXNCOztvSEFBdEIsc0JBQXNCO3dHQUF0QixzQkFBc0I7NEZBQXRCLHNCQUFzQjtrQkFIbEMsU0FBUzttQkFBQztvQkFDVixRQUFRLEVBQUUsaUJBQWlCO2lCQUMzQjs7QUFRRCxNQUFNLE9BQU8sa0JBQWtCO0lBb0I5QixZQUErQixVQUFzQixFQUN0QixpQkFBb0M7UUFEcEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBcEJuRCxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBU1osYUFBUSxHQUF5QixFQUFFLENBQUM7SUFZakQsQ0FBQztJQVZKLElBQ1csU0FBUztRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBU00sUUFBUTtRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQzNELENBQUM7SUFFTSxlQUFlO1FBQ3JCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGFBQWEsWUFBWSxVQUFVLEVBQUU7WUFDM0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3ZDO0lBQ0YsQ0FBQztJQUVELElBQVcsT0FBTztRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLFlBQVksQ0FBQyxHQUFXO1FBQzlCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQ3RCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBUyxDQUFDLENBQUM7WUFDaEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQVcsS0FBSztRQUNmLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsSUFBVyxjQUFjO1FBQ3hCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxZQUFZLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsWUFBWSxXQUFXLENBQUMsQ0FBQTtJQUM5RyxDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3JCLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSxXQUFXLEVBQUU7WUFDekMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsWUFBWSxXQUFXLEVBQUU7WUFDckQsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQTtTQUN6QjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVNLGdCQUFnQixDQUFDLEdBQVc7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSxXQUFXLEVBQUU7WUFDekMsT0FBTyxJQUFJLENBQUE7U0FDWDtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFRLENBQUM7U0FDakM7UUFFRCxPQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QyxDQUFDOztnSEExRlcsa0JBQWtCO29HQUFsQixrQkFBa0IsOE9BaUJuQixzQkFBc0IsMkJBQVUsVUFBVSw2QkFuQjNDLEVBQUU7NEZBRUEsa0JBQWtCO2tCQUg5QixTQUFTO21CQUFDO29CQUNWLFFBQVEsRUFBRSxFQUFFO2lCQUNaO2lJQUtnQixXQUFXO3NCQUQxQixLQUFLO2dCQUlVLFNBQVM7c0JBRHhCLEtBQUs7Z0JBSVUsUUFBUTtzQkFEdkIsS0FBSztnQkFJSyxTQUFTO3NCQURuQixXQUFXO3VCQUFDLE9BQU87Z0JBTUosYUFBYTtzQkFENUIsU0FBUzt1QkFBQyxzQkFBc0IsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDaGlsZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkIH0gZnJvbSAnLi9iYXNlLmZpZWxkJztcclxuaW1wb3J0IHsgRXh0ZW5kZWRDb250cm9scywgRXh0ZW5kZWRGb3JtR3JvdXAgfSBmcm9tICcuL2Zvcm0tY29udHJvbHMnO1xyXG5pbXBvcnQgeyBEeW5hbWljRm9ybVRlbXBsYXRlIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcclxuXHJcblxyXG5ARGlyZWN0aXZlKHtcclxuXHRzZWxlY3RvcjogJ1tlZGl0YWJsZUZpZWxkXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEVkaXRhYmxlRmllbGREaXJlY3RpdmUge1xyXG59XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0dGVtcGxhdGU6ICcnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFzZUZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuXHRwdWJsaWMgcmVhZG9ubHkgc2VsZiA9IHRoaXM7XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIHJlYWRvbmx5IGZpZWxkQ29uZmlnITogQWJzdHJhY3RGaWVsZDtcclxuXHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgcmVhZG9ubHkgZm9ybUdyb3VwITogRXh0ZW5kZWRGb3JtR3JvdXA7XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIHJlYWRvbmx5IHRlbXBsYXRlPzogRHluYW1pY0Zvcm1UZW1wbGF0ZSA9IHt9O1xyXG5cclxuXHRASG9zdEJpbmRpbmcoJ2NsYXNzJylcclxuXHRwdWJsaWMgZ2V0IGNsYXNzTGlzdCgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMuZmllbGRDb25maWcuY2xhc3MgfHwgJyc7XHJcblx0fVxyXG5cclxuXHRAVmlld0NoaWxkKEVkaXRhYmxlRmllbGREaXJlY3RpdmUsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyByZWFkb25seSBlZGl0YWJsZUZpZWxkPzogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG5cdCAgICAgICAgICAgIHByb3RlY3RlZCByZWFkb25seSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuXHQpIHt9XHJcblxyXG5cdHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuXHRcdHRoaXMuY29udHJvbC5odG1sSW5zdGFuY2UgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XHJcblx0XHRpZiAodGhpcy5maWVsZENvbmZpZy5hdXRvZm9jdXMgJiYgdGhpcy5lZGl0YWJsZUZpZWxkIGluc3RhbmNlb2YgRWxlbWVudFJlZikge1xyXG5cdFx0XHR0aGlzLmVkaXRhYmxlRmllbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG5cdFx0XHR0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgY29udHJvbCgpOiBFeHRlbmRlZENvbnRyb2xzIHtcclxuXHRcdHJldHVybiB0aGlzLmZvcm1Hcm91cC5jb250cm9sc1t0aGlzLmZpZWxkQ29uZmlnLmtleV07XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzVmFsaWRhdG9yKCdyZXF1aXJlZCcpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGhhc1ZhbGlkYXRvcihrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0Y29uc3QgY29udHJvbCA9IHRoaXMuY29udHJvbDtcclxuXHRcdGlmIChjb250cm9sLnZhbGlkYXRvcikge1xyXG5cdFx0XHRjb25zdCB2YWxpZGF0b3JzID0gY29udHJvbC52YWxpZGF0b3IoJycgYXMgYW55KTtcclxuXHRcdFx0cmV0dXJuICEhKHZhbGlkYXRvcnMgJiYgdmFsaWRhdG9ycy5oYXNPd25Qcm9wZXJ0eShrZXkpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udHJvbC5kaXNhYmxlZDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgbGFiZWwoKTogc3RyaW5nIHwgbnVsbCB7XHJcblx0XHQvLyBAdHMtaWdub3JlXHJcblx0XHRyZXR1cm4gdGhpcy5maWVsZENvbmZpZy5sYWJlbCh0aGlzLmZvcm1Hcm91cCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IGhhc1RlbXBsYXRlUmVmKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuICEhdGhpcy50ZW1wbGF0ZSAmJiAodGhpcy50ZW1wbGF0ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmIHx8IHRoaXMudGVtcGxhdGU/LnJlZiBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKVxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCB0ZW1wbGF0ZVJlZigpOiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCB7XHJcblx0XHRpZiAodGhpcy50ZW1wbGF0ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnRlbXBsYXRlO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnRlbXBsYXRlPy5yZWYgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy50ZW1wbGF0ZT8ucmVmXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0Q2hpbGRUZW1wbGF0ZShrZXk6IHN0cmluZyk6IER5bmFtaWNGb3JtVGVtcGxhdGUgfCBudWxsIHtcclxuXHRcdGlmICghdGhpcy50ZW1wbGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy50ZW1wbGF0ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMudGVtcGxhdGVba2V5XSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy50ZW1wbGF0ZVtrZXldIGFzIGFueTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKHRoaXMudGVtcGxhdGUuY2hpbGRyZW4gYXMgYW55KVtrZXldO1xyXG5cdH1cclxufVxyXG4iXX0=