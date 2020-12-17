const path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  alias: {
    '/@/': resolve('src'),
  },
  base: './',
};