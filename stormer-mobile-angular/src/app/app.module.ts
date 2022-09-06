import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';

import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PlanComponent } from './plan/plan.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    PlanComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: '1990ef3c-beab-49fb-a593-96d24a6b5fea', // Application (client) ID from the app registration
        authority: 'https://login.microsoftonline.com/acdf4017-7754-44ec-bb62-996071c8b834', // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
        redirectUri: 'http://localhost:4200/account/'// This is the redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    }), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
      }
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },
    MsalGuard
  ],
  bootstrap: [
    AppComponent, 
    MsalRedirectComponent], 
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class AppModule { }
