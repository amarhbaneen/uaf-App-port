# Publishing the UAF Components Library to NPM

This guide explains how to publish the UAF Components library to NPM so it can be used in other Angular applications.

## Prerequisites

1. An NPM account (create one at [npmjs.com](https://npmjs.com) if you don't have one)
2. Access to the @amarhbaneen organization on NPM (or change the package name if you don't have access)
3. Node.js and npm installed on your machine

## Before Publishing

1. Update the repository URLs in both package.json files:
   - Main package.json in the project root
   - Library package.json in projects/uaf-components/package.json

   Replace the placeholder URLs:
   ```json
   "repository": {
     "type": "git",
     "url": "https://github.com/yourusername/uaf-components.git"
   },
   "homepage": "https://github.com/yourusername/uaf-components",
   "bugs": {
     "url": "https://github.com/yourusername/uaf-components/issues"
   }
   ```
   with your actual repository information.

2. Make sure you're logged in to NPM:
   ```
   npm login
   ```

3. Update the version number in both package.json files if you're publishing an update:
   - Main package.json in the project root
   - Library package.json in projects/uaf-components/package.json

   Follow semantic versioning (SemVer) principles:
   - **MAJOR version** (x.0.0): Increment when making incompatible API changes
   - **MINOR version** (0.x.0): Increment when adding functionality in a backward compatible manner
   - **PATCH version** (0.0.x): Increment when making backward compatible bug fixes

   For example, to update from version 1.1.2 to 1.1.3 (patch update):
   ```json
   "version": "1.1.3"
   ```

## Publishing Process

The project is already configured with the necessary scripts for building and publishing. Follow these steps in order:

1. **Make your changes to the library code**:
   - Update components, services, or themes as needed
   - Test your changes thoroughly
   - Update documentation if necessary

2. **Update version numbers**:
   - Update the version in both package.json files (root and projects/uaf-components/package.json)
   - Make sure both files have the same version number
   - Commit your changes to version control

3. **Build the library**:
   ```
   npm run build:lib
   ```
   This command builds the library and places the output in the dist/uaf-components directory.

4. **Verify the build**:
   - Check that all files were generated correctly in the dist/uaf-components directory
   - Ensure theme files are included in the build

5. **Publish the library to NPM**:
   ```
   npm run publish:lib
   ```
   This will publish the library to NPM with public access.

6. **Verify the publication**:
   - Check that the package is available on NPM: https://www.npmjs.com/package/@amarhbaneen/uaf-components
   - Verify that the correct version is published

## Using the Published Library

Once published, you can use the library in other Angular applications by installing it:

```
npm install @amarhbaneen/uaf-components
```

### Importing Components

Import the components in your Angular modules:

```typescript
import { UafComponentsModule } from '@amarhbaneen/uaf-components';

@NgModule({
  imports: [
    UafComponentsModule
  ]
})
export class AppModule { }
```

### Using the Theme

The library includes a custom theme for PrimeNG components. To use the theme in your application:

1. Import the theme in your application's main styles file (e.g., `styles.scss`):
   ```scss
   @import "@amarhbaneen/uaf-components/src/lib/themes/index";
   ```

2. Optional: To enable dark mode, add the `dark` class to your body element:
   ```html
   <body class="dark">
     <!-- Your app content here -->
   </body>
   ```

For more detailed information about the theme, see the [Theme Documentation](./theme-documentation.md).

## Troubleshooting

### Common Publishing Issues

- **Access Denied Error**:
  ```
  npm ERR! code E403
  npm ERR! 403 403 Forbidden - PUT https://registry.npmjs.org/@amarhbaneen%2fuaf-components
  npm ERR! 403 In most cases, you or one of your dependencies are requesting
  npm ERR! 403 a package version that is forbidden by your security policy.
  ```
  **Solution**:
  - Make sure you're logged in to NPM with the correct account: `npm login`
  - Ensure you have access to the @amarhbaneen organization on NPM
  - If you don't have access, either:
    - Get added to the organization on NPM
    - Change the package name to something you have access to

- **Version Already Exists Error**:
  ```
  npm ERR! code E403
  npm ERR! 403 403 Forbidden - PUT https://registry.npmjs.org/@amarhbaneen%2fuaf-components - You cannot publish over the previously published versions
  ```
  **Solution**:
  - Update the version number in both package.json files (root and projects/uaf-components/package.json)
  - Make sure both files have the same version number

- **Missing Files in Published Package**:
  **Solution**:
  - Check the ng-package.json file to ensure all necessary files are included in the assets array
  - Rebuild the library and verify the contents of the dist folder before publishing

- **Theme Import Error in Consuming Application**:
  ```
  Could not resolve "@amarhbaneen/uaf-components/src/lib/themes/index.scss"
  ```
  **Solution**:
  - Make sure the theme files are properly exported in the package.json file:
    ```json
    "exports": {
      "./src/lib/themes/index.scss": "./src/lib/themes/index.scss"
    }
    ```
  - Verify that the theme files are included in the assets array in ng-package.json

### After Publishing

- **Verify Package Contents**:
  You can check what files were published in your package using:
  ```
  npm view @amarhbaneen/uaf-components dist.tarball
  ```
  Then download and extract the tarball to inspect its contents.

- **Testing the Published Package**:
  Create a new Angular project and install your package to verify it works as expected:
  ```
  ng new test-app
  cd test-app
  npm install @amarhbaneen/uaf-components
  ```
