import { Injectable } from '@angular/core';

import {
	clear,
	getBoolean,
	getNumber,
	getString,
	setBoolean,
	setNumber,
	setString,
	remove,
} from 'tns-core-modules/application-settings';
@Injectable({
	providedIn: 'root',
})
export class AppSettingsService {
	public static clear = clear;
	public static setBoolean = setBoolean;
	public static setNumber = setNumber;
	public static setString = setString;
	public static remove = remove;

	public static getBoolean = (key: string, defValue?: boolean) => {
		const val = getBoolean(key, defValue);
		if (val !== undefined) return val;

		return null;
	};
	public static getNumber = (key: string, defValue?: number) => {
		const val = getNumber(key, defValue);
		if (val !== undefined) return val;

		return null;
	};
	public static getString = (key: string, defValue?: string) => {
		const val = getString(key, defValue);
		if (val !== undefined) return val;

		return null;
	};
}
