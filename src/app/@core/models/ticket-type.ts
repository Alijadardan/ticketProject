export default interface TicketType {
  id: number;
  type: string;
  price: number;
}

export const ticketTypes: TicketType[] = [
  {
    id: 1,
    type: 'VIP',
    price: 100
  },
  {
    id: 2,
    type: 'MEDIUM',
    price: 50
  },
  {
    id: 3,
    type: 'ECONOMY',
    price: 25
  }
]
