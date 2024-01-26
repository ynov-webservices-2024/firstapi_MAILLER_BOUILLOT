import {productController} from '../controllers/productController.js';

function productRoutes(fastify, options, done) {

  fastify.post('/products', productController.createProduct);
  fastify.get('/products', productController.getAllProducts);
  fastify.get('/products/:id', productController.getOneProduct);
  fastify.put('/products/:id', productController.updateProduct);
  fastify.delete('/products/:id', productController.deleteProduct);

  done();
}

export {productRoutes};