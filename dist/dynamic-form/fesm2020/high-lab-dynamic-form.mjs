import * as i1 from '@angular/forms';
import { FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { startWith, map, filter, mergeAll, pairwise } from 'rxjs/operators';
import * as i0 from '@angular/core';
import { Directive, ElementRef, TemplateRef, Component, Input, HostBinding, ViewChild, DefaultIterableDiffer, ɵstringify, InjectionToken, Inject, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

class RandomHelper {
    /** use for large set, unique by 10 000 000 */
    static get StrId() {
        return Math.random().toString(36).substring(2);
    }
    /** use only for small set, unique by 10 000 */
    static get NumId() {
        return 1 + Math.random() * 0x10000000 | 0;
    }
}

class CommonHelper {
    static instantError(control, asString = true) {
        let firstKey = '';
        const errors = control.errors;
        if (!errors) {
            return null;
        }
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                firstKey = key;
                break;
            }
        }
        const customError = control.fieldConfig.validationMessages && control.fieldConfig.validationMessages[firstKey];
        const root = control.root;
        const rootValidationMessage = root.defaultValidationMessages && root.defaultValidationMessages[firstKey];
        const error = customError || rootValidationMessage || firstKey;
        let errorString = error;
        if (typeof error === 'function') {
            errorString = error(errors[firstKey]);
        }
        if (!asString) {
            return { key: firstKey, message: errorString, params: errors[firstKey] };
        }
        return errorString;
    }
    static getFirstInvalidControl(control) {
        for (const item of control.childrenControls) {
            if (!item.invalid) {
                continue;
            }
            if (item instanceof ExtendedFormControl) {
                return item;
            }
            else {
                return this.getFirstInvalidControl(item);
            }
        }
        return null;
    }
}

class ExtendedFormGroup extends FormGroup {
    constructor() {
        super(...arguments);
        this.supposeControls = new Map();
        this.id = RandomHelper.NumId;
        this.defaultValidationMessages = {};
        this.defaultValuePatched = false;
        this.childrenControls = [];
        this.error = this.statusChanges.pipe(startWith(false), map(() => CommonHelper.instantError(this, true)));
        this.errorObject = this.statusChanges.pipe(startWith(false), map(() => CommonHelper.instantError(this, false)));
    }
    get canShowError() {
        return this.invalid && (this.touched || this.dirty);
    }
    get isChangedByUser() {
        if (this.fieldConfig && typeof this.fieldConfig.checkChanges === 'function') {
            return this.fieldConfig.checkChanges(this.value, this.defaultValuePatched);
        }
        for (const control of Object.values(this.controls)) {
            if (control.isChangedByUser) {
                return true;
            }
        }
        return false;
    }
    get(path) {
        return super.get(path);
    }
    patchValue(value, options = {}) {
        if (value == null /* both `null` and `undefined` */) {
            return;
        }
        if (options.useAsDefault) {
            this.defaultValuePatched = true;
        }
        Object.keys(value).forEach(name => {
            if (this.controls[name]) {
                this.controls[name].patchValue(value[name], { ...options, onlySelf: true });
            }
        });
        this.updateValueAndValidity(options);
        this.lastPatchedValue = value;
    }
    validate(scrollToError = true) {
        this.markAllAsTouched();
        this.updateValueAndValidity({ onlySelf: true });
        if (scrollToError && this.invalid) {
            this.scrollToError();
        }
        return this.valid;
    }
    resetDefaultValue() {
        this.defaultValuePatched = false;
        Object.values(this.controls).forEach(control => control.resetDefaultValue());
    }
    resetToDefaultValue(options = {}) {
        Object.values(this.controls).forEach(control => control.resetToDefaultValue({ ...options, onlySelf: true }));
        this.updateValueAndValidity();
    }
    scrollToError() {
        const invalidControl = CommonHelper.getFirstInvalidControl(this);
        if (invalidControl) {
            invalidControl.htmlInstance.scrollIntoView({ behavior: 'smooth' });
        }
    }
    updateChildrenControls() {
        this.childrenControls = Object.values(this.controls);
        this.childrenControls.sort((a, b) => {
            if (a.fieldConfig.internalOrder < b.fieldConfig.internalOrder) {
                return -1;
            }
            else if (a.fieldConfig.internalOrder > b.fieldConfig.internalOrder) {
                return 1;
            }
            return 0;
        });
    }
    getControl(path) {
        const pathStr = this.pathFromRoot + path.join('.');
        const root = this.root;
        if (!root.supposeControls.has(pathStr)) {
            root.supposeControls.set(pathStr, new Subject());
        }
        const subject = root.supposeControls.get(pathStr);
        return subject.pipe(filter(v => !!v));
    }
    getRawValue(params = { ignoredFields: false }) {
        return this.childrenControls.reduce((acc, control) => {
            if (!control.fieldConfig.ignore || params.ignoredFields) {
                acc[control.fieldConfig.key] = control.getRawValue(params);
            }
            return acc;
        }, {});
    }
}

