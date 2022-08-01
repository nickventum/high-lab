import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { AbstractField } from './base.field';
import { ExtendedFormGroup } from './form-controls';
export declare function createDynamicForm(configList: AbstractField[], validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null): ExtendedFormGroup;
