/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { RoutesListComponent } from "./routes-list.component";

describe("RoutesListComponent", () => {
	let component: RoutesListComponent;
	let fixture: ComponentFixture<RoutesListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ RoutesListComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RoutesListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