class ExtendedFormArray extends FormArray {
    constructor(formGroupFabric, validatorOrOpts, asyncValidator) {
        super([], validatorOrOpts, asyncValidator);
        this.formGroupFabric = formGroupFabric;
        this.id = RandomHelper.NumId;
        this.canAddRow = true;
        this.defaultValuePatched = false;
        this.error = this.statusChanges.pipe(startWith(false), map(() => CommonHelper.instantError(this, true)));
        this.errorObject = this.statusChanges.pipe(startWith(false), map(() => CommonHelper.instantError(this, false)));
    }
    get childrenControls() {
        return this.controls;
    }
    ;
    get(path) {
        return super.get(path);
    }
    get canShowError() {
        return this.invalid && (this.touched || this.dirty);
    }
    get isChangedByUser() {
        if (this.fieldConfig && typeof this.fieldConfig.checkChanges === 'function') {
            return this.fieldConfig.checkChanges(this.value, this.defaultValuePatched);
        }
        return this.controls.some(control => control.isChangedByUser);
    }
    patchValue(value, options = {}) {
        if (!Array.isArray(value)) {
            return;
        }
        if (options.useAsDefault) {
            this.defaultValuePatched = true;
        }
        this.removeAllControls();
        for (let i = this.controls.length; i < value.length; i++) {
            this.addControl(value[i]);
        }
        value.forEach(((newValue, index) => {
            if (this.at(index)) {
                this.at(index).patchValue(newValue, { ...options, onlySelf: true });
            }
        }));
        this.updateValueAndValidity(options);
        this.lastPatchedValue = value;
    }
    validate(scrollToError = false) {
        this.markAllAsTouched();
        this.updateValueAndValidity({ onlySelf: true });
        if (scrollToError && this.invalid) {
            this.scrollToError();
        }
        return this.valid;
    }
    scrollToError() {
        const invalidControl = CommonHelper.getFirstInvalidControl(this);
        if (invalidControl) {
            invalidControl.htmlInstance.scrollIntoView({ behavior: 'smooth' });
        }
    }
    resetDefaultValue() {
        this.defaultValuePatched = false;
        this.controls.forEach(control => control.resetDefaultValue());
    }
    resetToDefaultValue(options = {}) {
        if (!this.defaultValuePatched) {
            return;
        }
        if (Array.isArray(this.lastPatchedValue)) {
            this.removeAllControls();
            for (let i = this.controls.length; i < this.lastPatchedValue.length; i++) {
                this.addControl(this.lastPatchedValue[i]);
            }
            this.controls.forEach((control, index) => {
                control.patchValue(this.lastPatchedValue[index], { onlySelf: true, useAsDefault: true, ...options });
            });
            this.updateValueAndValidity({ onlySelf: true });
        }
    }
    updateChildrenControls() { }
    addControl(value) {
        const control = this.formGroupFabric(value);
        if (!control) {
            return;
        }
        if (this.disabled) {
            control.disable({ emitEvent: false });
        }
        this.push(control);
        return control;
    }
    removeControl(index) {
        this.removeAt(index);
    }
    enableAllControlByKey(key) {
        // @ts-ignore
        this.controls.forEach(control => control.get(key).enable());
    }
    removeAllControls() {
        while (this.controls.length !== 0) {
            this.removeAt(0);
        }
    }
    getRawValue(params = { ignoredFields: false }) {
        return this.childrenControls.reduce((acc, control) => {
            if (!control.fieldConfig.ignore || params.ignoredFields) {
                acc.push(control.getRawValue(params));
            }
            return acc;
        }, []);
    }
}

