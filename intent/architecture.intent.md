# Architecture Intent
> Last revised: 2026-02-28
> Owner: Platform / SRE Team
> Status: ACTIVE

---

## Purpose

This system exists to **give application teams full OpenTelemetry-based observability across their Kubernetes microservices without requiring them to understand OTEL instrumentation**.

> App teams know Kubernetes. They should not need to know OTEL to get traces, metrics, and structured telemetry from their services.

---

## Primary Tradeoff

We prioritize **data accuracy and completeness** over **deployment simplicity**.

This means: when we are forced to choose, we produce correct, trustworthy observability data — even when that makes the agent harder to configure or deploy. Misinformation (incorrect or missing telemetry) is treated as a critical failure, not a warning.

---

## What We Explicitly Do Not Do

- **We do not auto-remediate.** This system observes and reports. It takes no action on services based on what it sees.
- **We do not replace existing logging pipelines.** Logs, dashboards, and log analysis tools continue to operate independently. This system adds OTEL-native tracing and metrics on top — it does not displace log-based workflows.
- **We do not support non-containerized services.** All services must run in Kubernetes. Bare-metal or VM-based deployments are out of scope.
- **We do not require app teams to instrument their code manually.** The agent handles OTEL instrumentation. App teams opt in — they do not configure OTEL directly.

---

## Ownership

Ownership of this intent resides with the **Platform / SRE Team**.

This person/team:
- Signs off on changes to this file
- Is accountable when system behavior diverges from declared intent
- Leads the intent review when a trigger condition is met

---

## Trigger Conditions for Revisit

This intent must be revisited when:

- [ ] The OTEL specification introduces breaking changes
- [ ] App teams are required to support non-Python runtimes at scale
- [ ] A new cluster topology removes the assumption of a control plane
- [ ] Auto-remediation is explicitly added to scope (requires full re-review)
- [ ] The collector downtime failure mode produces cascading incidents
- [ ] Ownership changes hands

---

## Change Log

| Date | Change | Author | Reason |
|------|--------|--------|--------|
| 2026-02-28 | Initial draft | Platform Team | Project kickoff via intent-check |

---

*This file lives at `/intent/architecture.intent.md` and is required in all repos under this framework.*
