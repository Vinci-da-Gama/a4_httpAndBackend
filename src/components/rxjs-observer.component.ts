import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
	// moduleId: module.id,
	selector: 'rxjs-observer',
	template: `
		<p class="fz2em text-primary">
			Rxjs(Reactive-Extension js) -- Observer
		</p>
        <div class="row">
			<div class="col-xs-12 col-sm-4">
				<p>
					Callback Result:
					<strong class="fz2em">{{es6Result}}</strong>
				</p>
			</div>
			<div class="col-xs-12 col-sm-4">
				<p>
					Callback Time:
					<b class="fz2em">{{es6Time}}</b>
				</p>
			</div>
			<div class="col-xs-12 col-sm-4">
				<p>
					Callback Error:
					<b class="fz2em">{{es6Error}}</b>
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

	es6Result: number = 0;
	es6Time: number = 0;
	es6Error: string = 'No Error At Begin.';

	constructor() {
		const StartTime = Date.now();
		this.addXy(5, 3)
		.then(rz => this.addXy(rz, -10))
		.then(rz => this.addXy(rz, 3))
		.then(rz => { this.es6Result = rz; })
		.catch((err: string) => this.es6Error = err)
		.then(() => { this.es6Time = Date.now() - StartTime });
	}

	ngOnInit() {

	}

	// () => void
	////////////////////////////////////////////////////////////////////////////////////
	// x have to accept multiple types, so it use type as any. may need more digging. //
	////////////////////////////////////////////////////////////////////////////////////
	addXy(x, y: number): Promise<number> {
		return new Promise((resolveFunc: Function, rejectFunc: Function) => {
			setTimeout(() => {
				const rz = x+y;
				if (rz > 0) {
					resolveFunc(x + y);
				} else {
					rejectFunc('Negative value is invalid: ' + String(rz));
				}
			}, 100);
		})
	}

}