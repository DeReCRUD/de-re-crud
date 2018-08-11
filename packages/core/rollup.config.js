import { generateConfig } from '../../rollup.config.base';

const external = (id) => /(^preact)/.test(id);
const config = generateConfig(external);

export default config;
