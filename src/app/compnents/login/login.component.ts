import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { DropdownModule} from 'primeng/dropdown';
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConnectionService, Connection } from '../../services/connection.service';


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
    Dialog,
    ToastModule,
    DropdownModule
  ],
  providers: [MessageService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  isDarkMode = false;
  themeIcon = 'pi pi-moon';

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
  showTroubleshooting = false; // Whether to show the troubleshooting section

  // Special connection object for "Add New Connection" option
  readonly ADD_NEW_CONNECTION: Connection = {
    id: 'add-new-connection',
    name: 'Add New Connection',
    url: ''
  };

  constructor(
    private router: Router,
    private connectionService: ConnectionService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // Check if dark mode is enabled in localStorage
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.updateThemeIcon();

    // Apply the theme based on localStorage
    document.body.classList.toggle('dark', this.isDarkMode);

    // Add a MutationObserver to watch for changes to the body's class list
    this.watchBodyClassChanges();

    // Load saved connections
    this.loadConnections();

    // Configure the connection service with initial settings
    this.updateConnectionServiceConfig();
  }

  /**
   * Toggle the withCredentials setting and update the connection service configuration
   */
  toggleWithCredentials() {
    this.withCredentials = !this.withCredentials;
    this.updateConnectionServiceConfig();
  }

  /**
   * Toggle the visibility of the troubleshooting section
   */
  toggleTroubleshooting() {
    this.showTroubleshooting = !this.showTroubleshooting;
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

  // Watch for changes to the body's class list (for when theme is toggled from navbar)
  private watchBodyClassChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const bodyHasDarkClass = document.body.classList.contains('dark');
          if (this.isDarkMode !== bodyHasDarkClass) {
            this.isDarkMode = bodyHasDarkClass;
            this.updateThemeIcon();
          }
        }
      });
    });

    observer.observe(document.body, { attributes: true });
  }

  private updateThemeIcon() {
    this.themeIcon = this.isDarkMode ? 'pi pi-sun' : 'pi pi-moon';
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateThemeIcon();

    // Toggle the class on <body>
    document.body.classList.toggle('dark', this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  login() {
    // If a connection is selected, use its URL for the login
    if (this.selectedConnection) {
      // In a real application, you would use the connection URL and token
      // For now, we'll just navigate to the dashboard if username and password are provided
      if (this.username && this.password) {
        this.router.navigate(['/dashboard']);
      }
    } else if (this.username && this.password) {
      // Fallback to the original behavior if no connection is selected
      this.router.navigate(['/dashboard']);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Please select a connection or enter username and password'
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
    this.showTroubleshooting = false; // Hide troubleshooting section by default
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

    // Show the troubleshooting section if it's not already visible
    if (!this.showTroubleshooting) {
      this.showTroubleshooting = true;
    }

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

          // Hide the troubleshooting section on success
          this.showTroubleshooting = false;
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
   * Handle dialog hide event (triggered when dialog is closed by any means)
   */
  onDialogHide() {
    // Reset the dropdown by selecting the first connection or null if no connections
    // Only reset if the current selection is null (which happens when "Add New Connection" was selected)
    if (this.selectedConnection === null) {
      this.selectedConnection = this.connections.length > 0 && this.connections[0].id !== 'separator' && this.connections[0].id !== this.ADD_NEW_CONNECTION.id
        ? this.connections[0]
        : null;
    }
  }

  /**
   * Handle connection selection change
   */
  onConnectionChange(event: any) {
    if (this.selectedConnection) {
      // Check if the "Add New Connection" option was selected
      if (this.selectedConnection.id === this.ADD_NEW_CONNECTION.id) {
        // Reset the selection
        this.selectedConnection = null;
        // Open the dialog
        this.openNewConnectionDialog();
        return;
      }

      // Check if separator was selected (should not happen, but just in case)
      if (this.selectedConnection.id === 'separator') {
        this.selectedConnection = null;
        return;
      }

      // Pre-fill username if available
      if (this.selectedConnection.username) {
        this.username = this.selectedConnection.username;
      }
      // Clear password for security
      this.password = '';
    }
  }
}
