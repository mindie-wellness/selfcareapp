# Self-Care MVP (No-Login)

## Quick Deploy (GitHub + Vercel)
1. Create a **Supabase** project → Settings → API → copy **Project URL** and **service_role key**.
2. In Supabase SQL Editor, run the SQL from the guide to create tables.
3. Create a **GitHub** repo and upload this folder.
4. On **Vercel**, import the repo → add env vars:
   - `OPENAI_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Deploy → open the app → it auto-creates `deviceId` and works.

## Local (optional)
```bash
npm install
npm run dev
```

## Notes
- No login. Data is scoped by a deviceId saved in localStorage.
- Keep service_role key **server-side only**.
