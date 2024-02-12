import {sequelize} from '../config/db.js'
import {Order} from '../models/order.js'
import {Product} from '../models/product.js'
import {User} from '../models/user.js'

const createOrder = async (req, res) => {
  let transaction;

  try {
    const { user_id, product_id } = req.body;

    let transaction = await sequelize.transaction();

    const newOrder = await Order.create(
      {
        user_id: user_id,
        product_id: product_id,
      },
      { transaction }
    );

    await transaction.commit();

    res.status(201).send({ order: newOrder });

  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    res.status(500).send({ error: 'Erreur interne du serveur.' });
  }
};

const getAllOrders = async (req, res) => {
  try {

    const order = await Order.findAll({
      include : [
        {
          model: User,
          attributes: ['id', 'email', 'firstname', 'lastname', 'phone'],
        },
        {
          model: Product,
          attributes: ['id', 'name', 'description', 'amount', 'rate']
        }
      ],
      attributes : ['id', 'createdAt'],
    });

    if (!order) {
      return res.status(404).send({ error: 'Commande non trouvée' });
    }

    res.status(200).send(order);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getOneOrder = async (req, res) => {
  try {

    const orderId = req.params.id;

    const order = await Order.findByPk(orderId, {
      include : [
        {
          model: User,
          attributes: ['id', 'email', 'firstname', 'lastname', 'phone'],
        },
        {
          model: Product,
          attributes: ['id', 'name', 'description', 'amount', 'rate']
        }
      ],
      attributes : ['id', 'createdAt'],
    });

    if (!order) {
      return res.status(404).send({ error: 'Commande non trouvée' });
    }

    res.status(200).send(order);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getUserOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await User.findByPk(userId);

    if (!existingUser) {
      return res.status(404).send({ error: 'Utilisateur non trouvé' });
    }

    const order = await Order.findAll({
      include : [
        {
          model: User,
          attributes: ['id', 'email', 'firstname', 'lastname', 'phone'],
        },
        {
          model: Product,
          attributes: ['id', 'name', 'description', 'amount', 'rate']
        }
      ],
      attributes : ['id', 'createdAt'],
      where : 
        {
          user_id: userId
        }
    });

    if (!order) {
      return res.status(404).send({ error: 'Commande non trouvée' });
    }

    res.status(200).send(order);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const orderToDelete = await Order.findByPk(orderId);

    if (!orderToDelete) {
      return res.status(404).send({ error: 'Commande non trouvée' });
    }

    await orderToDelete.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export {
  createOrder,
  getAllOrders,
  getOneOrder,
  getUserOrder,
  deleteOrder,
};