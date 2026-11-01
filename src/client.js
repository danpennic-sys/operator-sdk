import { callTool, applyWithConfirm, filterByAllowlist } from "./mcp.js";
import { isContractV1Shape } from "./pack.js";

/**
 * One object. Most callers never need the lower modules.
 *
 *   const op = new Operator({ url: process.env.FORCE_MCP_URL })
 *   await op.call("list_schedules")
 *   await op.run("register_schedule", { ... }, { confirm: true })
 */
export class Operator {
  constructor({ url, allowlist = [] } = {}) {
    this.url = url || process.env.FORCE_MCP_URL || "";
    this.allowlist = allowlist;
  }

  /** Read / any tool without write gate. */
  async call(tool, args = {}) {
    return callTool(this.url, tool, args);
  }

  /**
   * Write path. Pass { confirm: true } or it no-ops.
   * allowlist inherited from constructor unless overridden.
   */
  async run(tool, args = {}, { confirm = false, allowlist } = {}) {
    const list = allowlist ?? this.allowlist;
    return applyWithConfirm(this.url, {
      confirmed: confirm,
      allowlist: list,
      proposals: [{ action: "mcp_call", tool, args }],
    });
  }

  /** True if JSON looks like a QuantumGuard CONTRACT-v1 pack (shape only). */
  looksSealed(pack) {
    return isContractV1Shape(pack);
  }
}

export { callTool, applyWithConfirm, filterByAllowlist, isContractV1Shape };
