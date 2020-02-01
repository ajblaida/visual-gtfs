import { Component, OnDestroy } from "@angular/core";
import { Subject, Observable } from "rxjs";

export class BaseComponent implements OnDestroy {

	private unsubscribeSource: Subject<null> = new Subject();
	protected unsubscribe$: Observable<null> = this.unsubscribeSource.asObservable();

	ngOnDestroy(): void {
		this.unsubscribeSource.next(null);
	}
}
