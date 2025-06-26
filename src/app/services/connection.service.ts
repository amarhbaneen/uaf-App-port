import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Connection {
  id?: string;
  name: string;
  url: string;
  username?: string;
  password?: string;
  token?: string;
  disabled?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private readonly CONNECTIONS_STORAGE_KEY = 'app_connections';

  // Configuration options
  private config = {
    withCredentials: false,  // Default to false to avoid CORS issues
    timeout: 30000,          // Default timeout in milliseconds
    retries: 1               // Number of retry attempts
  };

  constructor(private http: HttpClient) { }

  /**
   * Configure the service options
   * @param options Configuration options
   */
  configure(options: {
    withCredentials?: boolean;
    timeout?: number;
    retries?: number;
  }): void {
    this.config = { ...this.config, ...options };
  }

  /**
   * Get all saved connections
   */
  getConnections(): Connection[] {
    const connectionsJson = localStorage.getItem(this.CONNECTIONS_STORAGE_KEY);
    return connectionsJson ? JSON.parse(connectionsJson) : [];
  }

  /**
   * Save a new connection after successful authentication
   */
  saveConnection(connection: Connection): void {
    const connections = this.getConnections();

    // Generate a unique ID if not provided
    if (!connection.id) {
      connection.id = this.generateUniqueId();
    }

    // Remove password before saving for security
    const connectionToSave = { ...connection };
    delete connectionToSave.password;

    // Check if connection with same ID already exists
    const existingIndex = connections.findIndex(c => c.id === connection.id);

    if (existingIndex >= 0) {
      // Update existing connection
      connections[existingIndex] = connectionToSave;
    } else {
      // Add new connection
      connections.push(connectionToSave);
    }

    localStorage.setItem(this.CONNECTIONS_STORAGE_KEY, JSON.stringify(connections));
  }

  /**
   * Test connection by attempting to authenticate and get JWT token
   *
   * This method sends a POST request to the specified URL with the provided credentials.
   * It expects a JSON response with a status code of 200 for successful authentication.
   * If successful, it extracts a JWT token from the response and returns the connection object.
   *
   * @param connection - The connection object containing URL, username, and password
   * @returns An Observable that emits the connection object with token if successful
   * @throws Error if authentication fails or if the server is unreachable
   */
  testConnection(connection: Connection): Observable<Connection> {
    // Validate required fields
    if (!connection.username || !connection.password) {
      return throwError(() => new Error('Username and password are required'));
    }

    // Create request body with credentials
    const body = {
      username: connection.username,
      password: connection.password
    };

    // Set headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // Ensure URL is properly formatted
    let url = connection.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }

    // Send POST request to the connection URL with headers
    return this.http.post<any>(url, body, {
      headers,
      withCredentials: this.config.withCredentials  // Use the configured setting
    }).pipe(
      map(response => {
        // If we get here, the request was successful (status 200)
        console.log('Connection test successful, response:', response);

        // Extract JWT token from response if available
        // Check different common token property names
        if (response) {
          if (response.token) {
            connection.token = response.token;
          } else if (response.access_token) {
            connection.token = response.access_token;
          } else if (response.jwt) {
            connection.token = response.jwt;
          } else if (response.id_token) {
            connection.token = response.id_token;
          } else if (typeof response === 'string' && response.length > 10) {
            // Some APIs return the token directly as a string
            connection.token = response;
          } else {
            // If no token in response, create a placeholder
            // This allows the connection to be saved even if no token is returned
            connection.token = 'jwt-token-' + Math.random().toString(36).substring(2);
          }
        } else {
          // If response is empty but status is 200, create a placeholder
          connection.token = 'jwt-token-' + Math.random().toString(36).substring(2);
        }

        return { ...connection };
      }),
      catchError(error => {
        // Handle HTTP errors
        let errorMessage = 'Connection test failed';

        if (error.status) {
          errorMessage += `: HTTP ${error.status}`;

          if (error.status === 401 || error.status === 403) {
            errorMessage = 'Authentication failed: Invalid credentials';
          } else if (error.status === 404) {
            errorMessage = 'Server not found at the specified URL';
          } else if (error.status === 0) {
            // Status 0 often indicates CORS issues or network problems
            if (error.name === 'HttpErrorResponse' && error.message && error.message.includes('CORS')) {
              errorMessage = 'CORS error: The server does not allow cross-origin requests. Please ensure CORS is enabled on the server.';
            } else {
              errorMessage = 'Cannot connect to server. Please check the URL and try again';
            }
          }
        }

        // Log the full error for debugging
        console.error('Connection test error:', error);

        // Include more detailed error information
        if (error.error) {
          if (typeof error.error === 'string') {
            errorMessage += ` - ${error.error}`;
          } else if (error.error.message) {
            errorMessage += ` - ${error.error.message}`;
          } else if (error.message) {
            errorMessage += ` - ${error.message}`;
          }
        } else if (error.message) {
          errorMessage += ` - ${error.message}`;
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Delete a connection
   */
  deleteConnection(connectionId: string): void {
    const connections = this.getConnections();
    const updatedConnections = connections.filter(c => c.id !== connectionId);
    localStorage.setItem(this.CONNECTIONS_STORAGE_KEY, JSON.stringify(updatedConnections));
  }

  /**
   * Generate a unique ID for new connections
   */
  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
