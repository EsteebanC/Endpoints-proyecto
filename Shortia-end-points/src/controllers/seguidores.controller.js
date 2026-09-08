let seguidores = [
  { ID_Seguidor: 1, ID_Usuario: 1,
    Correo: "seguidor@mail.com",
    Telefono: "3001234567",
    ID_IA: 1 }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: seguidores });
};

const getById = (req, res) => {
  const item = seguidores.find(
    p => p.ID_Seguidor == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Seguidor: Date.now(), ...req.body };
  seguidores.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = seguidores.findIndex(p => p.ID_Seguidor == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  seguidores[index] = { ...seguidores[index], ...req.body };
  res.json({ ok: true, data: seguidores[index] });
};

const remove = (req, res) => {
  const index = seguidores.findIndex(p => p.ID_Seguidor == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = seguidores.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
