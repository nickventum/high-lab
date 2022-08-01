import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFieldComponent, EditableFieldDirective } from './base.component';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormContentDirective } from './dynamic-from-content.directive';
import { DYNAMIC_FORM_CONFIG, DYNAMIC_FORM_CONFIG_MAP, DYNAMIC_FORM_VALIDATION_MESSAGES } from './injectors';
import * as i0 from "@angular/core";
export class DynamicFormModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2R5bmFtaWMtZm9ybS9zcmMvbGliL2R5bmFtaWMtZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFXN0csTUFBTSxPQUFPLGlCQUFpQjtJQUVyQixNQUFNLENBQUMsTUFBTSxDQUNsQixpQkFBb0MsRUFDcEMsa0JBQXlDO1FBRXpDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxHQUFHLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVGLE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUU7Z0JBQzdELEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRTtnQkFDcEUsRUFBRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixJQUFJLEVBQUUsRUFBRTthQUNsRjtTQUNGLENBQUM7SUFDSixDQUFDOzsrR0FmVSxpQkFBaUI7Z0hBQWpCLGlCQUFpQixpQkFQYixvQkFBb0IsRUFBRSxxQkFBcUIsRUFBRSxrQkFBa0IsRUFBRSwyQkFBMkIsRUFBRSxzQkFBc0IsYUFFakksWUFBWTtRQUNaLG1CQUFtQixhQUVYLG9CQUFvQixFQUFFLGtCQUFrQixFQUFFLHFCQUFxQixFQUFFLDJCQUEyQixFQUFFLHNCQUFzQjtnSEFFbkgsaUJBQWlCLFlBTm5CO1lBQ1AsWUFBWTtZQUNaLG1CQUFtQjtTQUNwQjs0RkFHVSxpQkFBaUI7a0JBUjdCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsa0JBQWtCLEVBQUUsMkJBQTJCLEVBQUUsc0JBQXNCLENBQUM7b0JBQ3BJLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUUsMkJBQTJCLEVBQUUsc0JBQXNCLENBQUM7aUJBQ2hJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQmFzZUZpZWxkQ29tcG9uZW50LCBFZGl0YWJsZUZpZWxkRGlyZWN0aXZlIH0gZnJvbSAnLi9iYXNlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IER5bmFtaWNGaWVsZERpcmVjdGl2ZSB9IGZyb20gJy4vZHluYW1pYy1maWVsZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEeW5hbWljRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vZHluYW1pYy1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IER5bmFtaWNGb3JtQ29uZmlnLCBWYWxpZGF0aW9uTWVzc2FnZXNGbiB9IGZyb20gJy4vZHluYW1pYy1mb3JtLmNvbmZpZyc7XHJcbmltcG9ydCB7IER5bmFtaWNGb3JtQ29udGVudERpcmVjdGl2ZSB9IGZyb20gJy4vZHluYW1pYy1mcm9tLWNvbnRlbnQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRFlOQU1JQ19GT1JNX0NPTkZJRywgRFlOQU1JQ19GT1JNX0NPTkZJR19NQVAsIERZTkFNSUNfRk9STV9WQUxJREFUSU9OX01FU1NBR0VTIH0gZnJvbSAnLi9pbmplY3RvcnMnO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbRHluYW1pY0Zvcm1Db21wb25lbnQsIER5bmFtaWNGaWVsZERpcmVjdGl2ZSwgQmFzZUZpZWxkQ29tcG9uZW50LCBEeW5hbWljRm9ybUNvbnRlbnREaXJlY3RpdmUsIEVkaXRhYmxlRmllbGREaXJlY3RpdmVdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbRHluYW1pY0Zvcm1Db21wb25lbnQsIEJhc2VGaWVsZENvbXBvbmVudCwgRHluYW1pY0ZpZWxkRGlyZWN0aXZlLCBEeW5hbWljRm9ybUNvbnRlbnREaXJlY3RpdmUsIEVkaXRhYmxlRmllbGREaXJlY3RpdmVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybU1vZHVsZSB7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgY29uZmlnKFxyXG4gICAgZHluYW1pY0Zvcm1Db25maWc6IER5bmFtaWNGb3JtQ29uZmlnLFxyXG4gICAgdmFsaWRhdGlvbk1lc3NhZ2VzPzogVmFsaWRhdGlvbk1lc3NhZ2VzRm5cclxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPER5bmFtaWNGb3JtTW9kdWxlPiB7XHJcbiAgICBjb25zdCBkeW5hbWljRm9ybUNvbmZpZ01hcCA9IG5ldyBNYXAoZHluYW1pY0Zvcm1Db25maWcubWFwKHYgPT4gKFt2LmNvbmZpZywgdi5jb21wb25lbnRdKSkpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IER5bmFtaWNGb3JtTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7IHByb3ZpZGU6IERZTkFNSUNfRk9STV9DT05GSUcsIHVzZVZhbHVlOiBkeW5hbWljRm9ybUNvbmZpZyB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogRFlOQU1JQ19GT1JNX0NPTkZJR19NQVAsIHVzZVZhbHVlOiBkeW5hbWljRm9ybUNvbmZpZ01hcCB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogRFlOQU1JQ19GT1JNX1ZBTElEQVRJT05fTUVTU0FHRVMsIHVzZVZhbHVlOiB2YWxpZGF0aW9uTWVzc2FnZXMgfHwge30gfSxcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19