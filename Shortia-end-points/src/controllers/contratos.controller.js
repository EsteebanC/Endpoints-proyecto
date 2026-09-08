let contratos = [
  { ID_Contratos: 1, ID_IA: 1,
    Condiciones: "Publicar 5 veces al mes",
    Presupuesto: 5000000,
    Fecha_Inicio: "2026-01-01",
    Fecha_Fin: "2026-06-01" }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: contratos });
};

const getById = (req, res) => {
  const item = contratos.find(
    p => p.ID_Contratos == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Contratos: Date.now(), ...req.body };
  contratos.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = contratos.findIndex(p => p.ID_Contratos == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  contratos[index] = { ...contratos[index], ...req.body };
  res.json({ ok: true, data: contratos[index] });
};

const remove = (req, res) => {
  const index = contratos.findIndex(p => p.ID_Contratos == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = contratos.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
