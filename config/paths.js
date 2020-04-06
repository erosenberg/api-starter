const path = require('path');

const projectPath = path.resolve(__dirname, '../');

const staticPath = path.resolve(projectPath, 'static');
const buildPath = path.resolve(staticPath, 'build');
const srcPath = path.resolve(projectPath, 'src');
const indexPath = path.resolve(srcPath, 'index.js');
const imagesPath = path.resolve(buildPath, 'images');
const nodeModulesPath = path.resolve(projectPath, 'node_modules');
const indexViewPath = path.resolve(staticPath, 'index.html');
const iconsPath = path.resolve(imagesPath, 'icons');

const webpackResolve = path.resolve(
  projectPath,
  'config/webpack/webpack.resolve.config.js',
);

const aliases = {
  actions: path.resolve(srcPath, 'actions/'),
  assets: path.resolve(srcPath, 'assets/'),
  components: path.resolve(srcPath, 'components/'),
  constants: path.resolve(srcPath, 'constants/'),
  forms: path.resolve(srcPath, 'forms/'),
  models: path.resolve(srcPath, 'models/'),
  pages: path.resolve(srcPath, 'pages/'),
  reducers: path.resolve(srcPath, 'reducers/'),
  store: path.resolve(srcPath, 'store/'),
  styles: path.resolve(srcPath, 'styles/'),
  utils: path.resolve(srcPath, 'utils/'),
  views: path.resolve(srcPath, 'views/'),
  widgets: path.resolve(srcPath, 'widgets/'),
  charts: path.resolve(srcPath, 'charts/'),
  routes: path.resolve(srcPath, 'routes/'),
};

module.exports = {
  staticPath,
  buildPath,
  srcPath,
  indexPath,
  nodeModulesPath,
  projectPath,
  imagesPath,
  indexViewPath,
  iconsPath,
  aliases,
  webpackResolve,
};
