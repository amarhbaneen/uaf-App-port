// Public API Surface of uaf-App-port
// This file exports all the components, services, and functions that can be imported by other applications

// Main initialization function
export { initializeApp } from './main';

// App component and configuration
export { App } from './app/app';
export { appConfig } from './app/app.config';

// Routes
export { routes } from './app/app.routes';

// Components
export { LoginComponent } from './app/compnents/login/login.component';
export { DashboardComponent } from './app/compnents/dashboard/dashboard.component';
export { SettingsComponent } from './app/compnents/settings/settings.component';

// Add any other components, services, or utilities that should be available to importing applications
