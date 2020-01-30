import { Observable, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class TransitOperatorSubjectService {
	private transitOperatorOnestopIdSource: BehaviorSubject<string> = new BehaviorSubject<string>(null);
	transitOperatorOnestopId$: Observable<string> = this.transitOperatorOnestopIdSource.asObservable();

	constructor() { }

	setTransitOperatorOnestopId(onestopId: string) {
		this.transitOperatorOnestopIdSource.next(onestopId);
	}

}
