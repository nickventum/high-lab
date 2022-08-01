export declare class PaginationStateHelper {
    range: number;
    page: number;
    pageCount: number;
    pageArray: Array<{
        isNumber: boolean;
        value: number;
    }>;
    constructor(range: number);
    get isFirstPage(): boolean;
    get isLastPage(): boolean;
    setPage(value: number): number;
    setPageCount(value: number): void;
    prevPage(): number;
    nextPage(): number;
    private updateState;
}
