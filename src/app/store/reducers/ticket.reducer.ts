import { UUID } from 'angular2-uuid';
import Ticket from 'src/app/@core/models/ticket';
import * as TicketActions from '../actions/ticket.actions';
import MOCK_DATA  from '../../../assets/MOCK_DATA.json';

const initialState: Ticket[] = MOCK_DATA;

export function TicketReducer(state: Ticket[] = initialState, action: TicketActions.Actions){
  switch (action.type) {
    case TicketActions.ADD_TICKET:
     const addTicketState = state.concat(action.payload);
      localStorage.setItem("STATE", JSON.stringify(addTicketState));
      return addTicketState;
    case TicketActions.REMOVE_TICKET:
      const newState = [...state];
      newState.splice(newState.findIndex(item => item.id === action.payload), 1);
      localStorage.setItem("STATE", JSON.stringify(newState));
      return newState;
    case TicketActions.UPDATE_TICKETS:
      const localStorageState = action.payload
      return localStorageState;
    default:
      return state
  }
}
