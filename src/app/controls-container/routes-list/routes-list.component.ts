import { VehicleTypesSubjectService } from './../../shared/services/subjects/vehicle-types-subject.service';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { RouteStopPatternSubjectService } from "./../../shared/services/subjects/route-stop-pattern-subject.service";
import { RouteSubjectService } from "./../../shared/services/subjects/route-subject.service";
import { Component, OnInit } from "@angular/core";
import RouteResponse from "../../shared/models/responses/route-response.class";
import { tap, filter, switchMap, mergeMap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { RouteService } from "../../shared/services/route.service";
import { TransitOperatorSubjectService } from "src/app/shared/services/subjects/transit-operator-subject.service";
import Route from "src/app/shared/models/route.class";

@Component({
	selector: "app-routes-list",
	templateUrl: "./routes-list.component.html",
	styleUrls: ["./routes-list.component.css"]
})
export class RoutesListComponent implements OnInit {
	public vm$: Observable<Route[]>;
	public selectedRoute$: Observable<Route>;
	public checkboxGroup: FormGroup;
	private vehicleTypes = [
		{
			name: "Metro",
			typeId: 1
		},
		{
			name: "Bus",
			typeId: 3
		}
	];

	constructor(
		private routeService: RouteService,
		private routeSubjectService: RouteSubjectService,
		private transitOperatorSubjectService: TransitOperatorSubjectService,
		private formBuilder: FormBuilder,
		private vehicleTypeSubjectService: VehicleTypesSubjectService
	) { }

	ngOnInit() {
		this.initCheckboxGroup();
		this.selectedRoute$ = this.routeSubjectService.selectedRoute$;
		this.vm$ = this.routeSubjectService.routesForSelectedOperator$;
	}

	get vehicleTypeControls(): FormArray {
		return this.checkboxGroup.get("vehicleTypes") as FormArray;
	}

	initCheckboxGroup() {
		this.checkboxGroup = this.formBuilder.group({
			vehicleTypes: new FormArray([])
		});
		this.vehicleTypes.forEach((type) => {
			const control = new FormControl(true);
			(this.checkboxGroup.controls.vehicleTypes as FormArray).push(control);
		});

		this.checkboxGroup
			.valueChanges
			.subscribe((selected) => {
				this.setSelectedVehicleTypes(selected.vehicleTypes);
			});

		this.setSelectedVehicleTypes(this.vehicleTypeControls.value);
	}

	setSelectedVehicleTypes(selected: boolean[]) {
		if (selected.every(val => !val)) {
			this.vehicleTypeSubjectService.setSelectedVehicleTypes([-1]);
			return;
		}
		const selectedVehicleTypes = this.vehicleTypes
			.filter((vt, i) => selected[i])
			.map((vt) => vt.typeId);
		this.vehicleTypeSubjectService.setSelectedVehicleTypes(selectedVehicleTypes);
	}

	onRouteClicked(route: Route) {
		this.routeSubjectService.setSelectedRoute(route);
	}

	clearSelectedRoute() {
		this.routeSubjectService.clear();
	}
}
