let redes_sociales = [
  { ID_Redes: 1, Nombre: "Instagram",
    URL_Perfil: "https://instagram.com/shortia",
    ID_Publicacion: 1 }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: redes_sociales });
};

const getById = (req, res) => {
  const item = redes_sociales.find(
    p => p.ID_Redes == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Redes: Date.now(), ...req.body };
  redes_sociales.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = redes_sociales.findIndex(p => p.ID_Redes == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  redes_sociales[index] = { ...redes_sociales[index], ...req.body };
  res.json({ ok: true, data: redes_sociales[index] });
};

const remove = (req, res) => {
  const index = redes_sociales.findIndex(p => p.ID_Redes == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = redes_sociales.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
