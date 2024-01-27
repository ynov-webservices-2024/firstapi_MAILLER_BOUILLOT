import {sequelize} from '../config/db.js'
import {User} from '../models/user.js'

const createUser = async (req, res) => {
  let transaction;

  try {
    const { email, password, firstname, lastname, phone, birth } = req.body;

    let transaction = await sequelize.transaction();

    const newUser = await User.create(
      {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        birth: birth,
      },
      { transaction }
    );

    await transaction.commit();

    res.status(201).send({ user: newUser });

  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send({ error: 'Adresse e-mail déjà utilisée.' });

    } else if (error.name === 'ValidationError') {
      res.status(400).send({ error: 'Données utilisateur non valides.' });

    } else {
      res.status(500).send({ error: 'Erreur interne du serveur.' });

    }
  }
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({});
      res.status(200).send(users);

    } catch (error) {
      res.status(500).send({ error: error.message });
    }
}

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ error: 'Utilisateur non trouvé' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, password, firstname, lastname, phone, birth} = req.body;

    const userId = req.params.id;

    const existingUser = await User.findByPk(userId);

    if (!existingUser) {
      return res.status(404).send({ error: 'Utilisateur non trouvé' });
    }

    const updatedUser = await existingUser.update({
      email: email || existingUser.email,
      password: password || existingUser.password,
      firstname: firstname || existingUser.firstname,
      lastname: lastname || existingUser.lastname,
      phone: phone || existingUser.phone,
      birth: birth || existingUser.birth,
    });

    res.status(200).send({user: updatedUser});
  } catch (error) {
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send({ error: 'Adresse e-mail déjà utilisée.' });

    } else if (error.name === 'ValidationError') {
      res.status(400).send({ error: 'Données utilisateur non valides.' });

    } else {
      res.status(500).send({ error: 'Erreur interne du serveur.' });
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const userToDelete = await User.findByPk(userId);

    if (!userToDelete) {
      return res.status(404).send({ error: 'Utilisateur non trouvé' });
    }

    await userToDelete.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};