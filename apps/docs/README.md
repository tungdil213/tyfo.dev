# Design System Documentation

This is the documentation app for Arya Labs' design system, built with Storybook to showcase and document our UI components.

## Overview

The documentation app provides a comprehensive showcase of our design system's components, patterns, and guidelines. It uses Storybook to create an interactive environment where developers can explore, test, and understand how to use each component.

## Getting Started

### Prerequisites

- Node.js (v22.0 or higher)
- pnpm (package manager)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start Storybook development server
pnpm dev

# Build Storybook for production
pnpm build

# Preview built Storybook
pnpm preview-storybook
```

## Component Documentation

Our design system includes the following components, each with its own set of stories demonstrating various use cases:

### Form Components
- Button - Various button styles and states
- Input - Text input fields with different variations
- Checkbox - Selectable checkboxes with states
- Radio Group - Radio button groups for single selection
- Select - Dropdown selection components
- Textarea - Multi-line text input areas
- Switch - Toggle switches for binary choices
- Label - Form labels with various styling options

### Navigation Components
- Breadcrumb - Navigation breadcrumbs
- Navigation Menu - Hierarchical navigation menus
- Pagination - Page navigation controls
- Sidebar - Collapsible side navigation
- Tabs - Tabbed interface components

### Feedback Components
- Alert - Various alert types and styles
- Alert Dialog - Modal dialogs for important actions
- Progress - Progress indicators
- Skeleton - Loading state placeholders
- Toast (Sonner) - Notification system

### Layout Components
- Accordion - Collapsible content sections
- AspectRatio - Maintain aspect ratios
- Card - Content containers
- Collapsible - Toggle-able content
- Dialog - Modal dialogs
- Drawer - Side panel overlays
- Hover Card - Hover-triggered content cards
- Popover - Contextual overlays
- Resizable - Resizable panels
- ScrollArea - Customized scrollable areas
- Sheet - Modal side sheets
- Separator - Visual dividers

### Interactive Components
- Calendar - Date selection
- Carousel - Image and content carousels
- Command - Command palette interface
- Context Menu - Right-click menus
- Dropdown Menu - Dropdown selection menus
- Menubar - Application menu bars
- Toggle - Toggle buttons
- Toggle Group - Groups of toggle buttons
- Tooltip - Hover tooltips

### Display Components
- Avatar - User avatars
- Badge - Status and notification badges

## Development Guidelines

### Adding New Stories

1. Create a new story file in `apps/docs/stories/`
2. Follow the naming convention: `component-name.stories.tsx`
3. Include basic usage and variations
4. Add proper documentation and controls
5. Test across different viewports

### Story Structure

Each story should:
- Demonstrate the basic usage
- Show different variants
- Include interactive examples where applicable
- Provide proper documentation
- Include accessibility considerations

### Running Tests

```bash
# Run linting
pnpm lint
```

## Contributing

1. Create a new branch for your changes
2. Make your changes and test them in Storybook
3. Ensure all stories are working correctly
4. Submit a pull request with a clear description

## Dependencies

Key dependencies include:
- Storybook v8.2.6
- React v19.0.0
- date-fns
- lucide-react
- react-day-picker
- recharts
- sonner
- zod

## License

MIT © [Arya Labs] 