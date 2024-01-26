import {  createUser,  getAllUsers,  getOneUser,  updateUser,  deleteUser} from '../controllers/userController.js';

function userRoutes(fastify, options, done) {
    
  fastify.post('/users', createUser);
  fastify.get('/users', getAllUsers);
  fastify.get('/users/:id', getOneUser);
  fastify.put('/users/:id', updateUser);
  fastify.delete('/users/:id', deleteUser);

  done();
}

export {userRoutes};