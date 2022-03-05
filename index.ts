import _ from 'lodash'

const store: any = {};
const listeners: any = {};

function _isSet(key: string) {
    return listeners[key] && listeners[key]?.has
}

function _unsubscribe(key: string, callback: () => {}) {
    if(_isSet(key)) listeners[key].delete(callback);
}

export function dispatch(key: string, value: any) {
    store[key] = _.cloneDeep(value);
    if(!listeners[key]) return;
    listeners[key].forEach(
        (listener: (arg0: any) => any) => listener(store[key])
    );
}

export function subscribe(key: string, callback: () => {}) {
    if(!_isSet(key)) listeners[key] = new Set();
    if(listeners[key].has(callback)) return;
    listeners[key].add(callback);
    return () => _unsubscribe(key, callback);
}

export function getStore(key: string | undefined) {
    if(key === undefined) return _.cloneDeep(store);
    return _.cloneDeep(store[key]);

}
