# API Documentation

## Overview

This document provides information about the API endpoints and services used in the UafAppPort application. It serves as a reference for developers working with the application's data layer.

> **Note**: This is a template for future API documentation. As the application is currently in early development, actual API implementations may not yet exist.

## Authentication API

### Login

**Endpoint**: `/api/auth/login`

**Method**: POST

**Description**: Authenticates a user and returns a JWT token.

**Request Body**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Response**:
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "role": "string"
  }
}
```

**Status Codes**:
- 200: Success
- 401: Invalid credentials
- 500: Server error

### Logout

**Endpoint**: `/api/auth/logout`

**Method**: POST

**Description**: Invalidates the current user's token.

**Headers**:
- Authorization: Bearer {token}

**Response**:
```json
{
  "message": "Logout successful"
}
```

**Status Codes**:
- 200: Success
- 401: Unauthorized
- 500: Server error

## User API

### Get Current User

**Endpoint**: `/api/users/me`

**Method**: GET

**Description**: Returns the current user's information.

**Headers**:
- Authorization: Bearer {token}

**Response**:
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "created_at": "string",
  "updated_at": "string"
}
```

**Status Codes**:
- 200: Success
- 401: Unauthorized
- 500: Server error

### Update User

**Endpoint**: `/api/users/{id}`

**Method**: PUT

**Description**: Updates a user's information.

**Headers**:
- Authorization: Bearer {token}

**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Response**:
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "updated_at": "string"
}
```

**Status Codes**:
- 200: Success
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 500: Server error

## Dashboard API

### Get Dashboard Data

**Endpoint**: `/api/dashboard`

**Method**: GET

**Description**: Returns data for the dashboard.

**Headers**:
- Authorization: Bearer {token}

**Response**:
```json
{
  "stats": {
    "total_users": "number",
    "active_users": "number",
    "total_products": "number"
  },
  "recent_activity": [
    {
      "id": "string",
      "type": "string",
      "description": "string",
      "timestamp": "string"
    }
  ]
}
```

**Status Codes**:
- 200: Success
- 401: Unauthorized
- 500: Server error

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object (optional)"
  }
}
```

## Authentication

Most API endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer {token}
```

## Rate Limiting

API requests are subject to rate limiting to prevent abuse. The current limits are:

- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Versioning

The API uses versioning to ensure backward compatibility. The current version is v1.

Example: `/api/v1/users/me`

## Connection Service

The ConnectionService is a client-side service that manages connections to backend servers. It provides functionality for testing connections, saving connection details, and retrieving saved connections.

### Service Methods

#### Test Connection

**Method**: `testConnection(connection: Connection): Observable<Connection>`

**Description**: Tests a connection by sending a POST request to the specified URL with the provided credentials. Expects a JSON response with a status code of 200 for successful authentication.

**Parameters**:
```typescript
{
  name: string;       // Display name for the connection
  url: string;        // Server URL
  username: string;   // Username for authentication
  password: string;   // Password for authentication
}
```

**Response**:
```typescript
{
  id?: string;        // Unique identifier (generated if not provided)
  name: string;       // Display name for the connection
  url: string;        // Server URL
  username?: string;  // Username for authentication
  token?: string;     // JWT token extracted from the response
}
```

**Error Handling**:
- Username and password are required
- HTTP errors (401, 403, 404, etc.)
- CORS errors
- Network connectivity issues
- JSON parsing errors

#### Get Connections

**Method**: `getConnections(): Connection[]`

**Description**: Retrieves all saved connections from local storage.

**Response**: Array of Connection objects (without passwords for security).

#### Save Connection

**Method**: `saveConnection(connection: Connection): void`

**Description**: Saves a connection to local storage. If a connection with the same ID already exists, it will be updated.

**Parameters**: Connection object (password is removed before saving for security).

#### Delete Connection

**Method**: `deleteConnection(connectionId: string): void`

**Description**: Deletes a connection from local storage.

**Parameters**: ID of the connection to delete.

### Configuration

The ConnectionService can be configured with the following options:

```typescript
{
  withCredentials?: boolean;  // Whether to send cookies with cross-origin requests
  timeout?: number;           // Request timeout in milliseconds
  retries?: number;           // Number of retry attempts
}
```

## Future Endpoints

As the application evolves, additional endpoints will be added for:

1. Factory management
2. Product management
3. User management
4. Reporting and analytics

These endpoints will be documented in this file as they are implemented.
