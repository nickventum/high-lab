import { OnChanges, SimpleChanges } from '@angular/core';
import { NewComponent, ValidationMessagesFn } from './dynamic-form.config';
import { ExtendedControls, ExtendedFormGroup } from './form-controls';
import { DynamicFormTemplate } from './interfaces';
import * as i0 from "@angular/core";
export declare class DynamicFormComponent implements OnChanges {
    private readonly validationMessages;
    readonly componentsByConfig: Map<any, NewComponent>;
    form: ExtendedFormGroup;
    templates: DynamicFormTemplate;
    constructor(validationMessages: ValidationMessagesFn);
    ngOnChanges(changes: SimpleChanges): void;
    getTemplate(key: string): any;
    trackByKeyFn(index: number, control: ExtendedControls): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DynamicFormComponent, "dynamic-form", never, { "form": "form"; "templates": "templates"; }, {}, never, ["[formHeader]", "[formFooter]"]>;
}
