---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: ["search", "read", "execute", "web", "todo"]
---

# Validate Step Completion

You are validating that a specific step from the lab exercise is complete. Follow these instructions:

## Required Input

${input:step-number:Enter step number (e.g., 5-0, 5-1, 5-2)}

**REQUIRED**: A step number must be provided in the format shown above.

## Find the Exercise Issue

1. **Locate the Exercise Issue**:
   - Run: `gh issue list --state open`
   - Find the issue with `Exercise:` in the title
   - Note the issue number

2. **Fetch Issue with Comments**:
   - Run: `gh issue view <issue-number> --comments`
   - Save the full output for parsing

## Parse Success Criteria

3. **Extract Step Content**:
   - Search through the issue for: `# Step ${step-number}:`
   - Extract everything from that heading until the next step heading
   - Locate the "Success Criteria" section within that step
   - Parse each criterion listed

## Validate Each Criterion

4. **Check Against Current State**:
   - For each success criterion:
     - Check if files exist that should exist
     - Verify tests pass if tests are mentioned
     - Confirm features work if functionality is mentioned
     - Check code quality (no lint errors, tests passing)
   - Use appropriate tools: file reads, grep searches, test execution

## Report Results

5. **Generate Validation Report**:
   - ✅ List all PASSING criteria with brief confirmation
   - ❌ List all FAILING criteria with specific guidance:
     - What's missing or incorrect
     - What action is needed to fix
     - Reference relevant files or tests
   
6. **Overall Status**:
   - If ALL criteria pass: "✅ Step ${step-number} validation PASSED"
   - If ANY criteria fail: "❌ Step ${step-number} validation FAILED - see issues above"

## Next Actions

7. **Guide the User**:
   - If validation passed: User can proceed to next step or run `/commit-and-push`
   - If validation failed: Provide specific actions to complete before re-validating

---

**Reference**: This prompt inherits gh CLI knowledge from [.github/copilot-instructions.md](../.github/copilot-instructions.md)
