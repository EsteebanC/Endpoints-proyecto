let transacciones = [
  { ID_Transaccion: 1, ID_Token: 1,
    Monto: 150.5,
    Estado: "completada",
    Fecha: "2026-01-01" }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: transacciones });
};

const getById = (req, res) => {
  const item = transacciones.find(
    p => p.ID_Transaccion == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Transaccion: Date.now(), ...req.body };
  transacciones.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = transacciones.findIndex(p => p.ID_Transaccion == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  transacciones[index] = { ...transacciones[index], ...req.body };
  res.json({ ok: true, data: transacciones[index] });
};

const remove = (req, res) => {
  const index = transacciones.findIndex(p => p.ID_Transaccion == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = transacciones.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
