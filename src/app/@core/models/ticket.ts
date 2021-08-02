export default interface Ticket {
    id: number; 
    inbound: string; 
    outbound: string; 
    ticket_type: string; 
    ticket_type_id: number;
    price: number; 
    from_date: Date; 
    to_date: Date;
    seat_number: number;
}
