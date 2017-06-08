import { Component } from '@angular/core';
import { Quote } from './quote.model';
import { QuoteService } from './quote.service';

@Component({
	selector: 'my-app',
	template: `
		<h1>Quote Of The Day</h1>
		<p><em>{{quote.line}}</em> - {{quote.author}}</p>
		<br />
		<div class="row">
			<div class="col-xs-12 col-sm-4">
				<p>
					Callback Result: 
					<strong class="fz2em">{{cbResult}}</strong>
				</p>
			</div>
			<div class="col-xs-12 col-sm-4">
				<p>
					Callback Time:
					<b class="fz2em">{{cbTime}}</b>
				</p>
			</div>
			<div class="col-xs-12 col-sm-4">
				<p>
					Callback Error:
					<b class="fz2em">{{cbError}}</b>
				</p>
			</div>
		</div>
		<es6-cb-component></es6-cb-component>
		<rxjs-observer></rxjs-observer>
  	`,
  	styles: [`
	  	.fz2em {
			font-size: 2em;
		}
	`]
})
export class AppComponent {

	quote: Quote = {
		line: '',
		author: ''
	}

	cbResult: number = 0;
	cbTime: number = 0;
	cbError: string = 'No Error At Begin.';

	constructor(quoteService: QuoteService) {
		quoteService.getQuoteOfTheDay()
			.then((res) => {
				console.info('22 -- res is: ', res);
				this.quote = res;
			})
			.catch((err) => {
				throw err;
			});
		const startTime = Date.now();
		this.addXy(5, 2, (result: number) => {
			this.addXy(result, -10, (rz: number) => {
				this.cbResult = rz
				this.cbTime = Date.now() - startTime;
			}, (errRes:string) => { this.cbError = errRes; });
		}, (errRes: string) => { this.cbError = errRes; });
	}
	
	// () => number
	addXy( x:number, y:number, cb:Function, errCb:Function ) {
		setTimeout(() => {
			const rz:number = x+y;
			if (rz > 0) {
				cb(x+y);
			} else {
				errCb('Invalid Reaulst: '+rz);
			}
		}, 100);
	}

}
