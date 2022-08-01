import { Observable, Subscription } from 'rxjs';

function empty(v) {
    return v === '' || (Array.isArray(v) && v.length === 0) || v === undefined || v === null || (typeof v === 'object' && Object.keys(v).length === 0);
}
class LoadingProgress {
    constructor(isLoaded = false, isSuccess = false, isFailure = false, data, failureConfig) {
        this.isLoaded = isLoaded;
        this.isSuccess = isSuccess;
        this.isFailure = isFailure;
        this.failureConfig = failureConfig;
        if (this.hasPagination(data)) {
            this.data = data.data;
            this.pagination = data.pagination;
        }
        else {
            this.data = data;
        }
        this.isEmptyData = empty(this.data);
    }
    static fromData(value) {
        return new LoadingProgress(true, true, false, value);
    }
    get isLoading() {
        return !this.isLoaded;
    }
    clone(params = {}) {
        return new LoadingProgress(params.isLoaded || this.isLoaded, params.isSuccess || this.isSuccess, params.isFailure || this.isFailure, params.data, params.failureConfig || this.failureConfig);
    }
    hasPagination(data) {
        return data !== null && typeof data === 'object' && data.hasOwnProperty('pagination');
    }
}
const dataLoading = (callback, failureConfig) => (source) => {
    const tryCallCallback = (loadingProgress) => {
        if (typeof callback === 'function') {
            callback(loadingProgress);
        }
    };
    tryCallCallback(new LoadingProgress(false, false, false));
    return new Observable(observer => {
        return source.subscribe(v => {
            tryCallCallback(new LoadingProgress(true, true, false, v));
            observer.next(v);
        }, err => {
            tryCallCallback(new LoadingProgress(true, false, true, null, failureConfig));
            observer.error(err);
        }, () => {
            observer.complete();
        });
    });
};

class SubscriptionHelper {
    constructor() {
        this.subscriptions = [];
    }
    static registerCase(comparator, unsubscriber) {
        this.cases.set(comparator, unsubscriber);
    }
    set next(subscription) {
        this.subscriptions.push(subscription);
    }
    get last() {
        return this.subscriptions[this.subscriptions.length - 1];
    }
    unsubscribeAll() {
        this.subscriptions.forEach(item => {
            for (let entry of SubscriptionHelper.cases.entries()) {
                if (entry[0](item)) {
                    entry[1](item);
                    break;
                }
            }
        });
        this.subscriptions = [];
    }
}
SubscriptionHelper.cases = new Map();
SubscriptionHelper.registerCase(v => v instanceof Subscription, v => v.unsubscribe());
SubscriptionHelper.registerCase(v => v instanceof SubscriptionHelper, v => v.unsubscribeAll());
SubscriptionHelper.registerCase(v => typeof v === 'function', v => v());

/*
 * Public API Surface of core
 */

/**
 * Generated bundle index. Do not edit.
 */

export { LoadingProgress, SubscriptionHelper, dataLoading };
//# sourceMappingURL=high-lab-core.mjs.map
