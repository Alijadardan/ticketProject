import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
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

  logout(){
    this.logoutEvent.emit();
  }

}
