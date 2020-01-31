import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
	providedIn: "root"
})
export class CookieService {

	private cookies: Map<string, string>;
	private cookieLifetime: string;

	constructor() {
		const cookiePairs = document.cookie.split(";");
		this.cookieLifetime = moment().add(1, "day").toDate().toUTCString();
		this.cookies = cookiePairs.reduce((map, pair) => {
			const pairArray = pair.trim().split("=");
			map.set(pairArray[0], pairArray[1]);
			return map;
		}, new Map<string, string>());
		console.log("built cookies", this.cookies);
	}

	get(name: string): string {
		console.log("cookies", this.cookies);
		return this.cookies.get(name);
	}

	set(name: string, value: string): void {
		document.cookie = `${name}=${value}; expires=${this.cookieLifetime}; path=/`;
		this.cookies.set(name, value);
	}

	has(name: string): boolean {
		console.log("has cookies", this.cookies);

		return this.cookies.has(name);
	}

}
