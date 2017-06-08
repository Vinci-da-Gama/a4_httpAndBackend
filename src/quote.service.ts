// rxjs will provide observirble method. one of then is toPromise
// import 'rxjs/Rx';
//////////////////////////////////////////////////////////////////////////////
// to only import toPromise, and it is not need to add 'rxjs/Rx' into main.ts //
//////////////////////////////////////////////////////////////////////////////
import 'rxjs/add/operator/toPromise';
// injectable will make { Http } become injectable.
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Quote } from './quote.model';

@Injectable()
export class QuoteService {

	constructor(private http: Http) {}

	getQuoteOfTheDay(): Promise<Quote> {
		const path:string = './localDb/quote.json';
		return this.http.get(path).toPromise()
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			throw err;
		});


		// return {
		// 	"line": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		// 	"author": "Brian W. Kernighan"
		// };
	}

}
