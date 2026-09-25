## Feature

- **Name**: node-tooling-upgrade
- **Branch**: `chore/node-tooling-upgrade`
- **Objective**: Align the repository with an explicit Node baseline compatible with Vitest 5, apply the open Dependabot tooling updates coherently, and add regression coverage that protects future tooling changes.

## Problem

- The repository currently has open Dependabot PRs for `esbuild`, `vite`, `vitest`, and `@types/node`.
- The release workflow uses `node-version: 22`, which is too loose for the Vitest 5 engine floor.
- There is no PR CI coverage for these updates, so the repo needs stronger automated checks that validate tooling and release-contract assumptions.

## Why

- The user explicitly requested a new branch, a Node migration, adoption of these dependency changes, and future-proof tests that increase confidence for upcoming modifications.

## Authorized Scope

- Tooling and dependency configuration
- Node version metadata and release workflow alignment
- Test coverage that protects build/test/typecheck/release-contract behavior
- No product-scope feature changes unless required to restore compatibility with the upgraded toolchain

## Constraints

- Keep changes reviewable and grouped by work unit
- Prefer durable regression checks over one-off manual validation
- Validate the real repository flows: typecheck, tests, build, and release contract consistency

## Delivery Strategy

- **Strategy**: `single-pr`
- **Chain strategy**: `N/A`
- **Forecast**: Likely under the 400 authored-line planning heuristic, but verification decides final readiness

## TDD / Verification Context

- **TDD mode**: off
- **Source**: no explicit project/session TDD configuration was found; repository has a Vitest runner but no strict-TDD instruction
- **Runner**: `pnpm test` (Vitest)
- **Required checks**:
  - `pnpm exec tsc --noEmit`
  - `pnpm test`
  - `pnpm build`
  - `pnpm run check:integrity`

## Tasks

- [x] **ODD-001 — Establish explicit Node baseline**
  - Route: delegated direct
  - Trigger evidence: multi-file configuration write (`package.json`, workflow, local Node metadata) and tooling alignment work
  - Acceptance:
    - Repository declares a concrete Node baseline compatible with Vitest 5
    - Release workflow and local developer metadata agree on the baseline
    - Existing flows remain documented and consistent

- [x] **ODD-002 — Apply Dependabot tooling updates coherently**
  - Route: delegated direct
  - Trigger evidence: multi-file dependency + lockfile update
  - Acceptance:
    - `esbuild`, `vite`, `vitest`, and `@types/node` are upgraded together in one coherent lockfile state
    - No broken dependency graph or workflow mismatch remains

- [x] **ODD-003 — Add durable regression coverage for tooling contracts**
  - Route: delegated direct
  - Trigger evidence: multi-file test + config work aimed at future-proof repository validation
  - Acceptance:
    - Tests cover at least one future-facing tooling/release contract beyond the current utility tests
    - The added checks would catch likely future breakage from dependency or Node drift

- [x] **ODD-004 — Verify end-to-end integrity and summarize merge readiness**
  - Route: delegated direct
  - Trigger evidence: bounded verification action with multiple repo-wide checks
  - Acceptance:
    - All required checks have observed outcomes recorded honestly
    - Merge readiness is decided from evidence, not assumption

## Progress Log

- 2026-09-24: Created branch `chore/node-tooling-upgrade` from `main`.
- 2026-09-24: Added explicit Node baseline metadata with `.nvmrc`, package `engines.node`, and release workflow alignment via `node-version-file`.
- 2026-09-24: Upgraded `esbuild`, `vite`, `vitest`, and `@types/node` together and refreshed `pnpm-lock.yaml`.
- 2026-09-24: Added `tooling-contract.test.ts` to lock release workflow, integrity script, TypeScript include coverage, and installed-tool engine compatibility against the repo Node baseline.
- 2026-09-24: Narrowed the repo `engines.node` contract to Vitest 5's supported Node majors and updated `tooling-contract.test.ts` to assert that exact support window.
- 2026-09-24: Verified typecheck, tests, build, and integrity end to end.

## Verification Evidence

- `pnpm install`:
  - Initial attempt failed because `vite@8.3.1` violated the repo supply-chain `minimumReleaseAge` policy (`published at 2026-09-24T12:26:19.940Z, within the minimumReleaseAge cutoff`).
  - Retried with `vite@8.3.0`; install succeeded and updated lockfile to:
    - `@types/node` `26.6.2`
    - `esbuild` `0.28.2`
    - `vite` `8.3.0`
    - `vitest` `5.0.1`
- Follow-up contract fix:
  - `package.json` now declares `engines.node: ^22.12.0 || ^24.0.0 || >=26.0.0` so the repo no longer claims unsupported odd-major Node releases that Vitest 5 excludes.
  - `tooling-contract.test.ts` now asserts the repo engine contract exactly matches the installed Vitest engine range and that the pinned `.nvmrc` baseline satisfies it.
- `pnpm exec tsc --noEmit`: passed with no output.
- `pnpm test`: passed on Vitest `v5.0.1` with `2` test files and `41` tests passing.
- `pnpm build`: passed; esbuild produced `main.js 126.4kb`.
- `pnpm run check:integrity`: passed; repeated typecheck, tests, and build successfully.

## Next Step

- Review the branch diff as one coherent tooling work unit and decide whether to commit it as the branch's upgrade slice.
