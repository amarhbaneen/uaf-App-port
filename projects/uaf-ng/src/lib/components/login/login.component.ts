import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { Button, ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConnectionService, Connection } from '../../services/connection.service';
import { Password } from 'primeng/password';
import { ThemeService } from '../../services/theme.service';
import { ThemeAwareBase } from '../../shared/theme-aware.base';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    Card,
    FormsModule,
    ButtonDirective,
    InputText,
    Tooltip,
    ToastModule,
    DropdownModule,
    Button,
    Password
  ],
  providers: [MessageService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ThemeAwareBase {
  username = '';
  password = '';

  // Connection management
  connections: Connection[] = [];
  selectedConnection: Connection | null = null;
  showNewConnectionDialog = false;
  newConnection: Connection = {
    name: '',
    url: '',
    username: '',
    password: ''
  };
  connectionTestInProgress = false;
  connectionTestSuccess = false;
  connectionTestError = '';

  // Advanced connection options
  withCredentials = false; // Whether to send cookies with cross-origin requests

  // Special connection object for "Add New Connection" option
  readonly ADD_NEW_CONNECTION: Connection = {
    id: 'add-new-connection',
    name: 'Add New Connection',
    url: ''
  };

  constructor(
    private router: Router,
    private connectionService: ConnectionService,
    private messageService: MessageService,
    themeService: ThemeService
  ) {
    super(themeService);
  }

  override ngOnInit() {
    // Call the base class ngOnInit to handle theme initialization
    super.ngOnInit();

    // Load saved connections
    this.loadConnections();

    // Configure the connection service with initial settings
    this.updateConnectionServiceConfig();
  }

  protected override usesThemeIcon(): boolean {
    return true;
  }

  /**
   * Toggle the withCredentials setting and update the connection service configuration
   */
  toggleWithCredentials() {
    this.withCredentials = !this.withCredentials;
    this.updateConnectionServiceConfig();
  }


  /**
   * Update the connection service configuration with current settings
   */
  private updateConnectionServiceConfig() {
    this.connectionService.configure({
      withCredentials: this.withCredentials
    });
  }

  /**
   * Load saved connections from the service and add the "Add New Connection" option
   */
  loadConnections() {
    // Get connections from service
    const savedConnections = this.connectionService.getConnections();

    // Add the "Add New Connection" option at the end with a separator
    this.connections = [
      ...savedConnections,
      // Add a separator if there are saved connections
      ...(savedConnections.length > 0 ? [{ id: 'separator', name: '──────────', url: '', disabled: true }] : []),
      this.ADD_NEW_CONNECTION
    ];
  }


  /**
   * Handles the login process
   *
   * This method validates the user credentials, tests the connection to the server,
   * and navigates to the dashboard if authentication is successful.
   *
   * The login process follows these steps:
   * 1. Validates that username and password are provided
   * 2. Checks that a valid connection is selected
   * 3. Creates a temporary connection object with the current credentials
   * 4. Tests the connection to verify server accessibility and credential validity
   * 5. Navigates to the dashboard if the connection test is successful
   * 6. Displays appropriate error messages if any step fails
   */
  login() {
    // Check if we have the required credentials
    if (!this.username || !this.password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Please enter username and password'
      });
      return;
    }

    // If a connection is selected, use its URL for the login
    if (this.selectedConnection && this.selectedConnection.id !== this.ADD_NEW_CONNECTION.id && this.selectedConnection.id !== 'separator') {
      // Create a temporary connection object with the current credentials
      const loginConnection: Connection = {
        ...this.selectedConnection,
        username: this.username,
        password: this.password
      };

      // Show loading state
      this.connectionTestInProgress = true;

      // Test the connection before proceeding with login
      this.connectionService.testConnection(loginConnection)
        .subscribe({
          next: (connection) => {
            this.connectionTestInProgress = false;

            // Connection test successful, proceed with login
            this.messageService.add({
              severity: 'success',
              summary: 'Connection Successful',
              detail: 'Successfully connected to the server'
            });

            // Navigate to dashboard
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.connectionTestInProgress = false;

            // Show error message
            this.messageService.add({
              severity: 'error',
              summary: 'Connection Failed',
              detail: error.message || 'Failed to connect to the server'
            });

            // Log the full error for debugging
            console.error('Login connection test error:', error);
          }
        });
    } else {
      // No valid connection selected
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Please select a valid connection'
      });
    }
  }

  /**
   * Open the dialog to add a new connection
   */
  openNewConnectionDialog() {
    this.newConnection = {
      name: '',
      url: '',
      username: '',
      password: ''
    };
    this.connectionTestSuccess = false;
    this.connectionTestError = '';
    this.showNewConnectionDialog = true;
  }


  /**
   * Test the new connection by attempting to authenticate
   */
  testConnection() {
    if (!this.newConnection.name || !this.newConnection.url) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Connection name and URL are required'
      });
      return;
    }

    this.connectionTestInProgress = true;
    this.connectionTestSuccess = false;
    this.connectionTestError = '';

    this.connectionService.testConnection(this.newConnection)
      .subscribe({
        next: (connection) => {
          this.connectionTestInProgress = false;
          this.connectionTestSuccess = true;
          this.newConnection = connection;
          this.messageService.add({
            severity: 'success',
            summary: 'Connection Test Successful',
            detail: 'Successfully authenticated with the server'
          });
        },
        error: (error) => {
          this.connectionTestInProgress = false;
          this.connectionTestError = error.message;

          // Log the full error for debugging
          console.error('Connection test error details:', error);

          this.messageService.add({
            severity: 'error',
            summary: 'Connection Test Failed',
            detail: error.message
          });
        }
      });
  }

  /**
   * Save the new connection after successful testing
   */
  saveConnection() {
    if (!this.connectionTestSuccess) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please test the connection successfully before saving'
      });
      return;
    }

    this.connectionService.saveConnection(this.newConnection);
    this.loadConnections();
    this.showNewConnectionDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Connection Saved',
      detail: `Connection "${this.newConnection.name}" has been saved`
    });

    // Select the newly added connection
    const newConnectionId = this.newConnection.id;
    if (newConnectionId) {
      this.selectedConnection = this.connections.find(c => c.id === newConnectionId) || null;
    }
  }

  /**
   * Cancel adding a new connection
   */
  cancelNewConnection() {
    this.showNewConnectionDialog = false;
  }

  /**
   * Handle transition end event (triggered when animation completes)
   */
  onTransitionEnd(event: TransitionEvent) {
    // Only handle the transform transition of the cards-container
    // No rollback - we don't automatically select a connection after closing the dialog
  }

  /**
   * Handle connection selection change
   */
  onConnectionChange(event: any) {
    if (this.selectedConnection) {
      if (this.selectedConnection.id === this.ADD_NEW_CONNECTION.id) {

        this.openNewConnectionDialog();

        setTimeout(() => {
          this.selectedConnection = null;
        }, 0);

        return;
      }

      if (this.selectedConnection.id === 'separator') {
        this.selectedConnection = null;
        return;
      }

      if (this.selectedConnection.username) {
        this.username = this.selectedConnection.username;
      }
      this.password = '';
    }
  }
}
