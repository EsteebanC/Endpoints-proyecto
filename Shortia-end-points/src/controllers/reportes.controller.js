let reportes = [
  { ID_Reporte: 1, ID_Estadisticas: 1 }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: reportes });
};

const getById = (req, res) => {
  const item = reportes.find(
    p => p.ID_Reporte == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Reporte: Date.now(), ...req.body };
  reportes.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = reportes.findIndex(p => p.ID_Reporte == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  reportes[index] = { ...reportes[index], ...req.body };
  res.json({ ok: true, data: reportes[index] });
};

const remove = (req, res) => {
  const index = reportes.findIndex(p => p.ID_Reporte == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = reportes.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
