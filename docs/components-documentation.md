# Components Documentation

## Overview

This document provides detailed information about the main components of the UafAppPort application, their purpose, and how they interact with each other.

## Component Structure

The application is organized into several key components:

```
compnents/
├── dashboard/     # Main application dashboard
├── login/         # Authentication interface
└── navbar/        # Navigation and app controls
```

## Login Component

**Purpose**: Handles user authentication and provides the entry point to the application.

**Files**:
- `login.component.ts`: Component logic
- `login.component.html`: Template
- `login.component.scss`: Styles

**Features**:
- Connection management (add, test, and select connections)
- Username and password input fields
- Form validation
- Connection testing before authentication
- Loading state during connection testing
- Error handling for failed connections
- Navigation to dashboard upon successful login
- Theme toggle (light/dark mode)

**Connection Management**:
The login component includes a comprehensive connection management system that allows users to:
- Select from previously saved connections
- Add new connections with a name, URL, username, and password
- Specify a custom token property name for backends that use non-standard property names for JWT tokens
- Test connections before saving them
- Configure advanced connection options (e.g., withCredentials for CORS)

**Authentication Flow**:
1. User selects a connection from the dropdown
2. User enters username and password
3. On login button click, the component tests the connection with the provided credentials
4. If the connection test is successful, the user is navigated to the dashboard
5. If the connection test fails, an error message is displayed

**Usage**:
The login component is the default route of the application. Users must authenticate through this component before accessing other parts of the application. The connection management system allows users to connect to different backend servers.

## Navbar Component

**Purpose**: Provides navigation controls and application-wide functionality.

**Files**:
- `navbar.component.ts`: Component logic
- `navbar.component.html`: Template
- `navbar.component.scss`: Styles

**Features**:
- Navigation menu using PrimeNG Menubar
- Dynamic title that can be changed from other applications
- Dynamic buttons that can be configured from other applications
- Theme toggle functionality (light/dark mode)
- Logout functionality
- Responsive design

**Services**:
- `TitleService`: Allows changing the navbar title dynamically
- `NavbarConfigService`: Allows configuring navbar buttons dynamically

**Usage**:
The navbar component is included in the dashboard and provides consistent navigation throughout the application. It allows users to toggle between light and dark themes and to log out of the application.

The navbar title and buttons can be customized from other applications using the TitleService and NavbarConfigService. For detailed information on how to customize the navbar, see the [Navbar Customization Guide](navbar-customization.md).

## Dashboard Component

**Purpose**: Serves as the main interface after authentication, displaying application content and features.

**Files**:
- `dashboard.component.ts`: Component logic
- `dashboard.component.html`: Template
- `dashboard.component.scss`: Styles

**Features**:
- Includes the navbar component
- Displays welcome message
- Container for future dashboard widgets and features

**Usage**:
The dashboard component is accessed after successful authentication and serves as the main application interface. It will be expanded in future development to include various widgets and features for factory management.

## Component Interaction

The components interact in the following ways:

1. **Login → Dashboard**: Upon successful authentication, the login component navigates to the dashboard component.

2. **Dashboard → Navbar**: The dashboard component includes the navbar component in its template.

3. **Navbar → Login**: When the user logs out using the navbar, it navigates back to the login component.

## Future Development

The component structure is designed to be extensible. Future development will include:

1. Additional dashboard widgets for factory management
2. User profile component
3. Settings component
4. Admin interface components
