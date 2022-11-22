import { Router } from 'express';
const { create, update, remove , getUsersWallet} = require('./controller');
const routes = new Router();

routes.route('/wallet').post(create);
routes.route('/wallet/:id').patch(update);
routes.route('/wallet/:id').delete(remove);
routes.route('/wallet/:id').get(getUsersWallet);

export default routes;
