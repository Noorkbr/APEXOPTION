# APEX OPTIONS

Professional Binary Options Trading Platform built with Next.js, Express, TypeScript, and PostgreSQL.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Animations:** Framer Motion, GSAP
- **Charts:** Lightweight Charts (TradingView)
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL (Prisma ORM), Redis
- **Real-Time:** Socket.io / WebSockets
- **Auth:** JWT (Access + Refresh tokens)
- **Validation:** Zod

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Redis (optional, for caching)

### Installation

```bash
# Install frontend dependencies
cd client && npm install

# Install backend dependencies
cd ../server && npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

### Development

```bash
# Start frontend (port 3000)
cd client && npm run dev

# Start backend (port 5000)
cd server && npm run dev
```

## Project Structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full details.

## Features

- 🎯 Real-time trading terminal with candlestick charts
- 📊 Technical indicators (RSI, MA, Bollinger Bands)
- ⚡ One-click Call/Put execution
- 💰 Multi-currency wallet (Fiat + Crypto)
- 🛡️ JWT authentication with KYC verification
- 👑 God-Mode admin panel
- 🎨 Dark theme with glassmorphism UI
- ✨ Smooth Framer Motion animations