import Fastify from 'fastify'
import {sequelize} from './config/db.js';
import {userRoutes} from './routes/userRoutes.js';
import {productRoutes} from './routes/productRoutes.js';
import {orderRoutes} from './routes/orderRoutes.js';

const fastify = Fastify({
  logger: true
})

// Enregistrer les routes
fastify.register(userRoutes);
fastify.register(productRoutes);
fastify.register(orderRoutes);

// Synchroniser le modèle avec la base de données
sequelize.sync({ force: false })
.then(() => {
  console.log('Base de données synchronisée');
})
.catch(err => {
  console.error('Erreur lors de la synchronisation de la base de données', err);
});

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}