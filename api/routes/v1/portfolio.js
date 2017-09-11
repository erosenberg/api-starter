import { Router } from 'express';
let route = Router();

// mock data...
import mockData from '../../data/portfolio';

route.get('/portfolio', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(mockData));
});

export default route;
