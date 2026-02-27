import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
let mockFetch;

beforeEach(() => {
  mockFetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
  global.fetch = mockFetch;
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

describe('Delete functionality', () => {
  test('calls DELETE API when delete button is clicked', async () => {
    const mockTodos = [
      { id: 1, title: 'Test Todo 1', completed: false },
      { id: 2, title: 'Test Todo 2', completed: true },
    ];

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockTodos[1]]),
      });

    const testQueryClient = createTestQueryClient();
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for todos to load
    await screen.findByText('Test Todo 1');

    // Find and click delete button for first todo
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await user.click(deleteButtons[0]);

    // Verify DELETE API was called with correct URL
    await waitFor(() => {
      const deleteCalls = mockFetch.mock.calls.filter(
        (call) => call[1]?.method === 'DELETE'
      );
      expect(deleteCalls.length).toBe(1);
    });

    // Verify the correct URL was used
    const deleteCalls = mockFetch.mock.calls.filter(
      (call) => call[1]?.method === 'DELETE'
    );
    expect(deleteCalls[0][0]).toContain('/api/todos/1');
  });
});

describe('Stats calculation', () => {
  test('displays correct count of incomplete todos', async () => {
    const mockTodos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: false },
      { id: 3, title: 'Todo 3', completed: true },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for todos to load
    await screen.findByText('Todo 1');

    // Check that stats show correct numbers
    expect(screen.getByText('2 items left')).toBeInTheDocument();
  });

  test('displays correct count of completed todos', async () => {
    const mockTodos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
      { id: 3, title: 'Todo 3', completed: true },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for todos to load
    await screen.findByText('Todo 1');

    // Check that stats show correct numbers
    expect(screen.getByText('2 completed')).toBeInTheDocument();
  });
});

describe('Empty state', () => {
  test('displays empty state message when no todos exist', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    // Check that empty state message is displayed
    expect(
      screen.getByText(/no todos yet/i) || screen.getByText(/get started/i)
    ).toBeInTheDocument();
  });

  test('does not display empty state when todos exist', async () => {
    const mockTodos = [{ id: 1, title: 'Test Todo', completed: false }];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for todos to load
    await screen.findByText('Test Todo');

    // Check that empty state is not shown
    expect(screen.queryByText(/no todos yet/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/get started/i)).not.toBeInTheDocument();
  });
});

describe('Error handling', () => {
  test('displays error message when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for error message to appear
    const errorHeading = await screen.findByText(/error loading todos/i);
    expect(errorHeading).toBeInTheDocument();
  });

  test('uses relative API URL instead of hardcoded localhost', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for initial fetch
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    // Verify that API URL doesn't use hardcoded localhost
    const firstCallUrl = mockFetch.mock.calls[0][0];
    expect(firstCallUrl).not.toContain('localhost');
    expect(firstCallUrl).toContain('/api/todos');
  });
});
