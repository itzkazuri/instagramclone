import { createRouteHandler } from '@/lib/api/utils';
import * as postHandler from './post';
import * as deleteHandler from './delete';

export const { POST, DELETE } = createRouteHandler({
  POST: postHandler.POST,
  DELETE: deleteHandler.DELETE
});