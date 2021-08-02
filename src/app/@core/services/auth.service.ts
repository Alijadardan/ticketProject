import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Role } from '../enum/role';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;


  constructor(private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || null!));
    this.user = this.userSubject.asObservable();

  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    let user: User;
    if(username === 'dardan' && password === 'dardan'){
      user =
      {
        id: '1',
        username: 'dardan',
        password: 'dardan',
        firstName: 'Dardan',
        lastName: 'Alija',
        token: 'token',
        role: Role.Admin
      }
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return of(user);
    }else if(username === 'user' && password === 'user'){
      user =
      {
        id: '1',
        username: 'user',
        password: 'user',
        firstName: 'User',
        lastName: 'User',
        token: 'token',
        role: Role.User
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
