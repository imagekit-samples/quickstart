import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ImagekitioAngularModule } from 'imagekitio-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ImagekitioAngularModule.forRoot({
      urlEndpoint: "your_endpoint",
      publicKey: "your_public_key",
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
