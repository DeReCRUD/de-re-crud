# De Re CRUD

[![GitHub License](https://img.shields.io/github/license/DeReCRUD/de-re-crud.svg)](https://github.com/DeReCRUD/de-re-crud/blob/master/LICENSE) ![Build](https://github.com/DeReCRUD/de-re-crud/workflows/Build/badge.svg) [![codecov](https://codecov.io/gh/DeReCRUD/de-re-crud/branch/master/graph/badge.svg)](https://codecov.io/gh/DeReCRUD/de-re-crud)

For more information about the ideology of library, see [this](docs/ideology.md).

## Getting Started

Install preact, core, and UI libraries:

```bash
yarn add preact@next  #or npm install --save preact@next
yarn add @de-re-crud/core #or npm install --save @de-re-crud/core 
yarn add @de-re-crud/ui #or npm install --save @de-re-crud/ui 
```

Install a theme:

```bash
# You will need to include Bootstrap 4 CSS.
yarn add @de-re-crud/theme-bootstrap4 #or npm install --save @de-re-crud/theme-bootstrap4
```

Import the neccessary exports and render the form:

```typescript
import { h, Form } from '@de-re-crud/ui'; // h is re-exported from preact for convenience
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
  document.getElementById('root') // An element in the body
);
```

## Examples

- [Main Storybook](https://de-re-crud.netlify.com)
- [Angular Storybook](https://de-re-crud.netlify.com/angular) 

## Roadmap

- Improve documentation
- Improve test coverage
- React support
- React Native support
- Vue support
- Schema builder
- Support for the R and D in CRUD
- Backend service and database support
