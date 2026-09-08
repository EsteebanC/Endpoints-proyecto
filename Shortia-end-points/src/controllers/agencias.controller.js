let agencias = [
  { ID_Agencia: 1, Correo: "agencia1@shortia.com",
    Nombre: "Agencia Uno",
    ID_Reporte: 1 }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: agencias });
};

const getById = (req, res) => {
  const item = agencias.find(
    p => p.ID_Agencia == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Agencia: Date.now(), ...req.body };
  agencias.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = agencias.findIndex(p => p.ID_Agencia == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  agencias[index] = { ...agencias[index], ...req.body };
  res.json({ ok: true, data: agencias[index] });
};

const remove = (req, res) => {
  const index = agencias.findIndex(p => p.ID_Agencia == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = agencias.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
