import { ExtendedFormControl } from '../../form-controls';
export class CommonHelper {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2R5bmFtaWMtZm9ybS9zcmMvbGliL2hlbHBlcnMvY29tbW9uL2NvbW1vbi5oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QyxtQkFBbUIsRUFBcUIsTUFBTSxxQkFBcUIsQ0FBQztBQUdsSCxNQUFNLE9BQU8sWUFBWTtJQUdoQixNQUFNLENBQUMsWUFBWSxDQUFDLE9BQXlCLEVBQUUsV0FBb0IsSUFBSTtRQUM1RSxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUU5QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFO1lBQ3hCLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDOUIsUUFBUSxHQUFHLEdBQUcsQ0FBQztnQkFDZixNQUFNO2FBQ1A7U0FDRjtRQUVELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvRyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBeUIsQ0FBQztRQUMvQyxNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsSUFBSSxJQUFJLENBQUMseUJBQXlCLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDeEcsTUFBTSxLQUFLLEdBQUcsV0FBVyxJQUFJLHFCQUFxQixJQUFJLFFBQVEsQ0FBQztRQUUvRCxJQUFJLFdBQVcsR0FBRyxLQUFlLENBQUM7UUFFbEMsSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDL0IsV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUN2QztRQUVELElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQTtTQUN6RTtRQUVELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFTSxNQUFNLENBQUMsc0JBQXNCLENBQUMsT0FBOEM7UUFDakYsS0FBSyxNQUFNLElBQUksSUFBSSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pCLFNBQVM7YUFDVjtZQUVELElBQUksSUFBSSxZQUFZLG1CQUFtQixFQUFFO2dCQUN2QyxPQUFPLElBQUksQ0FBQzthQUNiO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFDO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV4dGVuZGVkQ29udHJvbHMsIEV4dGVuZGVkRm9ybUFycmF5LCBFeHRlbmRlZEZvcm1Db250cm9sLCBFeHRlbmRlZEZvcm1Hcm91cCB9IGZyb20gJy4uLy4uL2Zvcm0tY29udHJvbHMnO1xyXG5pbXBvcnQgeyBFcnJvck9iamVjdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbW1vbkhlbHBlciB7XHJcbiAgcHVibGljIHN0YXRpYyBpbnN0YW50RXJyb3IoY29udHJvbDogRXh0ZW5kZWRDb250cm9scywgYXNTdHJpbmc6IGZhbHNlKTogRXJyb3JPYmplY3QgfCBudWxsO1xyXG4gIHB1YmxpYyBzdGF0aWMgaW5zdGFudEVycm9yKGNvbnRyb2w6IEV4dGVuZGVkQ29udHJvbHMsIGFzU3RyaW5nOiB0cnVlKTogc3RyaW5nIHwgbnVsbFxyXG4gIHB1YmxpYyBzdGF0aWMgaW5zdGFudEVycm9yKGNvbnRyb2w6IEV4dGVuZGVkQ29udHJvbHMsIGFzU3RyaW5nOiBib29sZWFuID0gdHJ1ZSk6IHN0cmluZyB8IG51bGwgfCBFcnJvck9iamVjdCB7XHJcbiAgICBsZXQgZmlyc3RLZXkgPSAnJztcclxuICAgIGNvbnN0IGVycm9ycyA9IGNvbnRyb2wuZXJyb3JzO1xyXG5cclxuICAgIGlmICghZXJyb3JzKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIGVycm9ycykge1xyXG4gICAgICBpZiAoZXJyb3JzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBmaXJzdEtleSA9IGtleTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGN1c3RvbUVycm9yID0gY29udHJvbC5maWVsZENvbmZpZy52YWxpZGF0aW9uTWVzc2FnZXMgJiYgY29udHJvbC5maWVsZENvbmZpZy52YWxpZGF0aW9uTWVzc2FnZXNbZmlyc3RLZXldO1xyXG4gICAgY29uc3Qgcm9vdCA9IGNvbnRyb2wucm9vdCBhcyBFeHRlbmRlZEZvcm1Hcm91cDtcclxuICAgIGNvbnN0IHJvb3RWYWxpZGF0aW9uTWVzc2FnZSA9IHJvb3QuZGVmYXVsdFZhbGlkYXRpb25NZXNzYWdlcyAmJiByb290LmRlZmF1bHRWYWxpZGF0aW9uTWVzc2FnZXNbZmlyc3RLZXldXHJcbiAgICBjb25zdCBlcnJvciA9IGN1c3RvbUVycm9yIHx8IHJvb3RWYWxpZGF0aW9uTWVzc2FnZSB8fCBmaXJzdEtleTtcclxuXHJcbiAgICBsZXQgZXJyb3JTdHJpbmcgPSBlcnJvciBhcyBzdHJpbmc7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBlcnJvclN0cmluZyA9IGVycm9yKGVycm9yc1tmaXJzdEtleV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghYXNTdHJpbmcpIHtcclxuICAgICAgcmV0dXJuIHsga2V5OiBmaXJzdEtleSwgbWVzc2FnZTogZXJyb3JTdHJpbmcsIHBhcmFtczogZXJyb3JzW2ZpcnN0S2V5XSB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGVycm9yU3RyaW5nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRGaXJzdEludmFsaWRDb250cm9sKGNvbnRyb2w6IEV4dGVuZGVkRm9ybUdyb3VwIHwgRXh0ZW5kZWRGb3JtQXJyYXkpOiBFeHRlbmRlZEZvcm1Db250cm9sIHwgbnVsbCB7XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY29udHJvbC5jaGlsZHJlbkNvbnRyb2xzKSB7XHJcbiAgICAgIGlmICghaXRlbS5pbnZhbGlkKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgRXh0ZW5kZWRGb3JtQ29udHJvbCkge1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEZpcnN0SW52YWxpZENvbnRyb2woaXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuIl19