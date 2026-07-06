# React + Vite

This frontend uses React 19, Vite, Bootstrap, and react-router-dom for the OctoFit Tracker experience.

## Environment configuration

The presentation tier reads the backend URL from Vite environment variables. Define VITE_CODESPACE_NAME in a local environment file such as .env.local before running the dev server:

```bash
cp .env.local.example .env.local
```

Example:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When VITE_CODESPACE_NAME is not set, the app falls back to http://127.0.0.1:8000/api for local development.
