import { PAISES } from '../constants/paises'

export default function PaisSelect({
  id = 'Pais',
  name = 'Pais',
  value,
  onChange,
  required = true,
  incluirActual = false,
}) {
  const mostrarActual = incluirActual && value && !PAISES.includes(value)

  return (
    <select
      id={id}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>
        Selecciona un país
      </option>
      {mostrarActual && <option value={value}>{value}</option>}
      {PAISES.map((pais) => (
        <option key={pais} value={pais}>
          {pais}
        </option>
      ))}
    </select>
  )
}
