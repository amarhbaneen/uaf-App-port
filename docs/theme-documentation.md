# UAF Components Theme Documentation

## Overview

The UAF Components library includes a custom theme for PrimeNG components. This theme provides consistent styling across all PrimeNG UI components while adhering to the UAF design system.

## Theme Structure

The theme is organized as follows:

- **Main Theme File**: `uaf-theme.scss` contains all the styling for PrimeNG components, including dark mode support.
- **Index File**: `index.scss` serves as the entry point that imports the main theme file.

## Features

The UAF theme includes:

1. **PrimeNG Component Styling**: Custom styles for PrimeNG components like buttons, cards, and input fields.
2. **Dark Mode Support**: Comprehensive dark mode styling that can be activated by adding the `.dark` class to the body element.
3. **Custom Typography**: Uses "Varela Round" as the default font family.

## Dark Mode

Dark mode is supported through the `.dark` selector. When this class is applied to the body element, all components will switch to their dark mode styling:

```html
<body class="dark">
  <!-- Your app content here -->
</body>
```

## Using the Theme in Your Application

To use the UAF theme in your application:

1. **Install the Library**:
   ```
   npm install @amarhbaneen/uaf-components
   ```

2. **Import the Theme**:
   Add the following import to your application's main styles file (e.g., `styles.scss`):
   ```scss
   @import "@amarhbaneen/uaf-components/src/lib/themes/index";
   ```

3. **Optional: Enable Dark Mode**:
   To enable dark mode, add the `dark` class to your body element:
   ```html
   <body class="dark">
     <!-- Your app content here -->
   </body>
   ```

## Customizing the Theme

You can customize the theme by overriding the styles in your application's styles file after importing the UAF theme:

```scss
@import "@amarhbaneen/uaf-components/src/lib/themes/index";

// Your custom styles here
body {
  font-family: "Your Custom Font", sans-serif;
}

// Override dark mode styles
body.dark {
  background-color: #333333;
}
```
