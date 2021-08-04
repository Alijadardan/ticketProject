import { reducers } from './../../app.state';
import { NgModule } from '@angular/core';
import { ActionReducer, Action, MetaReducer, StoreModule } from '@ngrx/store';
import {merge, pick} from 'lodash-es';

function setSavedState(state: any, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

function getSavedState(localStorageKey: string): any {
  return JSON.parse(localStorage.getItem(localStorageKey) || '{}');
}

// the key for the local storage.
const localStorageKey = '__app_storage__';

export function storageMetaReducer<S, A extends Action = Action> (reducer: ActionReducer<S, A>) {
  let onInit = true; // after load/refresh…
  console.log("Refresh");
  return function(state: S, action: A): S {
    // reduce the nextState.
    const nextState = reducer(state, action);
    console.log("Refresh1", state, action);
    // init the application state.
    if (onInit) {
      onInit           = false;
      const savedState = getSavedState(localStorageKey);
      console.log("Refresh3", localStorageKey, savedState);
      return merge(nextState, savedState);
    }
    // save the next state to the application storage.
    setSavedState(nextState, localStorageKey);
    console.log("Refresh5", nextState);
    return nextState;
  };
}

export const metaReducers: MetaReducer<any>[] = [storageMetaReducer];