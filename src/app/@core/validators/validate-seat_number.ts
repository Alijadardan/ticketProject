import { from, Observable, of } from 'rxjs';
import Ticket from './../models/ticket';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { filter, toArray, map } from 'rxjs/operators';

export function validateSeatNumber(seat_number: string, inbound: string, outbound: string, from_date: string, tickets: Observable<Ticket[]>) {
    return (formGroup: FormGroup) => {
        const seat_number_value = formGroup.controls[seat_number].value;
        const inbound_value = formGroup.controls[inbound].value;
        const outbound_value = formGroup.controls[outbound].value;
        const from_date_value = formGroup.controls[from_date].value;

        const data = tickets.pipe(map((data: Ticket[]) => data.filter((item: Ticket) => {
          return item.inbound == inbound_value && item.outbound == outbound_value&& new Date(item.from_date).getTime() == new Date(from_date_value).getTime() && item.seat_number == seat_number_value
        })));

        data.subscribe(data => {
          if(data.length == 0){
            return;
          }else {
            formGroup.controls[seat_number].markAsDirty();
            formGroup.controls[seat_number].markAsTouched();
            formGroup.controls[seat_number].setErrors({ seatNumberNotValid: true });
          }
        })

       return;
    }
}
