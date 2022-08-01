import { BaseFieldComponent } from './base.component';
import { AbstractField } from './base.field';
import { AbstractFieldInterface } from './interfaces/field-config.interface';
export declare type NewComponent = new (...params: any) => BaseFieldComponent;
export declare type NewBaseField = new (options: AbstractFieldInterface) => AbstractField;
export interface DynamicFieldConfig {
    component: NewComponent;
    config: NewBaseField;
}
export declare type DynamicFormConfig = DynamicFieldConfig[];
export interface ValidationMessages {
    [key: string]: string | ((...options: any[]) => string);
}
export declare type ValidationMessagesFn = () => ValidationMessages;
