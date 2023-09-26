import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { ImagekitioAngularModule } from 'imagekitio-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImagekitioAngularModule.forRoot({
      urlEndpoint: "your_endpoint",
      publicKey: "your_public_key",
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
