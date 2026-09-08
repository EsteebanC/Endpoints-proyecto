let estadisticas = [
  { ID_Estadisticas: 1, Total_Likes: 0,
    Total_Comentarios: 0,
    Total_Publicaciones: 0,
    Numero_Seguidores: 0,
    Numero_Compartidos: 0,
    ID_Publicacion: 1 }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: estadisticas });
};

const getById = (req, res) => {
  const item = estadisticas.find(
    p => p.ID_Estadisticas == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Estadisticas: Date.now(), ...req.body };
  estadisticas.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = estadisticas.findIndex(p => p.ID_Estadisticas == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  estadisticas[index] = { ...estadisticas[index], ...req.body };
  res.json({ ok: true, data: estadisticas[index] });
};

const remove = (req, res) => {
  const index = estadisticas.findIndex(p => p.ID_Estadisticas == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = estadisticas.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
