import { ModuleWithProviders } from '@angular/core';
import { DynamicFormConfig, ValidationMessagesFn } from './dynamic-form.config';
import * as i0 from "@angular/core";
import * as i1 from "./dynamic-form.component";
import * as i2 from "./dynamic-field.directive";
import * as i3 from "./base.component";
import * as i4 from "./dynamic-from-content.directive";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
export declare class DynamicFormModule {
    static config(dynamicFormConfig: DynamicFormConfig, validationMessages?: ValidationMessagesFn): ModuleWithProviders<DynamicFormModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicFormModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DynamicFormModule, [typeof i1.DynamicFormComponent, typeof i2.DynamicFieldDirective, typeof i3.BaseFieldComponent, typeof i4.DynamicFormContentDirective, typeof i3.EditableFieldDirective], [typeof i5.CommonModule, typeof i6.ReactiveFormsModule], [typeof i1.DynamicFormComponent, typeof i3.BaseFieldComponent, typeof i2.DynamicFieldDirective, typeof i4.DynamicFormContentDirective, typeof i3.EditableFieldDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DynamicFormModule>;
}
