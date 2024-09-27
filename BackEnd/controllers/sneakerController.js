const Sneaker = require('../models/sneakerModel.js');

// Crear un nuevo sneaker
exports.createSneaker = async (req, res) => {
  try {
    const newSneaker = await Sneaker.create({
      nombre: req.body.nombre,
      serie: req.body.serie,
      precio: req.body.precio,
    });
    res.status(201).json({
      status: 'success',
      data: {
        sneaker: newSneaker,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Obtener todos los sneakers
exports.getAllSneakers = async (req, res) => {
  try {
    const sneakers = await Sneaker.findAll();
    res.status(200).json({
      status: 'success',
      results: sneakers.length,
      data: {
        sneakers,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Obtener un sneaker por ID
exports.getSneakerById = async (req, res) => {
  try {
    const sneaker = await Sneaker.findByPk(req.params.id);
    if (!sneaker) {
      return res.status(404).json({
        status: 'fail',
        message: 'Sneaker not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        sneaker,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Actualizar un sneaker por ID
exports.updateSneaker = async (req, res) => {
  try {
    const sneaker = await Sneaker.findByPk(req.params.id);
    if (!sneaker) {
      return res.status(404).json({
        status: 'fail',
        message: 'Sneaker not found',
      });
    }

    const updatedSneaker = await sneaker.update({
      nombre: req.body.nombre,
      serie: req.body.serie,
      precio: req.body.precio,
    });

    res.status(200).json({
      status: 'success',
      data: {
        sneaker: updatedSneaker,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Eliminar un sneaker por ID
exports.deleteSneaker = async (req, res) => {
  try {
    const sneaker = await Sneaker.findByPk(req.params.id);
    if (!sneaker) {
      return res.status(404).json({
        status: 'fail',
        message: 'Sneaker not found',
      });
    }

    await sneaker.destroy();
    res.status(204).json({
      status: 'success',
      message: 'Sneaker deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
