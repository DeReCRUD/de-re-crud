import { generateConfig } from '../../rollup.config.base';

const external = (id) => /(@de-re-crud\/)/.test(id);
const config = generateConfig(
  'DeReCrud.ui.themes.boostrap4',
  'index.ts',
  external,
  {
    '@de-re-crud/ui': 'DeReCrud.ui',
  },
);

export default config;
