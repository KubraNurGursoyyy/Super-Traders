import { Router } from 'express';
const { create, update, remove } = require('./controller');
const routes = new Router();

routes.route('/portfolio').post(create);
routes.route('/portfolio/:id').patch(update);
routes.route('/portfolio/:id').delete(remove);

export default routes;
