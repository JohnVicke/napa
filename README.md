# Not another productivity application

## Getting started

### Prerequesits

- Supabase
- Docker
- node (16.16.0)

## Install

1. Clone repo

```bash
gh repo clone JohnVicke/time-keeper
```

2. Setup environment ([Google credentials](https://console.cloud.google.com/)).

```bash
cat .env.example > .env
```

3. Install dependancies

```bash
nvm use && npm i
```

4. Migrate db

```bash
npx prisma migrate dev
```

5.  Populate db (_optional_):

```bash
npm run ts-node ./scripts/generate-db.ts
```

## Run

```bash
npm run dev
```
