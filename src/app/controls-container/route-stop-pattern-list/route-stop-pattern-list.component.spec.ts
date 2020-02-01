/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { RouteStopPatternListComponent } from "./route-stop-pattern-list.component";

describe("RouteStopPatternListComponent", () => {
	let component: RouteStopPatternListComponent;
	let fixture: ComponentFixture<RouteStopPatternListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ RouteStopPatternListComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RouteStopPatternListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
