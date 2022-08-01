import { StrictModel } from '@high-lab/strict-model';
import { DataTableQueryParams, DataTableQueryParamsMapping } from './interfaces';
export declare class DynamicTableQueryParamsModel extends StrictModel {
    mapping: DataTableQueryParamsMapping;
    defaultValues: DataTableQueryParams;
    page: number;
    pageSize: number;
    sort: string;
    constructor(options: any, mapping: DataTableQueryParamsMapping, defaultValues: DataTableQueryParams);
    toString(questionMark?: boolean): string;
    toJSON(): Partial<DynamicTableQueryParamsModel>;
}
