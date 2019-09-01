import { generateConfig } from '../../rollup.config.base';

const external = () => false;
const config = generateConfig('DeReCrud', 'index.ts', external);

export default config;
