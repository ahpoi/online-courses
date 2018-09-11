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
export function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'START_LOADING':
      return {isLoading: true};
    case 'STOP_LOADING':
      return {isLoading: false};
    default:
      return state;
  }
}
