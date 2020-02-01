/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { SuggestedOperatorsComponent } from "./suggested-operators.component";

describe("SuggestedOperatorsComponent", () => {
	let component: SuggestedOperatorsComponent;
	let fixture: ComponentFixture<SuggestedOperatorsComponent>;

	beforeEach(async(() => {
	TestBed.configureTestingModule({
		declarations: [ SuggestedOperatorsComponent ]
	})
	.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SuggestedOperatorsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
