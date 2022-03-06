# imus, immutable store [WIP]
## imus provides simple store functionality, it is not a state machine. It's good enough in most cases.
> imus is work in progress. Be aware of breaking changes and do not use in production yet.
<hr>

### ToDo's

- connector (connect another storage, ex.: when using on server)
- createStore method to split storage

### Installation
```sh
npm install imus
```

### Usage in React Component

Listener
```jsx
import { useEffect, useState } from "react";
import { subscribe, getStore } from "imus";

export default function TextComponent() {
    const [text, setText] = useState('');
    const unsubscribe = subscribe('myText', setText); // when key already exist, subscribe will call setText directly

    const [initText] = useState(getStore('myText') || '') // will also get the value, but wouldnt be updated

    useEffect(() => {
        return unsubscribe
    })
    return <p>{text}, {initText}</p>
}
```

Dispatcher
```jsx
import { dispatch } from "imus";

export default function InputComponent() {
    return <input onChange={(e) => dispatch('myText', e.target.value)} type="text"/>
}
```

### using connector, for example localStorage

```js
const setter = (store) => localStorage.setItem('store', JSON.stringify(store));
const getter = () => JSON.parse(localStorage.getItem('store'))

setConnector(setter, getter);
```

### Build
```
tsc
npx webpack
```