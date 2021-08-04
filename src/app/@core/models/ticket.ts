import TicketType from './../models/ticket-type';

export default interface Ticket {
    id: string;
    inbound: string;
    outbound: string;
    ticket_type: TicketType;
    from_date: Date;
    to_date: Date;
    seat_number: number;
}
