import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
};


//Allow us to call this function and get this state from the Global state
//createFeatureSelector is used for Targeting the state or values returned by a sub reducer
export const getUiState = createFeatureSelector<fromUi.State>('ui');
//createSelector is used to take the constant (getUiState) and directly runs in the appReducer
//So we get the isLoading propety from the UIState
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
