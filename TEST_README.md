# Test Suite Documentation

This repository now includes comprehensive unit tests for the utility functions and problem fetchers.

## Test Framework

We use [Vitest](https://vitest.dev/) as our testing framework, which provides:
- Fast execution with native ES modules support
- TypeScript support out of the box
- Compatibility with Jest API
- Built-in code coverage
- Watch mode for development

## Running Tests

```bash
# Run tests in watch mode (recommended for development)
npm run test

# Run tests once (CI/CD)
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

### Utility Functions Tests

Located in `src/lib/__tests__/`:

1. **is-active.test.ts** - Tests for URL matching logic
   - Exact URL matching
   - Nested path matching
   - Trailing slash normalization
   - Tab activation logic
   - Edge cases with query parameters and hashes

2. **merge-refs.test.ts** - Tests for React ref merging
   - Function refs
   - Object refs
   - Mixed ref types
   - Undefined ref handling
   - DOM element scenarios

### Problem Fetchers Tests

Located in `src/lib/problem-fetchers/__tests__/`:

1. **registry.test.ts** - Platform detection and URL parsing
   - Platform configuration validation
   - URL-to-platform detection
   - Problem ID extraction for all platforms
   - Edge cases and error handling

2. **codeforces.test.ts** - Codeforces API integration
   - Successful API responses
   - URL parsing for contest/problemset/gym
   - Error handling (network, API failures)
   - Rating and tag extraction

3. **kilonova.test.ts** - Kilonova API integration
   - Problem metadata fetching
   - Tag extraction
   - Source credits handling
   - API error scenarios

4. **pbinfo.test.ts** - PBInfo URL parsing
   - Slug extraction and title generation
   - Title capitalization
   - URL format validation

5. **generic.test.ts** - Generic fetchers for platforms without APIs
   - Factory function testing
   - CSES, InfoArena, USACO, OJ.UZ, AtCoder, NerdArena
   - Consistent metadata generation

6. **index.test.ts** - Main orchestrator
   - API vs. manual data flow
   - Platform detection integration
   - Error handling and fallbacks
   - Data merging logic

## Test Coverage

The test suite covers:

### Happy Paths
- ✅ Successful API responses
- ✅ Correct data parsing and transformation
- ✅ Platform detection from URLs
- ✅ Problem ID extraction

### Edge Cases
- ✅ Empty inputs
- ✅ Trailing slashes
- ✅ Query parameters and fragments
- ✅ Mixed case domains
- ✅ Very long IDs/slugs
- ✅ Special characters

### Error Handling
- ✅ Invalid URLs
- ✅ Network failures
- ✅ API errors
- ✅ Invalid response schemas
- ✅ Missing required data
- ✅ Non-Error rejections

### Integration Scenarios
- ✅ Manual data overrides
- ✅ Partial data merging
- ✅ Fallback to generic fetchers
- ✅ Multiple platforms

## Writing New Tests

### Test File Convention

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup before each test
    vi.clearAllMocks();
  });

  describe('feature group', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = functionUnderTest(input);
      
      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

### Mocking Fetch

```typescript
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ data: 'mock' }),
} as Response);
```

### Testing Async Functions

```typescript
it('should handle async operations', async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});

it('should throw errors', async () => {
  await expect(asyncFunction()).rejects.toThrow('Expected error');
});
```

## Configuration

### vitest.config.ts

- Environment: Node.js
- Coverage provider: v8
- Setup file: `vitest.setup.ts`
- Path alias: `@` → `./src`

### vitest.setup.ts

- Global fetch mock
- Automatic mock clearing after each test

## Best Practices

1. **Descriptive test names**: Use clear, descriptive names that explain what is being tested
2. **One assertion per test**: Keep tests focused on a single behavior
3. **Arrange-Act-Assert**: Structure tests clearly
4. **Test edge cases**: Don't just test happy paths
5. **Mock external dependencies**: Use `vi.fn()` for fetch, APIs, etc.
6. **Clean up**: Clear mocks between tests
7. **Avoid test interdependence**: Tests should be runnable in any order

## Coverage Goals

Current coverage focuses on:
- All public functions and methods
- All error paths
- All conditional branches
- Edge cases and boundary conditions

Target: 90%+ code coverage for utility functions and problem fetchers

## Continuous Integration

Tests should be run:
- Before every commit (via git hooks)
- On every pull request
- Before deployment

Example CI configuration:
```yaml
test:
  script:
    - npm install
    - npm run test:run
    - npm run test:coverage
```

## Troubleshooting

### Tests fail with "Cannot find module"
- Check tsconfig.json paths
- Verify vitest.config.ts resolve.alias

### Fetch is not defined
- Ensure vitest.setup.ts is loaded
- Check that global.fetch mock is set up

### Tests timeout
- Increase timeout in vitest.config.ts
- Check for unresolved promises

## Future Improvements

- [ ] Add integration tests for React components
- [ ] Add E2E tests for critical user flows
- [ ] Implement visual regression testing
- [ ] Add performance benchmarks
- [ ] Set up test coverage requirements in CI

## Contributing

When adding new features:
1. Write tests first (TDD approach recommended)
2. Ensure all tests pass
3. Maintain or improve coverage
4. Update this documentation if needed