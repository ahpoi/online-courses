import { START_LOADING, STOP_LOADING, UIActions } from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

/*
Reducer is just a function
The function just takes the old state and the incoming action
It return a new state

Action that are dispatched needs to have a type property
 */
export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case START_LOADING:
      return {isLoading: true};
    case STOP_LOADING:
      return {isLoading: false};
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
