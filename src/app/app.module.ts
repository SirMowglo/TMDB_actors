import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ActorsComponent } from './components/actors/actors.component';
import { MaterialImportsModule } from './modules/material-imports/material-imports.module';
import { ActorDetailsDiagComponent } from './dialogs/actor-details-diag/actor-details-diag.component';

@NgModule({
  declarations: [
    AppComponent,
    ActorsComponent,
    ActorDetailsDiagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialImportsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
