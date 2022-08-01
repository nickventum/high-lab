import { ExtendedControls, ExtendedFormArray, ExtendedFormControl, ExtendedFormGroup } from '../../form-controls';
import { ErrorObject } from '../../interfaces';
export declare class CommonHelper {
    static instantError(control: ExtendedControls, asString: false): ErrorObject | null;
    static instantError(control: ExtendedControls, asString: true): string | null;
    static getFirstInvalidControl(control: ExtendedFormGroup | ExtendedFormArray): ExtendedFormControl | null;
}
