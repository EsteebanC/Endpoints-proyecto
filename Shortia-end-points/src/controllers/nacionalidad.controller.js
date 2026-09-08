let nacionalidad = [
  { ID_Nacionalidad: 1, ID_Persona: 1,
    ID_Agencia: 1,
    Pais: "Colombia",
    Ciudad: "Barranquilla",
    Direccion: "Calle 72 #10-20",
    Codigo_Postal: "080001" }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: nacionalidad });
};

const getById = (req, res) => {
  const item = nacionalidad.find(
    p => p.ID_Nacionalidad == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Nacionalidad: Date.now(), ...req.body };
  nacionalidad.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = nacionalidad.findIndex(p => p.ID_Nacionalidad == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  nacionalidad[index] = { ...nacionalidad[index], ...req.body };
  res.json({ ok: true, data: nacionalidad[index] });
};

const remove = (req, res) => {
  const index = nacionalidad.findIndex(p => p.ID_Nacionalidad == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = nacionalidad.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
