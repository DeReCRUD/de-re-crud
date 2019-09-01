import { generateConfig } from '../../rollup.config.base';

const external = (id) => /(@de-re-crud\/|^preact)/.test(id);
const config = generateConfig('DeReCrud.ui', 'index.tsx', external, {
  preact: 'preact',
  '@de-re-crud/core': 'DeReCrud',
});

export default config;
