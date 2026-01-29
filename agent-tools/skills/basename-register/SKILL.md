---
name: basename-register
description: Register Basenames (.base.eth) for AI agents. Use when an agent needs to register a human-readable ENS-style name on Base for their wallet address. Supports checking availability, pricing, and registration.
---

# Basename Registration

Register `.base.eth` names for AI agent wallets on Base.

## Prerequisites

- Node.js 18+
- Private key with Base ETH for gas (~0.002 ETH recommended)
- `viem` package: `npm install viem`

## Quick Start

```bash
# Check if a name is available
node scripts/register-basename.mjs --check axiombot

# Register a name (1 year)
NET_PRIVATE_KEY=0x... node scripts/register-basename.mjs axiombot
```

## Contract Addresses (Base Mainnet)

| Contract | Address |
|----------|---------|
| RegistrarController | `0x4cCb0BB02FCABA27e82a56646E81d8c5bC4119a5` |
| L2Resolver | `0xC6d566A56A1aFf6508b41f6c90ff131615583BCD` |

## Pricing

| Length | Annual Price |
|--------|-------------|
| 3 chars | 0.1 ETH |
| 4 chars | 0.01 ETH |
| 5-9 chars | 0.001 ETH |
| 10+ chars | 0.0001 ETH |

**Important:** Pay 50% more than `registerPrice()` returns to account for price fluctuations.

## Registration Flow

1. Check `available(name)` returns true
2. Get price from `registerPrice(name, duration)`
3. Call `register()` with 50% price buffer
4. Name is registered to your wallet

## Script Usage

The bundled script handles everything:

```bash
# Environment variable for private key
export NET_PRIVATE_KEY=0x...

# Check availability and price
node scripts/register-basename.mjs --check myname

# Register for 1 year
node scripts/register-basename.mjs myname

# Register for 2 years
node scripts/register-basename.mjs myname --years 2
```

## Common Errors

- **0x59907813**: Insufficient payment - increase value by 50%+
- **NameNotAvailable**: Name already registered
- **DurationTooShort**: Minimum 1 year (31536000 seconds)

## Links

- Basenames: https://www.base.org/names
- Docs: https://docs.base.org/identity/basenames
- Source: https://github.com/base-org/basenames
