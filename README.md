# De Re CRUD

For more information about the ideology of library, see [this](docs/ideology.md).

## Getting Started

Install the core library:

```bash
npm install --save @de-re-crud/core #or, yarn add @de-re-crud/core
```

Install a renderer:

```bash
# This is the Bootstrap 3 renderer as an example. You will need to include Bootstrap CSS and the CSS shipped with the renderer library.
npm install --save @de-re-crud/renderer-bootstrap3
#or, yarn add @de-re-crud/renderer-bootstrap3
```

You will also need to install an appropriate version of Preact (check the `peerDependencies` of the core library):

```bash
npm install --save preact@~8
#or, yarn add preact@~8
```

---

For Preact:

```typescript
import { h } from "preact";
import { Form } from "@de-re-crud/core";
import { Bootstrap3RendererOptions } from "@de-re-crud/renderer-bootstrap3";

h(
  <Form
    rendererOptions={Bootstrap3RendererOptions}
    schema={schemaJson}
    struct="struct"
    onSubmit={() => {}}
  />,
  el
);
```

---

For Angular, see the [Angular wrapper](https://github.com/DeReCRUD/angular).

## Roadmap

- Improve documentation
- Improve test coverage
- React support
- React Native support
- Vue support
- Schema builder