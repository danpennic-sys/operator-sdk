# @op/sdk

Operator Pages client. **One class for almost everything.**

```bash
npm install github:danpennic-sys/operator-sdk
```

```js
import { Operator } from "@op/sdk";

const op = new Operator({ url: process.env.FORCE_MCP_URL });

// Read
await op.call("list_schedules");

// Write (must confirm)
await op.run("register_schedule", { schedule_id: "backup", agent_id: "backup", kind: "interval", expression: "60", enabled: true }, { confirm: true });

// Sealed pack? (shape only — use `qg verify` for signatures)
op.looksSealed(JSON.parse(fs.readFileSync("sealed.json", "utf8")));
```

Requires **Node 26+**. Writes without `confirm: true` do nothing. Empty allowlist blocks agent writes when you set `allowlist` on the constructor.

Advanced modules (`mcp`, `pack`, `runtime`) stay available; most apps never import them.

MIT · [Operator Pages](https://github.com/danpennic-sys)
