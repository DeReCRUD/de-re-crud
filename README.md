# De Re CRUD

[![GitHub License](https://img.shields.io/github/license/DeReCRUD/de-re-crud.svg)](https://github.com/DeReCRUD/de-re-crud/blob/master/LICENSE) [![Build Status](https://dev.azure.com/DeReCRUD/de-re-crud/_apis/build/status/DeReCRUD.de-re-crud?branchName=master)](https://dev.azure.com/DeReCRUD/de-re-crud/_build/latest?definitionId=1?branchName=master) [![codecov](https://codecov.io/gh/DeReCRUD/de-re-crud/branch/master/graph/badge.svg)](https://codecov.io/gh/DeReCRUD/de-re-crud)

For more information about the ideology of library, see [this](docs/ideology.md).

## Getting Started

Install core library:

```bash
yarn add @de-re-crud/core #or npm install --save @de-re-crud/core 
```

Install a theme:

```bash
# You will need to include Bootstrap 4 CSS.
yarn add @de-re-crud/theme-bootstrap4 #or npm install --save @de-re-crud/theme-bootstrap4
```

---

For Preact:

```typescript
import { h } from 'preact';
import { Form } from '@de-re-crud/core';
import { Bootstrap4RendererOptions } from '@de-re-crud/theme-bootstrap4';
import schemaJson from './schema.json'; // Your defined De Re CRUD schema

h(
  <Form
    rendererOptions={Bootstrap4RendererOptions}
    schema={schemaJson}
    struct="struct"
    onSubmit={() => {
        // Handle submission
    }}
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
- Support for the R and D in CRUD
- Backend service and database support
