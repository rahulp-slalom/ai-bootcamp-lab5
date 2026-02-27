---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ["read", "execute", "todo"]
---

# Commit and Push Changes to Feature Branch

You are committing staged changes and pushing to a feature branch. Follow these instructions:

## Branch Management

1. **Get Branch Name**:
   ${input:branch-name:Enter feature branch name (e.g., feature/add-validation)}
   
   **REQUIRED**: A branch name must be provided. If not provided, ask the user for it.

2. **Switch or Create Branch**:
   - Check if branch exists: `git branch --list <branch-name>`
   - If exists: `git checkout <branch-name>`
   - If not exists: `git checkout -b <branch-name>`
   - **CRITICAL**: NEVER commit to `main` branch directly

## Analyze Changes

3. **Review Current Changes**:
   - Run: `git status` to see what's changed
   - Run: `git diff` to review the actual changes
   - Summarize the changes for commit message generation

## Commit Changes

4. **Generate Commit Message**:
   - Use conventional commit format (see Git Workflow in project instructions):
     - `feat:` - New features
     - `fix:` - Bug fixes
     - `chore:` - Maintenance tasks
     - `docs:` - Documentation changes
     - `test:` - Test additions/changes
   - Make the message descriptive and clear
   - Example: `feat: add input validation to todo creation`

5. **Stage and Commit**:
   - Run: `git add .` to stage all changes
   - Run: `git commit -m "<generated-message>"`

## Push to Remote

6. **Push to Feature Branch**:
   - Run: `git push origin <branch-name>`
   - If first push on this branch, may need: `git push -u origin <branch-name>`

## Report

7. **Confirm Completion**:
   - Report the branch name
   - Show the commit message used
   - Confirm successful push

---

**Reference**: This prompt inherits Git workflow knowledge from [.github/copilot-instructions.md](../.github/copilot-instructions.md)
