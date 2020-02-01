import { TransitOperatorSubjectService } from "./../shared/services/subjects/transit-operator-subject.service";
import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-controls-container",
	templateUrl: "./controls-container.component.html",
	styleUrls: ["./controls-container.component.css"]
})
export class ControlsContainerComponent implements OnInit {

	public vm$ = this.transitOperatorSubjectService.transitOperatorOnestopId$;

	constructor(private transitOperatorSubjectService: TransitOperatorSubjectService) {
	}

	ngOnInit(): void { }

}
