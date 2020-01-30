/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { OnestopInputComponent } from "./onestop-input.component";

describe("OnestopInputComponent", () => {
	let component: OnestopInputComponent;
	let fixture: ComponentFixture<OnestopInputComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ OnestopInputComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OnestopInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
