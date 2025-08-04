import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service for managing the application title
 */
@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleSubject = new BehaviorSubject<string>('UAF Pilot');

  /**
   * Get the current application title
   */
  getTitle(): Observable<string> {
    return this.titleSubject.asObservable();
  }

  /**
   * Set the application title
   *
   * @param title The new application title
   */
  setTitle(title: string): void {
    this.titleSubject.next(title);
  }
}
