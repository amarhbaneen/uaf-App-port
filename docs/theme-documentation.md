# 🧩 UFng Developer Design & Styling Guidelines

**Project Stack:** Angular + PrimeNG + PrimeIcons + PrimeFlex + Custom Designer Theme

---

## Overview

The UAF Components library includes a custom theme for PrimeNG components. This theme provides consistent styling across all PrimeNG UI components while adhering to the UAF design system.

## 🎯 General Principles

We aim for:

- Full adoption of **PrimeNG’s ecosystem**: components, icons, layout, and theme.
- Centralized, scalable styling using **PrimeNG’s theming system** and **design tokens**.
- SCSS usage **only when absolutely necessary**, and always via defined tokens.

---

## PrimeNG Component Usage

There are two ways to use PrimeNG UI elements:

### 1. Component-Based Approach (Preferred)

```html
<p-button type="button" label="Click me"></p-button>
```

**Why we prefer this:**

- Aligns with PrimeNG’s recommended usage.
- Ensures consistency across the app.
- Provides richer features, theme support, and better integration.

### 2. Directive-Based Approach (Used Only If Needed)

```html
<button pButton type="button" label="Click me"></button>
```

**When to consider it:**

- Lightweight, minimal buttons are needed.
- Native HTML behavior must be preserved.
- Only basic styling/events are required.

> **✅ Recommendation:** Use _proper PrimeNG components_ wherever possible.  
> Use the directive syntax only for legacy code or minimal use cases.

---

## 🎨 Styling Strategy & Theme Structure

We follow a **three-tiered structure** for styling:

1. **Global SCSS styles** (not PrimeNG-specific but better to use PrimeNG's styles) in:  
   `src/styles.scss`

2. **PrimeNG-level theme files** in:  
   `src/app/theme/eg-factory/`

3. **Component-level style file** in:  
   `src/app/components/<component_name>/component_name.scss`


And should be organized as follows:

- **Global Style File**: `styles.scss` contains only the global styling which is not connected to PrimeNG components.

- **Custom Theme Configurations Files**: into src/app/theme/ directory. The `index.ts` exports all this configuration when the `base.ts` includes the whole design schema and into the components/ directory a config TS file exists for each PrimeNG's component.

- **Local Style Files**: `ComponentName.scss` contain only the local design.

## Features

The UAF theme includes:

1. **PrimeNG Base & Components Styling**: PrimeNG style configuration including basic styling and implementing this to define and custom the style of PrimeNG's components like buttons, cards, and input fields.

2. **Dark Mode Support**: Comprehensive dark mode styling that can be activated by adding the `.dark` class to the required element.

3. **Custom Typography**: Uses "Varela Round" as the default font family.

---

## 🎯 Use Theme Tokens — Not Hardcoded Values

To ensure consistency and centralized maintenance, always use design tokens defined in the theme's `base.ts`.

### Token Usage:

- **Inside PrimeNG theme files:**  
  Use the curly-brace syntax:

  ```ts
  fontFamily: "{primitive.fontFamily.body}"
  ```

- **Inside SCSS files:**  
  Use CSS custom properties that PrimeNG generates:

  ```scss
  body {
    font-family: var(--eg-font-family-body);
  }
  ```

> ⚠️ PrimeNG automatically transforms tokens like `primitive.fontFamily.body` into CSS variables with a prefix (e.g., `--p-font-family-body` for PrimeNG default prefix `--p`).  
> In our app, the prefix is customized to `--eg`, so the token becomes: `--eg-font-family-body`.

---

## Dark Mode

Dark mode is supported through the `.dark` selector:

```ts
import {providePrimeNG} from "primeng/config";

providePrimeNG({
  theme: {
    preset: MyCustomTheme,
    options:{
      darkModeSelector: '.dark',
      prefix: 'eg'
    }
  }
})
```

When this class is applied to the current element, all components will switch to their dark mode styling

---

## 📌 Additional Notes

- Use **PrimeFlex** for layout (e.g., grids, spacing utilities).
 
- Use **PrimeIcons** for iconography.
 
- Avoid defining styles manually unless the design requires it — always prefer design tokens.

- Local SCSS should only be used for **component-specific overrides**, and even then with design token variables when possible.

---

## Using in A Consumer Application

To use the UAF theme in your application:

1. **Install the Library**:
   ```
   npm install @amarhbaneen/uaf-components
   ```

2. **Import the Theme**:
   Add the following import to your application's global styles file (e.g., `styles.scss`):
   ```scss
   @import "@amarhbaneen/uaf-components/src/lib/themes/index";
   ```

This is enough to enable our custom theme and the dark / light mode:

- The app listens for the `.dark` class (on a root element like `<html>`) to trigger dark mode.
- All CSS variables will change based on whether `.dark` is preset or not.

---

## 🎨 Styling Strategy for a Consumer App

You can customize the theme by overriding the styles in your application's styles file after importing the UFng theme. Follow the UFng style strategy!

🔧 Steps for the Consumer App to Style Its Own Components Including for Dark Mode

1. **Use CSS Custom Properties (from eg theme)** - PrimeNG transforms our `base.ts` design tokens into CSS custom properties, like:

    ```css
    --eg-surface-background
    --eg-text-color
    --eg-font-family-body
    ```

    Thus, In the host component's SCSS or CSS, use those variables:
    
    ```scss
    :host {
      background-color: var(--eg-surface-background);
      color: var(--eg-text-color);
      font-family: var(--eg-font-family-body);
    }
    ```
    
    ➡️ These values will automatically update when the `.dark` class is present.


2. **Make Sure the `.dark` Class is in the Scope** - You're using:
    
    ```ts
    darkModeSelector: '.dark'
    ```
    
    So your host app must:
    
    - Add `.dark` to <html> (which is already done for the ready base and components).
    
    - Write your styles so that they respond to that scope, if needed.
    
    Usually, **you do NOT need to manually write `.dark` conditions** if you're using the CSS variables correctly.
    
    But if you must override something directly, do this:
    
    ```scss
    :host-context(.dark) {
    background-color: var(--eg-surface-dark-background);
    }
    ```
    
3. **Optional: Use the Same Design Tokens Even If Overriding is Required** - even when something has to be overrided manually, not handled by our theme, keep things fully aligned by preferring our token usage. Your host app can reference token names defined in `base.ts` or component theme files.
    
    For example, you can use an Angular-specific CSS selector that lets a component's style react to a parent class and use `base.ts` for that:
    
    ```scss
    :host-context(.dark) {
      background-color: var(--eg-surface-background);
    }
    ```
    
    What this does:
    
    - Applied the `background-color` using the `--eg-surface-background` variable (only) when `.dark` is somewhere in the ancestor DOM tree - typically `<html class="dark"`.
    
4. **Do NOT hardcode colors** (unless absolutely needed)
    
    ❌ Avoid:
    
    ```scss
    background-color: #fff; // or #121212
    ```
    
    ✅ Use:
    
    ```scss
    background-color: var(--eg-surface-background);
    ```
    
    This ensures your component auto-updates when dark mode is toggled.
