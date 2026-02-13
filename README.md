# Luminary — AI Email Agent

A production-ready AI email agent built with Next.js App Router, OpenAI GPT-4o, and Gmail API.

## Features

- **AI Draft Generation** — Describe your topic, GPT-4o writes the email
- **Draft Editing** — Review and edit before sending
- **Gmail Integration** — Sends via OAuth2 through your Gmail account
- **Premium UI** — Dark mode, glassmorphism, Framer Motion animations

## Quick Start

```bash
# Install dependencies
npm install

# Copy env template and fill in your keys
cp .env.example .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file:

```
OPENAI_API_KEY=sk-...
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token
```

## Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the **Gmail API**
4. Go to **APIs & Services → Credentials**
5. Create an **OAuth 2.0 Client ID** (Web application)
   - Add `https://developers.google.com/oauthplayground` as an authorized redirect URI
6. Note your **Client ID** and **Client Secret**
7. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
   - Click the gear icon → Check "Use your own OAuth credentials"
   - Enter your Client ID and Secret
   - In Step 1, select `https://mail.google.com/`
   - Authorize and exchange for tokens
   - Copy the **Refresh Token**

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Add your environment variables in Vercel dashboard → Settings → Environment Variables.

## Tech Stack

| Layer     | Technology            |
| --------- | --------------------- |
| Framework | Next.js 15 App Router |
| AI        | OpenAI GPT-4o         |
| Email     | Gmail API (OAuth2)    |
| Styling   | Tailwind CSS v4       |
| Animation | Framer Motion         |
| Language  | TypeScript            |

## Folder Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate-draft/
│   │   │   └── route.ts       # OpenAI draft generation
│   │   └── send-email/
│   │       └── route.ts       # Gmail API send
│   ├── globals.css            # Design system
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page (state machine)
└── components/
    ├── ComposeForm.tsx        # Email compose form
    ├── DraftPreview.tsx       # Editable draft preview
    ├── ErrorDisplay.tsx       # Error state
    └── SuccessView.tsx        # Success animation
```