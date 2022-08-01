export declare class SortStateHelper {
    active: string;
    direction: string;
    fromString(value: string): void;
    toString(): string | null;
    update(active: string): void;
    nextDirection(): void;
}
