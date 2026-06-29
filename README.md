# Install k6 
 winget install k6
 
# Run test
k6 run login.js

# Run with 50 virtual users
k6 run --vus 50 --duration 2m login.js

# Output JSON report
k6 run --out json=result.json login.js

# Export summary
k6 run --summary-export summary.json login.js


# YAML for K6

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

# Run k6 performance test
- script: |
    k6 run performance/login.js
  displayName: Run k6 Test
