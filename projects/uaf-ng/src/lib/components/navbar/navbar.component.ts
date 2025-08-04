import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { PrimeTemplate } from 'primeng/api';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { NgFor, NgIf } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { ThemeAwareBase } from '../../shared/theme-aware.base';
import { Subscription } from 'rxjs';
import { TitleService } from '../../services/title.service';
import { NavbarConfigService, NavbarButton } from '../../services/navbar-config.service';

/**
 * Navigation bar component for the application
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    Menubar,
    PrimeTemplate,
    Tooltip,
    Button,
    NgFor,
    NgIf,
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends ThemeAwareBase implements OnDestroy {
  /**
   * The current application title
   */
  public title: string = 'UAF Pilot';

  /**
   * The current navbar buttons configuration
   */
  public buttons: NavbarButton[] = [];

  /**
   * Subscription to title changes
   */
  private titleSubscription: Subscription | undefined;

  /**
   * Subscription to buttons changes
   */
  private buttonsSubscription: Subscription | undefined;

  @Input() logoutHandler?: () => void;
  @Input() titleHandler?: () => void;

  /**
   * Constructor
   *
   * @param {Router} router - Angular Router for navigation
   * @param {ThemeService} themeService - Service for theme management
   * @param {TitleService} titleService - Service for title management
   * @param {NavbarConfigService} navbarConfigService - Service for navbar buttons configuration
   */
  constructor(
    private router: Router,
    themeService: ThemeService,
    private titleService: TitleService,
    private navbarConfigService: NavbarConfigService
  ) {
    // Pass the ThemeService to the base class
    super(themeService);
  }

  override ngOnInit() {
    // Call the base class ngOnInit to handle theme initialization
    super.ngOnInit();

    // Subscribe to title changes
    this.titleSubscription = this.titleService.getTitle().subscribe(title => {
      this.title = title;
      // Call the titleHandler if provided
      if (this.titleHandler) {
        this.titleHandler();
      }
    });

    // Subscribe to button changes
    this.buttonsSubscription = this.navbarConfigService.getButtons().subscribe(buttons => {
      this.buttons = buttons;
    });
  }

  /**
   * Clean up subscriptions when the component is destroyed
   */
  override ngOnDestroy(): void {
    if (this.titleSubscription) {
      this.titleSubscription.unsubscribe();
    }
    if (this.buttonsSubscription) {
      this.buttonsSubscription.unsubscribe();
    }
  }

  protected override usesThemeIcon(): boolean {
    return true;
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  logout() {
    if (this.logoutHandler) {
      this.logoutHandler();
    } else {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Handle button click based on button ID
   *
   * @param {NavbarButton} button - The button that was clicked
   */
  handleButtonClick(button: NavbarButton) {
    // If the button has a custom onClick handler, use it
    if (button.onClick) {
      button.onClick();
      return;
    }

    // If the button has a route, navigate to it
    if (button.route) {
      this.router.navigate([button.route]);
      return;
    }

    // Otherwise, handle based on button ID
    switch (button.id) {
      case 'settings':
        this.navigateToSettings();
        break;
      case 'theme':
        this.toggleTheme();
        break;
      case 'logout':
        this.logout();
        break;
      default:
        console.warn(`No handler defined for button with ID: ${button.id}`);
    }
  }

  trackById(index: number, button: NavbarButton): string {
    return button.id;
  }
}
