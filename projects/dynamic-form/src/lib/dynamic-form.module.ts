import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFieldComponent } from './base.component';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormConfig, ValidationMessagesFn } from './dynamic-form.config';
import { DynamicFormContentDirective } from './dynamic-from-content.directive';
import { DYNAMIC_FORM_CONFIG, DYNAMIC_FORM_VALIDATION_MESSAGES } from './injectors';


@NgModule({
  declarations: [DynamicFormComponent, DynamicFieldDirective, BaseFieldComponent, DynamicFormContentDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [DynamicFormComponent, BaseFieldComponent, DynamicFieldDirective, DynamicFormContentDirective]
})
export class DynamicFormModule {

  public static config(
    dynamicFormConfig: DynamicFormConfig,
    validationMessages?: ValidationMessagesFn
  ): ModuleWithProviders<DynamicFormModule> {
    return {
      ngModule: DynamicFormModule,
      providers: [
        { provide: DYNAMIC_FORM_CONFIG, useValue: dynamicFormConfig },
        { provide: DYNAMIC_FORM_VALIDATION_MESSAGES, useValue: validationMessages || {} },
      ]
    };
  }
}
