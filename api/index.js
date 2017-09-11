import express from 'express';
import path from 'path';

import v1 from './routes/v1/index';
import paths from '../config/paths';
import { PROD_SERVER_PORT } from '../config/prod/constants.prod';

const app = express();

app.use(express.static(paths.staticPath));
app.set('view engine', 'ejs');

app.get('/marco', (req, res) => {
  res.send('polo');
});

app.use('/api/v1', v1);

app.get('*', (req, res) => {
  res.render(path.resolve(paths.staticPath, 'index'));
});

app.listen(PROD_SERVER_PORT);