class ExtendedFormControl extends FormControl {
    constructor() {
        super(...arguments);
        this.id = RandomHelper.NumId;
        this.defaultValue = null;
        this.error = this.statusChanges.pipe(startWith(false), map(() => CommonHelper.instantError(this, true)));
        this.errorObject = this.statusChanges.pipe(startWith(false), map(() => CommonHelper.instantError(this, false)));
    }
    get canShowError() {
        return this.invalid && (this.touched || this.dirty);
    }
    get isChangedByUser() {
        if (this.fieldConfig && typeof this.fieldConfig.checkChanges === 'function') {
            return this.fieldConfig.checkChanges(this.value, this.defaultValue);
        }
        return !(this.defaultValue === this.value || (this.defaultValue === null && this.value === ''));
    }
    patchValue(value, options = {}) {
        if (options.useAsDefault) {
            this.defaultValue = value;
            this.defaultValuePatched = true;
        }
        this.setValue(value, options);
    }
    resetDefaultValue() {
        this.defaultValue = undefined;
        this.defaultValuePatched = false;
    }
    resetToDefaultValue(options = {}) {
        this.patchValue(this.defaultValue, options);
    }
    getRawValue(params = { ignoredFields: false }) {
        return this.value;
    }
}

class AbstractField {
    constructor(options) {
        this.validatorOrOpts = options.validatorOrOpts;
        this.asyncValidator = options.asyncValidator;
        this.key = options.key;
        this.order = options.order;
        this.initialValue = options.initialValue;
        this.validationMessages = options.validationMessages;
        this.relatedFields = options.relatedFields;
        this.class = options.class;
        this.checkChanges = options.checkChanges;
        this.autofocus = options.autofocus;
        this.data = options.data;
        this.formControl = ExtendedFormControl;
        this.ignore = options.ignore;
    }
}
class ControlField extends AbstractField {
    constructor(options) {
        super(options);
        if (typeof options.label === 'function') {
            this.labelFn = options.label;
        }
        else {
            this.labelString = options.label;
        }
        this.tooltip = options.tooltip;
        this.placeholder = options.placeholder;
        this.minLength = options.minLength;
        this.maxLength = options.maxLength;
        this.formControl = ExtendedFormControl;
    }
    label(form) {
        if (this.labelFn) {
            return this.labelFn(form.value);
        }
        return this.labelString;
    }
}
class GroupField extends AbstractField {
    constructor(options) {
        super(options);
        this.configs = options.configs;
        this.formControl = ExtendedFormGroup;
    }
}
class ArrayField extends AbstractField {
    constructor(options) {
        super(options);
        this.configs = options.configs;
        this.formControl = ExtendedFormArray;
    }
}

class EditableFieldDirective {
}
EditableFieldDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EditableFieldDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
EditableFieldDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: EditableFieldDirective, selector: "[editableField]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EditableFieldDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[editableField]'
                }]
        }] });
