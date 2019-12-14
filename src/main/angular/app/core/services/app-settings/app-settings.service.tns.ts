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
	public static getBoolean = getBoolean;
	public static getNumber = getNumber;
	public static getString = getString;
	public static setBoolean = setBoolean;
	public static setNumber = setNumber;
	public static setString = setString;
	public static remove = remove;
}
