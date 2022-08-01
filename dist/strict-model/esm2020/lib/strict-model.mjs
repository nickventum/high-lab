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
export function StrictProperty(type, subType, defaultValue, jsonKey) {
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
export class StrictModel {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaWN0LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RyaWN0LW1vZGVsL3NyYy9saWIvc3RyaWN0LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLG1CQUFtQixDQUFDO0FBQ3hDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXBFLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUt6QyxTQUFTLGtCQUFrQixDQUFDLEtBQVUsRUFBRSxVQUFtQixFQUFFLElBQVMsRUFBRSxTQUF5QjtJQUNoRyxJQUFJLFNBQVMsRUFBRTtRQUNkLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QixPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3RjthQUFNO1lBQ04sT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN4QztLQUNEO0lBRUQsUUFBUSxJQUFJLEVBQUU7UUFDYixLQUFLLE9BQU8sQ0FBQyxDQUFDO1lBQ2IsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNLElBQUksS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUMvRTtRQUNELEtBQUssTUFBTSxDQUFDLENBQUM7WUFDWixPQUFPLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMs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Q0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDdEM7cUJBQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7b0JBQ3pDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDekQ7cUJBQU07b0JBQ04sR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDN0I7YUFDRDtZQUVELE9BQU8sR0FBRyxDQUFDO1FBQ1osQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ1osQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzRXF1YWwgZnJvbSAnbG9kYXNoLWVzL2lzRXF1YWwnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5jb25zdCBVU0VfREVGQVVMVCA9IFN5bWJvbCgndXNlRGVmYXVsdCcpO1xyXG5cclxudHlwZSBBbnlDbGFzcyA9IG5ldyAoLi4uYXJnczogYW55W10pID0+IGFueTtcclxudHlwZSBBbnlBcnJheUNsYXNzID0gbmV3ICguLi5hcmdzOiBhbnlbXSkgPT4gQXJyYXk8YW55PjtcclxuXHJcbmZ1bmN0aW9uIGNvbnZlcnRWYWx1ZVRvVHlwZSh2YWx1ZTogYW55LCB1c2VEZWZhdWx0OiBib29sZWFuLCB0eXBlOiBhbnksIGFycmF5TGlrZT86IEFueUFycmF5Q2xhc3MpOiBib29sZWFuIHwgc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSB7XHJcblx0aWYgKGFycmF5TGlrZSkge1xyXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcblx0XHRcdHJldHVybiBSZWZsZWN0LmNvbnN0cnVjdChhcnJheUxpa2UsIHZhbHVlLm1hcCh2ID0+IGNvbnZlcnRWYWx1ZVRvVHlwZSh2LCB1c2VEZWZhdWx0LCB0eXBlKSkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIFJlZmxlY3QuY29uc3RydWN0KGFycmF5TGlrZSwgW10pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRjYXNlIEJvb2xlYW46IHtcclxuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnMScgOiAhIXZhbHVlO1xyXG5cdFx0fVxyXG5cdFx0Y2FzZSBOdW1iZXI6IHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlID09PSBudWxsID8gMCA6IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBwYXJzZUZsb2F0KHZhbHVlKSA6IHZhbHVlO1xyXG5cdFx0fVxyXG5cdFx0Y2FzZSBTdHJpbmc6IHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlID8gYCR7dmFsdWV9YCA6ICcnO1xyXG5cdFx0fVxyXG5cdFx0Y2FzZSBEYXRlOiB7XHJcblx0XHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgPyB2YWx1ZSA6IHZhbHVlID8gbmV3IERhdGUodmFsdWUpIDogdmFsdWU7XHJcblx0XHR9XHJcblx0XHRjYXNlIE9iamVjdDoge1xyXG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHJldHVybiB1c2VEZWZhdWx0ID8gT2JqZWN0LmFzc2lnbih7fSwgdmFsdWUpIDogdmFsdWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB7fSBhcyBhbnk7XHJcblx0XHR9XHJcblx0XHRkZWZhdWx0OiB7XHJcblx0XHRcdGlmICh0eXBlLnByb3RvdHlwZSkge1xyXG5cdFx0XHRcdHJldHVybiBSZWZsZWN0LmNvbnN0cnVjdCh0eXBlLCBbdmFsdWVdKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBTdHJpY3RQcm9wZXJ0eSh0eXBlOiBBbnlDbGFzcywgZGVmYXVsdFZhbHVlPzogYW55LCBqc29uS2V5Pzogc3RyaW5nKTogUHJvcGVydHlEZWNvcmF0b3I7XHJcbmV4cG9ydCBmdW5jdGlvbiBTdHJpY3RQcm9wZXJ0eSh0eXBlOiBBbnlBcnJheUNsYXNzLCBzdWJUeXBlOiBBbnlDbGFzcywgZGVmYXVsdFZhbHVlPzogYW55LCBqc29uS2V5Pzogc3RyaW5nKTogUHJvcGVydHlEZWNvcmF0b3I7XHJcbmV4cG9ydCBmdW5jdGlvbiBTdHJpY3RQcm9wZXJ0eSh0eXBlOiBBbnlDbGFzcyB8IEFueUFycmF5Q2xhc3MsIHN1YlR5cGU/OiBhbnksIGRlZmF1bHRWYWx1ZT86IGFueSwganNvbktleT86IHN0cmluZyk6IFByb3BlcnR5RGVjb3JhdG9yIHtcclxuXHRjb25zdCBpc0FycmF5TGlrZSA9IHN1YlR5cGUgaW5zdGFuY2VvZiBGdW5jdGlvbjtcclxuXHJcblx0aWYgKHN1YlR5cGUgIT09IHVuZGVmaW5lZCAmJiAhaXNBcnJheUxpa2UpIHtcclxuXHRcdGpzb25LZXkgPSBkZWZhdWx0VmFsdWU7XHJcblx0XHRkZWZhdWx0VmFsdWUgPSBzdWJUeXBlO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuICh0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZykgPT4ge1xyXG5cdFx0Y29uc3Qgc2VjcmV0ID0gU3ltYm9sKHByb3BlcnR5S2V5KTtcclxuXHJcblx0XHRpZiAoIXRhcmdldC5fX3Byb3BlcnRpZXMpIHtcclxuXHRcdFx0dGFyZ2V0Ll9fcHJvcGVydGllcyA9IHt9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGFyZ2V0Ll9fanNvbktleXMpIHtcclxuXHRcdFx0dGFyZ2V0Ll9fanNvbktleXMgPSB7fTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRhcmdldC5fX3Byb3BlcnR5S2V5cykge1xyXG5cdFx0XHR0YXJnZXQuX19wcm9wZXJ0eUtleXMgPSB7fTtcclxuXHRcdH1cclxuXHJcblx0XHR0YXJnZXQuX19wcm9wZXJ0aWVzW3Byb3BlcnR5S2V5XSA9IDE7XHJcblxyXG5cdFx0aWYgKGpzb25LZXkpIHtcclxuXHRcdFx0dGFyZ2V0Ll9fanNvbktleXNbanNvbktleV0gPSBwcm9wZXJ0eUtleTtcclxuXHRcdFx0dGFyZ2V0Ll9fcHJvcGVydHlLZXlzW3Byb3BlcnR5S2V5XSA9IGpzb25LZXk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5LCB7XHJcblx0XHRcdGdldCgpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpc1tzZWNyZXRdO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZXQodmFsdWU6IGFueSkge1xyXG5cdFx0XHRcdGNvbnN0IHVzZURlZmF1bHQgPSB2YWx1ZSA9PT0gVVNFX0RFRkFVTFQ7XHJcblxyXG5cdFx0XHRcdGlmICh1c2VEZWZhdWx0KSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGNvbnN0IG5vcm1hbGl6ZWRWYWx1ZTogYW55ID0gaXNBcnJheUxpa2UgP1xyXG5cdFx0XHRcdFx0Y29udmVydFZhbHVlVG9UeXBlKHZhbHVlLCB1c2VEZWZhdWx0LCBzdWJUeXBlLCB0eXBlKSA6XHJcblx0XHRcdFx0XHRjb252ZXJ0VmFsdWVUb1R5cGUodmFsdWUsIHVzZURlZmF1bHQsIHR5cGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRub3JtYWxpemVkVmFsdWUgIT09IG51bGwgJiZcclxuXHRcdFx0XHRcdHR5cGVvZiBub3JtYWxpemVkVmFsdWUgPT09ICdvYmplY3QnICYmXHJcblx0XHRcdFx0XHRSZWZsZWN0Lmhhcyhub3JtYWxpemVkVmFsdWUsICdwYXJlbnQnKSAmJlxyXG5cdFx0XHRcdFx0IW5vcm1hbGl6ZWRWYWx1ZS5wYXJlbnRcclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdG5vcm1hbGl6ZWRWYWx1ZS5wYXJlbnQgPSB0aGlzO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpc1tzZWNyZXRdID0gbm9ybWFsaXplZFZhbHVlO1xyXG5cclxuXHRcdFx0XHR0aGlzLm5leHRDaGFuZ2UoeyBrZXk6IHByb3BlcnR5S2V5LCB2YWx1ZTogdGhpc1tzZWNyZXRdIH0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTdHJpY3RNb2RlbCB7XHJcblx0cHJvdGVjdGVkIGNoYW5nZVN1YjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcclxuXHRwcm90ZWN0ZWQgcGFyZW50OiBTdHJpY3RNb2RlbCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucz86IGFueSxcclxuXHRcdFx0XHRtYWtlU25hcHNob3Q6IGJvb2xlYW4gPSB0cnVlLFxyXG5cdCkge1xyXG5cdFx0Ly8gQHRzLWlnbm9yZVxyXG5cdFx0Y29uc3QgcHJvcGVydHlLZXlzID0gdGhpcy5fX3Byb3BlcnR5S2V5cztcclxuXHRcdC8vIEB0cy1pZ25vcmVcclxuXHRcdE9iamVjdC5rZXlzKHRoaXMuX19wcm9wZXJ0aWVzIHx8IHt9KS5mb3JFYWNoKGtleSA9PiB7XHJcblx0XHRcdGNvbnN0IHByb3BlcnR5S2V5ID0gcHJvcGVydHlLZXlzW2tleV0gfHwga2V5O1xyXG5cclxuXHRcdFx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eUtleSkpIHtcclxuXHRcdFx0XHR0aGlzW2tleV0gPSBvcHRpb25zW3Byb3BlcnR5S2V5XTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzW2tleV0gPSBVU0VfREVGQVVMVDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKG1ha2VTbmFwc2hvdCkge1xyXG5cdFx0XHQvLyBAdHMtaWdub3JlXHJcblx0XHRcdHRoaXMuX19kZWZhdWx0U25hcHNob3QgPSB0aGlzLmdldE5ld0luc3RhbmNlKGZhbHNlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUocGFyYW1zOiBhbnkpOiB2b2lkIHtcclxuXHRcdE9iamVjdC5hc3NpZ24odGhpcywgcGFyYW1zKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuXHRcdC8vIEB0cy1pZ25vcmVcclxuXHRcdHRoaXMudXBkYXRlKHRoaXMuX19kZWZhdWx0U25hcHNob3QudG9KU09OKCkpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGlzRGVmYXVsdCgpOiBib29sZWFuIHtcclxuXHRcdC8vIEB0cy1pZ25vcmVcclxuXHRcdHJldHVybiAhT2JqZWN0LmtleXModGhpcy5fX3Byb3BlcnRpZXMgfHwge30pLnNvbWUoa2V5ID0+IHtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSB0aGlzW2tleV07XHJcblxyXG5cdFx0XHRpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlLmlzRGVmYXVsdCA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHJldHVybiAhdmFsdWUuaXNEZWZhdWx0KCk7XHJcblx0XHRcdH0gZWxzZSBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcclxuXHRcdFx0XHRyZXR1cm4gIWlzRXF1YWwodmFsdWUsIHRoaXMuX19kZWZhdWx0U25hcHNob3Rba2V5XSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxyXG5cdFx0XHRyZXR1cm4gdmFsdWUgIT09IHRoaXMuX19kZWZhdWx0U25hcHNob3Rba2V5XTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHRvSlNPTigpOiBhbnkge1xyXG5cdFx0Ly8gQHRzLWlnbm9yZVxyXG5cdFx0cmV0dXJuIHRoaXMuYXNzaWduUHJvcGVydGllcyh7fSwgdGhpcy5fX3Byb3BlcnRpZXMpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuXHRcdGlmICh0aGlzLnBhcmVudCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJlbnQuY2hhbmdlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLmNoYW5nZVN1Yi5hc09ic2VydmFibGUoKS5waXBlKFxyXG5cdFx0XHRkZWJvdW5jZVRpbWUoNTApLFxyXG5cdFx0XHRkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXHJcblx0XHQpO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIG5leHRDaGFuZ2UodmFsdWU6IGFueSk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMucGFyZW50KSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnBhcmVudC5uZXh0Q2hhbmdlKHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5jaGFuZ2VTdWIubmV4dCh2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0TmV3SW5zdGFuY2UobWFrZVNuYXBzaG90OiBib29sZWFuKTogYW55IHtcclxuXHRcdHJldHVybiBSZWZsZWN0LmNvbnN0cnVjdCh0aGlzLmNvbnN0cnVjdG9yLCBbe30sIG1ha2VTbmFwc2hvdF0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGFzc2lnblByb3BlcnRpZXModGFyZ2V0LCBzb3VyY2UpOiBhbnkge1xyXG5cdFx0Ly8gQHRzLWlnbm9yZVxyXG5cdFx0Y29uc3QgcHJvcGVydHlLZXlzID0gdGhpcy5fX3Byb3BlcnR5S2V5cztcclxuXHJcblx0XHRyZXR1cm4gWy4uLk9iamVjdC5rZXlzKHNvdXJjZSldLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcclxuXHRcdFx0Y29uc3Qgb3JpZ2luYWxLZXkgPSBwcm9wZXJ0eUtleXNba2V5XSB8fCBrZXk7XHJcblxyXG5cdFx0XHRpZiAoa2V5ICE9PSAnX19wcm9wZXJ0aWVzJyAmJiBrZXkgIT09ICdfX2pzb25LZXlzJykge1xyXG5cdFx0XHRcdGlmICh0aGlzW2tleV0gJiYgdGhpc1trZXldLnRvSlNPTikge1xyXG5cdFx0XHRcdFx0YWNjW29yaWdpbmFsS2V5XSA9IHRoaXNba2V5XS50b0pTT04oKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0XHRhY2Nbb3JpZ2luYWxLZXldID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzW2tleV0pKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YWNjW29yaWdpbmFsS2V5XSA9IHRoaXNba2V5XTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBhY2M7XHJcblx0XHR9LCB0YXJnZXQpO1xyXG5cdH1cclxufVxyXG4iXX0=