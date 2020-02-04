import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class VehicleTypesSubjectService {

	private selectedVehicleTypesSubject = new BehaviorSubject<number[]>(null);
	public selectedVehicleTypes$ = this.selectedVehicleTypesSubject.asObservable();

	constructor() { }

	public setSelectedVehicleTypes(types: number[]) {
		this.selectedVehicleTypesSubject.next(types);
	}

}
