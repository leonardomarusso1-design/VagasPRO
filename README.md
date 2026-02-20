Projeto Next.js (App Router) para o VagasPRO.

## Getting Started

Instalação:

```bash
npm install --legacy-peer-deps
cp .env.example .env.local
```

Configure suas variáveis em `.env.local`.

Desenvolvimento:

```bash
npm run dev
```

## Learn More

Principais pontos:

- App principal está em [page.tsx](file:///c:/Users/Leonardo/Desktop/VagasPRO%20-%20v.%202/vagaspro-next/app/page.tsx).
- Template de currículo em [ResumeTemplate.tsx](file:///c:/Users/Leonardo/Desktop/VagasPRO%20-%20v.%202/vagaspro-next/src/components/ResumeTemplate.tsx).
- Integração Gemini em [gemini.ts](file:///c:/Users/Leonardo/Desktop/VagasPRO%20-%20v.%202/vagaspro-next/lib/gemini.ts).
- API de Checkout Stripe em [route.ts](file:///c:/Users/Leonardo/Desktop/VagasPRO%20-%20v.%202/vagaspro-next/app/api/checkout/route.ts).

Deploy:

## Deploy on Vercel

1. Configure `NEXT_PUBLIC_GEMINI_API_KEY`, `STRIPE_SECRET_KEY`, `NEXTAUTH_URL` nas Environment Variables do projeto.
2. Faça deploy com GitHub conectando ao repositório.
3. Verifique logs do build e das rotas de API.

Stripe:

- Use a rota `POST /api/checkout` com body `{ "plan": "PRO" | "BASIC", "hasBump": boolean }`.
- A resposta traz `url` para redirecionar ao Stripe Checkout.
