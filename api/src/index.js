import express from 'express';
import v1 from './routes/v1';

const { API_SERVER_PORT } = process.env;
const app = express();

app.get('/marco', (req, res) => {
  res.send('polo');
});

// you'll use this when you're ready to start creating routes.
// app.use('/api/v1', v1);

app.listen(API_SERVER_PORT, () => {
  console.log(`Listening on port ${API_SERVER_PORT}!`);
});
