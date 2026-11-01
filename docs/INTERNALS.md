# Internals (only if you asked)

| Module | Role |
|--------|------|
| `src/mcp.js` | HTTP MCP client, allowlist, confirm gate |
| `src/pack.js` | CONTRACT-v1 **shape** only — not signature verify |
| `src/runtime.js` | Stack floors (Node 26, Go 1.26, …) |

Signature verification stays with QuantumGuard (`qg verify`). This SDK does not reimplement crypto.

Safety gates (always on for `run`):

1. No `confirm: true` → no write  
2. Empty allowlist (when set) → skip agent tools  
3. MCP down → structured offline error  
