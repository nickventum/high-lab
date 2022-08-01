import { Observable, Subject } from 'rxjs';
declare type AnyClass = new (...args: any[]) => any;
declare type AnyArrayClass = new (...args: any[]) => Array<any>;
export declare function StrictProperty(type: AnyClass, defaultValue?: any, jsonKey?: string): PropertyDecorator;
export declare function StrictProperty(type: AnyArrayClass, subType: AnyClass, defaultValue?: any, jsonKey?: string): PropertyDecorator;
export declare class StrictModel {
    protected changeSub: Subject<any>;
    protected parent: StrictModel | undefined;
    constructor(options?: any, makeSnapshot?: boolean);
    update(params: any): void;
    reset(): void;
    isDefault(): boolean;
    toJSON(): any;
    get change(): Observable<any>;
    protected nextChange(value: any): void;
    protected getNewInstance(makeSnapshot: boolean): any;
    protected assignProperties(target: any, source: any): any;
}
export {};
