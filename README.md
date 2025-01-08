# Tool Rental Demo

Here is the Tool Rental app built with Nuxt 3 and Vue 3 and other libraries in the package.json. I intentionally opted to not use Nuxi, the CLI for Nuxt, as I wanted to keep the project simple and focused on the core functionality, adhering to the requirements, and demonstate my ability do the scaffolding and tesing that Nuxi provides myself. In the end Testing was more problematic than I expected, but I was able to get all of the required tests to pass. The test with the 6 required tests is 'rental-scenarios.spec.ts' and is located in the 'tests' folder.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test
```

## 🛠 Tech Stack

### Core
- **Framework**: Nuxt 3.15.0 (includes Nitro server)
- **UI**: Vue 3 with TypeScript
- **Styling**: Tailwind CSS + Forms plugin
- **Date Handling**: @vuepic/vue-datepicker 10.0.0

### Development
- **Node.js**: v20.18.1 (**required**)
- **Package Manager**: pnpm 9.15.1 (**required**)

### Testing
- **Unit/Integration**: Vitest 1.3.1
- **E2E**: Playwright 1.49.1 (not working)
- **Utilities**: 
  - @vue/test-utils 2.4.6
  - @nuxt/test-utils 3.15.1
  - happy-dom 15.2.0
  - jsdom 25.0.1

## 📊 Test Status

### Coverage
- **Total Tests**: 7 (2 files)
- **Passing**: 7
- **Failing**: 0

### Common Issues

1. **Module Resolution Errors**
   ```
   Error: Cannot find module '@nuxt/test-utils'
   ```
   Solution: Run `pnpm install` to ensure all dependencies are installed

2. E2E Tests
   - Playwright configuration needs setup
   - Configuration conflicts with Vitest

## 📁 Project Structure

```
app/
├── components/     # Vue components
├── composables/    # Shared composables
├── pages/         # Application routes
├── server/        # API endpoints
├── tests/         # Test files
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## 🔧 Development

### Performance Metrics
- Dev server start: < 2s
- Test suite execution: ~1.6s
  - Transform: 815ms
  - Collection: 1.52s
  - Test execution: 232ms
  - Environment setup: 1.39s
  - Preparation: 321ms

### Common Issues

1. **Module Resolution**
   ```
   Error: Cannot find module '@nuxt/test-utils'
   ```
   Solution: Run `pnpm install`


## 🔄 Development Workflow

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Run tests in watch mode:
   ```bash
   pnpm test
   ```



MIT License

## 🔍 Environment Setup

Required variables:
```env
NODE_ENV=development
PORT=3000
``` 

Should any issues arise, please contact me at my email with Dave. 