class BaseFieldComponent {
    constructor(elementRef, changeDetectorRef) {
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.self = this;
        this.template = {};
    }
    get classList() {
        return this.fieldConfig.class || '';
    }
    ngOnInit() {
        this.control.htmlInstance = this.elementRef.nativeElement;
    }
    ngAfterViewInit() {
        if (this.fieldConfig.autofocus && this.editableField instanceof ElementRef) {
            this.editableField.nativeElement.focus();
            this.changeDetectorRef.detectChanges();
        }
    }
    get control() {
        return this.formGroup.controls[this.fieldConfig.key];
    }
    get required() {
        return this.hasValidator('required');
    }
    hasValidator(key) {
        const control = this.control;
        if (control.validator) {
            const validators = control.validator('');
            return !!(validators && validators.hasOwnProperty(key));
        }
        return false;
    }
    get disabled() {
        return this.control.disabled;
    }
    get label() {
        // @ts-ignore
        return this.fieldConfig.label(this.formGroup);
    }
    get hasTemplateRef() {
        return !!this.template && (this.template instanceof TemplateRef || this.template?.ref instanceof TemplateRef);
    }
    get templateRef() {
        if (this.template instanceof TemplateRef) {
            return this.template;
        }
        else if (this.template?.ref instanceof TemplateRef) {
            return this.template?.ref;
        }
        return null;
    }
    getChildTemplate(key) {
        if (!this.template) {
            return null;
        }
        if (this.template instanceof TemplateRef) {
            return null;
        }
        if (this.template[key]) {
            return this.template[key];
        }
        return this.template.children[key];
    }
}
BaseFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BaseFieldComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
BaseFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: BaseFieldComponent, selector: "ng-component", inputs: { fieldConfig: "fieldConfig", formGroup: "formGroup", template: "template" }, host: { properties: { "class": "this.classList" } }, viewQueries: [{ propertyName: "editableField", first: true, predicate: EditableFieldDirective, descendants: true, read: ElementRef }], ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BaseFieldComponent, decorators: [{
            type: Component,
            args: [{
                    template: '',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { fieldConfig: [{
                type: Input
            }], formGroup: [{
                type: Input
            }], template: [{
                type: Input
            }], classList: [{
                type: HostBinding,
                args: ['class']
            }], editableField: [{
                type: ViewChild,
                args: [EditableFieldDirective, { read: ElementRef, static: false }]
            }] } });

function isNullConfig(config) {
    return config === null || config === undefined || !config;
}
function createDynamicForm(configList, validatorOrOpts, asyncValidator) {
    const form = new ExtendedFormGroup({}, validatorOrOpts, asyncValidator);
    form.pathFromRoot = '';
    configList.forEach((config, index) => {
        if (isNullConfig(config)) {
            return;
        }
        config.internalOrder = config.hasOwnProperty('order') ? config.order : index;
        const control = debouncer(config, form.pathFromRoot, form);
        addControl(form, control, config, form);
        postProcess(control, config, form);
    });
    form.updateChildrenControls();
    return form;
}
function createFormControl(config, parentPath) {
    const control = Reflect.construct(config.formControl, [
        config.initialValue,
        config.validatorOrOpts,
        config.asyncValidator,
    ]);
    control.pathFromRoot = joinPath(parentPath, config.key);
    return control;
}
function createFormGroupControl(config, parentPath, rootForm) {
    const parent = new ExtendedFormGroup({}, config.validatorOrOpts, config.asyncValidator);
    parent.pathFromRoot = joinPath(parentPath, config.key);
    config.configs.forEach((configChild, index) => {
        if (isNullConfig(configChild)) {
            return;
        }
        configChild.internalOrder = configChild.hasOwnProperty('order') ? configChild.order : index;
        const control = debouncer(configChild, parent.pathFromRoot, rootForm);
        addControl(parent, control, configChild, rootForm);
        postProcess(control, configChild, rootForm);
    });
    parent.updateChildrenControls();
    return parent;
}
function createFormArrayControl(config, parentPath, rootForm) {
    const parent = new ExtendedFormArray((value) => {
        let fabricConfig;
        if (typeof config.configs === 'function') {
            fabricConfig = config.configs(value);
        }
        else {
            fabricConfig = config.configs;
        }
        if (isNullConfig(fabricConfig)) {
            return null;
        }
        const control = debouncer(fabricConfig, parent.pathFromRoot, rootForm);
        control.fieldConfig = fabricConfig;
        postProcess(control, config, rootForm);
        return control;
    }, config.validatorOrOpts, config.asyncValidator);
    parent.pathFromRoot = joinPath(parentPath, config.key);
    return parent;
}
function debouncer(config, parentPath, rootForm) {
    if (config instanceof GroupField) {
        return createFormGroupControl(config, parentPath, rootForm);
    }
    else if (config instanceof ArrayField) {
        return createFormArrayControl(config, parentPath, rootForm);
    }
    return createFormControl(config, parentPath);
}
function postProcess(control, config, rootForm) {
    const relatedFields = config.relatedFields;
    if (!relatedFields) {
        return;
    }
    const initValueStr = config.initialValue instanceof Object ? config.initialValue.value : config.initialValue;
    const differ = new DefaultIterableDiffer(trackByItem);
    of(of(initValueStr), control.valueChanges).pipe(mergeAll(), pairwise()).subscribe((controlValues) => {
        const nextFieldsState = relatedFields.filter(v => controlIsVisible(v, controlValues, control));
        const diff = differ.diff(nextFieldsState);
        if (!diff) {
            return;
        }
        diff.forEachRemovedItem(v => {
            let relatedFieldConfig = v.item.configs;
            if (typeof relatedFieldConfig === 'function') {
                relatedFieldConfig = relatedFieldConfig(controlValues[1], controlValues[0], control);
            }
            removeControls(relatedFieldConfig, control.parent);
        });
        diff.forEachAddedItem(v => {
            let relatedFieldConfig = v.item.configs;
            if (typeof relatedFieldConfig === 'function') {
                relatedFieldConfig = relatedFieldConfig(controlValues[0], controlValues[1], control);
            }
            relatedFieldConfig.forEach((childConfig, index) => {
                if (isNullConfig(childConfig)) {
                    return;
                }
                childConfig.internalOrder = childConfig.hasOwnProperty('order') ? childConfig.order : index;
                const childControl = debouncer(childConfig, control.parent.pathFromRoot, rootForm);
                if (control.parent.lastPatchedValue && control.parent.lastPatchedValue[childConfig.key]) {
                    childControl.patchValue(control.parent.lastPatchedValue[childConfig.key], { emitEvent: false, useAsDefault: control.parent.defaultValuePatched });
                }
                addControl(control.parent, childControl, childConfig, rootForm);
                postProcess(childControl, childConfig, rootForm);
            });
        });
        control.parent.updateChildrenControls();
    });
}
function trackByItem(index, item) {
    return item;
}
function addControl(parent, control, config, rootForm) {
    control.fieldConfig = config;
    parent.addControl(config.key, control, { emitEvent: false });
    if (rootForm.supposeControls.has(control.pathFromRoot)) {
        // @ts-ignore
        rootForm.supposeControls.get(control.pathFromRoot).next(control);
    }
}
function removeControls(configs, parent) {
    configs.forEach(config => {
        if (parent.contains(config.key)) {
            parent.removeControl(config.key, { emitEvent: false });
            if (config.relatedFields) {
                config.relatedFields.forEach((c) => removeControls(c.configs, parent));
            }
        }
    });
}
function controlIsVisible(config, controlValues, control) {
    const prevControlValue = controlValues[0];
    const controlValue = controlValues[1];
    switch (typeof config.checkVisibility) {
        case 'function': {
            // @ts-ignore
            return config.checkVisibility(controlValue, prevControlValue, control);
        }
    }
    return false;
}
function joinPath(a, b) {
    if (a !== '') {
        return `${a}.${b}`;
    }
    return b;
}

class DynamicFormContentDirective {
    constructor(viewContainer, componentFactoryResolver, renderer2, templateRef) {
        this.viewContainer = viewContainer;
        this.componentFactoryResolver = componentFactoryResolver;
        this.renderer2 = renderer2;
        this.templateRef = templateRef;
        this.context = new DfContentContext();
        this.thenTemplateRef = null;
        this.thenViewRef = null;
        this.customViewRef = null;
        this.thenTemplateRef = templateRef;
    }
    ngOnChanges(changes) {
        if (this.context.$implicit.hasTemplateRef && !this.customViewRef) {
            this.clearViewExclude(this.customViewRef);
            this.customViewRef = this.viewContainer.createEmbeddedView(this.context.$implicit.templateRef, { component: this.context.$implicit, formTemplate: this.thenTemplateRef });
        }
        else if (this.thenTemplateRef && !this.thenViewRef) {
            this.clearViewExclude(this.thenTemplateRef);
            this.thenViewRef = this.viewContainer.createEmbeddedView(this.thenTemplateRef, this.context);
        }
    }
    set dynamicFormContent(condition) {
        this.context.$implicit = condition;
    }
    set dynamicFormContentThen(templateRef) {
        assertTemplate('dynamicFormContentThen', templateRef);
        this.thenTemplateRef = templateRef;
        this.thenViewRef = null; // clear previous view if any.
    }
    clearViewExclude(excludeView) {
        this.viewContainer.clear();
        if (excludeView !== this.thenViewRef) {
            this.thenViewRef = null;
        }
        if (excludeView !== this.customViewRef) {
            this.customViewRef = null;
        }
    }
}
DynamicFormContentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicFormContentDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }, { token: i0.Renderer2 }, { token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
DynamicFormContentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: DynamicFormContentDirective, selector: "[dynamicFormContent]", inputs: { dynamicFormContent: "dynamicFormContent", dynamicFormContentThen: "dynamicFormContentThen" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicFormContentDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[dynamicFormContent]' }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }, { type: i0.Renderer2 }, { type: i0.TemplateRef }]; }, propDecorators: { dynamicFormContent: [{
                type: Input
            }], dynamicFormContentThen: [{
                type: Input
            }] } });
