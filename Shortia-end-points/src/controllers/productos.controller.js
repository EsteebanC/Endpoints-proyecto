let productos = [
  { ID_Producto: 1, ID_Marca: 1,
    Nombre: "ProductoX",
    Descripcion: "Descripcion del producto",
    Precio: 100.0 }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: productos });
};

const getById = (req, res) => {
  const item = productos.find(
    p => p.ID_Producto == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Producto: Date.now(), ...req.body };
  productos.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = productos.findIndex(p => p.ID_Producto == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  productos[index] = { ...productos[index], ...req.body };
  res.json({ ok: true, data: productos[index] });
};

const remove = (req, res) => {
  const index = productos.findIndex(p => p.ID_Producto == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = productos.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
