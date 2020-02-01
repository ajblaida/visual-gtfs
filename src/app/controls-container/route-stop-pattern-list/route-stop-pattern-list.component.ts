import { BaseComponent } from "./../../base.component";
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
export class RouteStopPatternListComponent extends BaseComponent implements OnInit {
	vm$ = this.routeStopPatternSubjectService.routeStopPatternsForSelectedRoute$;
	public checkboxGroup: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private routeStopPatternSubjectService: RouteStopPatternSubjectService
	) {
		super();
		this.initCheckboxGroup();
	}

	get routeStopPatternControls(): FormArray {
		return this.checkboxGroup.get("routeStopPatterns") as FormArray;
	}

	ngOnInit() {
		this.routeStopPatternSubjectService.routeStopPatternsForSelectedRoute$
			.pipe(
				takeUntil(this.unsubscribe$),
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
					.pipe(
						takeUntil(this.unsubscribe$)
					)
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