function assertTemplate(property, templateRef) {
    const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
    if (!isTemplateRefOrNull) {
        throw new Error(`${property} must be a TemplateRef, but received '${ɵstringify(templateRef)}'.`);
    }
}
class DfContentContext {
}

const DYNAMIC_FORM_CONFIG = new InjectionToken('dynamicFormConfig');
const DYNAMIC_FORM_CONFIG_MAP = new InjectionToken('dynamicFormConfigMap');
const DYNAMIC_FORM_VALIDATION_MESSAGES = new InjectionToken('dynamicFormValidationMessages');

class DynamicFieldDirective {
    constructor(viewContainerRef, componentFactoryResolver, componentsByConfig) {
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.componentsByConfig = componentsByConfig;
    }
    ngOnChanges(changes) {
        if (changes.fieldConfig && changes.fieldConfig.currentValue) {
            const constructor = this.fieldConfig.constructor;
            if (!this.componentsByConfig.get(constructor)) {
                throw new Error(`Trying to use an unsupported type (${constructor}).`);
            }
            const component = this.componentFactoryResolver.resolveComponentFactory(this.componentsByConfig.get(constructor));
            this.component = this.viewContainerRef.createComponent(component);
            this.setComponentProps();
        }
    }
    setComponentProps() {
        this.component.instance.fieldConfig = this.fieldConfig;
        this.component.instance.formGroup = this.formGroup;
        this.component.instance.template = this.template;
        this.component.instance.rowIndex = this.rowIndex;
    }
}
DynamicFieldDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicFieldDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }, { token: DYNAMIC_FORM_CONFIG_MAP }], target: i0.ɵɵFactoryTarget.Directive });
DynamicFieldDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: DynamicFieldDirective, selector: "[dynamicField]", inputs: { fieldConfig: "fieldConfig", formGroup: "formGroup", template: "template", rowIndex: "rowIndex" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicFieldDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[dynamicField]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }, { type: Map, decorators: [{
                    type: Inject,
                    args: [DYNAMIC_FORM_CONFIG_MAP]
                }] }]; }, propDecorators: { fieldConfig: [{
                type: Input
            }], formGroup: [{
                type: Input
            }], template: [{
                type: Input
            }], rowIndex: [{
                type: Input
            }] } });

