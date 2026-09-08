let usuarios = [
  { ID_Usuario: 1, ID_Persona: 1,
    Email: "usuario@mail.com",
    Contrasena: "hash123",
    Fecha_Registro: "2026-01-01",
    Username: "usuario1" }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: usuarios });
};

const getById = (req, res) => {
  const item = usuarios.find(
    p => p.ID_Usuario == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Usuario: Date.now(), ...req.body };
  usuarios.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = usuarios.findIndex(p => p.ID_Usuario == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  usuarios[index] = { ...usuarios[index], ...req.body };
  res.json({ ok: true, data: usuarios[index] });
};

const remove = (req, res) => {
  const index = usuarios.findIndex(p => p.ID_Usuario == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = usuarios.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
