# k6 Installation and Common Commands

## Install k6 (Windows)

```bash
winget install k6
```

## Verify Installation

```bash
k6 version
```

## Run a Performance Test

```bash
k6 run login.js
```

## Run with 50 Virtual Users for 2 Minutes

```bash
k6 run --vus 50 --duration 2m login.js
```

## Generate a JSON Results File

```bash
k6 run --out json=result.json login.js
```

## Export a Test Summary

```bash
k6 run --summary-export summary.json login.js
```

---

# Azure DevOps YAML Pipeline for k6

```yaml
trigger:
- main

pool:
  vmImage: ubuntu-latest

steps:

# Install Node.js
- task: NodeTool@0
  inputs:
    versionSpec: '20.x'

# Install project dependencies
- script: npm install
  displayName: Install Dependencies

# Install k6
- script: |
    sudo apt-get update
    sudo apt-get install -y k6
  displayName: Install k6

# Run the k6 performance test
- script: |
    k6 run performance/login.js
  displayName: Run k6 Performance Test
```

---

# YAML Explanation

| Step                          | Purpose                                                                     |
| ----------------------------- | --------------------------------------------------------------------------- |
| `trigger: - main`             | Starts the pipeline automatically when code is pushed to the `main` branch. |
| `pool: ubuntu-latest`         | Uses an Ubuntu virtual machine to execute the pipeline.                     |
| `NodeTool@0`                  | Installs Node.js version 20.                                                |
| `npm install`                 | Installs all project dependencies from `package.json`.                      |
| `sudo apt-get update`         | Refreshes the Ubuntu package list.                                          |
| `sudo apt-get install -y k6`  | Installs the k6 performance testing tool.                                   |
| `k6 run performance/login.js` | Executes the k6 performance test script.                                    |

---

# Pipeline Flow

```
Developer Pushes Code
          │
          ▼
Pipeline Triggered
          │
          ▼
Create Ubuntu Build Agent
          │
          ▼
Install Node.js
          │
          ▼
Install Project Dependencies (npm install)
          │
          ▼
Install k6
          │
          ▼
Run k6 Performance Test
          │
          ▼
Generate Performance Results
          │
          ▼
Pipeline Passes or Fails Based on Test Results
```
