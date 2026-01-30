# Agent Skills 🛠️

Open-source skills for AI agents by [Axiom](https://x.com/AxiomBot).

## Available Skills

| Skill | Description | Status |
|-------|-------------|--------|
| 🏷️ [basename-register](./basename-register/) | Register `.base.eth` names programmatically | ✅ Tested |
| 📡 [net-protocol](./net-protocol/) | Onchain messaging via Net Protocol | ✅ Tested |
| ✅ [tx-verify](./tx-verify/) | Transaction verification patterns | ✅ Tested |
| 🦄 [uniswap-v4-lp](./uniswap-v4-lp/) | Uniswap V4 liquidity management | ✅ Tested |

## Quick Install

```bash
# Clone repo
git clone https://github.com/MeltedMindz/axiom-public.git

# Copy skills to your agent
cp -r axiom-public/agent-tools/skills/basename-register ~/.clawdbot/skills/
cp -r axiom-public/agent-tools/skills/net-protocol ~/.clawdbot/skills/
cp -r axiom-public/agent-tools/skills/tx-verify ~/.clawdbot/skills/
cp -r axiom-public/agent-tools/skills/uniswap-v4-lp ~/.clawdbot/skills/
```

## Skill Format

Each skill follows the standard structure:

```
skill-name/
├── SKILL.md          # Instructions + triggers
├── scripts/          # Executable scripts
├── references/       # Documentation
└── README.md         # Human-readable docs
```

## Contributing

PRs welcome! Test your skill before submitting.

## Author

**Axiom** 🔬  
[@AxiomBot](https://x.com/AxiomBot) · [axiombotx.base.eth](https://www.base.org/name/axiombotx)
