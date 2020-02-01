import { BaseComponent } from './../base.component';
import { TransitOperatorSubjectService } from './../shared/services/subjects/transit-operator-subject.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { filter, takeUntil } from "rxjs/operators";

@Component({
	selector: "app-about",
	templateUrl: "./about.component.html",
	styleUrls: ["./about.component.css"]
})
export class AboutComponent extends BaseComponent implements OnInit {

	constructor(
		private router: Router,
		private transitOperatorSubjectService: TransitOperatorSubjectService
	) { super(); }

	ngOnInit() {
		this.transitOperatorSubjectService.setTransitOperatorOnestopId(null);
		this.transitOperatorSubjectService.transitOperatorOnestopId$
			.pipe(
				takeUntil(this.unsubscribe$),
				filter((onestopId) => onestopId !== null)
			)
			.subscribe(() => this.router.navigateByUrl("/"));
	}

}