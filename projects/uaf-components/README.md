# UAF Components

User Authentication Factory UI Components Library with PrimeNG.

## Installation

```bash
npm install @amarhbaneen/uaf-components
```

## Usage

### Importing the Library

You can import the entire library or specific components:

```typescript
// Import the entire library
import * as UafComponents from '@amarhbaneen/uaf-components';

// Or import specific components
import { LoginComponent, DashboardComponent } from '@amarhbaneen/uaf-components';
```

### Initializing the App

To initialize the UAF app in your application:

```typescript
import { initializeApp } from '@amarhbaneen/uaf-components';

// Initialize the app
initializeApp().then(appRef => {
  console.log('UAF app initialized successfully');
}).catch(err => {
  console.error('Failed to initialize UAF app', err);
});
```

### Using Components

You can use the components in your templates:

```html
<app-login></app-login>
<app-dashboard></app-dashboard>
<app-settings></app-settings>
```

## Components

- **LoginComponent**: Authentication component for user login
- **DashboardComponent**: Main dashboard view
- **SettingsComponent**: User settings and preferences

## License

MIT
