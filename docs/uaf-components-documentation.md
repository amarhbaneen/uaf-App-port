# UAF Components Library Documentation

## Overview

The UAF Components Library (`@amarextraholding/uaf-components`) is a collection of reusable UI components built with Angular and PrimeNG. These components are designed to provide a consistent user interface for applications that require user authentication and factory management features.

## Installation

### NPM Installation

To install the UAF Components library from NPM, run:

```bash
npm install @amarextraholding/uaf-components
```

### Required Peer Dependencies

The library requires the following peer dependencies:

```bash
npm install primeng primeicons primeflex @primeng/themes
```

## Module Integration

Import the UafComponentsModule in your application module:

```typescript
import { UafComponentsModule } from '@amarextraholding/uaf-components';

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
import { UafComponentsModule } from '@amarextraholding/uaf-components';

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

### Authentication Components

- **UafLoginComponent**: A login form component with validation and error handling
- **UafRegisterComponent**: A registration form component with validation
- **UafForgotPasswordComponent**: A form for password recovery

### UI Components

- **UafButtonComponent**: Custom styled buttons with various states
- **UafCardComponent**: Container component for content with consistent styling
- **UafDialogComponent**: Modal dialog component for displaying information or forms
- **UafTableComponent**: Data table component with sorting, filtering, and pagination

### Navigation Components

- **UafNavbarComponent**: Navigation bar component for application header
- **UafSidebarComponent**: Collapsible sidebar for application navigation
- **UafBreadcrumbComponent**: Breadcrumb navigation component

## Component Usage Examples

### Login Component

```typescript
<uaf-login 
  [loading]="isLoading"
  (loginSubmit)="onLoginSubmit($event)">
</uaf-login>
```

### Button Component

```typescript
<uaf-button 
  label="Submit" 
  [loading]="isSubmitting"
  (onClick)="handleSubmit()">
</uaf-button>
```

### Table Component

```typescript
<uaf-table 
  [data]="users" 
  [columns]="columns"
  [paginator]="true"
  [rows]="10">
</uaf-table>
```

## Theming

The UAF Components library uses PrimeNG's theming system and includes a custom theme called "eg-factory". This theme provides consistent styling across all components.

To use the custom theme, import it in your application's styles:

```scss
// In your styles.scss file
@import '@amarextraholding/uaf-components/themes/eg-factory/theme.scss';
```

## Services

The library includes several services that can be injected into your components:

### UafAuthService

Provides authentication-related functionality:

```typescript
import { UafAuthService } from '@amarextraholding/uaf-components';

constructor(private authService: UafAuthService) { }

login(username: string, password: string) {
  this.authService.login(username, password).subscribe(
    response => {
      // Handle successful login
    },
    error => {
      // Handle error
    }
  );
}
```

### UafNotificationService

Provides methods for displaying notifications:

```typescript
import { UafNotificationService } from '@amarextraholding/uaf-components';

constructor(private notificationService: UafNotificationService) { }

showSuccess() {
  this.notificationService.showSuccess('Operation completed successfully');
}

showError() {
  this.notificationService.showError('An error occurred');
}
```

## Directives

The library includes several directives that can be used in your templates:

### UafTooltipDirective

```typescript
<button uafTooltip="Click to submit">Submit</button>
```

### UafHighlightDirective

```typescript
<div uafHighlight>This text will be highlighted</div>
```

## Contribution

If you want to contribute to the UAF Components library, please refer to the [Development Guide](development-guide.md) for more information.

## License

The UAF Components library is licensed under the MIT License. See the LICENSE file for more information.
