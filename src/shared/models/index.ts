import { Request } from 'express';

import { User } from '../../entities/user.entity';

export interface AppRequest extends Request {
  user?: User;
}
