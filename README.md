# @op/sdk — Operator Pages SDK

Shared client for Operator Pages control plane and evidence helpers.

**Runtime:** Node.js **26+** (stack standard). See [STACK_RUNTIME](https://github.com/danpennic-sys/op-landing/blob/main/docs/STACK_RUNTIME.md).

## Install

```bash
npm install github:danpennic-sys/operator-sdk
# or clone and link
```

## Modules

| Export | Purpose |
|--------|--------|
| `@op/sdk` | Barrel: MCP + pack + runtime |
| `@op/sdk/mcp` | HTTP MCP tool client (propose → confirm → apply pattern) |
| `@op/sdk/pack` | CONTRACT-v1 pack shape helpers (hash/normalize checks) |
| `@op/sdk/runtime` | Declared stack floors (node/go/python) |

## MCP quick start

```js
import { callTool, applyWithConfirm } from "@op/sdk/mcp";

const base = process.env.FORCE_MCP_URL || "http://127.0.0.1:8787";

// Read-only tool
const health = await callTool(base, "list_schedules", {});

// Write path: never apply unless confirmed === true
const result = await applyWithConfirm(base, {
  confirmed: true,
  proposals: [
    {
      action: "mcp_call",
      tool: "register_schedule",
      args: { schedule_id: "backup", agent_id: "backup", kind: "interval", expression: "60", enabled: true },
    },
  ],
});
```

Safety gates match `@op/ops` / FORCE:

1. `confirmRequired` is always true for writes  
2. Empty allowlist blocks write tools  
3. MCP down → structured offline error  

## Pack helpers

```js
import { isContractV1Shape, requiredPackKeys } from "@op/sdk/pack";

const pack = JSON.parse(await fs.readFile("sealed.json", "utf8"));
if (!isContractV1Shape(pack)) throw new Error("not CONTRACT-v1");
// Verify signatures with QuantumGuard `qg verify`, not this SDK.
```

## Doctrine

Local-first. Deterministic. Proof over claims. This SDK does **not** reimplement QuantumGuard cryptography — it only helps call MCP and inspect pack *shape*.

## License

MIT
