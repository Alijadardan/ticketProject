import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Role } from '../../enum/role';
import User from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user!: User;
  @Output() logoutEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin
  }

  logout(){
    this.logoutEvent.emit();
  }

}
