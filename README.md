# UafAppPort

A modern Angular application for user authentication and factory management.

## Overview

UafAppPort (User Authentication Factory Application Portal) is a web application built with Angular that provides a secure authentication system and a dashboard interface for factory management. The application features a custom PrimeNG theme for consistent styling across all components.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

## Custom PrimeNG Theme: eg-factory

This project implements a custom theme for PrimeNG components called "eg-factory". The theme provides consistent styling across all PrimeNG UI components used in the application.

### Theme Structure

The theme follows PrimeNG's theming system architecture:
- Located in `src/app/theme/eg-factory/`
- Each UI component has its own theme configuration file (e.g., `accordion.ts`, `button.ts`, etc.)
- All component themes are imported and combined in `index.ts` to create a complete theme preset
- The theme satisfies the `Preset` type from PrimeNG's theming system

### Theme Implementation

The theme is implemented using PrimeNG's design token system, which allows for:
- Consistent styling across components
- Easy maintenance through centralized design tokens
- Support for both light and dark modes

### Theme Configuration

The theme is configured in `app.config.ts` using PrimeNG's provider:

```typescript
providePrimeNG({
  theme: {
    preset: MyCustomTheme,
    options: {
      darkModeSelector: '.dark'
    }
  }
})
```

### Dark Mode Support

The theme includes dark mode support which is activated when the `.dark` class is applied to an element (typically the body or a container element). This can be toggled programmatically or through user preferences.

### Using the Theme

The theme is automatically applied to all PrimeNG components used in the application. No additional steps are required to use the themed components.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

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

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

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

## Project Structure

The project follows a standard Angular application structure with some custom organization:

```
uaf-App-port/
├── src/
│   ├── app/
│   │   ├── compnents/           # Application components
│   │   │   ├── dashboard/       # Dashboard component
│   │   │   ├── login/           # Authentication component
│   │   │   └── navbar/          # Navigation component
│   │   ├── theme/
│   │   │   └── eg-factory/      # Custom PrimeNG theme
│   │   ├── app.config.ts        # Application configuration
│   │   ├── app.html             # Main application template
│   │   ├── app.routes.ts        # Application routing
│   │   └── app.ts               # Main application component
│   ├── assets/                  # Static assets
│   └── styles.scss              # Global styles
├── docs/                        # Documentation
└── ...                          # Configuration files
```

## Features

- **Connection Management System**: 
  - Save and manage multiple server connections
  - Test connections before authentication
  - Configure connection options (CORS settings)
  - Secure storage of connection details (passwords not stored)

- **Authentication System**: 
  - Secure login functionality with connection testing
  - JWT token extraction from server responses
  - Automatic handling of various token formats
  - Comprehensive error handling for authentication failures

- **Dashboard Interface**: Central hub for application features

- **Custom PrimeNG Theme**: 
  - Consistent styling across all components
  - Dark Mode Support with toggle between light and dark themes
  - Responsive Design that works on desktop and mobile devices

## Installation

1. **Prerequisites**:
   - Node.js (v18 or later)
   - npm (v9 or later)

2. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd uaf-app-port
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:4200/`

## Usage

### Connection Management

1. **Adding a Connection**:
   - On the login page, click the dropdown and select "Add New Connection"
   - Enter a name for the connection, the server URL, and your credentials
   - Click "Test Connection" to verify the connection works
   - If the test is successful, click "Save" to store the connection

2. **Using Saved Connections**:
   - Select a saved connection from the dropdown on the login page
   - Enter your password (username will be pre-filled if available)
   - Click "Login" to authenticate with the selected connection

### Authentication

1. **Login Process**:
   - Select a connection from the dropdown
   - Enter your username and password
   - Click "Login" to test the connection and authenticate
   - If successful, you'll be redirected to the dashboard
   - If unsuccessful, an error message will be displayed

### Dashboard and Navigation

1. **Dashboard**: After successful login, you'll be redirected to the dashboard
2. **Theme Toggle**: Use the theme toggle button in the navbar or login page to switch between light and dark modes
3. **Logout**: Click the logout button in the navbar to return to the login page

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

For more information about PrimeNG theming, visit the [PrimeNG Theming Documentation](https://primeng.org/theming).

## UAF Components Library

This project includes a reusable UI components library called `@amarhbaneen/uaf-components` that can be installed separately in other Angular projects.

### Installing from NPM

To install the UAF Components library from NPM, run:

```bash
npm install @amarhbaneen/uaf-components
```

### Required Peer Dependencies

The library requires the following peer dependencies:

```bash
npm install primeng primeicons primeflex @primeng/themes
```

### Basic Usage

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

### Using the Theme

To use the UAF theme in your application:

```scss
// In your styles.scss file
@import '@amarhbaneen/uaf-components/src/lib/themes/index';
```

For more detailed documentation about the components library, see the [UAF Components Documentation](docs/uaf-components-documentation.md).

For information about publishing updates to the library, see the [NPM Publishing Guide](docs/npm-publishing-guide.md).

## Documentation

Additional documentation can be found in the `docs/` directory:

- [Theme Documentation](docs/theme-documentation.md): Detailed information about the custom PrimeNG theme
- [Components Documentation](docs/components-documentation.md): Information about the application's components and their interactions
- [Development Guide](docs/development-guide.md): Guide for developers who want to contribute to the project
- [API Documentation](docs/api-documentation.md): Template for API endpoints and services (for future development)
