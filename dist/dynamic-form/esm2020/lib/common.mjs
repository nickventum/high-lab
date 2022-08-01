import { DefaultIterableDiffer } from '@angular/core';
import { of } from 'rxjs';
import { mergeAll, pairwise } from 'rxjs/operators';
import { ArrayField, GroupField } from './base.field';
import { ExtendedFormArray, ExtendedFormGroup } from './form-controls';
function isNullConfig(config) {
    return config === null || config === undefined || !config;
}
export function createDynamicForm(configList, validatorOrOpts, asyncValidator) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZHluYW1pYy1mb3JtL3NyYy9saWIvY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU90RCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEQsT0FBTyxFQUFpQixVQUFVLEVBQWdCLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNuRixPQUFPLEVBQW9CLGlCQUFpQixFQUF1QixpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSTlHLFNBQVMsWUFBWSxDQUFDLE1BQXFCO0lBQ3pDLE9BQU8sTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssU0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzVELENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQy9CLFVBQTJCLEVBQzNCLGVBQTZFLEVBQzdFLGNBQTZEO0lBRTdELE1BQU0sSUFBSSxHQUFHLElBQUksaUJBQWlCLENBQUMsRUFBRSxFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN4RSxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUV2QixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ25DLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3hCLE9BQU87U0FDUjtRQUVELE1BQU0sQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzdFLE1BQU0sT0FBTyxHQUFHLFNBQVMs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QztBQUdELFNBQVMsUUFBUSxDQUFDLENBQVMsRUFBRSxDQUFTO0lBQ3BDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNaLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDcEI7SUFFRCxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWZhdWx0SXRlcmFibGVEaWZmZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBBYnN0cmFjdENvbnRyb2wsXHJcbiAgQWJzdHJhY3RDb250cm9sT3B0aW9ucyxcclxuICBBc3luY1ZhbGlkYXRvckZuLFxyXG4gIFZhbGlkYXRvckZuXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtZXJnZUFsbCwgcGFpcndpc2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEFic3RyYWN0RmllbGQsIEFycmF5RmllbGQsIENvbnRyb2xGaWVsZCwgR3JvdXBGaWVsZCB9IGZyb20gJy4vYmFzZS5maWVsZCc7XHJcbmltcG9ydCB7IEV4dGVuZGVkQ29udHJvbHMsIEV4dGVuZGVkRm9ybUFycmF5LCBFeHRlbmRlZEZvcm1Db250cm9sLCBFeHRlbmRlZEZvcm1Hcm91cCB9IGZyb20gJy4vZm9ybS1jb250cm9scyc7XHJcbmltcG9ydCB7IEFic3RyYWN0RmllbGRJbnRlcmZhY2UsIFJlbGF0ZWRGaWVsZEludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9maWVsZC1jb25maWcuaW50ZXJmYWNlJztcclxuXHJcblxyXG5mdW5jdGlvbiBpc051bGxDb25maWcoY29uZmlnOiBBYnN0cmFjdEZpZWxkKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGNvbmZpZyA9PT0gbnVsbCB8fCBjb25maWcgPT09IHVuZGVmaW5lZCB8fCAhY29uZmlnO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRHluYW1pY0Zvcm0oXHJcbiAgY29uZmlnTGlzdDogQWJzdHJhY3RGaWVsZFtdLFxyXG4gIHZhbGlkYXRvck9yT3B0cz86IFZhbGlkYXRvckZuIHwgVmFsaWRhdG9yRm5bXSB8IEFic3RyYWN0Q29udHJvbE9wdGlvbnMgfCBudWxsLFxyXG4gIGFzeW5jVmFsaWRhdG9yPzogQXN5bmNWYWxpZGF0b3JGbiB8IEFzeW5jVmFsaWRhdG9yRm5bXSB8IG51bGxcclxuKTogRXh0ZW5kZWRGb3JtR3JvdXAge1xyXG4gIGNvbnN0IGZvcm0gPSBuZXcgRXh0ZW5kZWRGb3JtR3JvdXAoe30sIHZhbGlkYXRvck9yT3B0cywgYXN5bmNWYWxpZGF0b3IpO1xyXG4gIGZvcm0ucGF0aEZyb21Sb290ID0gJyc7XHJcblxyXG4gIGNvbmZpZ0xpc3QuZm9yRWFjaCgoY29uZmlnLCBpbmRleCkgPT4ge1xyXG4gICAgaWYgKGlzTnVsbENvbmZpZyhjb25maWcpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25maWcuaW50ZXJuYWxPcmRlciA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnb3JkZXInKSA/IGNvbmZpZy5vcmRlciA6IGluZGV4O1xyXG4gICAgY29uc3QgY29udHJvbCA9IGRlYm91bmNlcihjb25maWcsIGZvcm0ucGF0aEZyb21Sb290LCBmb3JtKTtcclxuICAgIGFkZENvbnRyb2woZm9ybSwgY29udHJvbCwgY29uZmlnLCBmb3JtKTtcclxuICAgIHBvc3RQcm9jZXNzKGNvbnRyb2wsIGNvbmZpZywgZm9ybSk7XHJcbiAgfSk7XHJcblxyXG4gIGZvcm0udXBkYXRlQ2hpbGRyZW5Db250cm9scygpO1xyXG5cclxuICByZXR1cm4gZm9ybTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRm9ybUNvbnRyb2woY29uZmlnOiBBYnN0cmFjdEZpZWxkLCBwYXJlbnRQYXRoOiBzdHJpbmcpOiBFeHRlbmRlZEZvcm1Db250cm9sIHtcclxuICBjb25zdCBjb250cm9sID0gUmVmbGVjdC5jb25zdHJ1Y3QoY29uZmlnLmZvcm1Db250cm9sLCBbXHJcbiAgICBjb25maWcuaW5pdGlhbFZhbHVlLFxyXG4gICAgY29uZmlnLnZhbGlkYXRvck9yT3B0cyxcclxuICAgIGNvbmZpZy5hc3luY1ZhbGlkYXRvcixcclxuICBdKTtcclxuXHJcbiAgY29udHJvbC5wYXRoRnJvbVJvb3QgPSBqb2luUGF0aChwYXJlbnRQYXRoLCBjb25maWcua2V5KTtcclxuXHJcbiAgcmV0dXJuIGNvbnRyb2w7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGb3JtR3JvdXBDb250cm9sKGNvbmZpZzogR3JvdXBGaWVsZCwgcGFyZW50UGF0aDogc3RyaW5nLCByb290Rm9ybTogRXh0ZW5kZWRGb3JtR3JvdXApOiBFeHRlbmRlZEZvcm1Hcm91cCB7XHJcbiAgY29uc3QgcGFyZW50ID0gbmV3IEV4dGVuZGVkRm9ybUdyb3VwKHt9LCBjb25maWcudmFsaWRhdG9yT3JPcHRzLCBjb25maWcuYXN5bmNWYWxpZGF0b3IpO1xyXG4gIHBhcmVudC5wYXRoRnJvbVJvb3QgPSBqb2luUGF0aChwYXJlbnRQYXRoLCBjb25maWcua2V5KTtcclxuXHJcbiAgY29uZmlnLmNvbmZpZ3MuZm9yRWFjaCgoY29uZmlnQ2hpbGQsIGluZGV4KSA9PiB7XHJcbiAgICBpZiAoaXNOdWxsQ29uZmlnKGNvbmZpZ0NoaWxkKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uZmlnQ2hpbGQuaW50ZXJuYWxPcmRlciA9IGNvbmZpZ0NoaWxkLmhhc093blByb3BlcnR5KCdvcmRlcicpID8gY29uZmlnQ2hpbGQub3JkZXIgOiBpbmRleDtcclxuICAgIGNvbnN0IGNvbnRyb2wgPSBkZWJvdW5jZXIoY29uZmlnQ2hpbGQsIHBhcmVudC5wYXRoRnJvbVJvb3QsIHJvb3RGb3JtKTtcclxuICAgIGFkZENvbnRyb2wocGFyZW50LCBjb250cm9sLCBjb25maWdDaGlsZCwgcm9vdEZvcm0pO1xyXG4gICAgcG9zdFByb2Nlc3MoY29udHJvbCwgY29uZmlnQ2hpbGQsIHJvb3RGb3JtKTtcclxuICB9KTtcclxuXHJcbiAgcGFyZW50LnVwZGF0ZUNoaWxkcmVuQ29udHJvbHMoKTtcclxuXHJcbiAgcmV0dXJuIHBhcmVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRm9ybUFycmF5Q29udHJvbChjb25maWc6IEFycmF5RmllbGQsIHBhcmVudFBhdGg6IHN0cmluZywgcm9vdEZvcm06IEV4dGVuZGVkRm9ybUdyb3VwKTogRXh0ZW5kZWRGb3JtQXJyYXkge1xyXG4gIGNvbnN0IHBhcmVudCA9IG5ldyBFeHRlbmRlZEZvcm1BcnJheSgodmFsdWU/OiBhbnkpID0+IHtcclxuICAgIGxldCBmYWJyaWNDb25maWc7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBjb25maWcuY29uZmlncyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBmYWJyaWNDb25maWcgPSBjb25maWcuY29uZmlncyh2YWx1ZSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZhYnJpY0NvbmZpZyA9IGNvbmZpZy5jb25maWdzXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzTnVsbENvbmZpZyhmYWJyaWNDb25maWcpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbnRyb2wgPSBkZWJvdW5jZXIoZmFicmljQ29uZmlnLCBwYXJlbnQucGF0aEZyb21Sb290LCByb290Rm9ybSk7XHJcbiAgICBjb250cm9sLmZpZWxkQ29uZmlnID0gZmFicmljQ29uZmlnIGFzIGFueTtcclxuXHJcbiAgICBwb3N0UHJvY2Vzcyhjb250cm9sLCBjb25maWcsIHJvb3RGb3JtKTtcclxuXHJcbiAgICByZXR1cm4gY29udHJvbFxyXG4gIH0sIGNvbmZpZy52YWxpZGF0b3JPck9wdHMsIGNvbmZpZy5hc3luY1ZhbGlkYXRvcikgYXMgYW55O1xyXG5cclxuICBwYXJlbnQucGF0aEZyb21Sb290ID0gam9pblBhdGgocGFyZW50UGF0aCwgY29uZmlnLmtleSk7XHJcblxyXG4gIHJldHVybiBwYXJlbnQ7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBkZWJvdW5jZXIoY29uZmlnOiBBYnN0cmFjdEZpZWxkLCBwYXJlbnRQYXRoOiBzdHJpbmcsIHJvb3RGb3JtOiBFeHRlbmRlZEZvcm1Hcm91cCk6IEV4dGVuZGVkQ29udHJvbHMge1xyXG4gIGlmIChjb25maWcgaW5zdGFuY2VvZiBHcm91cEZpZWxkKSB7XHJcbiAgICByZXR1cm4gY3JlYXRlRm9ybUdyb3VwQ29udHJvbChjb25maWcgYXMgR3JvdXBGaWVsZCwgcGFyZW50UGF0aCwgcm9vdEZvcm0pO1xyXG4gIH0gZWxzZSBpZiAoY29uZmlnIGluc3RhbmNlb2YgQXJyYXlGaWVsZCkge1xyXG4gICAgcmV0dXJuIGNyZWF0ZUZvcm1BcnJheUNvbnRyb2woY29uZmlnLCBwYXJlbnRQYXRoLCByb290Rm9ybSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY3JlYXRlRm9ybUNvbnRyb2woY29uZmlnLCBwYXJlbnRQYXRoKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHBvc3RQcm9jZXNzKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCAmIGFueSwgY29uZmlnOiBBYnN0cmFjdEZpZWxkLCByb290Rm9ybTogRXh0ZW5kZWRGb3JtR3JvdXApOiB2b2lkIHtcclxuICBjb25zdCByZWxhdGVkRmllbGRzID0gY29uZmlnLnJlbGF0ZWRGaWVsZHM7XHJcblxyXG4gIGlmICghcmVsYXRlZEZpZWxkcykge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaW5pdFZhbHVlU3RyID0gY29uZmlnLmluaXRpYWxWYWx1ZSBpbnN0YW5jZW9mIE9iamVjdCA/IGNvbmZpZy5pbml0aWFsVmFsdWUudmFsdWUgOiBjb25maWcuaW5pdGlhbFZhbHVlO1xyXG5cclxuICBjb25zdCBkaWZmZXIgPSBuZXcgRGVmYXVsdEl0ZXJhYmxlRGlmZmVyPFJlbGF0ZWRGaWVsZEludGVyZmFjZT4odHJhY2tCeUl0ZW0pO1xyXG5cclxuICBvZihvZihpbml0VmFsdWVTdHIpLCBjb250cm9sLnZhbHVlQ2hhbmdlcykucGlwZShcclxuICAgIG1lcmdlQWxsKCksXHJcbiAgICBwYWlyd2lzZSgpLFxyXG4gICkuc3Vic2NyaWJlKChjb250cm9sVmFsdWVzOiBhbnlbXSkgPT4ge1xyXG4gICAgY29uc3QgbmV4dEZpZWxkc1N0YXRlID0gcmVsYXRlZEZpZWxkcy5maWx0ZXIodiA9PiBjb250cm9sSXNWaXNpYmxlKHYsIGNvbnRyb2xWYWx1ZXMsIGNvbnRyb2wpKTtcclxuICAgIGNvbnN0IGRpZmYgPSBkaWZmZXIuZGlmZihuZXh0RmllbGRzU3RhdGUpO1xyXG5cclxuICAgIGlmICghZGlmZikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZGlmZi5mb3JFYWNoUmVtb3ZlZEl0ZW0odiA9PiB7XHJcbiAgICAgIGxldCByZWxhdGVkRmllbGRDb25maWcgPSB2Lml0ZW0uY29uZmlncztcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgcmVsYXRlZEZpZWxkQ29uZmlnID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmVsYXRlZEZpZWxkQ29uZmlnID0gcmVsYXRlZEZpZWxkQ29uZmlnKGNvbnRyb2xWYWx1ZXNbMV0sIGNvbnRyb2xWYWx1ZXNbMF0sIGNvbnRyb2wpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZW1vdmVDb250cm9scyhyZWxhdGVkRmllbGRDb25maWcsIGNvbnRyb2wucGFyZW50KTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBkaWZmLmZvckVhY2hBZGRlZEl0ZW0odiA9PiB7XHJcbiAgICAgIGxldCByZWxhdGVkRmllbGRDb25maWcgPSB2Lml0ZW0uY29uZmlncztcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgcmVsYXRlZEZpZWxkQ29uZmlnID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmVsYXRlZEZpZWxkQ29uZmlnID0gcmVsYXRlZEZpZWxkQ29uZmlnKGNvbnRyb2xWYWx1ZXNbMF0sIGNvbnRyb2xWYWx1ZXNbMV0sIGNvbnRyb2wpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZWxhdGVkRmllbGRDb25maWcuZm9yRWFjaCgoY2hpbGRDb25maWc6IEFic3RyYWN0RmllbGQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKGlzTnVsbENvbmZpZyhjaGlsZENvbmZpZykpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoaWxkQ29uZmlnLmludGVybmFsT3JkZXIgPSBjaGlsZENvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnb3JkZXInKSA/IGNoaWxkQ29uZmlnLm9yZGVyIDogaW5kZXg7XHJcbiAgICAgICAgY29uc3QgY2hpbGRDb250cm9sID0gZGVib3VuY2VyKGNoaWxkQ29uZmlnLCBjb250cm9sLnBhcmVudC5wYXRoRnJvbVJvb3QsIHJvb3RGb3JtKTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRyb2wucGFyZW50Lmxhc3RQYXRjaGVkVmFsdWUgJiYgY29udHJvbC5wYXJlbnQubGFzdFBhdGNoZWRWYWx1ZVtjaGlsZENvbmZpZy5rZXldKSB7XHJcbiAgICAgICAgICBjaGlsZENvbnRyb2wucGF0Y2hWYWx1ZShcclxuICAgICAgICAgICAgY29udHJvbC5wYXJlbnQubGFzdFBhdGNoZWRWYWx1ZVtjaGlsZENvbmZpZy5rZXldLFxyXG4gICAgICAgICAgICB7IGVtaXRFdmVudDogZmFsc2UsIHVzZUFzRGVmYXVsdDogY29udHJvbC5wYXJlbnQuZGVmYXVsdFZhbHVlUGF0Y2hlZCB9XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkQ29udHJvbChjb250cm9sLnBhcmVudCwgY2hpbGRDb250cm9sLCBjaGlsZENvbmZpZywgcm9vdEZvcm0pO1xyXG4gICAgICAgIHBvc3RQcm9jZXNzKGNoaWxkQ29udHJvbCwgY2hpbGRDb25maWcsIHJvb3RGb3JtKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb250cm9sLnBhcmVudC51cGRhdGVDaGlsZHJlbkNvbnRyb2xzKCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiB0cmFja0J5SXRlbShpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpOiBzdHJpbmcge1xyXG4gIHJldHVybiBpdGVtO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gYWRkQ29udHJvbChcclxuICBwYXJlbnQ6IEV4dGVuZGVkRm9ybUdyb3VwIHwgRXh0ZW5kZWRGb3JtQXJyYXksXHJcbiAgY29udHJvbDogRXh0ZW5kZWRDb250cm9scyxcclxuICBjb25maWc6IEFic3RyYWN0RmllbGQsXHJcbiAgcm9vdEZvcm06IEV4dGVuZGVkRm9ybUdyb3VwXHJcbikge1xyXG4gIGNvbnRyb2wuZmllbGRDb25maWcgPSBjb25maWcgYXMgYW55O1xyXG4gIHBhcmVudC5hZGRDb250cm9sKGNvbmZpZy5rZXksIGNvbnRyb2wsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuXHJcbiAgaWYgKHJvb3RGb3JtLnN1cHBvc2VDb250cm9scy5oYXMoY29udHJvbC5wYXRoRnJvbVJvb3QpKSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICByb290Rm9ybS5zdXBwb3NlQ29udHJvbHMuZ2V0KGNvbnRyb2wucGF0aEZyb21Sb290KS5uZXh0KGNvbnRyb2wpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUNvbnRyb2xzKGNvbmZpZ3M6IEFycmF5PEFic3RyYWN0RmllbGRJbnRlcmZhY2U+LCBwYXJlbnQ6IEV4dGVuZGVkRm9ybUdyb3VwKTogdm9pZCB7XHJcbiAgY29uZmlncy5mb3JFYWNoKGNvbmZpZyA9PiB7XHJcbiAgICBpZiAocGFyZW50LmNvbnRhaW5zKGNvbmZpZy5rZXkpKSB7XHJcbiAgICAgIHBhcmVudC5yZW1vdmVDb250cm9sKGNvbmZpZy5rZXksIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuXHJcbiAgICAgIGlmIChjb25maWcucmVsYXRlZEZpZWxkcykge1xyXG4gICAgICAgIGNvbmZpZy5yZWxhdGVkRmllbGRzLmZvckVhY2goKGM6IGFueSkgPT4gcmVtb3ZlQ29udHJvbHMoYy5jb25maWdzLCBwYXJlbnQpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY29udHJvbElzVmlzaWJsZShjb25maWc6IFJlbGF0ZWRGaWVsZEludGVyZmFjZSwgY29udHJvbFZhbHVlczogYW55W10sIGNvbnRyb2w6IEV4dGVuZGVkQ29udHJvbHMpOiBib29sZWFuIHtcclxuICBjb25zdCBwcmV2Q29udHJvbFZhbHVlID0gY29udHJvbFZhbHVlc1swXTtcclxuICBjb25zdCBjb250cm9sVmFsdWUgPSBjb250cm9sVmFsdWVzWzFdO1xyXG5cclxuICBzd2l0Y2ggKHR5cGVvZiBjb25maWcuY2hlY2tWaXNpYmlsaXR5KSB7XHJcbiAgICBjYXNlICdmdW5jdGlvbic6IHtcclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICByZXR1cm4gY29uZmlnLmNoZWNrVmlzaWJpbGl0eShjb250cm9sVmFsdWUsIHByZXZDb250cm9sVmFsdWUsIGNvbnRyb2wpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZhbHNlXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBqb2luUGF0aChhOiBzdHJpbmcsIGI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgaWYgKGEgIT09ICcnKSB7XHJcbiAgICByZXR1cm4gYCR7YX0uJHtifWA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYjtcclxufVxyXG4iXX0=