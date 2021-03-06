import * as _ from 'lodash'

const store: any = {};
const listeners: any = {};
const connector: { setter: any, getter: any} = {setter: () => {}, getter: () => {}}

function _isSet(key: string) {
    return listeners[key] && listeners[key]?.has
}

function _unsubscribe(key: string, callback: (value: any) => {}) {
    if(_isSet(key)) listeners[key].delete(callback);
}

export function dispatch(key: string, value: any) {
    store[key] = _.cloneDeep(value);
    connector.setter(store);
    if(!listeners[key]) return;
    listeners[key].forEach(
        (listener: (arg0: any) => any) => listener(_.cloneDeep(store[key]))
    );
}

export function subscribe(key: string, callback: (value: any) => {}) {
    if(!_isSet(key)) listeners[key] = new Set();
    if(listeners[key].has(callback)) return;
    
    listeners[key].add(callback);
    
    if(store[key] !== undefined) callback(_.cloneDeep(store[key]));

    return () => _unsubscribe(key, callback);
}

export function getStore(key: string | undefined) {
    if(key === undefined || key === '') return _.cloneDeep(store);
    return _.cloneDeep(store[key]);

}

export function setConnector(setter: () => {}, getter: () => {}) {
    connector.setter = setter;
    connector.getter = getter;
    const fromGetter = getter();
    if(!fromGetter) return;

    Object.keys(fromGetter).forEach(key => {
        store[key] = _.cloneDeep(fromGetter[key]);
    })
}
