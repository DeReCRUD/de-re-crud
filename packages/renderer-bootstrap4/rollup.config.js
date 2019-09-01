import { generateConfig } from '../../rollup.config.base';

const external = (id) => /(@de-re-crud\/core|preact)/.test(id);
const config = generateConfig(
  'DeReCrud.ui.themes.boostrap4',
  'index.ts',
  external,
  { preact: 'preact' },
);

export default config;
