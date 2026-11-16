# Audiophile

Storefront for headphones, speakers, and earphones. The shop is a Next.js app. Accounts, checkout orders, and authentication live in a NestJS API.

Live site: [audiophile-prod.netlify.app](https://audiophile-prod.netlify.app/)

## Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=zustand&logoColor=white)

- Next.js 16 and React 19 for the storefront
- NestJS 12 for the API
- PostgreSQL and Prisma
- JWT in an httpOnly cookie
- Google sign-in and email/password accounts
- Tailwind CSS for components and Zustand for the cart

## Features

- Product pages for headphones, speakers, and earphones
- Cart and checkout
- Sign in with Google, or create an account with email and password
- Account page with saved address and order history
- Four orders per page, with the option to delete an order that is still pending or processing
- Delete the account, including its orders
