# Architecture Constraints
> Derived from: `/intent/architecture.intent.md`
> Owner: Platform / SRE Team
> Last revised: 2026-02-28

Every constraint below traces back to declared intent.
If a constraint cannot be justified by intent, remove it.

---

## Architectural Constraints

- [ ] **Observe only — no remediation**
  The agent must never take action on a service. It collects and forwards telemetry. Any action taken on a service based on telemetry data is out of scope and must be rejected at design time.
  Justification: "We do not auto-remediate."

- [ ] **Agent handles OTEL collector downtime gracefully**
  When the OTEL collector is unavailable, the agent must buffer, retry, or fail silently without crashing or degrading the instrumented service. Data loss during outage is acceptable; service disruption is not.
  Justification: Top edge case — collector going down must not take services down with it.

- [ ] **Data accuracy over data volume**
  Incomplete but accurate telemetry is preferred over high-volume telemetry with gaps or errors. Misinformation (incorrect traces, wrong service attribution, dropped spans reported as complete) is treated as a bug, not a known limitation.
  Justification: Top risks — no observability data, misinformation reported.

- [ ] **Zero OTEL knowledge required from app teams**
  App teams interact with the agent through Kubernetes-native primitives (annotations, config maps, Helm values). They must not be required to write OTEL configuration, manage exporters, or understand the OTEL data model.
  Justification: "App teams know Kubernetes, not OTEL."

- [ ] **Python runtime only (current scope)**
  The agent framework targets Java microservices. Support for other runtimes (Go, Node, Python) requires a separate intent review before implementation.
  Justification: Assumption — teams use a specific language/runtime.

- [ ] **Loose coupling between agent and services**
  The agent must not be embedded in application code. It runs as a sidecar, DaemonSet, or init container. Direct library coupling to application business logic is not permitted.
  Justification: App teams control their clusters — the agent must be deployable without modifying app code.

---

## Deployment Constraints

- [ ] **Kubernetes only**
  The agent is deployed and operates exclusively within Kubernetes clusters. No support for bare-metal, VMs, or non-containerized environments.
  Justification: "Services are containerized." Non-containerized services are explicitly out of scope.

- [ ] **Control plane required**
  A control plane must exist in the cluster. The agent assumes it can register with and receive configuration from a control plane. Clusters without a control plane are not supported.
  Justification: Assumption — a control plane exists.

- [ ] **App teams own their clusters**
  The agent must deploy inside a team's cluster under their control. It must not require cluster-admin privileges beyond what is necessary for telemetry collection.
  Justification: "App teams run in their cluster and control it."

- [ ] **Rollback before rapid release**
  Every agent deployment must be reversible. A bad agent version must not require manual intervention in instrumented services to roll back.

---

## Automation Constraints

- [ ] **AI may recommend, not execute**
  Automated or AI-generated suggestions for agent configuration, schema changes, or deployment must be reviewed by a human before execution.

- [ ] **No auto-instrumentation that modifies business logic**
  The agent may inject telemetry at the framework/middleware layer only. It must not rewrite, wrap, or modify application business logic as part of instrumentation.

- [ ] **Secrets are never hardcoded**
  OTEL exporter credentials, collector endpoints, and API keys must be injected via Kubernetes secrets or a secrets manager at runtime. Never in agent config files or container images.

---

## Observability Requirements (of the agent itself)

- [ ] **The agent must be observable**
  The agent emits its own health metrics: collector connectivity status, spans dropped, buffer utilization. If the agent is dark, that is treated as a failure state.
  Justification: Risk — "cannot get health of microservices" extends to the agent itself.

- [ ] **Structured logs only**
  The agent emits JSON-structured logs. Unstructured output is treated as a bug.

- [ ] **Collector connectivity surfaced to app teams**
  When the OTEL collector is unreachable, the agent must surface this via a Kubernetes event, status condition, or health endpoint — not silently drop data with no signal.
  Justification: Edge case — collector goes down.

- [ ] **Intent compliance check in CI**
  CI pipeline must verify that `/intent/architecture.intent.md` and `/intent/constraints.md` exist, are non-empty, and have an ACTIVE status before merging.

---

## Constraint Violation Protocol

When a constraint is proposed to be violated:

1. The violation must be named explicitly — not worked around silently.
2. The Platform / SRE Team must approve the exception in writing.
3. A time-bound remediation plan must be documented here.
4. If the violation becomes permanent, intent must be revised.

| Date | Constraint Violated | Reason | Approved By | Remediation Deadline |
|------|---------------------|--------|-------------|----------------------|
| — | — | — | — | — |

---

*This file lives at `/intent/constraints.md` and is derived from declared intent.*
