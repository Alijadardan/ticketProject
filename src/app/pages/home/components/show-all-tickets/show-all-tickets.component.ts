import { map } from 'rxjs/operators';
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
  results: Ticket[] = [];
  page_number: number = 0;
  page_size: number = 10;
  last_page_number: number = 0;
  loading: boolean = false;

  constructor(private store: Store<AppState>, private authService: AuthService) {
    this.tickets = this.store.select('ticket');
    this.authService.user.subscribe(user => this.user = user);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin
  }

  ngOnInit(): void {
    this.sliceData(this.page_number, this.page_size);
  }

  filterData(data: Observable<Ticket[]>) {
    this.page_number = 0;
    this.page_size = 10;
    this.tickets = data;
    this.sliceData(this.page_number, this.page_size);
  }

  sliceData(page_number: number, page_size: number){
    this.tickets.subscribe((data: Ticket[]) => {
      this.last_page_number = Math.ceil(data.length/10);
      this.results = data.slice(page_number * page_size, page_number * page_size + page_size);
    });
  }

  deleteTicket(id: string) {
    this.store.dispatch(new TicketActions.RemoveTicket(id));
  }

  changeNextPage(){
    if(this.last_page_number !== this.page_number) {
      this.page_number += 1;
      this.sliceData(this.page_number, this.page_size);
    }
  }

  changePreviusPage(){
    if(this.page_number !== 0) {
      this.page_number -= 1;
      this.sliceData(this.page_number, this.page_size);
    }
  }

  goToLastPage() {
    this.page_number = this.last_page_number - 1;
    this.sliceData(this.page_number, this.page_size);
  }

  goToFirstPage() {
    this.page_number = 0;
    this.sliceData(this.page_number, this.page_size);
  }

}
