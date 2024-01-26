import {orderController} from '../controllers/orderController.js';

function orderRoutes(fastify, options, done) {
    
  fastify.post('/orders', orderController.createOrder);
  fastify.get('/orders', orderController.getAllOrders);
  fastify.get('/orders/:id', orderController.getOneOrder);
  fastify.put('/orders/:id', orderController.updateOrder);
  fastify.delete('/orders/:id', orderController.deleteOrder);

  done();
}

export {orderRoutes};