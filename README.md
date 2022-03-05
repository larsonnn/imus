# imus, immutable store [WIP]
## imus provides simple store functionality, it is not a state machine
> imus is work in progress. Be aware of breaking changes and do not use in production yet.
<hr>

### Installation
```sh
npm install imus
```

### Usage in React Component

Listener
```jsx
import { useEffect, useState } from "react";
import { subscribe, getStore } from "imus";

export default function Test1() {
    const [text, setText] = useState(getStore('text1') || '');
    const unsubscribe = subscribe('text1', setText);

    useEffect(() => {
        return unsubscribe
    })
    return <><h1>Text1</h1><p>{text}</p></>
}
```

Dispatcher
```jsx
import { dispatch } from "imus";

export default function Test2() {
    return <>
        <input onChange={(e) => dispatch('text1', e.target.value)} type="text"/>
    </>
}
```


### Build
```
tsc --esModuleInterop
```