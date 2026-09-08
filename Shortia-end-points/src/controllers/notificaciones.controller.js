let notificaciones = [
  { ID_Notificacion: 1, ID_Usuario: 1,
    Fecha: "2026-01-06",
    Tipo: "comentario",
    Estado: "no_leida" }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: notificaciones });
};

const getById = (req, res) => {
  const item = notificaciones.find(
    p => p.ID_Notificacion == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Notificacion: Date.now(), ...req.body };
  notificaciones.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = notificaciones.findIndex(p => p.ID_Notificacion == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  notificaciones[index] = { ...notificaciones[index], ...req.body };
  res.json({ ok: true, data: notificaciones[index] });
};

const remove = (req, res) => {
  const index = notificaciones.findIndex(p => p.ID_Notificacion == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = notificaciones.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
