# Discovered Code Patterns

## Purpose
This file documents recurring code patterns, solutions, and conventions discovered during development. These patterns should be referenced and reused throughout the project to maintain consistency.

**Note:** This file is committed to git and grows over time as new patterns are discovered.

---

## Pattern Template

Use this template when documenting a new pattern:

```markdown
## Pattern: [Pattern Name]

### Context
When does this pattern apply? What problem does it solve?

### Problem
What challenge or requirement led to this pattern?

### Solution
How does this pattern solve the problem? Include the approach and reasoning.

### Example
```[language]
// Concrete code example showing the pattern in action
```

### Related Files
- [path/to/file.ext](../../path/to/file.ext)
- Reference other patterns if applicable

### Notes
- Any caveats, variations, or important considerations
- When NOT to use this pattern

---
```

---

## Project Patterns

## Pattern: Service Initialization - Empty Array vs Null

### Context
When initializing services that manage collections of data (todos, users, items, etc.), we need to decide how to represent "no data yet" - should it be `null`, `undefined`, or an empty array `[]`?

### Problem
Inconsistent initialization leads to:
- Defensive null checks throughout the codebase (`if (data && data.length)`)
- Potential runtime errors when calling array methods on null/undefined
- Confusion about whether null means "not loaded" vs "no items"

### Solution
**Always initialize collections as empty arrays `[]`**, never null or undefined.

**Rationale:**
1. Enables immediate array method usage (`map`, `filter`, etc.) without null checks
2. Simplifies component rendering logic - can always iterate
3. Clearer semantics: empty array means "loaded with zero items"
4. Follows React best practices for state initialization

### Example

**❌ Don't do this:**
```javascript
class TodoService {
  constructor() {
    this.todos = null;  // Requires null checks everywhere
  }
  
  getAllTodos() {
    return this.todos || [];  // Have to handle null case
  }
}

// Component usage requires defensive checks
{todos && todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
```

**✅ Do this:**
```javascript
class TodoService {
  constructor() {
    this.todos = [];  // Safe to use immediately
  }
  
  getAllTodos() {
    return this.todos;  // Always returns an array
  }
}

// Component usage is clean and simple
{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
```

### Related Files
- Backend services in [packages/backend/src/](../../packages/backend/src/)
- Frontend state management in [packages/frontend/src/App.js](../../packages/frontend/src/App.js)

### Notes
- This applies to all collection types: todos, users, comments, etc.
- If you need to distinguish "not loaded yet" vs "loaded with no items", use a separate loading flag:
  ```javascript
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  ```
- Single entity fetches (e.g., "get user by ID") can use null to indicate "not found"

---

## Your Patterns

Add your discovered patterns below this line:

---
