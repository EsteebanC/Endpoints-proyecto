let medios_pago = [
  { ID_Pago: 1, Moneda: "COP",
    Proveedor: "PayU",
    Tipo: "tarjeta",
    ID_Transaccion: 1 }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: medios_pago });
};

const getById = (req, res) => {
  const item = medios_pago.find(
    p => p.ID_Pago == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Pago: Date.now(), ...req.body };
  medios_pago.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = medios_pago.findIndex(p => p.ID_Pago == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  medios_pago[index] = { ...medios_pago[index], ...req.body };
  res.json({ ok: true, data: medios_pago[index] });
};

const remove = (req, res) => {
  const index = medios_pago.findIndex(p => p.ID_Pago == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = medios_pago.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