class DynamicFormComponent {
    constructor(validationMessages) {
        this.validationMessages = validationMessages;
        this.componentsByConfig = new Map();
        this.templates = {};
    }
    ngOnChanges(changes) {
        if (changes.form && changes.form.currentValue) {
            const root = changes.form.currentValue.root;
            root.defaultValidationMessages = this.validationMessages();
        }
    }
    getTemplate(key) {
        return this.templates[key];
    }
    trackByKeyFn(index, control) {
        return control.id;
    }
}
DynamicFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicFormComponent, deps: [{ token: DYNAMIC_FORM_VALIDATION_MESSAGES }], target: i0.ɵɵFactoryTarget.Component });
DynamicFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: DynamicFormComponent, selector: "dynamic-form", inputs: { form: "form", templates: "templates" }, usesOnChanges: true, ngImport: i0, template: "<form novalidate [formGroup]=\"form\">\r\n    <ng-content select=\"[formHeader]\"></ng-content>\r\n\r\n    <ng-container *ngFor=\"let control of form.childrenControls; trackBy: trackByKeyFn\"\r\n                  dynamicField\r\n                  [fieldConfig]=\"control.fieldConfig\"\r\n                  [formGroup]=\"form\"\r\n                  [template]=\"getTemplate(control.fieldConfig.key)\"\r\n    ></ng-container>\r\n\r\n    <ng-content select=\"[formFooter]\"></ng-content>\r\n</form>\r\n\r\n", styles: [":host{display:block;width:100%}form{width:100%;height:100%}\n"], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: DynamicFieldDirective, selector: "[dynamicField]", inputs: ["fieldConfig", "formGroup", "template", "rowIndex"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dynamic-form', template: "<form novalidate [formGroup]=\"form\">\r\n    <ng-content select=\"[formHeader]\"></ng-content>\r\n\r\n    <ng-container *ngFor=\"let control of form.childrenControls; trackBy: trackByKeyFn\"\r\n                  dynamicField\r\n                  [fieldConfig]=\"control.fieldConfig\"\r\n                  [formGroup]=\"form\"\r\n                  [template]=\"getTemplate(control.fieldConfig.key)\"\r\n    ></ng-container>\r\n\r\n    <ng-content select=\"[formFooter]\"></ng-content>\r\n</form>\r\n\r\n", styles: [":host{display:block;width:100%}form{width:100%;height:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DYNAMIC_FORM_VALIDATION_MESSAGES]
                }] }]; }, propDecorators: { form: [{
                type: Input
            }], templates: [{
                type: Input
            }] } });

