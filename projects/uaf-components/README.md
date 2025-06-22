# UafComponents

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Installation

### NPM Installation

To install the UafComponents library from NPM, run:

```bash
npm install @amarhbaneen/uaf-components
```

### Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install primeng primeicons primeflex @primeng/themes
```

### Usage

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

### Theme Usage

The library includes a built-in theme that provides styling for all components, including dark mode support. To use the theme, import it in your application's styles.scss file:

```scss
// In your styles.scss file
@import '@amarhbaneen/uaf-components/src/lib/themes/index';
```

The theme includes:
- Basic styling for all components
- Dark mode support (activated by adding the 'dark' class to the body element)
- PrimeNG component styling
- PrimeIcons and PrimeFlex CSS

To toggle between light and dark mode, you can use the following code:

```typescript
// Toggle dark mode
const isDarkMode = document.body.classList.contains('dark');
document.body.classList.toggle('dark', !isDarkMode);
localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
```

### Available Components

The library includes the following components:

#### Login Component

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

#### Navbar Component

```html
<uaf-navbar
  (settingsClick)="onSettingsClick()"
  (logoutClick)="onLogoutClick()">
</uaf-navbar>
```

#### Dashboard Component

```html
<uaf-dashboard
  (settingsClick)="onSettingsClick()"
  (logoutClick)="onLogoutClick()">
</uaf-dashboard>
```

#### Settings Component

```html
<uaf-settings
  (settingsClick)="onSettingsClick()"
  (logoutClick)="onLogoutClick()">
</uaf-settings>
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build uaf-components
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/uaf-components
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
