# UAF Components Library Documentation

## Overview

The UAF Components Library (`@amarhbaneen/uaf-components`) is a collection of reusable UI components built with Angular and PrimeNG. These components are designed to provide a consistent user interface for applications that require user authentication and factory management features.

## Installation

### NPM Installation

To install the UAF Components library from NPM, run:

```bash
npm install @amarhbaneen/uaf-components
```

### Required Peer Dependencies

The library requires the following peer dependencies:

```bash
npm install primeng primeicons @primeng/themes
```

## Module Integration

Import the UafComponentsModule in your application module:

```typescript
import { UafComponentsModule } from '@amarhbaneen/uaf-components';

@NgModule({
  imports: [
    // other imports
    UafComponentsModule
  ],
  // ...
})
export class AppModule { }
```

For standalone components, you can import the module in your component:

```typescript
import { Component } from '@angular/core';
import { UafComponentsModule } from '@amarhbaneen/uaf-components';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [UafComponentsModule],
  template: `
    <!-- Use UAF components here -->
    <uaf-login></uaf-login>
  `
})
export class MyComponent { }
```

## Available Components

The library includes the following components:

### Login Component

A login form component with validation and error handling.

### Navbar Component

Navigation bar component for application header with theme toggle and logout functionality.

### Dashboard Component

Main dashboard component that serves as a container for application content.

### Settings Component

Component for managing application settings.

## Component Usage Examples

### Login Component

```html
<uaf-login 
  (loginSubmit)="onLoginSubmit($event)">
</uaf-login>
```

With event handling in your component:

```typescript
onLoginSubmit(credentials: { username: string, password: string }) {
  // Handle login logic here
}
```

### Navbar Component

```html
<uaf-navbar
  (settingsClick)="onSettingsClick()"
  (logoutClick)="onLogoutClick()">
</uaf-navbar>
```

### Dashboard Component

```html
<uaf-dashboard
  (settingsClick)="onSettingsClick()"
  (logoutClick)="onLogoutClick()">
</uaf-dashboard>
```

### Settings Component

```html
<uaf-settings
  (settingsClick)="onSettingsClick()"
  (logoutClick)="onLogoutClick()">
</uaf-settings>
```

## Theming

The UAF Components library includes a built-in theme that provides styling for all components, including dark mode support.

To use the theme, import it in your application's styles.scss file:

```scss
// In your styles.scss file
@import '@amarhbaneen/uaf-components/src/lib/themes/index';
```

The theme includes:
- Basic styling for all components
- Dark mode support (activated by adding the 'dark' class to the body element)
- PrimeNG component styling
- PrimeIcons CSS

To toggle between light and dark mode, you can use the following code:

```typescript
// Toggle dark mode
const isDarkMode = document.body.classList.contains('dark');
document.body.classList.toggle('dark', !isDarkMode);
localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
```

For more detailed information about the theme, see the [Theme Documentation](./theme-documentation.md).

## Core Service

The library includes a core service:

### UafComponentsService

Basic service provided by the library:

```typescript
import { UafComponentsService } from '@amarhbaneen/uaf-components';

constructor(private uafService: UafComponentsService) { }

// Use the service methods as needed
```

## Updating the Library

When a new version of the library is released, you can update it using npm:

```bash
npm update @amarhbaneen/uaf-components
```

Or to install a specific version:

```bash
npm install @amarhbaneen/uaf-components@x.y.z
```

After updating, make sure to check the changelog for any breaking changes or new features.

## Additional Resources

- [Angular Documentation](https://angular.dev/)
- [PrimeNG Documentation](https://primeng.org/)
- [PrimeIcons Documentation](https://primeng.org/icons)

## Contribution

If you want to contribute to the UAF Components library, please refer to the [Development Guide](development-guide.md) for more information.

## License

The UAF Components library is licensed under the MIT License. See the LICENSE file for more information.
