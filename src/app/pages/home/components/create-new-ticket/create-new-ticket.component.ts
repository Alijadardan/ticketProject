import { TicketType } from './../../../../@core/enum/types';
import { AppState } from './../../../../app.state';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-new-ticket',
  templateUrl: './create-new-ticket.component.html',
  styleUrls: ['./create-new-ticket.component.scss']
})
export class CreateNewTicketComponent implements OnInit {

  ticketsForm!: FormGroup;
  tickets!: FormArray;
  ticketTypes = TicketType;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit() {
    console.log(this.ticketsForm.value)
  }

  buildForm() {
    this.ticketsForm = this.fb.group({
      tickets: this.fb.array([])
    });

    this.tickets = this.ticketsForm.get('tickets') as FormArray;
    this.tickets.push(this.createItemTicket());
    console.log(this.tickets.controls[0].get('price')?.errors?.required)
  }

  createItemTicket() {
    return this.fb.group({
      id: [null, Validators.required],
      inbound: ['', Validators.required],
      outbound: ['', Validators.required],
      ticket_type: [null, Validators.required],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      seat_number: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]]
    })
  }

}
