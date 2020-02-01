import { TransitOperatorSubjectService } from './../shared/services/subjects/transit-operator-subject.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
	selector: "app-about",
	templateUrl: "./about.component.html",
	styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {

	constructor(
		private router: Router,
		private transitOperatorSubjectService: TransitOperatorSubjectService
	) { }

	ngOnInit() {
		this.transitOperatorSubjectService.setTransitOperatorOnestopId(null);
		this.transitOperatorSubjectService.transitOperatorOnestopId$
			.pipe(
				filter((onestopId) => onestopId !== null)
			)
			.subscribe(() => this.router.navigateByUrl("/"));
	}

}
