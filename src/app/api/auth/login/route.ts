import { createRouteHandler } from '@/lib/api/utils';
import * as postHandler from './post';

export const POST = postHandler.POST;

// If you want to use the factory approach:
// export const { POST } = createRouteHandler({
//   POST: postHandler.POST
// });