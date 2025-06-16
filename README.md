# UafAppPort

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

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

For more information about PrimeNG theming, visit the [PrimeNG Theming Documentation](https://primeng.org/theming).
