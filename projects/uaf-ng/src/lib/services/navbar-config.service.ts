import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Interface for navbar button configuration
 */
export interface NavbarButton {
  /**
   * Unique identifier for the button
   */
  id: string;

  /**
   * Icon to display on the button
   */
  icon?: string;

  /**
   * Label to display on the button
   */
  label?: string;

  /**
   * Tooltip to display when hovering over the button
   */
  tooltip?: string;

  /**
   * Route to navigate to when the button is clicked
   */
  route?: string;

  /**
   * Custom click handler
   */
  onClick?: () => void;

  /**
   * CSS class to apply to the button
   */
  styleClass?: string;

  /**
   * Whether the button is visible
   */
  visible?: boolean;
}

/**
 * Service for configuring the navbar buttons
 */
@Injectable({
  providedIn: 'root'
})
export class NavbarConfigService {
  private buttonsSubject = new BehaviorSubject<NavbarButton[]>([
    {
      id: 'theme',
      tooltip: 'Toggle Theme',
      visible: true
    },
    {
      id: 'settings',
      icon: 'pi pi-cog',
      tooltip: 'Settings',
      visible: true
    },
    {
      id: 'logout',
      icon: 'pi pi-sign-out',
      tooltip: 'Logout',
      visible: true
    }
  ]);

  /**
   * Get the current navbar buttons configuration
   */
  getButtons(): Observable<NavbarButton[]> {
    return this.buttonsSubject.asObservable();
  }

  /**
   * Set the navbar buttons configuration
   *
   * @param buttons The new buttons configuration
   */
  setButtons(buttons: NavbarButton[]): void {
    this.buttonsSubject.next(buttons);
  }

  /**
   * Add a button to the navbar
   *
   * @param button The button to add
   */
  addButton(button: NavbarButton): void {
    const currentButtons = this.buttonsSubject.getValue();
    this.buttonsSubject.next([...currentButtons, button]);
  }

  /**
   * Remove a button from the navbar
   *
   * @param id The ID of the button to remove
   */
  removeButton(id: string): void {
    const currentButtons = this.buttonsSubject.getValue();
    this.buttonsSubject.next(currentButtons.filter(button => button.id !== id));
  }

  /**
   * Update a button in the navbar
   *
   * @param id The ID of the button to update
   * @param updates The updates to apply to the button
   */
  updateButton(id: string, updates: Partial<NavbarButton>): void {
    const currentButtons = this.buttonsSubject.getValue();
    this.buttonsSubject.next(
      currentButtons.map(button =>
        button.id === id ? { ...button, ...updates } : button
      )
    );
  }
}
