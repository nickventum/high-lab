import { Subscription } from 'rxjs';
export declare type Listener = Subscription | (() => void) | SubscriptionHelper;
export declare class SubscriptionHelper {
    private static cases;
    static registerCase<T>(comparator: (item: T) => any, unsubscriber: (item: T) => void): void;
    private subscriptions;
    set next(subscription: Listener);
    get last(): Listener;
    unsubscribeAll(): void;
}
