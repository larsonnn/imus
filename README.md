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

<hr>

### Using HTML
- at least version 1.2.2
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <input onkeyup="updateText()" id="textInput" type="text" />
    <p id="textField"></p>
</head>
<body>
    <script src="https://unpkg.com/imus@1.2.2/dist/bundle.js">
    </script>
    <script>
        const unsubscribe = Imus.subscribe('myText', (value) => {
            document.getElementById('textField').innerHTML = value;
        });

        function updateText() {
            Imus.dispatch('myText', document.getElementById('textInput').value);
        }

    </script>
</body>
</html>
```


### Build
```
tsc
npx webpack
```