import { AuthService } from './../../@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import User from 'src/app/@core/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user!: User;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

}
