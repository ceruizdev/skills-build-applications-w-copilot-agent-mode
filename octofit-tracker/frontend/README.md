# OctoFit Tracker frontend

The React 19 presentation tier uses Vite, Bootstrap and `react-router-dom`.

## API configuration

Define `VITE_CODESPACE_NAME` in `.env.local` before starting Vite. The value must be the Codespaces name without the `-8000.app.github.dev` suffix:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app then calls `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/...`. When the variable is unset, it safely falls back to `http://localhost:8000/api/...`.

Run the presentation tier with:

```bash
npm run dev
```
