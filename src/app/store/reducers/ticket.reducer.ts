import { UUID } from 'angular2-uuid';
import Ticket from 'src/app/@core/models/ticket';
import * as TicketActions from '../actions/ticket.actions';

const initialState: Ticket = {
    id: UUID.UUID(),
    inbound: 'Tirana',
    outbound: 'Finland',
    ticket_type: {
      id: 1,
      type: 'VIP',
      price: 100
    },
    from_date: new Date(),
    to_date: new Date(),
    seat_number: 23
}

export function TicketReducer(state: Ticket[] = [initialState], action: TicketActions.Actions){
  switch (action.type) {
    case TicketActions.ADD_TICKET:
      return state.concat(action.payload);
    case TicketActions.REMOVE_TICKET:
      const newState = [...state];
      newState.splice(newState.findIndex(item => item.id === action.payload), 1);
      return newState;
    default:
      return state
  }
}
