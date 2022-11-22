import { Router } from 'express';
const { create, update, remove, get } = require('./controller');
const routes = new Router();

routes.route('/shares').post(create);
routes.route('/shares/:id').patch(update);
routes.route('/shares/:id').delete(remove);
routes.route('/shares/:id').get(get);

export default routes;
