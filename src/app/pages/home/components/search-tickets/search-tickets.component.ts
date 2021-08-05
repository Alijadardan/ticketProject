import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../app.state';
import { Observable } from 'rxjs';
import { ticketTypes } from './../../../../@core/models/ticket-type';
import { FormBuilder, FormGroup } from '@angular/forms';
import Ticket from 'src/app/@core/models/ticket';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import Utils from 'src/app/@core/utils/general';

@Component({
  selector: 'app-search-tickets',
  templateUrl: './search-tickets.component.html',
  styleUrls: ['./search-tickets.component.scss']
})
export class SearchTicketsComponent implements OnInit {

  tickets: Observable<Ticket[]>;
  @Output() newItemEvent = new EventEmitter<Observable<Ticket[]>>();
  fliteredData: Ticket[] = [];
  searchForm!: FormGroup;
  ticketTypes = ticketTypes;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>) {
    this.tickets = this.store.select('ticket');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit() {
    this.newItemEvent.emit(this.searchData());
  }

  buildForm() {
    this.searchForm = this.fb.group({
      id: [''],
      inbound: [''],
      outbound: [''],
      ticket_type: [''],
      from_date: [''],
      to_date: [''],
      seat_number: ['']
    })
  }

  searchData(): Observable<Ticket[]>{
    let fileterObj = Utils.filterEmptyParameters(this.searchForm.value);
    const result = this.tickets.pipe(map((data: Ticket[]) => data.filter((item: Ticket) => {
      return Object.keys(fileterObj).every((key: string) => {
        if(key == 'from_date'){
          return new Date(item['from_date']).getTime() >= new Date(fileterObj['from_date']).getTime();
        }
        if(key == 'to_date'){
          return new Date(item['to_date']).getTime() <= new Date(fileterObj['to_date']).getTime();
        }
        if(key == 'ticket_type'){
          return item['ticket_type'].type == fileterObj['ticket_type'].type;
        }
        return item[key as keyof Ticket] == fileterObj[key];
        }); 
      })
    ));
    return result;
    
  }

}
