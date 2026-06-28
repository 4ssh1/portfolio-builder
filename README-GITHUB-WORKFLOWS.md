# GitHub Actions Workflows

This directory contains the CI/CD pipeline workflows for this project.

---

## `test.yml` — Run Tests

### Trigger
| Event | Branches |
|-------|----------|
| `push` | `main`, `staging` |
| `pull_request` | `main`, `staging` |

### What it does
1. Checks out the repository
2. Sets up **Node.js 20.x** with npm caching enabled — subsequent runs skip re-downloading packages if `package-lock.json` hasn't changed
3. Runs `npm ci` for a clean, reproducible install
4. Runs `npm test` to execute the test suite

### Purpose
Acts as a gate to catch regressions early. Every push and every PR targeting `main` or `staging` must pass tests before merging.

---

## `docker-build-and-push.yml` — Docker Build and Push

### Trigger
| Event | Condition |
|-------|-----------|
| `push` | `main` branch only |
| `workflow_dispatch` | Manual trigger from the Actions tab |

### What it does

#### 1. Multi-platform build setup
Configures **Docker Buildx** to build images for both `linux/amd64` (standard servers) and `linux/arm64` (ARM-based instances like AWS Graviton), producing a single multi-arch manifest.

#### 2. Docker Hub authentication
Logs in to Docker Hub using the repository secrets `DOCKER_USERNAME` and `DOCKER_PASSWORD`. These must be configured under **Settings → Secrets and variables → Actions** before the workflow can push.

#### 3. Image tagging
Uses `docker/metadata-action` to automatically generate the following tags on every run:

| Tag | Example | Description |
|-----|---------|-------------|
| `branch` | `main` | The Git branch that triggered the build |
| `sha` | `abc1234` | Short commit SHA for traceability |
| `latest` | `latest` | Applied only when pushing to the default branch |
| `prod-YYYYMMDD` | `prod-20260628` | Datestamped production release tag |

#### 4. Build and push
Builds the production Docker image using the `Dockerfile` at the repo root and pushes all generated tags to Docker Hub. Layer caching via GitHub Actions cache (`type=gha`) means only changed layers are rebuilt, keeping build times fast.

#### 5. Job summary
After a successful push, a summary is written to the GitHub Actions run page showing:
- Image name and digest
- Commit SHA and branch
- Who triggered the run
- All published tags

---

## Required Secrets

| Secret | Description |
|--------|-------------|
| `DOCKER_USERNAME` | Your Docker Hub username |
| `DOCKER_PASSWORD` | A Docker Hub access token (not your account password) |

> **Tip:** Generate an access token at [hub.docker.com](https://hub.docker.com) → Account Settings → Security → New Access Token. Tokens can be scoped to read/write and revoked independently of your password.

---

## Workflow Summary

```
Push to staging  ──►  test.yml
                          │
                          ▼
                      npm ci + npm test

Push to main  ──►  test.yml  +  docker-build-and-push.yml
                       │                   │
                       ▼                   ▼
               npm ci + npm test    Build multi-arch image
                                    Push to Docker Hub
                                    Write job summary
```