import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isContractV1Shape } from "../src/pack.js";

describe("pack shape", () => {
  it("accepts minimal CONTRACT-v1",
    () => {
      assert.equal(
        isContractV1Shape({
          version: "1.0",
          payload: {},
          payload_hash: "a".repeat(64),
          signature: "sig",
          public_key: "pk",
          alg: "Ed25519",
        }),
        true,
      );
    },
  );

  it("rejects missing signature", () => {
    assert.equal(
      isContractV1Shape({
        version: "1.0",
        payload: {},
        payload_hash: "a".repeat(64),
        public_key: "pk",
        alg: "Ed25519",
      }),
      false,
    );
  });
});
