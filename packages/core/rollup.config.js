import { generateConfig } from '../../rollup.config.base';

const external = (id) => /(^preact)/.test(id);
const config = generateConfig('index.tsx', external);

export default config;
