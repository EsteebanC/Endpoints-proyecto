# taller-git-colaborativo

## Despliegue

- **Backend:** Render (`Backend/`), variables en el panel de Render. El CORS permite
  dominios `*.vercel.app` y los definidos en `FRONTEND_URL`.
- **Frontend:** Vercel (carpeta `Frontend/`).

### Vercel

La forma recomendada es dejar **Root Directory** apuntando a `Frontend` en
**Settings → General**, con estos valores:

| Ajuste            | Valor                          |
| ----------------- | ------------------------------ |
| Framework Preset  | Vite                           |
| Install Command   | `npm install --include=dev`    |
| Build Command     | `npm run build`                |
| Output Directory  | `dist`                         |

También funciona con **Root Directory** en `./`: el `vercel.json` de la raíz
construye `Frontend/` y publica `Frontend/dist`.

Variable obligatoria en Vercel (**Settings → Environment Variables**):

```
VITE_API_URL=https://endpoints-proyecto.onrender.com/api
```

Sin ella, el build usa `http://localhost:3000/api` y el navegador falla al
registrarse o iniciar sesión en producción.
