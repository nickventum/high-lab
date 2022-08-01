import { AbstractControlOptions, AsyncValidatorFn, FormArray, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { ArrayField } from '../base.field';
import { ErrorObject } from '../interfaces';
import { ExtendedControls, ExtendedFormControl, ExtendedFormGroup } from './index';
export declare class ExtendedFormArray extends FormArray {
    formGroupFabric: (value?: any) => ExtendedControls;
    readonly id: number;
    private lastPatchedValue;
    pathFromRoot: string;
    controls: Array<ExtendedFormGroup>;
    fieldConfig: ArrayField;
    canAddRow: (() => boolean) | boolean;
    defaultValuePatched: boolean;
    htmlInstance: HTMLElement;
    error: Observable<string | null>;
    errorObject: Observable<ErrorObject | null>;
    constructor(formGroupFabric: (value?: any) => ExtendedControls, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null);
    get childrenControls(): Array<ExtendedFormGroup>;
    get(path: Array<string | number> | string): ExtendedFormControl;
    get canShowError(): boolean;
    get isChangedByUser(): boolean;
    patchValue(value: {
        [key: string]: any;
    }[], options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        useAsDefault?: boolean;
    }): void;
    validate(scrollToError?: boolean): boolean;
    scrollToError(): void;
    resetDefaultValue(): void;
    resetToDefaultValue(options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        useAsDefault?: boolean;
    }): void;
    updateChildrenControls(): void;
    addControl(value?: any): any;
    removeControl(index: number): void;
    enableAllControlByKey(key: string): void;
    removeAllControls(): void;
    getRawValue(params?: {
        ignoredFields: boolean;
    }): any;
}
