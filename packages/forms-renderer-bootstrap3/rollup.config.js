import { generateConfig } from '../../rollup.config.base';

const external = (id) => /(\@de-re-crud\/forms\/|bootstrap\/|preact)/.test(id);
const config = generateConfig(external);

export default config;