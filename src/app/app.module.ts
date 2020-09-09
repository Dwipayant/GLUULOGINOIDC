import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthModule, LogLevel, OidcConfigService, OidcSecurityService } from 'angular-auth-oidc-client';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from '../app/profile/profile/profile.component';

export function configureAuth(oidcConfigService: OidcConfigService) {
  return () =>
      oidcConfigService.withConfig({
          stsServer: 'https://iam4.centroxy.com/',
          redirectUrl: `${window.location.origin}/profile`,
          postLogoutRedirectUri: window.location.origin,
          clientId: '73258360-1e16-4bf4-b2e0-515d07b9e498',
          scope: 'openid profile email',
          responseType: 'id_token token',
          silentRenew: true,
          silentRenewUrl: `${window.location.origin}/silent-renew.html`,
          logLevel: LogLevel.Debug,
      });
}
const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot(),
    RouterModule.forRoot(routes)
   
  ],
  providers: [
    OidcConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: configureAuth,
            deps: [OidcConfigService],
            multi: true,
        },
    OidcSecurityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
