# De Re CRUD (Core)

## Getting Started

Install library:

```bash
npm install --save @de-re-crud/core #or, yarn add @de-re-crud/core
```

Install a renderer:

```bash
# This is the Bootstrap 3 renderer as an example. You will need to include Bootstrap CSS and the CSS shipped with the renderer library.
npm install --save @de-re-crud/renderer-bootstrap3
#or, yarn add @de-re-crud/renderer-bootstrap3
```

---

For Preact:

```typescript
import { h } from "preact";
import { Form } from "@de-re-crud/core";
import { Bootstrap3RendererOptions } from "@de-re-crud/renderer-bootstrap3";
import schemaJson from "./schema.json";

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
