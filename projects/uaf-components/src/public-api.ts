/*
 * Public API Surface of uaf-components
 */

// Original exports
export * from './lib/uaf-components.service';
export * from './lib/uaf-components.component';
export * from './lib/uaf-components.module';

// Component exports
export { UafLoginComponent } from './lib/components/login/login.component';
export { UafNavbarComponent } from './lib/components/navbar/navbar.component';
export { UafDashboardComponent } from './lib/components/dashboard/dashboard.component';
export { UafSettingsComponent } from './lib/components/settings/settings.component';

// Service exports
export { ConnectionService } from './lib/services/connection.service';

// Theme exports
export { baseTheme } from './lib/themes/eg-factory/base';
export * from './lib/themes/eg-factory/index';

// Note: Theme files (SCSS) are included as assets in ng-package.json
// and should be imported in the consuming application's styles.scss file
