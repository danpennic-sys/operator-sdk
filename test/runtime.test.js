import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { STACK_RUNTIME, assertNodeRuntime } from "../src/runtime.js";

describe("runtime", () => {
  it("declares node >=26", () => {
    assert.equal(STACK_RUNTIME.node, ">=26");
    assert.equal(STACK_RUNTIME.go, "1.26");
  });

  it("assertNodeRuntime accepts current process", () => {
    assert.equal(assertNodeRuntime(), true);
  });
});
