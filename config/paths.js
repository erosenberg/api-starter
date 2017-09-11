const path = require('path');

const projectPath = path.resolve(__dirname, '../');

const staticPath = path.resolve(projectPath, 'static');
const buildPath = path.resolve(staticPath, 'build');
const srcPath = path.resolve(projectPath, 'src');
const indexPath = path.resolve(srcPath, 'index.js');
const imagesPath = path.resolve(buildPath, 'images');
const nodeModulesPath = path.resolve(projectPath, 'node_modules');

module.exports = {
  staticPath,
  buildPath,
  srcPath,
  indexPath,
  nodeModulesPath,
  projectPath,
  imagesPath
};
