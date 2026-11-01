/** QuantumGuard CONTRACT-v1 pack shape helpers (no crypto). */

export const requiredPackKeys = Object.freeze([
  "version",
  "payload",
  "payload_hash",
  "signature",
  "public_key",
  "alg",
]);

export function isContractV1Shape(pack) {
  if (!pack || typeof pack !== "object") return false;
  for (const k of requiredPackKeys) {
    if (!(k in pack)) return false;
  }
  if (pack.alg !== "Ed25519" && pack.alg !== "ed25519") return false;
  if (typeof pack.payload_hash !== "string" || pack.payload_hash.length < 32) return false;
  if (typeof pack.signature !== "string" || !pack.signature) return false;
  if (typeof pack.public_key !== "string" || !pack.public_key) return false;
  return true;
}

/** Outer advisory fields that must NOT be treated as signed. */
export const advisoryOuterFields = Object.freeze(["sealed_at", "notes", "operator"]);
