const os = require('os');
const path = require('path');

module.exports = {
  verbose: false,
  cache: path.join(os.homedir(), '.cache/d2'),
  backend: {
    tag: '2.31-rc1',
    port: '8080'
  }
}