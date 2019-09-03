# @de-re-crud/angular

Angular wrapper for the De Re CRUD library.

## Usage

Install preact, core, and UI libraries:

```bash
yarn add preact@~8  #or npm install --save preact@~8
yarn add @de-re-crud/core #or npm install --save @de-re-crud/core 
yarn add @de-re-crud/ui #or npm install --save @de-re-crud/ui 
```

Install Angular CDK:
```bash
yarn add @angular/cdk  #or npm install --save @angular/cdk
```

Install the library:

```bash
yarn add @de-re-crud/angular #or, npm install --save @de-re-crud/angular
```

Install a theme:

```bash
# You will need to include Bootstrap 4 CSS.
yarn add @de-re-crud/theme-bootstrap4 #or npm install --save @de-re-crud/theme-bootstrap4
```

Import and register the `DeReCrudModule`:

```typescript
import { DeCrudModule } from '@de-re-crud/angular';

@NgModule({
    /*...*/
    imports: [/*..*/, DeReCrudModule]
})
export class AppModule {}
```

The use it in a component:

`app.component.ts`

```typescript
import { Bootstrap4RendererOptions } from '@de-re-crud/renderer-bootstrap4';
import schemaJson from './schema.json';  // Your defined De Re CRUD schema

@Component({ /*...*/ })
export class AppComponent {
  rendererOptions = Bootstrap4RendererOptions;
  schema = schemaJson;
  struct= "struct"

  onSubmit() {
      // Handle submission
  }
}
```

`app.component.html`

```html
<drc-form [rendererOptions]="rendererOptions" [schema]="schemaJson" struct="struct" submitForm="onSubmit($event)">
```