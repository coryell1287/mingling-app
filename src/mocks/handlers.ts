import { rest } from 'msw';

export const handlers = [
  rest.post('/feedback', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req));
  }),

  rest.get('/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    );
  }),

  rest.get('*', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        error: `No request handler matched this URI ${req.url.toString()}`,
      }),
    );
  }),

  rest.put('*', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        error: `No request handler matched this URI ${req.url.toString()}`,
      }),
    );
  }),

  rest.post('*', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        error: `No request handler matched this URI ${req.url.toString()}`,
      }),
    );
  }),

  rest.delete('*', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        error: `No request handler matched this URI ${req.url.toString()}`,
      }),
    );
  }),
];
