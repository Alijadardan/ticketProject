import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;


  constructor(private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();

  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    if(username === 'dardan' && password === 'dardan'){
      let user: User =
      {
        id: '1',
        username: 'dardan',
        password: 'dardan',
        firstName: 'Dardan',
        lastName: 'Alija',
        token: 'token',
      }
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return of(user);
    }else {
      throw throwError('Not valid username and password');
    }
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('user');
      this.userSubject.next(null!);
      this.router.navigate(['/login']);
  }


}
