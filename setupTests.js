import '@testing-library/jest-dom';

// Suppress common warning messages
const MESSAGES_TO_IGNORE = [
  "When testing, code that causes React state updates should be wrapped into act(...):",
  "Error:",
  "The above error occurred",
];

const originalError = console.error.bind(console.error);
console.error = (...args) => {
  const ignoreMessage = MESSAGES_TO_IGNORE.find(message =>
    args.toString().includes(message)
  );
  if (!ignoreMessage) originalError(...args);
};

// Store original implementations
const originalResizeObserver = window.ResizeObserver;
const originalMatchMedia = window.matchMedia;

// Define mocks
beforeEach(() => {
  // Mock ResizeObserver
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  // Mock matchMedia
  window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: false, // or true, depending on your test needs
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});

// Restore originals
afterEach(() => {
  window.ResizeObserver = originalResizeObserver;
  window.matchMedia = originalMatchMedia;
  jest.restoreAllMocks();
});
