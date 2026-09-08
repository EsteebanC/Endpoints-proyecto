let marcas = [
  { ID_Marca: 1, ID_Contratos: 1,
    Nombre: "MarcaX",
    Producto: "Ropa deportiva",
    Requisitos: "Mencion en 3 posts" }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: marcas });
};

const getById = (req, res) => {
  const item = marcas.find(
    p => p.ID_Marca == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Marca: Date.now(), ...req.body };
  marcas.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = marcas.findIndex(p => p.ID_Marca == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  marcas[index] = { ...marcas[index], ...req.body };
  res.json({ ok: true, data: marcas[index] });
};

const remove = (req, res) => {
  const index = marcas.findIndex(p => p.ID_Marca == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = marcas.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
