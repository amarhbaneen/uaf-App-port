# Development Guide

## Overview

This guide provides information for developers who want to contribute to the UafAppPort project or extend its functionality. It covers the development environment setup, coding standards, and best practices.

## Development Environment Setup

### Prerequisites

- **Node.js**: Version 18 or later
- **npm**: Version 9 or later
- **Angular CLI**: Version 20.0.2 or later

### Setup Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd uaf-app-port
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Angular CLI globally** (if not already installed):
   ```bash
   npm install -g @angular/cli
   ```

4. **Start the development server**:
   ```bash
   ng serve
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:4200/`

## Project Structure

The project follows a standard Angular application structure with some custom organization. See the [README.md](../README.md) for a detailed overview of the project structure.

## Development Workflow

### Creating New Components

Use Angular CLI to generate new components:

```bash
ng generate component components/your-component-name
```

Or the shorthand:

```bash
ng g c components/your-component-name
```

### Styling Components

1. Use SCSS for component styling
2. Follow the BEM (Block Element Modifier) methodology for CSS class naming
3. Utilize PrimeNG components and the custom eg-factory theme
4. For global styles, use the `src/styles.scss` file

### Theme Customization

To customize the theme:

1. Navigate to `src/app/theme/eg-factory/`
2. Modify the appropriate component theme file
3. If adding a new component theme, create a new file and import it in `index.ts`

See the [Theme Documentation](theme-documentation.md) for more details.

## Coding Standards

### TypeScript

- Use TypeScript's strict mode
- Follow Angular's style guide
- Use interfaces for data models
- Avoid `any` type when possible
- Document public methods and properties with JSDoc comments

### HTML Templates

- Use Angular's template syntax
- Follow accessibility best practices
- Keep templates clean and readable
- Use structural directives appropriately

### Component Organization

- Keep components focused on a single responsibility
- Use services for shared functionality and data
- Implement lazy loading for feature modules
- Follow the Angular component lifecycle

## Testing

### Unit Tests

Run unit tests with:

```bash
ng test
```

When creating new components, ensure they have appropriate unit tests.

### End-to-End Tests

For end-to-end testing, you'll need to set up a testing framework like Cypress or Protractor.

## Building for Production

To build the application for production:

```bash
ng build --configuration production
```

This will create optimized production files in the `dist/` directory.

## Deployment

The application can be deployed to various hosting platforms:

1. **Static hosting** (e.g., Netlify, Vercel, GitHub Pages)
2. **Server-based hosting** (e.g., AWS, Azure, Google Cloud)
3. **Docker containerization**

## Contribution Guidelines

1. Create a feature branch for your changes
2. Follow the coding standards
3. Write tests for new functionality
4. Update documentation as needed
5. Submit a pull request with a clear description of your changes

## Resources

- [Angular Documentation](https://angular.dev/)
- [PrimeNG Documentation](https://primeng.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
