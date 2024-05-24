const express = require('express');
const router = express.Router();
const Fruta = require('../models/Fruta');

// Obtener todas las frutas
router.get('/', async (req, res) => {
  try {
    const frutas = await Fruta.find();
    res.json(frutas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una fruta por ID
router.get('/:id', async (req, res) => {
  try {
    const fruta = await Fruta.findById(req.params.id);
    if (fruta == null) {
      return res.status(404).json({ message: 'Fruta no encontrada' });
    }
    res.json(fruta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear una nueva fruta
router.post('/', async (req, res) => {
  const { nombre, precio, imagen } = req.body;
  const nuevaFruta = new Fruta({ nombre, precio, imagen });

  try {
    const frutaGuardada = await nuevaFruta.save();
    res.status(201).json(frutaGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar una fruta
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, imagen } = req.body;
    const frutaActualizada = await Fruta.findByIdAndUpdate(id, { nombre, precio, imagen }, { new: true });
    res.json(frutaActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar una fruta
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Fruta.findByIdAndDelete(id);
    res.json({ message: 'Fruta eliminada' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
