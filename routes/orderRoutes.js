import {  createOrder,  getAllOrders,  getOneOrder,  deleteOrder } from '../controllers/orderController.js';

function orderRoutes(fastify, options, done) {
    
  fastify.post('/orders', createOrder);
  fastify.get('/orders', getAllOrders);
  fastify.get('/orders/:id', getOneOrder);
  fastify.delete('/orders/:id', deleteOrder);

  done();
}

export {orderRoutes};