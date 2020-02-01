import { TransitOperatorSubjectService } from "./../../shared/services/subjects/transit-operator-subject.service";
import { SuggestedOperator } from "./suggested-operator.class";
import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-suggested-operators",
	templateUrl: "./suggested-operators.component.html",
	styleUrls: ["./suggested-operators.component.css"]
})
export class SuggestedOperatorsComponent implements OnInit {

	public constantSuggestions: SuggestedOperator[];
	public rotatingSuggestions: SuggestedOperator[];

	constructor(
		private transitOperatorSubjectService: TransitOperatorSubjectService
	) {
		this.constantSuggestions = [
			{
				name: "New York",
				onestopId: "o-dr5r-nyct"
			},
			{
				name: "Chicago",
				onestopId: "o-dp3-chicagotransitauthority"
			},
			{
				name: "San Francisco",
				onestopId: "o-9q9-bart"
			}
		];
	}

	ngOnInit() {
	}

	onSuggestionClicked(suggestedOperator: SuggestedOperator) {
		this.transitOperatorSubjectService.setTransitOperatorOnestopId(suggestedOperator.onestopId);
	}

}
