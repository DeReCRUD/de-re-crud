import { generateConfig } from '../../rollup.config.base';

const external = (id) => /(^preact)/.test(id);
const config = generateConfig('DeReCrud', 'index.tsx', external, {
  preact: 'preact',
});

export default config;
