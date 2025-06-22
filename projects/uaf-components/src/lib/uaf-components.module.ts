import { NgModule } from '@angular/core';
import { UafComponentsComponent } from './uaf-components.component';
import { UafLoginComponent } from './components/login/login.component';
import { UafNavbarComponent } from './components/navbar/navbar.component';
import { UafDashboardComponent } from './components/dashboard/dashboard.component';
import { UafSettingsComponent } from './components/settings/settings.component';

@NgModule({
  imports: [
    UafComponentsComponent,
    UafLoginComponent,
    UafNavbarComponent,
    UafDashboardComponent,
    UafSettingsComponent
  ],
  exports: [
    UafComponentsComponent,
    UafLoginComponent,
    UafNavbarComponent,
    UafDashboardComponent,
    UafSettingsComponent
  ]
})
export class UafComponentsModule { }
