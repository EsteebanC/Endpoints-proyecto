let personas = [
  { ID_Persona: 1, Edad: 28,
    Genero: "F",
    Pais: "Colombia",
    Nombre: "Ana Perez" }
];

const getAll = (req, res) => {
  res.json({ ok: true, data: personas });
};

const getById = (req, res) => {
  const item = personas.find(
    p => p.ID_Persona == req.params.id
  );
  if (!item) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  res.json({ ok: true, data: item });
};

const create = (req, res) => {
  const nuevo = { ID_Persona: Date.now(), ...req.body };
  personas.push(nuevo);
  res.status(201).json({ ok: true, data: nuevo });
};

const update = (req, res) => {
  const index = personas.findIndex(p => p.ID_Persona == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  personas[index] = { ...personas[index], ...req.body };
  res.json({ ok: true, data: personas[index] });
};

const remove = (req, res) => {
  const index = personas.findIndex(p => p.ID_Persona == req.params.id);
  if (index === -1) return res.status(404)
    .json({ ok: false, msg: 'No encontrado' });
  const eliminado = personas.splice(index, 1);
  res.json({ ok: true, data: eliminado[0] });
};

module.exports = { getAll, getById, create, update, remove };
