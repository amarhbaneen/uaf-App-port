# Theme Documentation: eg-factory

## Overview

The `eg-factory` theme is a custom PrimeNG theme created specifically for this application. It provides consistent styling across all PrimeNG UI components while adhering to the application's design system.

## Theme Structure

The theme is organized as follows:

- **Base Tokens**: Defined in `base.ts`, these tokens establish the foundation of the theme including colors, typography, and spacing.
- **Component Tokens**: Each PrimeNG component has its own theme file (e.g., `accordion.ts`, `button.ts`) that defines component-specific styling.
- **Theme Preset**: All component themes are combined in `index.ts` to create a complete theme preset.

## Design Token System

The theme uses PrimeNG's design token system, which allows for:

1. **Consistent Styling**: Design tokens ensure visual consistency across components.
2. **Maintainability**: Changes to base tokens automatically propagate to all components.
3. **Theme Variants**: Support for both light and dark modes.

## Dark Mode

Dark mode is supported through the `.dark` selector. When this class is applied to a container element, all components within that container will switch to their dark mode styling.

## Customizing the Theme

To modify the theme:

1. **Base Tokens**: Update values in `base.ts` to make global changes.
2. **Component-Specific Styling**: Modify individual component theme files.
3. **Adding New Components**: Create a new theme file for the component and add it to `index.ts`.

## Implementation Example

Here's an example of how a component theme is defined (from `accordion.ts`):

```typescript
export default {
  root: {
    transitionDuration: "{transition.duration}"
  },
  panel: {
    borderWidth: "0 0 1px 0",
    borderColor: "{content.border.color}"
  },
  // Additional properties...
} satisfies AccordionDesignTokens;
```

## Usage

The theme is automatically applied to all PrimeNG components used in the application through the configuration in `app.config.ts`.
