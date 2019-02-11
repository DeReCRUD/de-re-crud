import { generateConfig } from '../../rollup.config.base';

const external = (id) => /(\@de-re-crud\/core|bootstrap\/|preact)/.test(id);
const config = generateConfig('index.ts', external);

export default config;
