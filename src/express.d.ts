import { Db } from 'mongodb';
import { Request } from 'express';

interface CustomRequest extends Request {
  db: Db;
}

export default CustomRequest;
