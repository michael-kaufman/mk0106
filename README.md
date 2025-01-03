# Tool Rental Application

Hi Team, here is the application built with Nuxt 3, Vue 3, and TypeScript. This application allows users to rent tools, calculate rental charges, and manage rental agreements.

## 🛠 Tech Stack

### Core Technologies
- **Framework**: Nuxt 3.15.0
- **UI Library**: Vue 3 (latest)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Forms plugin
- **Date Picker**: @vuepic/vue-datepicker 10.0.0

### Development Tools
- **Package Manager**: pnpm 9.15.1
- **Testing Framework**: 
  - Vitest 1.3.1 (Unit/Integration)
  - Playwright 1.49.1 (E2E)
- **Test Utilities**:
  - @vue/test-utils 2.4.6
  - @nuxt/test-utils 3.15.1
  - happy-dom 15.2.0 (Test environment)
  - jsdom 25.0.1 (Test environment)

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

## 🧪 Testing Status

### Test Coverage
- Total Tests: 14 across 7 test files
- Passing: 10 tests
- Failing: 4 tests

### Passing Tests
1. `rental-calculator.nuxt.spec.ts` (2/2 passing)
2. `RentalResults.nuxt.spec.ts` (2/2 passing)
3. `RentalCalculator.nuxt.spec.ts` (2/2 passing)
4. `RentalResults.spec.ts` (2/2 passing)
5. "should fetch tools on mount" tests in both RentalForm test files (2/2 passing)

### Known Issues
1. **RentalForm Component Tests** (4 failing tests)
   - Form submission event not being emitted correctly
   - Validation error messages not displaying as expected
   - Root cause: Issues with v-model binding and form state management in test environment

2. **E2E Tests**
   - Playwright test configuration needs separate setup
   - Currently throwing configuration errors when run with Vitest

## 🔍 Troubleshooting

### Common Issues

1. **Module Resolution Errors**
   ```
   Error: Cannot find module '@nuxt/test-utils'
   ```
   Solution: Run `pnpm install` to ensure all dependencies are installed

2. **Test Environment Errors**
   ```
   Error: You cannot use --inspect-brk without "--no-file-parallelism"
   ```
   Solution: Add `--no-file-parallelism` flag when debugging tests

3. **Playwright Configuration Error**
   ```
   Error: Playwright Test did not expect test() to be called here
   ```
   Solution: Run E2E tests separately using `npx playwright test`

### Performance Monitoring

- Development server typically starts in < 2s
- Test suite execution time: ~1.6s
  - Transform: 815ms
  - Collection: 1.52s
  - Test execution: 232ms
  - Environment setup: 1.39s
  - Preparation: 321ms

## 📋 Project Structure

```
app/
├── components/          # Vue components
├── composables/         # Shared composable functions
├── pages/              # Application routes
├── server/             # API endpoints
├── tests/              # Test files
│   ├── components/     # Component tests
│   └── e2e/           # End-to-end tests
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🤔 FAQ

**Q: Why are some RentalForm tests failing?**
A: The tests are failing due to challenges with v-model binding and form state management in the test environment. The component works correctly in the application, but the test setup needs refinement.

**Q: How do I run E2E tests?**
A: E2E tests should be run separately using Playwright:
```bash
npx playwright test
```

**Q: Why are there duplicate test files (.spec.ts and .nuxt.spec.ts)?**
A: The .nuxt.spec.ts files are specifically for testing Nuxt-specific functionality, while .spec.ts files are for general component testing.

## 🔄 Development Workflow

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Run tests in watch mode:
   ```bash
   pnpm test
   ```

3. Build for production:
   ```bash
   pnpm build
   pnpm preview
   ```

## 📈 Performance Considerations

- The application uses Tailwind's JIT compiler for optimal CSS bundle size
- Vue components are automatically tree-shaken in production builds
- API routes are automatically code-split and lazy-loaded
- Test files are excluded from production builds

## 🔒 Environment Setup

Required environment variables:
```env
NODE_ENV=development
PORT=3000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests and ensure they pass
4. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details 
