import {sequelize} from '../config/db.js'
import {Product} from '../models/product.js'

const createProduct = async (req, res) => {
  let transaction;

  try {
    const { name, description, ref, amount, rate } = req.body;

    let transaction = await sequelize.transaction();

    const newProduct = await Product.create(
      {
        name: name,
        description: description,
        ref: ref,
        amount: amount,
        rate: rate,
      },
      { transaction }
    );

    await transaction.commit();

    res.status(201).send({ product: newProduct });

  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send({ error: 'Référence produit déjà utilisée.' });

    } else {
      res.status(500).send({ error: 'Erreur interne du serveur.' });

    }
  }
};

const getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll({});
      res.status(200).send(products);

    } catch (error) {
      res.status(500).send({ error: error.message });
    }
}

const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).send({ error: 'Produit non trouvé' });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, ref, amount, rate } = req.body;

    const productId = req.params.id;

    const existingProduct = await Product.findByPk(productId);

    if (!existingProduct) {
      return res.status(404).send({ error: 'Produit non trouvé' });
    }

    const updatedProduct = await existingProduct.update({
      name: name || existingProduct.name,
      description: description || existingProduct.description,
      ref: ref || existingProduct.ref,
      amount: amount || existingProduct.amount,
      rate: rate || existingProduct.rate,
    });

    res.status(200).send({product: updatedProduct});
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send({ error: 'Référence produit déjà utilisée.' });

    } else {
      res.status(500).send({ error: 'Erreur interne du serveur.' });
    }
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const productToDelete = await Product.findByPk(productId);

    if (!productToDelete) {
      return res.status(404).send({ error: 'Produit non trouvée' });
    }

    await productToDelete.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};