import Ticket from 'src/app/@core/models/ticket';
import { Router } from '@angular/router';
import TicketType, { ticketTypes } from './../../../../@core/models/ticket-type';
import { AppState } from './../../../../app.state';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import * as TicketActions from '../../../../store/actions/ticket.actions';
import { SameInboundOutbound } from 'src/app/@core/validators/validate-inbound-outbound';
import { toDateBeforeFromDate } from 'src/app/@core/validators/validate-date';
import * as moment from 'moment'
import { validateSeatNumber } from 'src/app/@core/validators/validate-seat_number';

@Component({
  selector: 'app-create-new-ticket',
  templateUrl: './create-new-ticket.component.html',
  styleUrls: ['./create-new-ticket.component.scss']
})
export class CreateNewTicketComponent implements OnInit {

  ticketsForm!: FormGroup;
  tickets!: FormArray;
  ticketTypes = ticketTypes;
  ticketsState!: Ticket[];
  minDate: Date = new Date();

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
    this.store.select('ticket').subscribe(data => {
      this.ticketsState = data;
    })
  }

  onSubmit() {
    console.log(this.ticketsForm);
    if(!this.ticketsForm.valid){
      return;
    }

    this.store.dispatch(new TicketActions.AddTicket(this.ticketsForm.value.tickets));
    this.router.navigate(['/all-tickets']);
  }

  buildForm() {
    this.ticketsForm = this.fb.group({
      tickets: this.fb.array([])
    });

    this.tickets = this.ticketsForm.get('tickets') as FormArray;
    this.tickets.push(this.createItemTicket());
  }

  createItemTicket() {
    return this.fb.group({
      id: [UUID.UUID(), Validators.required],
      inbound: ['', Validators.required],
      outbound: ['', Validators.required],
      ticket_type: [null, Validators.required],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      seat_number: [null, Validators.required],
      price: [{ value: null, disabled: true }, [Validators.required, Validators.min(0)]]
    }, {
      validators: [SameInboundOutbound('inbound', 'outbound'), toDateBeforeFromDate('from_date', 'to_date'), validateSeatNumber('seat_number', 'inbound', 'outbound', 'from_date', this.store.select('ticket'))],
    })
  }

  addNewFormItem(e: any) {
    e.preventDefault();
    this.tickets.push(this.createItemTicket());
  }

  removeNewFormItem(i: number){
    this.tickets.removeAt(i);
  }

  ticketTypeChange(type: TicketType, i:number) {
    this.tickets.controls[i].get('price')?.setValue(type.price);
  }

}
