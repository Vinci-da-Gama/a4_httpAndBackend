import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { QuoteService } from './quote.service';
import { AppComponent } from './app.component';
import { Es6PromiseComponent } from './components/es6.promist.component';
import { RxjsObserverComponent } from './components/rxjs-observer.component';

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [AppComponent, Es6PromiseComponent, RxjsObserverComponent],
  providers: [QuoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
