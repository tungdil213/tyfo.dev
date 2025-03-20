# @tyfo.dev/ui

A modern, accessible, and customizable React component library built with shadcn/ui, Radix UI primitives, and Tailwind CSS.

## Features

- 🎨 Modern design system with customizable components
- ♿️ Fully accessible components following WAI-ARIA guidelines
- 🌗 Dark mode support out of the box
- 🎯 Type-safe with TypeScript
- 📦 Pure ESM package with tree-shaking
- 🎭 Variants and composition support
- 🔧 Built with Tailwind CSS for easy customization
- 🚀 Powered by Radix UI primitives

## Requirements

- Node.js v22.0.0 or higher
- React 19 or later
- Tailwind CSS 4
- pnpm (recommended package manager)

## Installation

```bash
pnpm add @tyfo.dev/ui
```

## Directory Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── primitives/  # Base shadcn/Radix components
│   │   ├── composed/    # Higher-order components
│   │   └── patterns/    # Common UI patterns/layouts
│   ├── hooks/          # Shared hooks
│   ├── utils/          # Utility functions
│   ├── styles/         # Global styles
│   └── types/          # Shared TypeScript types
└── dist/              # Compiled output (ESM + types)
```

## Usage

### Package Exports

Components are organized by type and exported individually:

```json
{
  "name": "@tyfo.dev/ui",
  "type": "module",
  "exports": {
    "./primitives/*": {
      "types": "./dist/components/primitives/*.d.ts",
      "import": "./dist/components/primitives/*.js"
    },
    "./composed/*": {
      "types": "./dist/components/composed/*.d.ts",
      "import": "./dist/components/composed/*.js"
    },
    "./patterns/*": {
      "types": "./dist/components/patterns/*.d.ts",
      "import": "./dist/components/patterns/*.js"
    },
    "./hooks/*": {
      "types": "./dist/hooks/*.d.ts",
      "import": "./dist/hooks/*.js"
    },
    "./utils": {
      "types": "./dist/utils/index.d.ts",
      "import": "./dist/utils/index.js"
    }
  }
}
```

### Component Types

Our components are organized into three categories:

### 1. Primitives
Base components built on shadcn/ui and Radix UI primitives. These are the foundation of our design system.

```tsx
// Import primitive components
import { Button } from "@tyfo.dev/ui/primitives/button"
import { Input } from "@tyfo.dev/ui/primitives/input"
import { Dialog } from "@tyfo.dev/ui/primitives/dialog"
```

### 2. Composed Components
Higher-order components that combine multiple primitives for common use cases.

```tsx
// Import composed components
import { SearchInput } from "@tyfo.dev/ui/composed/search-input"
import { FormField } from "@tyfo.dev/ui/composed/form-field"
import { DataTable } from "@tyfo.dev/ui/composed/data-table"
```

### 3. UI Patterns
Full-featured layout patterns and templates for common UI scenarios.

```tsx
// Import UI patterns
import { AuthForm } from "@tyfo.dev/ui/patterns/auth-form"
import { DashboardLayout } from "@tyfo.dev/ui/patterns/dashboard-layout"
import { SettingsPage } from "@tyfo.dev/ui/patterns/settings-page"
```

### Hooks and Utilities

```tsx
// Import hooks and utilities
import { useMediaQuery } from "@tyfo.dev/ui/hooks/use-media-query"
import { cn } from "@tyfo.dev/ui/utils"
```

## Development Guidelines

### Component Standards

1. **Naming Conventions**
   - Use PascalCase for component names
   - Boolean props should start with `is`, `has`, or `should`
   - Event handler props should start with `on`

2. **Type Safety**
   - All components are built with TypeScript
   - Comprehensive type definitions:
   ```tsx
   interface ButtonProps {
     variant?: "default" | "destructive" | "outline";
     size?: "default" | "sm" | "lg";
     isLoading?: boolean;
     onPress?: () => void;
   }
   ```

3. **Accessibility**
   - Follow WAI-ARIA guidelines
   - Implement keyboard navigation
   - Support screen readers
   - Manage focus states
   - Include ARIA attributes

4. **Styling**
   - Extend variants using `cva`
   - Follow Tailwind CSS class order
   - Use CSS variables for theming
   - Support dark mode

### Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build the package
pnpm build

# Run linting
pnpm lint
```

### Contributing

1. Component Implementation:
   - Use named exports only
   - Include comprehensive prop types
   - Add JSDoc documentation
   - Provide usage examples
   - Write unit tests

2. Pull Request Process:
   - Create feature branch
   - Follow style guidelines
   - Add/update tests
   - Create changeset
   - Submit PR

## Available Components

### Primitive Components
Core components built on Radix UI primitives:

#### Form Controls
- Button - Flexible button component with variants
- Input - Text input with optional addons
- Checkbox - Accessible checkbox input
- Radio Group - Grouped radio button controls
- Select - Dropdown selection component
- Textarea - Multi-line text input
- Switch - Toggle switch component
- Label - Form label with automatic association

#### Navigation
- Breadcrumb - Hierarchical page navigation
- Navigation Menu - Accessible dropdown navigation
- Pagination - Page navigation controls
- Sidebar - Collapsible side navigation
- Tabs - Tabbed interface component

#### Feedback
- Alert - Contextual feedback messages
- Alert Dialog - Modal dialog for important actions
- Progress - Progress indicators
- Skeleton - Loading state placeholders
- Toast - Notification system using Sonner

#### Layout
- Accordion - Collapsible content sections
- AspectRatio - Maintain aspect ratios
- Card - Flexible content container
- Dialog - Modal dialog component
- Drawer - Side panel overlay
- Popover - Contextual overlays
- Sheet - Modal side sheets
- Separator - Visual dividers

#### Interactive
- Calendar - Date selection component
- Carousel - Image and content carousel
- Command - Command palette interface
- Context Menu - Right-click menu
- Dropdown Menu - Dropdown selection menu
- Menubar - Application menu bar
- Toggle - Toggle button component
- Tooltip - Hover tooltips

#### Display
- Avatar - User avatar component
- Badge - Status and notification badges

### Composed Components
Pre-built combinations of primitives:
- SearchInput - Input with search functionality
- FormField - Input with label and validation
- DataTable - Sortable and filterable table

### UI Patterns
Full-featured templates:
- AuthForm - Authentication forms
- DashboardLayout - Admin dashboard layout
- SettingsPage - User settings interface

## License

MIT © [Arya Labs] 