import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromUi from './shared/ui.reducter';

export interface State {
  ui: fromUi.State
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer
};


//Allow us to call this function and get this state from the Global state
//createFeatureSelector is used for Targeting the state or values returned by a sub reducer
export const getUiState = createFeatureSelector<fromUi.State>('ui');

//createSelector is used to take the constant (getUiState) and directly runs in the appReducer
//So we get the isLoading propety from the UIState
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
