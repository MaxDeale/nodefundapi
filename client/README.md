# Investment Dashboard - React Client

A modern investment dashboard built with React, TypeScript, and SASS. This client connects to the Funds API backend to provide a complete portfolio management interface.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Backend API running on `http://localhost:3000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open `http://localhost:5173` in your browser

### Environment Variables

Create a `.env` file in the client directory:
```
VITE_API_URL=http://localhost:3000/api
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Dashboard/      # Main dashboard view
│   │   ├── Layout/          # App layout with navigation
│   │   ├── PortfolioCard/   # Portfolio card component
│   │   ├── PortfolioDetail/ # Detailed portfolio view
│   │   └── TransactionForm/ # Transaction creation form
│   ├── pages/               # Page components
│   │   ├── Portfolios/      # Portfolios listing page
│   │   ├── CreatePortfolio/ # Portfolio creation page
│   │   └── Funds/           # Funds listing page
│   ├── services/            # API service layer
│   │   └── api.ts           # Axios API client
│   ├── styles/              # SASS stylesheets
│   │   ├── _variables.scss  # SASS variables
│   │   ├── _mixins.scss     # SASS mixins
│   │   ├── _buttons.scss    # Button styles
│   │   └── main.scss        # Main stylesheet
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Shared types
│   ├── App.tsx              # Main app component with routing
│   └── main.tsx             # App entry point
```

## 🎯 Practice Tasks

Complete these tasks to practice core React and TypeScript concepts for fintech interviews.

### Phase 1: Basic React Concepts (30-45 min)

#### Task 1: Add Loading States
**Goal**: Improve UX with proper loading indicators
- Add skeleton loaders to Dashboard and PortfolioDetail
- Show loading state while fetching data
- Use React state management for loading flags

#### Task 2: Error Boundary
**Goal**: Handle errors gracefully
- Create an ErrorBoundary component
- Wrap the app to catch React errors
- Display user-friendly error messages

#### Task 3: Form Validation
**Goal**: Add client-side validation
- Validate TransactionForm inputs
- Show error messages for invalid inputs
- Prevent submission of invalid forms
- Validate: quantity > 0, price > 0, fund selection required

### Phase 2: State Management & Data Fetching (45-60 min)

#### Task 4: Custom Hooks
**Goal**: Extract reusable logic
- Create `usePortfolio(id)` hook
- Create `useFunds()` hook
- Create `usePortfolioValue(id)` hook
- Replace duplicate API calls with hooks

#### Task 5: React Query / SWR Integration
**Goal**: Advanced data fetching
- Install and set up React Query or SWR
- Replace manual API calls with React Query
- Implement caching and automatic refetching
- Add optimistic updates for transactions

#### Task 6: Context API for Global State
**Goal**: Manage application state
- Create AppContext for user data
- Store selected portfolio globally
- Implement portfolio selection dropdown in header

### Phase 3: Advanced UI Features (45-60 min)

#### Task 7: Search and Filter
**Goal**: Add search functionality
- Add search bar to Funds page
- Filter funds by name or symbol
- Add sorting (by price, name, category)
- Implement debounced search input

#### Task 8: Charts Integration
**Goal**: Visualize data
- Install a charting library (Recharts, Chart.js)
- Add price history chart to fund details
- Create portfolio value over time chart
- Add pie chart for asset allocation

#### Task 9: Real-time Updates
**Goal**: WebSocket integration
- Connect to WebSocket for live price updates
- Update fund prices in real-time
- Show live portfolio value changes
- Add visual indicators for price changes (green/red)

### Phase 4: TypeScript & Type Safety (30-45 min)

#### Task 10: Strict Type Checking
**Goal**: Improve type safety
- Add strict TypeScript config
- Fix all `any` types
- Create proper types for API responses
- Add generic types for reusable components

#### Task 11: Form Type Safety
**Goal**: Type-safe forms
- Use React Hook Form with TypeScript
- Add Zod schema validation
- Type form state properly
- Create reusable form components

### Phase 5: Performance Optimization (45-60 min)

#### Task 12: Code Splitting
**Goal**: Optimize bundle size
- Implement React.lazy for routes
- Add Suspense boundaries
- Code split heavy components
- Lazy load charts library

#### Task 13: Memoization
**Goal**: Optimize re-renders
- Use React.memo for expensive components
- Implement useMemo for calculations
- Use useCallback for event handlers
- Optimize PortfolioCard rendering

#### Task 14: Virtualization
**Goal**: Handle large lists
- Install react-window or react-virtual
- Virtualize transactions list
- Virtualize funds list
- Improve performance with large datasets

### Phase 6: Testing (60-90 min)

#### Task 15: Unit Tests
**Goal**: Test components
- Install React Testing Library and Jest
- Write tests for TransactionForm
- Test PortfolioCard component
- Test custom hooks

#### Task 16: Integration Tests
**Goal**: Test user flows
- Test portfolio creation flow
- Test transaction creation
- Test navigation between pages
- Mock API responses

### Phase 7: Advanced Features (60-90 min)

#### Task 17: Portfolio Comparison
**Goal**: Compare portfolios
- Add portfolio comparison view
- Side-by-side comparison table
- Compare performance metrics
- Highlight differences

#### Task 18: Export Functionality
**Goal**: Data export
- Export portfolio data to CSV
- Export transaction history
- Print portfolio summary
- Generate PDF reports

#### Task 19: Dark Mode
**Goal**: Theme switching
- Implement dark mode toggle
- Use CSS variables for theming
- Persist theme preference
- Smooth theme transitions

#### Task 20: Responsive Design
**Goal**: Mobile optimization
- Improve mobile layouts
- Add mobile navigation menu
- Optimize tables for mobile
- Touch-friendly interactions

## 🎨 Styling Guidelines

### SASS Best Practices
- Use variables for colors, spacing, typography
- Create reusable mixins for common patterns
- Follow BEM naming convention
- Use nested selectors appropriately
- Keep component styles modular

### Component Structure
```scss
// ComponentName.scss
@import '../../styles/variables';
@import '../../styles/mixins';

.component-name {
  // Component styles
  
  &__element {
    // Element styles
  }
  
  &--modifier {
    // Modifier styles
  }
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📚 Learning Objectives

By completing these tasks, you'll practice:
- ✅ React hooks (useState, useEffect, useContext)
- ✅ TypeScript with React
- ✅ API integration and data fetching
- ✅ Form handling and validation
- ✅ Routing with React Router
- ✅ State management patterns
- ✅ Component composition
- ✅ SASS styling and responsive design
- ✅ Performance optimization
- ✅ Testing React applications
- ✅ Error handling and loading states

## 💡 Tips for Technical Assessments

1. **Start with basics**: Get forms and data fetching working first
2. **Type everything**: Show TypeScript expertise
3. **Handle edge cases**: Empty states, loading, errors
4. **Focus on UX**: Loading states, error messages, confirmations
5. **Clean code**: Well-organized components, reusable code
6. **Test your work**: Verify all features work as expected

## 🚀 Next Steps

After completing the tasks:
1. Add unit tests for all components
2. Implement E2E tests with Playwright
3. Add Storybook for component documentation
4. Set up CI/CD pipeline
5. Deploy to Vercel/Netlify
6. Add authentication flow
7. Implement real-time price updates

Good luck with your practice! 🎯
