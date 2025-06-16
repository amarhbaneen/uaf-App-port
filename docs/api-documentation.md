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

## Future Endpoints

As the application evolves, additional endpoints will be added for:

1. Factory management
2. Product management
3. User management
4. Reporting and analytics

These endpoints will be documented in this file as they are implemented.
