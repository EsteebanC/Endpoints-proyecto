const model = require('../models/productos.model');

const getAll = async (req, res) => {
  try {
    const data = await model.getAll();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const item = await model.getById(req.params.id);
    if (!item) return res.status(404).json({ ok: false, msg: 'No encontrado' });
    res.json({ ok: true, data: item });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const create = async (req, res) => {
  try {
    const nuevo = await model.create(req.body);
    res.status(201).json({ ok: true, data: nuevo });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const update = async (req, res) => {
  try {
    const actualizado = await model.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ ok: false, msg: 'No encontrado' });
    res.json({ ok: true, data: { id: req.params.id, ...req.body } });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const eliminado = await model.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ ok: false, msg: 'No encontrado' });
    res.json({ ok: true, msg: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };