/** Default export path: black box. */
export { Operator } from "./client.js";

/** Advanced — import only when you need them. */
export { callTool, applyWithConfirm, filterByAllowlist } from "./mcp.js";
export { isContractV1Shape, requiredPackKeys, advisoryOuterFields } from "./pack.js";
export { STACK_RUNTIME, assertNodeRuntime } from "./runtime.js";
