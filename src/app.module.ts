import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuoteService } from './quote.service';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  providers: [QuoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
