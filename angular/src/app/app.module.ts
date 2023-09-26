import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ImagekitioAngularModule } from "../../lib/src/imagekitio-angular/imagekitio-angular.module";
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImagekitioAngularModule.forRoot({
      urlEndpoint: environment.URL_ENDPOINT,
      publicKey: environment.PUBLIC_KEY,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
