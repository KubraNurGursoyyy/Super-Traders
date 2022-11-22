import { Router } from 'express';
const { update, remove, buyShare, sellShare, createUser } = require('./controller');
const routes = new Router();

routes.route('/user/:id').patch(update);
routes.route('/user/:id').delete(remove);
routes.route('/user/sell').post(sellShare);
routes.route('/user/buy').post(buyShare);
routes.route('/user').post(createUser);

export default routes;
