export interface GraphQLPubSub {
    publish(triggerName: string, payload: any): Promise<void>;
    subscribe(triggerName: string, onMessage: Function, options: Object): Promise<number>;
    unsubscribe(subId: number): any;
    asyncIterator<T>(triggers: string | string[]): AsyncIterator<T>;
}
