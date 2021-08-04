import TicketType, { ticketTypes } from './../../../../@core/models/ticket-type';
import { AppState } from './../../../../app.state';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import * as TicketActions from '../../../../store/actions/ticket.actions';

@Component({
  selector: 'app-create-new-ticket',
  templateUrl: './create-new-ticket.component.html',
  styleUrls: ['./create-new-ticket.component.scss']
})
export class CreateNewTicketComponent implements OnInit {

  ticketsForm!: FormGroup;
  tickets!: FormArray;
  ticketTypes = ticketTypes;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit() {
    console.log(this.ticketsForm.value)
    if(!this.ticketsForm.valid){
      return;
    }

    this.store.dispatch(new TicketActions.AddTicket(this.ticketsForm.value.tickets))
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
    })
  }

  addNewFormItem(e: any) {
    e.preventDefault();
    this.tickets.push(this.createItemTicket());
  }

  ticketTypeChange(type: TicketType, i:number) {
    console.log(type);
    this.tickets.controls[i].get('price')?.setValue(type.price);
  }

  get ticketPrice() {
    return
  }

}
