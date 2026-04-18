# Allset

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). 
It is built as a Next.js App Router application with SSR (Server-Side Rendering) and SSG (Static Site Generation) support, and includes multi-language support via [`next-intl`](https://next-intl.dev/)

---

## Features

- **User Authentication** via [Auth0](https://auth0.com/docs/quickstart/spa/react)
- **Invitation management** create, edit, and manage invitations with draft, active, and expired states.
<!-- - **Image upload** directly to AWS S3.
- **Data Lifecycle Management**: all invitation-related data, including images, remain available until the invitation expires; expired content is cleaned up automatically via a cron job. -->
- **Responsive UI** using [Chakra UI](https://chakra-ui.com)
- **Data fetching & caching** with [React Query](https://tanstack.com/query) & [Axios](https://axios-http.com/docs/intro)
- **Date handling** via [date-fns](https://date-fns.org)
- **Interactive components** like swipersliders and day pickers 
- **Multi-language support** with [next-intl](https://next-intl-docs.vercel.app)
- **Animations** via [Framer Motion](https://www.framer.com/motion/)

---

## Getting Started

### Install Dependencies

```bash
npm i
# or
yarn i
# or
pnpm i
# or
bun i
```

### Local Run

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Build

```bash
npm run build
# or
yarn build
# or
pnpm duild
# or
bun build
```