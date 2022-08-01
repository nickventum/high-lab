import { AfterViewInit, ChangeDetectorRef, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { AbstractField } from './base.field';
import { ExtendedControls, ExtendedFormGroup } from './form-controls';
import { DynamicFormTemplate } from './interfaces';
import * as i0 from "@angular/core";
export declare class EditableFieldDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<EditableFieldDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<EditableFieldDirective, "[editableField]", never, {}, {}, never>;
}
export declare class BaseFieldComponent implements OnInit, AfterViewInit {
    protected readonly elementRef: ElementRef;
    protected readonly changeDetectorRef: ChangeDetectorRef;
    readonly self: this;
    readonly fieldConfig: AbstractField;
    readonly formGroup: ExtendedFormGroup;
    readonly template?: DynamicFormTemplate;
    get classList(): string;
    readonly editableField?: ElementRef<HTMLElement>;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    get control(): ExtendedControls;
    get required(): boolean;
    hasValidator(key: string): boolean;
    get disabled(): boolean;
    get label(): string | null;
    get hasTemplateRef(): boolean;
    get templateRef(): TemplateRef<any> | null;
    getChildTemplate(key: string): DynamicFormTemplate | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BaseFieldComponent, "ng-component", never, { "fieldConfig": "fieldConfig"; "formGroup": "formGroup"; "template": "template"; }, {}, never, never>;
}
