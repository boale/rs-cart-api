import { Request } from 'express';

import { User } from '../../users';
import {HttpStatus} from '@nestjs/common';

export interface AppRequest extends Request {
  user?: User,
  statusCode?: HttpStatus
}
