import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { ValidationMessages } from './dynamic-form.config';
import { ExtendedFormArray, ExtendedFormControl, ExtendedFormGroup } from './form-controls';
import { AbstractFieldInterface, ArrayFieldInterface, ControlFieldInterface, GroupFieldInterface, RelatedFieldInterface } from './interfaces/field-config.interface';
export declare type NewFormControl = new (...params: any) => ExtendedFormControl | ExtendedFormArray | ExtendedFormGroup;
export declare class AbstractField implements AbstractFieldInterface {
    formControl: NewFormControl;
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
    key: string;
    order: number | undefined;
    internalOrder?: number;
    initialValue?: any;
    validationMessages?: ValidationMessages;
    relatedFields?: RelatedFieldInterface[];
    class?: string;
    checkChanges?: (currentValue: any, defaultValue: any) => boolean;
    autofocus?: boolean;
    data?: any;
    ignore?: boolean;
    constructor(options: AbstractFieldInterface);
}
export declare class ControlField extends AbstractField implements ControlFieldInterface {
    private readonly labelFn?;
    private readonly labelString?;
    tooltip?: string;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    constructor(options: ControlFieldInterface);
    label(form: AbstractControl): string;
}
export declare class GroupField extends AbstractField implements GroupFieldInterface {
    configs: Array<AbstractField>;
    constructor(options: GroupFieldInterface);
}
export declare class ArrayField extends AbstractField implements ArrayFieldInterface {
    configs: AbstractField | ((value: any) => AbstractField);
    constructor(options: ArrayFieldInterface);
}
