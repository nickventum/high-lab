import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { GroupField } from '../base.field';
import { ValidationMessages } from '../dynamic-form.config';
import { ErrorObject } from '../interfaces';
import { ExtendedControls } from './index';
export declare class ExtendedFormGroup extends FormGroup {
    readonly supposeControls: Map<string, Subject<ExtendedControls>>;
    readonly id: number;
    pathFromRoot: string;
    defaultValidationMessages: ValidationMessages;
    controls: {
        [key: string]: ExtendedControls;
    };
    fieldConfig: GroupField;
    lastPatchedValue: {
        [key: string]: any;
    } | undefined;
    defaultValuePatched: boolean;
    htmlInstance: HTMLElement;
    childrenControls: Array<ExtendedControls>;
    error: Observable<string | null>;
    errorObject: Observable<ErrorObject | null>;
    get canShowError(): boolean;
    get isChangedByUser(): boolean;
    get(path: Array<string | number> | string): ExtendedControls;
    patchValue(value: {
        [key: string]: any;
    }, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        useAsDefault?: boolean;
    }): void;
    validate(scrollToError?: boolean): boolean;
    resetDefaultValue(): void;
    resetToDefaultValue(options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    scrollToError(): void;
    updateChildrenControls(): void;
    getControl(path: string[]): Observable<any>;
    getRawValue(params?: {
        ignoredFields: boolean;
    }): any;
}
