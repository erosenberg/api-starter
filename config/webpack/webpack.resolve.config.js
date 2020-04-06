const paths = require('../paths');

module.exports = {
  modules: [paths.nodeModulesPath],
  extensions: ['.js', 'jsx', '.json'],
  alias: paths.aliases,
};
