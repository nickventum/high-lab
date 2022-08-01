import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ControlField } from '../base.field';
import { ErrorObject } from '../interfaces';
export declare class ExtendedFormControl extends FormControl {
    readonly id: number;
    pathFromRoot: string;
    fieldConfig: ControlField;
    defaultValue: any;
    defaultValuePatched: boolean;
    htmlInstance: HTMLElement;
    error: Observable<string | null>;
    errorObject: Observable<ErrorObject | null>;
    get canShowError(): boolean;
    get isChangedByUser(): boolean;
    patchValue(value: any, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
        useAsDefault?: boolean;
    }): void;
    resetDefaultValue(): void;
    resetToDefaultValue(options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    getRawValue(params?: {
        ignoredFields: boolean;
    }): any;
}
