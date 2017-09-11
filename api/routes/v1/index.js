import { Router } from 'express';
import portfolio from './portfolio';

let v1 = Router();

v1.use('/', portfolio);

export default v1;
