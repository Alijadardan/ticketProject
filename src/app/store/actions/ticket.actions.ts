import Ticket from 'src/app/@core/models/ticket';
import { Action } from "@ngrx/store";

export const ADD_TICKET = '[TICKET] Add'
export const REMOVE_TICKET = '[TICKET] Remove'

export class AddTicket implements Action {
  readonly type = ADD_TICKET

  constructor(public payload: Ticket){

  }
}

export class RemoveTicket implements Action {
  readonly type = REMOVE_TICKET

  constructor(public payload: number){

  }
}


export type Actions = AddTicket | RemoveTicket
