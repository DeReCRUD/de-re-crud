# De Re CRUD (Core)

## Getting Started

Install library:

```bash
npm install --save @de-re-crud/core #or, yarn add @de-re-crud/core
```

Install a renderer:

```bash
# This is the Bootstrap 4 renderer as an example. You will need to include Bootstrap CSS and the CSS shipped with the renderer library.
npm install --save @de-re-crud/renderer-bootstrap4
#or, yarn add @de-re-crud/renderer-bootstrap4
```

---

For Preact:

```typescript
import { h } from "preact";
import { Form } from "@de-re-crud/core";
import { Bootstrap4RendererOptions } from "@de-re-crud/renderer-bootstrap4";
import schemaJson from "./schema.json";

h(
  <Form
    rendererOptions={Bootstrap4RendererOptions}
    schema={schemaJson}
    struct="struct"
    onSubmit={() => {}}
  />,
  el
);
```

---

For Angular, see the [Angular wrapper](https://github.com/DeReCRUD/angular).
