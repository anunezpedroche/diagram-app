# Diagram App

This is a technical test, made using this technologies:

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Tldraw](https://tldraw.com/)
- [Shadcn](https://ui.shadcn.com/)

## Setting up application

Create at root folder a .env file, then copy content from .env.example to .env.

### With Docker

If you have been installed Docker, just run next command:

```powershell
docker compose --env-file .env up --build
```

### Without Docker

If you haven't been installed Docker, then you need to execute next commands:

First, we create our database executing next command:

```powershell
npm run db:push
```

After that, we can run our development server using:

```powershell
npm run dev
```

### Additional information (important)

Before test this application, you need to create an account (don't worry, no personal data stored, just test purpose).

Navigate to /signup page, or, click on Link under login button to navigate to register page.
