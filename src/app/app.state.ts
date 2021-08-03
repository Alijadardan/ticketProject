import { ActionReducerMap } from "@ngrx/store";
import Ticket from "./@core/models/ticket";
import { TicketReducer } from "./store/reducers/ticket.reducer";

export interface AppState {
  readonly ticket: Ticket[];
}

export const reducers: ActionReducerMap<AppState, any> = {
  ticket: TicketReducer
};
