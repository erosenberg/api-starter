// this is what you'll use to create your routes below...
import { Router } from 'express';
import marco from './marco';

const v1 = Router();

v1.use('/marco', marco);

export default v1;
