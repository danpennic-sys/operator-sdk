/** Operator Pages stack runtime floors (2026-11-01). */
export const STACK_RUNTIME = Object.freeze({
  node: ">=26",
  go: "1.26",
  python: ">=3.12",
  rust_msrv: ">=1.85",
  actions: Object.freeze({
    checkout: "v4",
    setup_node: "v4",
    setup_go: "v5",
    setup_python: "v5",
  }),
});

export function assertNodeRuntime(version = process.versions.node) {
  const major = Number(String(version).split(".")[0]);
  if (!Number.isFinite(major) || major < 26) {
    throw new Error(`@op/sdk requires Node.js >= 26 (got ${version})`);
  }
  return true;
}
