# Working Memory System

## Purpose

This directory contains a structured memory system for tracking patterns, decisions, and lessons learned during development. It helps maintain context across development sessions and enables AI assistants to provide more informed, context-aware suggestions.

## Memory Types

The project uses two complementary memory systems:

### 1. Persistent Memory
Located in `.github/copilot-instructions.md` - contains:
- Foundational development principles
- Core workflows (TDD, code quality, integration)
- Testing approach and scope
- Git conventions and project standards

This is the **permanent** rulebook for how we work.

### 2. Working Memory
Located in `.github/memory/` - contains:
- Session summaries (completed work)
- Discovered patterns (accumulated learnings)
- Active notes (current session work)

This is the **evolving** knowledge base from hands-on experience.

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md             # Historical summaries (committed)
├── patterns-discovered.md       # Accumulated patterns (committed)
└── scratch/
    ├── .gitignore               # Ignores all scratch files
    └── working-notes.md         # Active session notes (NOT committed)
```

### File Purposes

| File | Purpose | Committed? | When to Use |
|------|---------|------------|-------------|
| `session-notes.md` | Historical record of completed sessions | ✅ Yes | End of session - summarize what was accomplished |
| `patterns-discovered.md` | Reusable code patterns and learnings | ✅ Yes | When you discover a pattern worth remembering |
| `scratch/working-notes.md` | Active session scratchpad | ❌ No | During active development - take working notes |

## When to Use Each File

### During TDD Workflow (Red-Green-Refactor)

**Active Development** - Use `scratch/working-notes.md`:
- Note which test you're working on
- Document unexpected test failures
- Track refactoring decisions
- Record debugging insights

**After Completing Feature** - Update `patterns-discovered.md`:
- Document test patterns that worked well
- Note mock/stub patterns for specific scenarios
- Record common assertion patterns

**End of Session** - Update `session-notes.md`:
- Summarize features completed
- Note key TDD insights discovered
- Document what's ready for next session

### During Linting/Code Quality Workflow

**Active Work** - Use `scratch/working-notes.md`:
- List lint errors by category
- Track which fixes work and which don't
- Note edge cases or tricky fixes

**After Resolving Issues** - Update `patterns-discovered.md`:
- Document lint patterns and their fixes
- Note configuration decisions
- Record dependencies between lint rules

### During Debugging Workflow

**Active Investigation** - Use `scratch/working-notes.md`:
- Track hypothesis and testing approach
- Note what you've tried and results
- Document stack traces or error patterns
- List potential root causes

**After Resolution** - Update both:
- `patterns-discovered.md`: Add the bug pattern and solution
- `session-notes.md`: Summarize the debugging session at end of day

## How AI Uses This Memory

When you ask GitHub Copilot for help, it can:

1. **Read session-notes.md** to understand recent work and context
2. **Reference patterns-discovered.md** for project-specific patterns
3. **Check scratch/working-notes.md** for current task context
4. **Apply learned patterns** instead of generic solutions

### Example AI Interaction Flow

**Without Memory:**
> User: "Add a new service"
> AI: Suggests generic service pattern

**With Memory:**
> User: "Add a new service"
> AI: (Reads patterns-discovered.md, sees "Service Initialization" pattern)
> AI: Suggests service with empty array initialization (project convention)

## Workflow Integration

### Starting a Session
```bash
# Clear previous scratch notes
> scratch/working-notes.md

# Add current task header
echo "## Current Task: [Your task name]" >> scratch/working-notes.md
```

### During Development
Take quick notes in `scratch/working-notes.md`:
- What you're trying
- What's working/not working
- Decisions and why
- Questions to investigate

### Ending a Session

1. **Review scratch/working-notes.md**
2. **Extract key findings** → Add to `session-notes.md`
3. **Extract reusable patterns** → Add to `patterns-discovered.md`
4. **Keep scratch notes** for next session or clear if complete

The scratch notes stay local (not committed), while the summaries and patterns become permanent project knowledge.

## Best Practices

### For session-notes.md
- ✅ Write clear summaries after completing work
- ✅ Focus on outcomes and key decisions
- ✅ Include dates for chronological tracking
- ❌ Don't copy/paste all scratch notes

### For patterns-discovered.md
- ✅ Document patterns you'll use again
- ✅ Include concrete code examples
- ✅ Link to relevant project files
- ❌ Don't document one-off fixes

### For scratch/working-notes.md
- ✅ Write freely during active work
- ✅ Include rough notes and hypotheses
- ✅ Track dead ends (they're useful too!)
- ❌ Don't worry about formatting or completeness

## Example: TDD Feature Development

**Start:** Open `scratch/working-notes.md`
```markdown
## Current Task: Add priority field to todos

### Approach
- Write test for priority field validation
- Implement backend model change
- Update API routes
- Add frontend UI

### Key Findings
- Test failing: priority not validating correctly
- Fix: Added enum validation ['low', 'medium', 'high']
```

**During:** Keep adding notes as you work

**End:** Extract to permanent memory

→ `session-notes.md`:
```markdown
## Session: Added Priority Field (2026-02-27)
- Added priority field to TODO model with enum validation
- Updated API routes and frontend UI
- All tests passing
```

→ `patterns-discovered.md`:
```markdown
## Pattern: Enum Field Validation
Use enum arrays for field validation in backend models
to ensure frontend can't submit invalid values.
```

**Clear or keep:** `scratch/working-notes.md` based on whether task is complete

## Benefits

1. **Context Preservation**: Future you (and AI) understands past decisions
2. **Pattern Reuse**: Don't rediscover solutions
3. **Onboarding**: New developers learn project patterns quickly
4. **AI Enhancement**: Copilot gives project-specific suggestions
5. **Debugging**: Quickly reference similar issues from the past

## Getting Started

1. Read this README thoroughly
2. Check `session-notes.md` for recent project history
3. Review `patterns-discovered.md` for current patterns
4. Start taking notes in `scratch/working-notes.md`
5. At end of session, promote key learnings to permanent files

The memory system is only as valuable as the notes you take. Make it a habit!
