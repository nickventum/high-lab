import { ComponentFactoryResolver, ComponentRef, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { AbstractField } from './base.field';
import { NewComponent } from './dynamic-form.config';
import { ExtendedFormArray, ExtendedFormGroup } from './form-controls';
import { DynamicFormTemplate } from './interfaces';
import * as i0 from "@angular/core";
export declare class DynamicFieldDirective implements OnChanges {
    private readonly viewContainerRef;
    private readonly componentFactoryResolver;
    private readonly componentsByConfig;
    component: ComponentRef<any>;
    fieldConfig: AbstractField;
    formGroup: ExtendedFormGroup | ExtendedFormArray;
    template: DynamicFormTemplate;
    rowIndex: number;
    constructor(viewContainerRef: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver, componentsByConfig: Map<any, NewComponent>);
    ngOnChanges(changes: SimpleChanges): void;
    setComponentProps(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicFieldDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DynamicFieldDirective, "[dynamicField]", never, { "fieldConfig": "fieldConfig"; "formGroup": "formGroup"; "template": "template"; "rowIndex": "rowIndex"; }, {}, never>;
}
