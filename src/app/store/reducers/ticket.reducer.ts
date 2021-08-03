import { TicketType } from '../../@core/enum/types';
import Ticket from 'src/app/@core/models/ticket';
import * as moment from 'moment';
import * as TicketActions from '../actions/ticket.actions';

const initialState: Ticket = {
    id: 1,
    inbound: 'Tirana',
    outbound: 'Finland',
    ticket_type: TicketType.VIP,
    from_date: new Date(),
    to_date: new Date(),
    seat_number: 23,
    price: 100
}

export function TicketReducer(state: Ticket[] = [initialState], action: TicketActions.Actions){
  switch (action.type) {
    case TicketActions.ADD_TICKET:
      return [...state, action.payload];
    case TicketActions.REMOVE_TICKET:
      const newState = [...state];
      newState.splice(newState.findIndex(item => item.id === action.payload), 1);
      return newState;
    default:
      return state
  }
}
