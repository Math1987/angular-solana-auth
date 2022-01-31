import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SolWalletsModule } from "angular-sol-wallets" ;
import { AuthentificationInterceptor } from './shared/interceptors/authentification.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SolWalletsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthentificationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
