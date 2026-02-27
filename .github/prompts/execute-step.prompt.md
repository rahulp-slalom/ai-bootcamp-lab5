---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: ["search", "read", "edit", "execute", "web", "todo"]
---

# Execute Current Step from GitHub Issue

You are executing a step from the lab exercise GitHub Issue. Follow these instructions:

## Find and Parse the Issue

1. **Locate the Exercise Issue**:
   ${input:issue-number:Enter issue number (leave blank to auto-detect Exercise issue)}
   
   If issue number not provided:
   - Run: `gh issue list --state open`
   - Find the issue with `Exercise:` in the title
   - Use that issue number

2. **Fetch Issue Content**:
   - Run: `gh issue view <issue-number> --comments`
   - Parse the entire issue including all comments
   - Identify the latest step instructions to execute

## Execute Activities

3. **Parse and Execute**:
   - Look for `:keyboard: Activity:` sections in the current step
   - Execute each activity systematically
   - Follow TDD approach (write tests first, then implement)
   - **IMPORTANT**: Follow testing scope from project instructions:
     - Backend: Jest + Supertest only
     - Frontend: React Testing Library only
     - NO e2e frameworks (Playwright, Cypress, Selenium)
     - NO browser automation tools
   - Make incremental changes with validation

4. **Validation**:
   - Run tests to ensure all pass
   - Run linter to check for errors
   - Fix any issues before stopping

## Completion

5. **DO NOT commit or push changes**:
   - Changes should remain staged but uncommitted
   - User will run `/commit-and-push` separately

6. **Stop and Report**:
   - Summarize what was completed
   - List any warnings or issues
   - Instruct user to run `/validate-step` to verify success criteria

---

**Reference**: This prompt inherits gh CLI and Git workflow knowledge from [.github/copilot-instructions.md](../.github/copilot-instructions.md)
