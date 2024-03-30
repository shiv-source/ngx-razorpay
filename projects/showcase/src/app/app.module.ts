import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxRazorpayModule } from 'projects/ngx-razorpay/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxRazorpayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
