/**
 * Operator Pages MCP HTTP client.
 * Writes must go through applyWithConfirm — never fire tools without confirmed: true.
 */

export async function callTool(baseUrl, tool, args = {}) {
  const base = String(baseUrl || "").replace(/\/$/, "");
  if (!base) {
    return {
      status: 0,
      body: {
        error: {
          code: "mcp_unavailable",
          message: "FORCE_MCP_URL / mcp base URL not set",
        },
      },
    };
  }
  try {
    const res = await fetch(`${base}/tools/${encodeURIComponent(tool)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(args ?? {}),
    });
    const text = await res.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      body = { error: { code: "bad_response", message: text.slice(0, 200) } };
    }
    return { status: res.status, body };
  } catch (e) {
    return {
      status: 0,
      body: {
        error: {
          code: "mcp_unavailable",
          message: e instanceof Error ? e.message : String(e),
        },
      },
    };
  }
}

export function filterByAllowlist(proposals, allowlist) {
  const list = Array.isArray(allowlist) ? allowlist : [];
  return (proposals || []).map((p) => {
    if (p.action !== "mcp_call") return p;
    const agent = p.args?.agent_id || p.args?.schedule_id;
    if (list.length === 0 || (agent && !list.includes(agent))) {
      return {
        ...p,
        action: "skip",
        blocked_by_allowlist: true,
        reason: list.length === 0 ? "empty allowlist" : "agent not allowlisted",
      };
    }
    return p;
  });
}

/**
 * Apply MCP proposals only when confirmed === true.
 * Returns { status, applied, blocked, results }.
 */
export async function applyWithConfirm(baseUrl, { confirmed, proposals, allowlist } = {}) {
  if (!confirmed) {
    return {
      status: "rejected",
      reason: "confirmRequired",
      applied: [],
      blocked: proposals || [],
      results: [],
    };
  }
  const gated = filterByAllowlist(proposals || [], allowlist);
  const applied = [];
  const blocked = [];
  const results = [];
  for (const p of gated) {
    if (p.action !== "mcp_call" || !p.tool) {
      blocked.push(p);
      results.push({ proposal: p, skipped: true, ok: false });
      continue;
    }
    const r = await callTool(baseUrl, p.tool, p.args || {});
    const ok = r.status === 200 && !r.body?.error;
    applied.push(p);
    results.push({ tool: p.tool, args: p.args, status: r.status, body: r.body, ok });
  }
  return { status: "applied", applied, blocked, results };
}
