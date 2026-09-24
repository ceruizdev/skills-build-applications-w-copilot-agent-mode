# OctoFit Tracker frontend

The React 19 presentation tier uses Vite, Bootstrap and `react-router-dom`.

## API configuration

Define `VITE_CODESPACE_NAME` in `.env.local` before starting Vite. The value must be the Codespaces name without the `-8000.app.github.dev` suffix:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app calls `/api/...` on the presentation origin, for example `https://${VITE_CODESPACE_NAME}-5173.app.github.dev/api/activities`. Vite proxies these requests to the backend on port `8000`, so the browser does not need to call the backend origin directly.

Run the presentation tier with:

```bash
npm run dev
```
