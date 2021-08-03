import * as moment from 'moment';
import { TicketType } from './ticket-type';
export default interface Ticket {
    id: number;
    inbound: string;
    outbound: string;
    ticket_type: TicketType;
    from_date: moment.Moment;
    to_date: moment.Moment;
    seat_number: number;
}
