import { AppState } from './../../../../app.state';
import { Observable } from 'rxjs';
import Ticket from 'src/app/@core/models/ticket';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-show-all-tickets',
  templateUrl: './show-all-tickets.component.html',
  styleUrls: ['./show-all-tickets.component.scss']
})
export class ShowAllTicketsComponent implements OnInit {

  tickets: Observable<Ticket[]>;

  constructor(private store: Store<AppState>) {
    this.tickets = this.store.select('ticket');
  }

  ngOnInit(): void {
  }

}
