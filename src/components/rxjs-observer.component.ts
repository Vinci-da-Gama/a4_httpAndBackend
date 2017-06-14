import { Component, OnInit } from '@angular/core';
import Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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

		<div class="alert alert-info">
			<b>Use Observable for countDown function</b>
			<br />
			Count_Result: <strong class="fz2em">{{CountResult}}</strong>
			Count_Error: <strong class="fz2em">{{CountErr}}</strong>
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
	CountResult: number;
	CountErr: string = 'No error at beginning.';

	constructor() {
		const RxjsStartTime = Date.now();
		// this.addXy(5, 3).toPromise()
		// 	.then(rz => this.addXy(rz, 3).toPromise())
		// 	.then(rz => this.addXy(rz, 3).toPromise())
		// 	.then(rz => { this.rxjsResult = rz; })
		// 	.catch((err: string) => this.rxjsError = err)
		// 	.then(() => { this.rxjsTime = Date.now() - RxjsStartTime });

		const observableObj = this.addXy(3, 3);
		observableObj
			.map((rz: number) => { return rz + 3; })
			.map((rz: number) => rz + 3)
			.mergeMap(
			// map cannot handle obsrvableObj itself, so use mergeMap.
			(result: number) => this.addXy(result, 3)
			)
			.mergeMap(
			(result: number) => this.addXy(result, 3)
			)
			.mergeMap(
			(result: number) => this.addXy(result, 1)
			)
			.finally(
			// finally should always before subscribe.
			() => { this.rxjsTime = Date.now() - RxjsStartTime; }
			)
			.subscribe((rz: number) => { this.rxjsResult = rz; },
			(error: string) => { this.rxjsError = error });

		const cdObv = this.countDown(5);
		cdObv
			.subscribe((rz: number) => { this.CountResult = rz; },
			(error: string) => { this.CountErr = 'Counter has error. Please check internet.' },
			() => this.CountResult = 'Complete -- subscribe has 3 arguments. first is then, second is error, third is final.');
	}

	ngOnInit() { }

	addXy(x: number, y: number): Observable<number> {
		return Rx.Observable.create((observer) => {
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
	};

	countDown(startNm: number): Observable<number> {
		// return Rx.Observable.create(observer => {
		// 	let counter: number = startNm;
		// 	observer.next(counter--);
		// 	// use intervalId to distroy setInterval. otherwise, it would be called all the time.
		// 	// intervalId is setInterval itself
		// 	const intervalId = setInterval(() => {
		// 		if (counter >= 0) {
		// 			observer.next(counter--);
		// 		} else {
		// 			observer.complete();
		// 			clearInterval(intervalId);
		// 		}
		// 	}, 500);
		// });
		////////////////////////////////////////////////
		// above code could be replaced by following. //
		////////////////////////////////////////////////
		// timer(1, 1000) === start from 1ms to 1000ms
		return Rx.Observable.timer(1, 1000)
			.map((x: number) => { return startNm - x; })
			.takeWhile((x: number) => x >= 0);
	};

}