# @react-lit/auto-id

Autogenerate IDs to facilitate WAI-ARIA and server rendering.
Optionally a user-provided string can be supplied to `useId` instead of
auto-generating one.

## Installation

```bash
$ npm i @react-lit/auto-id
# or
$ yarn add @react-lit/auto-id
```

## Example

```js
import * as React from 'react';
import { useId } from "@react-lit/auto-id";

// This may be a single form field component.
function Example(props) {
  const id = useId(props.id);
  return (
    <>
      <label htmlFor={id}>{props.label}</label>
      <input type={props.type} name={props.name} id={id} />
    </>
  );
}
```

## Development

(1) Install dependencies

```bash
$ npm i
# or
$ yarn
```

(2) Run initial validation

```bash
$ ./Taskfile.sh validate
```

(3) Run tests in watch-mode to validate functionality.

```bash
$ ./Taskfile test -w
```

---

_This project was set up by @jvdx/core_
