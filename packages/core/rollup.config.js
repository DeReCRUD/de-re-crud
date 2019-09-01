import { generateConfig } from '../../rollup.config.base';

const external = () => false;
const config = generateConfig('DeReCrud', 'src/index.ts', external);

export default config;
