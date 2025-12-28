# Testing Quick Start Guide

## Installation

```bash
# Install dependencies (including vitest)
npm install
```

## Running Tests

### Development (Watch Mode)
```bash
npm run test
```
This will watch for file changes and re-run relevant tests automatically.

### Single Run (CI/CD)
```bash
npm run test:run
```
Runs all tests once and exits. Perfect for CI/CD pipelines.

### Coverage Report
```bash
npm run test:coverage
```
Generates a detailed coverage report in the `coverage/` directory.

### Interactive UI
```bash
npm run test:ui
```
Opens an interactive web interface to explore and run tests.

## What's Been Tested?

### ✅ Utility Functions
- **URL Matching** (`is-active.ts`): 89 tests
  - Exact and nested path matching
  - Trailing slash normalization
  - Tab activation logic
  
- **React Refs** (`merge-refs.ts`): 43 tests
  - Function and object refs
  - Mixed ref types
  - DOM element scenarios

### ✅ Problem Fetchers
- **Platform Detection** (`registry.ts`): 78 tests
  - 9 different competitive programming platforms
  - URL parsing and problem ID extraction
  
- **API Integrations**:
  - **Codeforces**: 35 tests (API calls, error handling)
  - **Kilonova**: 23 tests (metadata fetching)
  - **PBInfo**: 28 tests (URL parsing)
  
- **Generic Fetchers** (`generic.ts`): 52 tests
  - CSES, InfoArena, USACO, OJ.UZ, AtCoder, NerdArena
  
- **Main Orchestrator** (`index.ts`): 31 tests
  - API vs. manual data flow
  - Error handling and fallbacks

## Test Structure