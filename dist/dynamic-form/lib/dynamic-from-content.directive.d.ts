import { ComponentFactoryResolver, OnChanges, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { BaseFieldComponent } from './base.component';
import * as i0 from "@angular/core";
export declare class DynamicFormContentDirective implements OnChanges {
    private readonly viewContainer;
    private readonly componentFactoryResolver;
    private readonly renderer2;
    private readonly templateRef;
    private context;
    private thenTemplateRef;
    private thenViewRef;
    private customViewRef;
    constructor(viewContainer: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver, renderer2: Renderer2, templateRef: TemplateRef<DfContentContext>);
    ngOnChanges(changes: SimpleChanges): void;
    set dynamicFormContent(condition: BaseFieldComponent);
    set dynamicFormContentThen(templateRef: TemplateRef<DfContentContext> | null);
    private clearViewExclude;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicFormContentDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DynamicFormContentDirective, "[dynamicFormContent]", never, { "dynamicFormContent": "dynamicFormContent"; "dynamicFormContentThen": "dynamicFormContentThen"; }, {}, never>;
}
export declare function assertTemplate(property: string, templateRef: TemplateRef<any> | null): void;
export declare class DfContentContext {
    $implicit: BaseFieldComponent;
}
