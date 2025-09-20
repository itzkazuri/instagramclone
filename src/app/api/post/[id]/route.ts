import { createRouteHandler } from '@/lib/api/utils';
import * as getHandler from './get';
import * as patchHandler from './patch';
import * as deleteHandler from './delete';

export const { GET, PATCH, DELETE } = createRouteHandler({
  GET: getHandler.GET,
  PATCH: patchHandler.PATCH,
  DELETE: deleteHandler.DELETE
});