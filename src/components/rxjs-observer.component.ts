import { Component, OnInit } from '@angular/core';
import Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Component({
	selector: 'rxjs-observer',
	template: `
		<p class="fz2em text-primary">
			Rxjs(Reactive-Extension js) -- Observer
		</p>
        <div class="row">
			<div class="col-xs-12 col-sm-4">
				<p>
					Rxjs Result:
					<strong class="fz2em">{{rxjsResult}}</strong>
				</p>
			</div>
			<div class="col-xs-12 col-sm-4">
				<p>
					Rxjs Time:
					<b class="fz2em">{{rxjsTime}}</b>
				</p>
			</div>
			<div class="col-xs-12 col-sm-4">
				<p>
					Rxjs Error:
					<b class="fz2em">{{rxjsError}}</b>
				</p>
			</div>
		</div>
    `,
	styles: [`
	  	.fz2em {
			font-size: 2em;
		}
	`]
})
export class RxjsObserverComponent implements OnInit {

	rxjsResult: number = 0;
	rxjsTime: number = 0;
	rxjsError: string = 'No Error At Begin.';

	constructor() {
		const StartTime = Date.now();
		// this.addXy(5, 3)
		// 	.then(rz => this.addXy(rz, 3))
		// 	.then(rz => this.addXy(rz, 3))
		// 	.then(rz => { this.rxjsResult = rz; })
		// 	.catch((err: string) => this.rxjsError = err)
		// 	.then(() => { this.rxjsTime = Date.now() - StartTime });
		this.addXy(5, 3).toPromise()
			.then(rz => this.addXy(rz, 3).toPromise())
			.then(rz => this.addXy(rz, 3).toPromise())
			.then(rz => { this.rxjsResult = rz; })
			.catch((err: string) => this.rxjsError = err)
			.then(() => { this.rxjsTime = Date.now() - StartTime });
	}

	ngOnInit() {}

	addXy(x, y:number): Observable<number> {
		return Rx.Observable.create(observer => {
			setTimeout(() => {
				const sum: number = x + y;
				if (sum > 0) {
					observer.next(sum);
					observer.complete();
				} else {
					observer.error(`Invalid Value is: ${sum}.`);
				}
			}, 100);
		});
	}

	// addXy(x, y:number): Promise<number> {
	// 	return new Promise((resolveFunc: Function, rejectFunc: Function) => {
	// 		setTimeout(() => {
	// 			const rz = x+y;
	// 			if (rz > 0) {
	// 				resolveFunc(x + y);
	// 			} else {
	// 				rejectFunc('Negative value is invalid: ' + String(rz));
	// 			}
	// 		}, 100);
	// 	})
	// }

}