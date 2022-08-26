import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { GeneralResponse } from '../shared/general.model';
import { User } from '../shared/user.model';

export interface AuthResponseData {
  status: string;
  messsage: string;
  data: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  holder: User;

  constructor(private http: HttpClient, private router: Router) {}

  signup(
    email: string,
    first_name: string,
    password: string,
    last_name: string
  ) {
    return this.http
      .post<AuthResponseData[]>('https://note-xyz.herokuapp.com/api/v1/user/', {
        email: email,
        first_name: first_name,
        password: password,
        last_name: last_name,
      })
      .pipe(
        tap((resData) => {
          this.user.next({ ...resData[0].data });
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData[]>(
        'https://note-xyz.herokuapp.com/api/v1/user/login',
        {
          email: email,
          password: password,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.user.next({ ...resData[0].data });
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    if (error.status === 401) {
      errorMessage = 'this is an unauthorized login';
    }

    return throwError(errorMessage);
  }
}
