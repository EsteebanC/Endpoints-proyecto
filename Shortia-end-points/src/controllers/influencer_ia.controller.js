let influencer_ia = [
  { ID_IA: 1, Nombre: "Sofia IA",
    Descripcion: "Influencer virtual de moda",
    Algoritmo: "GAN-v3",
    Fecha_Creacion: "2026-01-01",
    ID_Agencia: 1 }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: influencer_ia });
};

const getById = (req, res) => {
  const item = influencer_ia.find(
    p => p.ID_IA == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_IA: Date.now(), ...req.body };
  influencer_ia.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = influencer_ia.findIndex(p => p.ID_IA == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  influencer_ia[index] = { ...influencer_ia[index], ...req.body };
  res.json({ ok: true, data: influencer_ia[index] });
};

const remove = (req, res) => {
  const index = influencer_ia.findIndex(p => p.ID_IA == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = influencer_ia.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
