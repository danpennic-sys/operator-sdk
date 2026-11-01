import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Operator } from "../src/client.js";

describe("Operator", () => {
  it("run without confirm rejects", async () => {
    const op = new Operator({ url: "http://127.0.0.1:9", allowlist: ["a"] });
    const r = await op.run("register_schedule", { agent_id: "a" }, { confirm: false });
    assert.equal(r.status, "rejected");
  });

  it("looksSealed checks shape", () => {
    const op = new Operator();
    assert.equal(op.looksSealed(null), false);
    assert.equal(
      op.looksSealed({
        version: "1",
        payload: {},
        payload_hash: "x".repeat(64),
        signature: "s",
        public_key: "p",
        alg: "Ed25519",
      }),
      true,
    );
  });
});
