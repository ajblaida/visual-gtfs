import { TransitOperatorSubjectService } from "./../../shared/services/subjects/transit-operator-subject.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, Form } from "@angular/forms";

@Component({
	selector: "app-onestop-input",
	templateUrl: "./onestop-input.component.html",
	styleUrls: ["./onestop-input.component.css"]
})
export class OnestopInputComponent implements OnInit {
	onestopIdInput: FormControl;

	constructor(
		private transitOperatorSubjectService: TransitOperatorSubjectService
	) { }

	ngOnInit() {
		this.onestopIdInput = new FormControl("", {updateOn: "blur"});

		this.onestopIdInput
			.valueChanges
			.subscribe((val) => {
				this.transitOperatorSubjectService.setTransitOperatorOnestopId(val);
			});
	}

}