class DynamicFormModule {
    static config(dynamicFormConfig, validationMessages) {
        const dynamicFormConfigMap = new Map(dynamicFormConfig.map(v => ([v.config, v.component])));
        return {
            ngModule: DynamicFormModule,
            providers: [
                { provide: DYNAMIC_FORM_CONFIG, useValue: dynamicFormConfig },
                { provide: DYNAMIC_FORM_CONFIG_MAP, useValue: dynamicFormConfigMap },
                { provide: DYNAMIC_FORM_VALIDATION_MESSAGES, useValue: validationMessages || {} },
            ]
        };
    }
}
DynamicFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DynamicFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicFormModule, declarations: [DynamicFormComponent, DynamicFieldDirective, BaseFieldComponent, DynamicFormContentDirective, EditableFieldDirective], imports: [CommonModule,
        ReactiveFormsModule], exports: [DynamicFormComponent, BaseFieldComponent, DynamicFieldDirective, DynamicFormContentDirective, EditableFieldDirective] });
DynamicFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicFormModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DynamicFormModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DynamicFormComponent, DynamicFieldDirective, BaseFieldComponent, DynamicFormContentDirective, EditableFieldDirective],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                    ],
                    exports: [DynamicFormComponent, BaseFieldComponent, DynamicFieldDirective, DynamicFormContentDirective, EditableFieldDirective]
                }]
        }] });

/*
 * Public API Surface of dynamic-form
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AbstractField, ArrayField, BaseFieldComponent, ControlField, DYNAMIC_FORM_CONFIG, DYNAMIC_FORM_CONFIG_MAP, DYNAMIC_FORM_VALIDATION_MESSAGES, DfContentContext, DynamicFieldDirective, DynamicFormComponent, DynamicFormContentDirective, DynamicFormModule, EditableFieldDirective, ExtendedFormArray, ExtendedFormControl, ExtendedFormGroup, GroupField, assertTemplate, createDynamicForm };
//# sourceMappingURL=high-lab-dynamic-form.mjs.map
