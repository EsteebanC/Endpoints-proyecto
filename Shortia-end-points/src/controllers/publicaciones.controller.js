let publicaciones = [
  { ID_Publicacion: 1, Tipo_publicacion: "reel",
    Fecha_Publicacion: "2026-01-05",
    Descripcion: "Lanzamiento",
    Numero_likes: 0,
    Numero_comentarios: 0,
    ID_Multimedia: 1 }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: publicaciones });
};

const getById = (req, res) => {
  const item = publicaciones.find(
    p => p.ID_Publicacion == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Publicacion: Date.now(), ...req.body };
  publicaciones.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = publicaciones.findIndex(p => p.ID_Publicacion == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  publicaciones[index] = { ...publicaciones[index], ...req.body };
  res.json({ ok: true, data: publicaciones[index] });
};

const remove = (req, res) => {
  const index = publicaciones.findIndex(p => p.ID_Publicacion == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = publicaciones.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
