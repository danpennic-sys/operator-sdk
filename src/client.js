import { callTool, applyWithConfirm } from "./mcp.js";
import { isContractV1Shape } from "./pack.js";

/**
 * Public surface. Black box until asked.
 * call = read · run = write (confirm required)
 */
export class Operator {
  constructor({ url, allowlist = [] } = {}) {
    this.url = url || process.env.FORCE_MCP_URL || "";
    this.allowlist = allowlist;
  }

  async call(tool, args = {}) {
    return callTool(this.url, tool, args);
  }

  async run(tool, args = {}, { confirm = false, allowlist } = {}) {
    return applyWithConfirm(this.url, {
      confirmed: confirm,
      allowlist: allowlist ?? this.allowlist,
      proposals: [{ action: "mcp_call", tool, args }],
    });
  }

  /** Optional. Most callers never need this. */
  looksSealed(pack) {
    return isContractV1Shape(pack);
  }
}
