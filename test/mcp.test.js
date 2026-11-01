import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { filterByAllowlist, applyWithConfirm } from "../src/mcp.js";

const reg = (agent) => ({
  action: "mcp_call",
  tool: "register_schedule",
  args: { agent_id: agent, schedule_id: agent },
});

describe("mcp gates", () => {
  it("empty allowlist blocks", () => {
    const out = filterByAllowlist([reg("backup")], []);
    assert.equal(out[0].action, "skip");
    assert.equal(out[0].blocked_by_allowlist, true);
  });

  it("allowlist permits", () => {
    const out = filterByAllowlist([reg("backup")], ["backup"]);
    assert.equal(out[0].action, "mcp_call");
  });

  it("apply rejects without confirm", async () => {
    const r = await applyWithConfirm("http://127.0.0.1:9", {
      confirmed: false,
      proposals: [reg("a")],
      allowlist: ["a"],
    });
    assert.equal(r.status, "rejected");
    assert.equal(r.applied.length, 0);
  });
});
