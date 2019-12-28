import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AppSettingsService {
	public static clear = localStorage.clear;
	public static remove = localStorage.removeItem;

	public static setString = (key: string, value: string) =>
		AppSettingsService.set(key, value);
	public static setBoolean = (key: string, value: boolean) =>
		AppSettingsService.set(key, value.toString());
	public static setNumber = (key: string, value: number) =>
		AppSettingsService.set(key, value.toString());

	public static getString = (key: string, defValue?: string) =>
		AppSettingsService.get(key) || defValue;
	public static getBoolean = (key: string, defValue?: boolean) => {
		const val = AppSettingsService.get(key);

		if (val === 'true') return true;
		if (val === 'false') return false;

		return defValue;
	};
	public static getNumber = (key: string, defValue?: number) => {
		const val = AppSettingsService.get(key);

		if (!val) return defValue;

		return parseFloat(val);
	};

	private static get = (key: string) => localStorage.getItem(key);

	private static set = (key: string, value: string) =>
		localStorage.setItem(key, value);
}
