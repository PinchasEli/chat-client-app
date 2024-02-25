import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { tokenInterceptorProviders } from './auth/helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MainLayoutModule,
    AuthModule
  ],
  
  providers: [
    tokenInterceptorProviders,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
