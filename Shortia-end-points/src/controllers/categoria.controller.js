let categoria = [
  { ID_Categoria: 1, Nombre: "Moda" }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: categoria });
};

const getById = (req, res) => {
  const item = categoria.find(
    p => p.ID_Categoria == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Categoria: Date.now(), ...req.body };
  categoria.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = categoria.findIndex(p => p.ID_Categoria == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  categoria[index] = { ...categoria[index], ...req.body };
  res.json({ ok: true, data: categoria[index] });
};

const remove = (req, res) => {
  const index = categoria.findIndex(p => p.ID_Categoria == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = categoria.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
