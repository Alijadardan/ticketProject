import { AuthService } from './../../../../@core/services/auth.service';
import { Role } from './../../../../@core/enum/role';
import { AppState } from './../../../../app.state';
import { Observable } from 'rxjs';
import Ticket from 'src/app/@core/models/ticket';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import User from 'src/app/@core/models/user';
import * as TicketActions from '../../../../store/actions/ticket.actions';

@Component({
  selector: 'app-show-all-tickets',
  templateUrl: './show-all-tickets.component.html',
  styleUrls: ['./show-all-tickets.component.scss']
})
export class ShowAllTicketsComponent implements OnInit {

  tickets: Observable<Ticket[]>;
  user!: User;

  constructor(private store: Store<AppState>, private authService: AuthService) {
    this.tickets = this.store.select('ticket');
    this.authService.user.subscribe(user => this.user = user);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin
  }

  ngOnInit(): void {
  }

  deleteTicket(id: string) {
    this.store.dispatch(new TicketActions.RemoveTicket(id));
  }

}
