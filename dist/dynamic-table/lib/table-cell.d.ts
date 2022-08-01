export interface TableCellInterface {
    key: string;
    label: string | ((row: any) => string);
    sort?: boolean;
    defaultSort?: boolean;
    value?: ((row: any) => any);
    class?: string;
    stopRowEventPropagation?: boolean;
}
export declare class TableCell implements TableCellInterface {
    key: string;
    label: string | ((row: any) => string);
    sort?: boolean;
    defaultSort?: boolean;
    value?: ((row: any) => any);
    class?: string;
    stopRowEventPropagation?: boolean;
    constructor(options: TableCellInterface);
}
