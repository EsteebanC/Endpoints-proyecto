let multimedia = [
  { ID_Multimedia: 1, ID_Categoria: 1,
    ID_IA: 1,
    Tamaño: 2048,
    Duracion: 30,
    Tipo: "video",
    URL: "https://cdn.shortia.com/v1.mp4",
    Formato: "mp4" }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: multimedia });
};

const getById = (req, res) => {
  const item = multimedia.find(
    p => p.ID_Multimedia == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Multimedia: Date.now(), ...req.body };
  multimedia.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = multimedia.findIndex(p => p.ID_Multimedia == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  multimedia[index] = { ...multimedia[index], ...req.body };
  res.json({ ok: true, data: multimedia[index] });
};

const remove = (req, res) => {
  const index = multimedia.findIndex(p => p.ID_Multimedia == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = multimedia.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
