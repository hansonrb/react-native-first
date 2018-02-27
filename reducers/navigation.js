import { NavigationActions } from 'react-navigation';
import AppNavigator from '../routes';

const action = AppNavigator.router.getActionForPathAndParams(null);
const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Home'),
);

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default navReducer;
