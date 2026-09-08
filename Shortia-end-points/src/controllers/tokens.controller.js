let tokens = [
  { ID_Token: 1, Tipo: "acceso",
    Cantidad: 100,
    ID_Usuario: 1 }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: tokens });
};

const getById = (req, res) => {
  const item = tokens.find(
    p => p.ID_Token == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Token: Date.now(), ...req.body };
  tokens.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = tokens.findIndex(p => p.ID_Token == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  tokens[index] = { ...tokens[index], ...req.body };
  res.json({ ok: true, data: tokens[index] });
};

const remove = (req, res) => {
  const index = tokens.findIndex(p => p.ID_Token == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = tokens.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
