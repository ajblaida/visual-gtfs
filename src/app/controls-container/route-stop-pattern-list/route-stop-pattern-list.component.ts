import { RouteStopPatternSubjectService } from "./../../shared/services/subjects/route-stop-pattern-subject.service";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { filter, takeUntil } from "rxjs/operators";

@Component({
	selector: "app-route-stop-pattern-list",
	templateUrl: "./route-stop-pattern-list.component.html",
	styleUrls: ["./route-stop-pattern-list.component.css"],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteStopPatternListComponent implements OnInit {
	vm$ = this.routeStopPatternSubjectService.routeStopPatternsForSelectedRoute$;
	public checkboxGroup: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private routeStopPatternSubjectService: RouteStopPatternSubjectService
	) {
		this.initCheckboxGroup();
	}

	ngOnInit() {
		this.routeStopPatternSubjectService.routeStopPatternsForSelectedRoute$
			.pipe(
				filter(rsps => rsps != null)
			)
			.subscribe(rsps => {
				this.initCheckboxGroup();
				rsps.forEach((rsp, i) => {
					const control = new FormControl(true);
					(this.checkboxGroup.controls.routeStopPatterns as FormArray).push(control);
				});

				this.checkboxGroup
					.valueChanges
					.subscribe((values) => {
						const selectedBooleans = values.routeStopPatterns;
						const selected = [];
						rsps.forEach((rsp, i) => {
							if (selectedBooleans[i]) {
								selected.push(rsp);
							}
						});
						this.routeStopPatternSubjectService
							.setSelectedRouteStopPattern(selected);
					});
			});
	}

	initCheckboxGroup() {
		this.checkboxGroup = this.formBuilder.group({
			routeStopPatterns: new FormArray([])
		});
	}

}