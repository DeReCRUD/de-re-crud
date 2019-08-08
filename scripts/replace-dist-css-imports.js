/* eslint-disable no-console */
const replace = require('replace-in-file');

const options = {
  files: 'dist/**/*.js',
  from: /import '(.*).css';/g,
  to: '',
  verbose: true,
};

const changes = replace.sync(options);
if (!changes.length) {
  console.warn('CSS Import Replacement: No files were modified.');
} else {
  console.log(changes.map((x) => `CSS Import Replacement: ${x}`).join('\n'));
}
