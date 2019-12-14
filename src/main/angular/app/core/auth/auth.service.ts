import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { LoginResponse } from './interfaces/LoginResponse.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private readonly http: HttpClient) {}

	public login(email: string, password: string): Observable<LoginResponse> {
		return this.http.post<LoginResponse>('/api/auth/login', {
			email,
			password,
		});
	}

	public check(): Observable<void> {
		return this.http.get<void>('/api/auth/check');
	}
}
