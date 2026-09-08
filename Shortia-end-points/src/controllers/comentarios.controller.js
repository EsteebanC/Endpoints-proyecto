let comentarios = [
  { ID_Comentario: 1, ID_Usuario: 1,
    ID_Publicacion: 1,
    Contenido: "Excelente contenido",
    Fecha: "2026-01-06" }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: comentarios });
};

const getById = (req, res) => {
  const item = comentarios.find(
    p => p.ID_Comentario == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Comentario: Date.now(), ...req.body };
  comentarios.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = comentarios.findIndex(p => p.ID_Comentario == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  comentarios[index] = { ...comentarios[index], ...req.body };
  res.json({ ok: true, data: comentarios[index] });
};

const remove = (req, res) => {
  const index = comentarios.findIndex(p => p.ID_Comentario == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = comentarios.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
