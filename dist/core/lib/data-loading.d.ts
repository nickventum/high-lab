import { Observable } from 'rxjs';
export interface ApiPagination {
    page?: number;
    firstPage?: boolean;
    lastPage?: boolean;
    pageSize?: number;
    totalElements?: number;
    totalPages?: number;
    sort?: string;
}
export interface Pagination<T = any> {
    data: T[];
    pagination: ApiPagination;
}
export interface FailureConfig {
    properties: {
        [key: string]: any;
    };
    title?: string;
    second?: boolean;
}
export declare class LoadingProgress<T> {
    isLoaded: boolean;
    isSuccess: boolean;
    isFailure: boolean;
    failureConfig?: FailureConfig;
    static fromData<T>(value: T): LoadingProgress<T>;
    get isLoading(): boolean;
    data: T extends Pagination ? T['data'] : T;
    pagination: ApiPagination | null;
    isEmptyData: boolean | null;
    constructor(isLoaded?: boolean, isSuccess?: boolean, isFailure?: boolean, data?: T, failureConfig?: FailureConfig);
    clone<N>(params?: {
        isLoaded?: boolean;
        isSuccess?: boolean;
        isFailure?: boolean;
        data: N;
        failureConfig?: FailureConfig;
    }): LoadingProgress<N>;
    private hasPagination;
}
export declare const dataLoading: <T>(callback: (loadingProgress: LoadingProgress<T>) => void, failureConfig?: FailureConfig) => (source: Observable<T>) => Observable<T>;
