import isEqual from 'lodash-es/isEqual';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const USE_DEFAULT = Symbol('useDefault');
function convertValueToType(value, useDefault, type, arrayLike) {
    if (arrayLike) {
        if (Array.isArray(value)) {
            return Reflect.construct(arrayLike, value.map(v => convertValueToType(v, useDefault, type)));
        }
        else {
            return Reflect.construct(arrayLike, []);
        }
    }
    switch (type) {
        case Boolean: {
            return typeof value === 'string' ? value === 'true' || value === '1' : !!value;
        }
        case Number: {
            return value === null ? 0 : typeof value === 'string' ? parseFloat(value) : value;
        }
        case String: {
            return value ? `${value}` : '';
        }
        case Date: {
            return value instanceof Date ? value : value ? new Date(value) : value;
        }
        case Object: {
            if (typeof value === 'object') {
                return useDefault ? Object.assign({}, value) : value;
            }
            return {};
        }
        default: {
            if (type.prototype) {
                return Reflect.construct(type, [value]);
            }
            else {
                return value;
            }
        }
    }
}
function StrictProperty(type, subType, defaultValue, jsonKey) {
    const isArrayLike = subType instanceof Function;
    if (subType !== undefined && !isArrayLike) {
        jsonKey = defaultValue;
        defaultValue = subType;
    }
    return (target, propertyKey) => {
        const secret = Symbol(propertyKey);
        if (!target.__properties) {
            target.__properties = {};
        }
        if (!target.__jsonKeys) {
            target.__jsonKeys = {};
        }
        if (!target.__propertyKeys) {
            target.__propertyKeys = {};
        }
        target.__properties[propertyKey] = 1;
        if (jsonKey) {
            target.__jsonKeys[jsonKey] = propertyKey;
            target.__propertyKeys[propertyKey] = jsonKey;
        }
        Object.defineProperty(target, propertyKey, {
            get() {
                return this[secret];
            },
            set(value) {
                const useDefault = value === USE_DEFAULT;
                if (useDefault) {
                    value = defaultValue;
                }
                const normalizedValue = isArrayLike ?
                    convertValueToType(value, useDefault, subType, type) :
                    convertValueToType(value, useDefault, type);
                if (normalizedValue !== null &&
                    typeof normalizedValue === 'object' &&
                    Reflect.has(normalizedValue, 'parent') &&
                    !normalizedValue.parent) {
                    normalizedValue.parent = this;
                }
                this[secret] = normalizedValue;
                this.nextChange({ key: propertyKey, value: this[secret] });
            },
        });
    };
}
class StrictModel {
    constructor(options, makeSnapshot = true) {
        this.changeSub = new Subject();
        this.parent = undefined;
        // @ts-ignore
        const propertyKeys = this.__propertyKeys;
        // @ts-ignore
        Object.keys(this.__properties || {}).forEach(key => {
            const propertyKey = propertyKeys[key] || key;
            if (options && options.hasOwnProperty(propertyKey)) {
                this[key] = options[propertyKey];
            }
            else {
                this[key] = USE_DEFAULT;
            }
        });
        if (makeSnapshot) {
            // @ts-ignore
            this.__defaultSnapshot = this.getNewInstance(false);
        }
    }
    update(params) {
        Object.assign(this, params);
    }
    reset() {
        // @ts-ignore
        this.update(this.__defaultSnapshot.toJSON());
    }
    isDefault() {
        // @ts-ignore
        return !Object.keys(this.__properties || {}).some(key => {
            const value = this[key];
            if (value && typeof value.isDefault === 'function') {
                return !value.isDefault();
            }
            else if (value && typeof value === 'object') {
                // @ts-ignore
                return !isEqual(value, this.__defaultSnapshot[key]);
            }
            // @ts-ignore
            return value !== this.__defaultSnapshot[key];
        });
    }
    toJSON() {
        // @ts-ignore
        return this.assignProperties({}, this.__properties);
    }
    get change() {
        if (this.parent) {
            return this.parent.change;
        }
        return this.changeSub.asObservable().pipe(debounceTime(50), distinctUntilChanged());
    }
    nextChange(value) {
        if (this.parent) {
            return this.parent.nextChange(value);
        }
        return this.changeSub.next(value);
    }
    getNewInstance(makeSnapshot) {
        return Reflect.construct(this.constructor, [{}, makeSnapshot]);
    }
    assignProperties(target, source) {
        // @ts-ignore
        const propertyKeys = this.__propertyKeys;
        return [...Object.keys(source)].reduce((acc, key) => {
            const originalKey = propertyKeys[key] || key;
            if (key !== '__properties' && key !== '__jsonKeys') {
                if (this[key] && this[key].toJSON) {
                    acc[originalKey] = this[key].toJSON();
                }
                else if (typeof this[key] === 'object') {
                    acc[originalKey] = JSON.parse(JSON.stringify(this[key]));
                }
                else {
                    acc[originalKey] = this[key];
                }
            }
            return acc;
        }, target);
    }
}

/*
 * Public API Surface of strict-model
 */

/**
 * Generated bundle index. Do not edit.
 */

export { StrictModel, StrictProperty };
//# sourceMappingURL=high-lab-strict-model.mjs.map
