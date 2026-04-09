# APEX OPTIONS — System Architecture Plan

## 🏗️ Overview

**APEX OPTIONS** is a high-performance Binary Options Trading Platform built with a modern, enterprise-grade tech stack. The platform features a real-time trading terminal, secure user authentication, multi-currency wallet, and a comprehensive admin panel.

---

## 📐 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, Glassmorphism Design System |
| Animations | Framer Motion (UI transitions), GSAP (chart animations) |
| Charts | Lightweight Charts (TradingView) |
| State Management | Zustand (client state), React Query (server state) |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL (via Prisma ORM) |
| Cache | Redis (sessions, real-time data) |
| Real-Time | Socket.io / WebSockets |
| Auth | JWT (Access + Refresh tokens), bcrypt |
| Validation | Zod (shared schemas) |
| Payments | Stripe, PayPal, Web3/Coinbase Commerce |

---

## 🧱 Architecture Pattern

```
┌─────────────────────────────────────────────────┐
│                   CLIENT (Next.js)              │
│  ┌───────────┐ ┌──────────┐ ┌────────────────┐  │
│  │  Trading   │ │Dashboard │ │  Admin Panel   │  │
│  │  Terminal  │ │  & Wallet│ │  (God-Mode)    │  │
│  └─────┬─────┘ └────┬─────┘ └───────┬────────┘  │
│        │             │               │            │
│  ┌─────┴─────────────┴───────────────┴─────────┐ │
│  │        Zustand Store + React Query           │ │
│  └─────────────────┬───────────────────────────┘ │
└────────────────────┼─────────────────────────────┘
                     │ REST API + WebSocket
┌────────────────────┼─────────────────────────────┐
│                    │     SERVER (Express)         │
│  ┌─────────────────┴───────────────────────────┐ │
│  │           API Gateway / Router              │ │
│  └──┬──────┬──────┬──────┬──────┬─────────────┘ │
│     │      │      │      │      │               │
│  ┌──┴──┐┌──┴──┐┌──┴──┐┌──┴──┐┌──┴──┐           │
│  │Auth ││Trade││User ││Admin││Wallet│           │
│  │Ctrl ││Ctrl ││Ctrl ││Ctrl ││Ctrl  │           │
│  └──┬──┘└──┬──┘└──┬──┘└──┬──┘└──┬──┘           │
│     │      │      │      │      │               │
│  ┌──┴──────┴──────┴──────┴──────┴─────────────┐ │
│  │          Service Layer (Business Logic)     │ │
│  └──┬─────────────────────────────────────────┘ │
│     │                                           │
│  ┌──┴──────────────┐  ┌────────────────────┐    │
│  │  Prisma (PG)    │  │  Redis Cache       │    │
│  │  Users, Trades  │  │  Sessions, Prices  │    │
│  │  Wallets, Assets│  │  Active Trades     │    │
│  └─────────────────┘  └────────────────────┘    │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │     Socket.io Server (Real-Time Engine)  │    │
│  │  • Live price feeds                      │    │
│  │  • Trade execution notifications         │    │
│  │  • Active trade updates                  │    │
│  └──────────────────────────────────────────┘    │
└──────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
APEXOPTION/
├── client/                          # Next.js Frontend
│   ├── public/                      # Static assets (logos, icons)
│   ├── src/
│   │   ├── app/                     # Next.js App Router
│   │   │   ├── (auth)/              # Auth route group
│   │   │   │   ├── login/page.tsx
│   │   │   │   └── register/page.tsx
│   │   │   ├── (dashboard)/         # User dashboard route group
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── wallet/page.tsx
│   │   │   │   ├── history/page.tsx
│   │   │   │   └── profile/page.tsx
│   │   │   ├── (trading)/           # Trading terminal route group
│   │   │   │   └── trade/page.tsx
│   │   │   ├── (admin)/             # Admin panel route group
│   │   │   │   └── admin/
│   │   │   │       ├── page.tsx     # Admin overview
│   │   │   │       ├── users/page.tsx
│   │   │   │       ├── finance/page.tsx
│   │   │   │       ├── assets/page.tsx
│   │   │   │       └── risk/page.tsx
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── page.tsx             # Landing page
│   │   │   └── globals.css          # Global styles
│   │   ├── components/
│   │   │   ├── ui/                  # Reusable UI primitives
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── GlassPanel.tsx
│   │   │   ├── layout/             # Layout components
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── MobileNav.tsx
│   │   │   ├── trading/            # Trading-specific components
│   │   │   │   ├── TradingChart.tsx
│   │   │   │   ├── OrderPanel.tsx
│   │   │   │   ├── ActiveTrades.tsx
│   │   │   │   ├── TradeHistory.tsx
│   │   │   │   └── AssetSelector.tsx
│   │   │   ├── dashboard/          # Dashboard components
│   │   │   │   ├── WalletCard.tsx
│   │   │   │   ├── BalanceChart.tsx
│   │   │   │   └── RecentTrades.tsx
│   │   │   ├── admin/              # Admin panel components
│   │   │   │   ├── StatsGrid.tsx
│   │   │   │   ├── UserTable.tsx
│   │   │   │   └── WithdrawalQueue.tsx
│   │   │   ├── auth/               # Auth form components
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   └── animations/         # Animation wrappers
│   │   │       ├── FadeIn.tsx
│   │   │       ├── SlideIn.tsx
│   │   │       ├── PageTransition.tsx
│   │   │       └── TradeResult.tsx
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useSocket.ts
│   │   │   ├── useTrade.ts
│   │   │   └── useWallet.ts
│   │   ├── store/                  # Zustand stores
│   │   │   ├── authStore.ts
│   │   │   ├── tradeStore.ts
│   │   │   └── uiStore.ts
│   │   ├── lib/                    # Utility functions
│   │   │   ├── api.ts              # Axios instance
│   │   │   ├── socket.ts           # Socket.io client
│   │   │   ├── utils.ts            # Helper functions
│   │   │   └── constants.ts        # App constants
│   │   ├── types/                  # TypeScript type definitions
│   │   │   └── index.ts
│   │   └── styles/                 # Additional styles
│   │       └── animations.css
│   ├── tailwind.config.ts
│   ├── next.config.ts
│   └── package.json
│
├── server/                          # Express Backend
│   ├── prisma/
│   │   └── schema.prisma           # Database schema
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts         # Prisma client singleton
│   │   │   ├── redis.ts            # Redis client config
│   │   │   └── env.ts              # Environment variables
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── tradeController.ts
│   │   │   ├── userController.ts
│   │   │   ├── walletController.ts
│   │   │   └── adminController.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── tradeRoutes.ts
│   │   │   ├── userRoutes.ts
│   │   │   ├── walletRoutes.ts
│   │   │   └── adminRoutes.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts             # JWT verification
│   │   │   ├── admin.ts            # Admin role guard
│   │   │   ├── rateLimiter.ts      # Rate limiting
│   │   │   ├── errorHandler.ts     # Global error handler
│   │   │   └── validate.ts         # Zod validation middleware
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── tradeService.ts
│   │   │   ├── userService.ts
│   │   │   ├── walletService.ts
│   │   │   └── priceService.ts
│   │   ├── sockets/
│   │   │   ├── index.ts            # Socket.io server setup
│   │   │   ├── priceFeeds.ts       # Real-time price streaming
│   │   │   └── tradeEvents.ts      # Trade execution events
│   │   ├── validators/
│   │   │   ├── authSchemas.ts
│   │   │   ├── tradeSchemas.ts
│   │   │   └── walletSchemas.ts
│   │   ├── utils/
│   │   │   ├── jwt.ts              # JWT helper functions
│   │   │   ├── errors.ts           # Custom error classes
│   │   │   └── helpers.ts          # General helpers
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts                # Server entry point
│   ├── tsconfig.json
│   └── package.json
│
├── shared/                          # Shared types & constants
│   ├── types/
│   │   └── index.ts
│   └── constants/
│       └── index.ts
│
├── ARCHITECTURE.md                  # This file
└── README.md
```

