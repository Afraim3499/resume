# Contributing Guide

Thank you for your interest in contributing to this portfolio project!

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Component Guidelines](#component-guidelines)
- [Commit Guidelines](#commit-guidelines)

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Follow the project's coding standards
- Test your changes before submitting

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/resume.git
   cd resume
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `style/` - Styling changes
- `test/` - Test additions/changes

### Making Changes

1. Make your changes
2. Test thoroughly
3. Ensure no linting errors
4. Update documentation if needed
5. Commit with clear messages

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid `any` type
- Use strict mode

```typescript
// Good
interface User {
  name: string;
  email: string;
}

// Bad
const user: any = { name: "John" };
```

### React Components

- Use functional components
- Use TypeScript for props
- Follow naming conventions (PascalCase)
- Keep components focused and small

```typescript
// Good
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Use theme-aware colors (`text-foreground`, `bg-background`)
- Keep responsive breakpoints consistent

```tsx
// Good
<div className="text-foreground bg-background p-4 md:p-6 lg:p-8">
  Content
</div>

// Bad
<div className="text-white bg-black p-4">
  Content
</div>
```

### File Organization

```
src/
├── components/
│   ├── FeatureName/
│   │   ├── FeatureName.tsx
│   │   ├── FeatureName.test.tsx
│   │   └── index.ts
│   └── ui/
├── data/
├── lib/
└── app/
```

## 🧩 Component Guidelines

### Component Structure

```typescript
"use client"; // If using client-side features

import { ... } from "...";

interface ComponentProps {
  // Props definition
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Hooks
  // State
  // Effects
  // Handlers
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Best Practices

1. **Single Responsibility**: Each component should do one thing
2. **Reusability**: Make components reusable when possible
3. **Props Validation**: Use TypeScript for prop validation
4. **Performance**: Use `useMemo` and `useCallback` when needed
5. **Accessibility**: Include proper ARIA labels and semantic HTML

## 📦 Adding New Features

### New Component

1. Create component file in appropriate directory
2. Add TypeScript types
3. Use Tailwind for styling
4. Make it responsive
5. Add to exports if needed

### New Page

1. Create page in `src/app/` directory
2. Add metadata
3. Ensure mobile responsiveness
4. Add to navigation if needed
5. Update sitemap

### New Data

1. Add to appropriate data file in `src/data/`
2. Follow existing data structure
3. Update types if needed
4. Test data rendering

## ✅ Testing

Before submitting:

- [ ] Code runs without errors
- [ ] No TypeScript errors
- [ ] No linting errors (`npm run lint`)
- [ ] Mobile responsive
- [ ] Dark/light theme works
- [ ] All links work
- [ ] Images load correctly

## 📝 Commit Guidelines

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, styling
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(hero): Add particle system animation
fix(navigation): Resolve mobile menu closing issue
docs(readme): Update installation instructions
style(button): Improve hover states
refactor(api): Simplify GitHub API route
```

## 🔍 Code Review

### Before Submitting

1. Review your own code
2. Test all functionality
3. Check for console errors
4. Verify responsive design
5. Test in different browsers

### Review Checklist

- [ ] Code follows project standards
- [ ] No console errors/warnings
- [ ] TypeScript types are correct
- [ ] Components are accessible
- [ ] Mobile responsive
- [ ] Performance is acceptable
- [ ] Documentation updated

## 🐛 Reporting Issues

When reporting issues, include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Environment**: Browser, OS, device

## 💡 Suggestions

For feature suggestions:

1. Check if feature already exists
2. Explain the use case
3. Describe the expected behavior
4. Provide examples if possible

---

**Thank you for contributing!** 🎉

