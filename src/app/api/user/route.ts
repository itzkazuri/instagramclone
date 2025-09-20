import { createRouteHandler } from '@/lib/api/utils';
import * as getHandler from './get';
import * as postHandler from './post';
import * as putHandler from './put';
import * as patchHandler from './patch';
import * as deleteHandler from './delete';

export const { GET, POST, PUT, PATCH, DELETE } = createRouteHandler({
  GET: getHandler.GET,
  POST: postHandler.POST,
  PUT: putHandler.PUT,
  PATCH: patchHandler.PATCH,
  DELETE: deleteHandler.DELETE
});