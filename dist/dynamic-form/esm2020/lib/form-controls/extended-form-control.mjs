import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { CommonHelper, RandomHelper } from '../helpers';
export class ExtendedFormControl extends FormControl {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZWQtZm9ybS1jb250cm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZHluYW1pYy1mb3JtL3NyYy9saWIvZm9ybS1jb250cm9scy9leHRlbmRlZC1mb3JtLWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHeEQsTUFBTSxPQUFPLG1CQUFvQixTQUFRLFdBQVc7SUFBcEQ7O1FBQ2lCLE9BQUUsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBR2pDLGlCQUFZLEdBQVEsSUFBSSxDQUFDO1FBSXpCLFVBQUssR0FBOEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ2hFLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFDaEIsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQ2hELENBQUM7UUFFSyxnQkFBVyxHQUFtQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDM0UsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUNoQixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FDakQsQ0FBQztJQXlDSCxDQUFDO0lBdkNBLElBQVcsWUFBWTtRQUN0QixPQUFPLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsSUFBVyxlQUFlO1FBQ3pCLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxLQUFLLFVBQVUsRUFBRTtZQUM1RSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BFO1FBRUQsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFFTSxVQUFVLENBQUMsS0FBVSxFQUFFLFVBTTFCLEVBQUU7UUFDTCxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztTQUNoQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTSxpQkFBaUI7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7UUFDOUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBRU0sbUJBQW1CLENBQUMsVUFBdUQsRUFBRTtRQUNuRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLFdBQVcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFO1FBQ25ELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNsQixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQ29udHJvbEZpZWxkIH0gZnJvbSAnLi4vYmFzZS5maWVsZCc7XHJcbmltcG9ydCB7IENvbW1vbkhlbHBlciwgUmFuZG9tSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycyc7XHJcbmltcG9ydCB7IEVycm9yT2JqZWN0IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRGb3JtQ29udHJvbCBleHRlbmRzIEZvcm1Db250cm9sIHtcclxuXHRwdWJsaWMgcmVhZG9ubHkgaWQgPSBSYW5kb21IZWxwZXIuTnVtSWQ7XHJcblx0cHVibGljIHBhdGhGcm9tUm9vdCE6IHN0cmluZztcclxuXHRwdWJsaWMgZmllbGRDb25maWchOiBDb250cm9sRmllbGQ7XHJcblx0cHVibGljIGRlZmF1bHRWYWx1ZTogYW55ID0gbnVsbDtcclxuXHRwdWJsaWMgZGVmYXVsdFZhbHVlUGF0Y2hlZCE6IGJvb2xlYW47XHJcblx0cHVibGljIGh0bWxJbnN0YW5jZSE6IEhUTUxFbGVtZW50O1xyXG5cclxuXHRwdWJsaWMgZXJyb3I6IE9ic2VydmFibGU8c3RyaW5nIHwgbnVsbD4gPSB0aGlzLnN0YXR1c0NoYW5nZXMucGlwZShcclxuXHRcdHN0YXJ0V2l0aChmYWxzZSksXHJcblx0XHRtYXAoKCkgPT4gQ29tbW9uSGVscGVyLmluc3RhbnRFcnJvcih0aGlzLCB0cnVlKSlcclxuXHQpO1xyXG5cclxuXHRwdWJsaWMgZXJyb3JPYmplY3Q6IE9ic2VydmFibGU8RXJyb3JPYmplY3QgfCBudWxsPiA9IHRoaXMuc3RhdHVzQ2hhbmdlcy5waXBlKFxyXG5cdFx0c3RhcnRXaXRoKGZhbHNlKSxcclxuXHRcdG1hcCgoKSA9PiBDb21tb25IZWxwZXIuaW5zdGFudEVycm9yKHRoaXMsIGZhbHNlKSlcclxuXHQpO1xyXG5cclxuXHRwdWJsaWMgZ2V0IGNhblNob3dFcnJvcigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLmludmFsaWQgJiYgKHRoaXMudG91Y2hlZCB8fCB0aGlzLmRpcnR5KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgaXNDaGFuZ2VkQnlVc2VyKCk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHRoaXMuZmllbGRDb25maWcgJiYgdHlwZW9mIHRoaXMuZmllbGRDb25maWcuY2hlY2tDaGFuZ2VzID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmZpZWxkQ29uZmlnLmNoZWNrQ2hhbmdlcyh0aGlzLnZhbHVlLCB0aGlzLmRlZmF1bHRWYWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuICEodGhpcy5kZWZhdWx0VmFsdWUgPT09IHRoaXMudmFsdWUgfHwgKHRoaXMuZGVmYXVsdFZhbHVlID09PSBudWxsICYmIHRoaXMudmFsdWUgPT09ICcnKSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgcGF0Y2hWYWx1ZSh2YWx1ZTogYW55LCBvcHRpb25zOiB7XHJcblx0XHRvbmx5U2VsZj86IGJvb2xlYW4sXHJcblx0XHRlbWl0RXZlbnQ/OiBib29sZWFuLFxyXG5cdFx0ZW1pdE1vZGVsVG9WaWV3Q2hhbmdlPzogYm9vbGVhbixcclxuXHRcdGVtaXRWaWV3VG9Nb2RlbENoYW5nZT86IGJvb2xlYW4sXHJcblx0XHR1c2VBc0RlZmF1bHQ/OiBib29sZWFuXHJcblx0fSA9IHt9KTogdm9pZCB7XHJcblx0XHRpZiAob3B0aW9ucy51c2VBc0RlZmF1bHQpIHtcclxuXHRcdFx0dGhpcy5kZWZhdWx0VmFsdWUgPSB2YWx1ZTtcclxuXHRcdFx0dGhpcy5kZWZhdWx0VmFsdWVQYXRjaGVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlLCBvcHRpb25zKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZXNldERlZmF1bHRWYWx1ZSgpOiB2b2lkIHtcclxuXHRcdHRoaXMuZGVmYXVsdFZhbHVlID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5kZWZhdWx0VmFsdWVQYXRjaGVkID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgcmVzZXRUb0RlZmF1bHRWYWx1ZShvcHRpb25zOiB7IG9ubHlTZWxmPzogYm9vbGVhbiwgZW1pdEV2ZW50PzogYm9vbGVhbiB9ID0ge30pOiB2b2lkIHtcclxuXHRcdHRoaXMucGF0Y2hWYWx1ZSh0aGlzLmRlZmF1bHRWYWx1ZSwgb3B0aW9ucyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0UmF3VmFsdWUocGFyYW1zID0geyBpZ25vcmVkRmllbGRzOiBmYWxzZSB9KTogYW55IHtcclxuXHRcdHJldHVybiB0aGlzLnZhbHVlXHJcblx0fVxyXG59XHJcbiJdfQ==