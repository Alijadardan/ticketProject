import { TicketType } from './ticket-type';
export default interface Ticket {
    id: number;
    inbound: string;
    outbound: string;
    ticket_type: TicketType;
    from_date: Date;
    to_date: Date;
    seat_number: number;
}
