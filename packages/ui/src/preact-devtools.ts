/* eslint-disable global-require */
if (process.env.NODE_ENV === 'development') {
  require('preact/debug');
} else {
  require('preact/devtools');
}
