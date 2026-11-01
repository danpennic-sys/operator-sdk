# @op/sdk

Talk to Operator Pages. That’s the whole public story.

```bash
npm install github:danpennic-sys/operator-sdk
```

```js
import { Operator } from "@op/sdk";

const op = new Operator({ url: process.env.FORCE_MCP_URL });

await op.call("list_schedules");           // read
await op.run("register_schedule", args, { confirm: true }); // write
```

Writes do nothing without `{ confirm: true }`.

Need internals (pack shape, runtime floors, raw MCP)? Ask — or open `src/`. Not required to ship.

Node 26+ · MIT
