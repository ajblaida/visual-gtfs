import { CookieService } from "./../../shared/services/cookies.service";
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
		private transitOperatorSubjectService: TransitOperatorSubjectService,
		private cookieService: CookieService
	) {
		this.onestopIdInput = new FormControl("", {updateOn: "blur"});
	}

	ngOnInit() {
		this.transitOperatorSubjectService.transitOperatorOnestopId$
			.subscribe(onestop => {
				this.onestopIdInput.setValue(onestop, { emitEvent: false });
			});
		this.onestopIdInput
			.valueChanges
			.subscribe((val) => {
				if (val !== "") {
					this.cookieService.set("onestop", val);
					this.transitOperatorSubjectService.setTransitOperatorOnestopId(val);
				} else {
					this.cookieService.clearCookie("onestop");
					this.transitOperatorSubjectService.setTransitOperatorOnestopId(null);
				}
			});

		if (this.cookieService.has("onestop")) {
			this.onestopIdInput.setValue(this.cookieService.get("onestop"));
		}
	}

	clear() {
		this.onestopIdInput.setValue("");
	}

}
