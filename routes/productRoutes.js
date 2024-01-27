import {  createProduct,  getAllProducts,  getOneProduct,  updateProduct,  deleteProduct} from '../controllers/productController.js';

function productRoutes(fastify, options, done) {

  fastify.post('/products', createProduct);
  fastify.get('/products', getAllProducts);
  fastify.get('/products/:id', getOneProduct);
  fastify.put('/products/:id', updateProduct);
  fastify.delete('/products/:id', deleteProduct);

  done();
}

export {productRoutes};