---

## 🔐 Database Schema (Prisma)

### Core Models:
- **User** — id, email, password, name, role (USER/ADMIN), kycStatus, avatar, balance, demoBalance, createdAt
- **Trade** — id, userId, asset, direction (CALL/PUT), amount, entryPrice, exitPrice, expiresAt, result (WIN/LOSS/PENDING), payout, createdAt
- **Wallet** — id, userId, currency, balance
- **Transaction** — id, userId, type (DEPOSIT/WITHDRAWAL), amount, status (PENDING/APPROVED/REJECTED), method, createdAt
- **Asset** — id, symbol, name, type (FOREX/CRYPTO/COMMODITY), isActive, payoutPercentage
- **Session** — id, userId, token, expiresAt

---

## 🚀 Build Phases

### Phase 1: UI/UX Shell & Authentication ← CURRENT
- Project scaffolding and folder structure
- Design system (dark theme, glassmorphism, animations)
- Landing page with Framer Motion animations
- Auth pages (Login/Register) with form validation
- JWT authentication backend
- Layout shells for Trading, Dashboard, Admin

### Phase 2: Trading Terminal
- Real-time candlestick charts (Lightweight Charts)
- One-click Call/Put execution
- Expiration time & amount controls
- Active trades panel
- Socket.io price feed integration

### Phase 3: User Dashboard & Wallet
- Balance overview with charts
- Deposit/Withdrawal flows
- Transaction history
- Demo account toggle
- KYC verification upload

### Phase 4: Admin Panel (God-Mode)
- Platform analytics dashboard
- User management (KYC, bans, balance adjustments)
- Financial control (withdrawal approvals)
- Risk management settings
- Asset management

### Phase 5: Real-Time Engine & Polish
- Socket.io live price streaming
- Trade settlement engine
- Win/Loss animations
- Performance optimization
- Security hardening
